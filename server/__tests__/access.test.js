// server/__tests__/access.test.js
//
// Run with: npm run test:server
//
// Signs real tokens with a throwaway key pair and checks that
// verifyAccessToken accepts only the ones it should.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyAccessToken, isAccessProtectedHost, AccessError } from '../access.js';

const AUD = 'test-audience-tag';
const NOW = Date.UTC(2026, 9, 6, 12, 0, 0);
const NOW_SECONDS = NOW / 1000;

const toBase64Url = (value) => Buffer.from(value).toString('base64url');
const encodeJson = (value) => toBase64Url(JSON.stringify(value));

// A key pair plus a function that signs tokens with it. `jwk` is the
// public half in the shape Cloudflare's certs endpoint returns.
const makeSigner = async (kid) => {
  const pair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true,
    ['sign', 'verify']
  );
  const { kty, n, e } = await crypto.subtle.exportKey('jwk', pair.publicKey);
  const jwk = { kid, kty, n, e, alg: 'RS256', use: 'sig' };

  const sign = async (payload, header = { alg: 'RS256', kid, typ: 'JWT' }) => {
    const signingInput = `${encodeJson(header)}.${encodeJson(payload)}`;
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      pair.privateKey,
      Buffer.from(signingInput)
    );
    return `${signingInput}.${toBase64Url(new Uint8Array(signature))}`;
  };

  return { jwk, sign };
};

// Each test gets its own team domain so the module's key cache never
// carries over from one test to the next.
let teamCounter = 0;
const setup = async () => {
  teamCounter += 1;
  const teamDomain = `https://team-${teamCounter}.cloudflareaccess.com`;
  const signer = await makeSigner('key-1');
  const certs = { keys: [signer.jwk] };
  const fetched = [];
  const fetchImpl = async (url) => {
    fetched.push(url);
    return new Response(JSON.stringify(certs));
  };
  const payload = (overrides = {}) => ({
    aud: [AUD],
    iss: teamDomain,
    email: 'Doctor@Example.com',
    iat: NOW_SECONDS - 60,
    nbf: NOW_SECONDS - 60,
    exp: NOW_SECONDS + 3600,
    ...overrides
  });
  const verify = (token, now = NOW) =>
    verifyAccessToken(token, { teamDomain, audiences: [AUD], fetchImpl, now });
  return { teamDomain, signer, certs, fetched, payload, verify };
};

test('accepts a valid token and returns the email in lower case', async () => {
  const { signer, payload, verify, fetched, teamDomain } = await setup();
  const user = await verify(await signer.sign(payload()));
  assert.deepEqual(user, { email: 'doctor@example.com' });
  assert.deepEqual(fetched, [`${teamDomain}/cdn-cgi/access/certs`]);
});

test('reuses the signing keys instead of fetching them for every request', async () => {
  const { signer, payload, verify, fetched } = await setup();
  await verify(await signer.sign(payload()));
  await verify(await signer.sign(payload()));
  assert.equal(fetched.length, 1);
});

test('refuses a missing or malformed token', async () => {
  const { signer, verify } = await setup();
  await assert.rejects(verify(null), AccessError);
  await assert.rejects(verify(''), AccessError);
  await assert.rejects(verify('only.two'), AccessError);
  await assert.rejects(verify('not!base64.not!base64.not!base64'), AccessError);
  // Valid JSON that isn't an object.
  await assert.rejects(verify(`${encodeJson(null)}.${encodeJson(null)}.AAAA`), AccessError);
  await assert.rejects(verify(`${encodeJson(42)}.${encodeJson({})}.AAAA`), AccessError);
  // Correctly signed, so only the shape check can refuse it.
  await assert.rejects(verify(await signer.sign(null)), { message: 'Malformed token' });
});

test('refuses a token meant for a different Access application', async () => {
  const { signer, payload, verify } = await setup();
  const token = await signer.sign(payload({ aud: ['some-other-application'] }));
  await assert.rejects(verify(token), { message: 'Wrong audience' });
});

test('refuses a token with no audience', async () => {
  const { signer, payload, verify } = await setup();
  const token = await signer.sign(payload({ aud: undefined }));
  await assert.rejects(verify(token), { message: 'Wrong audience' });
});

test('refuses every token when no audience is configured', async () => {
  const { signer, payload, teamDomain, fetched } = await setup();
  const fetchImpl = async () => {
    fetched.push('certs');
    return new Response('{"keys":[]}');
  };
  const noAudience = await signer.sign(payload({ aud: undefined }));
  const valid = await signer.sign(payload());
  // The ACCESS_AUD variable missing, empty, or not passed at all.
  for (const options of [{ audiences: [undefined] }, { audiences: [''] }, { audiences: [] }, {}]) {
    for (const token of [noAudience, valid, null]) {
      await assert.rejects(
        verifyAccessToken(token, { teamDomain, fetchImpl, now: NOW, ...options }),
        (err) => !(err instanceof AccessError) && /ACCESS_AUD/.test(err.message)
      );
    }
  }
  assert.equal(fetched.length, 0);
});

test('treats only addresses behind Access as admin addresses', () => {
  for (const host of [
    'www.lenscraftersdoctor.com',
    'blog-system.magalhaes-site.pages.dev',
    '3f2a9c1e.magalhaes-site.pages.dev'
  ]) {
    assert.ok(isAccessProtectedHost(host), host);
  }
  for (const host of [
    'magalhaes-site.pages.dev',
    'lenscraftersdoctor.com',
    'evilmagalhaes-site.pages.dev',
    'www.lenscraftersdoctor.com.evil.example',
    'magalhaes-site.pages.dev.evil.example',
    'localhost'
  ]) {
    assert.ok(!isAccessProtectedHost(host), host);
  }
});

test('refuses a token issued by a different Access team', async () => {
  const { signer, payload, verify } = await setup();
  const token = await signer.sign(payload({ iss: 'https://someone-else.cloudflareaccess.com' }));
  await assert.rejects(verify(token), { message: 'Wrong issuer' });
});

test('refuses an expired token', async () => {
  const { signer, payload, verify } = await setup();
  const token = await signer.sign(payload({ exp: NOW_SECONDS - 1 }));
  await assert.rejects(verify(token), { message: 'Token expired' });
});

test('refuses a token whose contents were changed after signing', async () => {
  const { signer, payload, verify } = await setup();
  const [header, , signature] = (await signer.sign(payload())).split('.');
  const forged = `${header}.${encodeJson(payload({ email: 'attacker@example.com' }))}.${signature}`;
  await assert.rejects(verify(forged), { message: 'Bad signature' });
});

test('refuses a token signed by someone else using a real key id', async () => {
  const { payload, verify } = await setup();
  const attacker = await makeSigner('key-1');
  await assert.rejects(verify(await attacker.sign(payload())), { message: 'Bad signature' });
});

test('refuses unsigned tokens and other algorithms', async () => {
  const { payload, verify } = await setup();
  const unsigned = `${encodeJson({ alg: 'none', kid: 'key-1' })}.${encodeJson(payload())}.`;
  await assert.rejects(verify(unsigned), { message: 'Unsupported token' });
  const hmac = `${encodeJson({ alg: 'HS256', kid: 'key-1' })}.${encodeJson(payload())}.AAAA`;
  await assert.rejects(verify(hmac), { message: 'Unsupported token' });
});

test('refuses a token with no email, such as a service token', async () => {
  const { signer, payload, verify } = await setup();
  const token = await signer.sign(payload({ email: undefined }));
  await assert.rejects(verify(token), { message: 'Token has no email' });
});

test('refuses an unknown key id after one fresh fetch of the keys', async () => {
  const { signer, payload, verify, fetched } = await setup();
  await verify(await signer.sign(payload()));

  const stranger = await makeSigner('key-unknown');
  await assert.rejects(verify(await stranger.sign(payload()), NOW + 61000), {
    message: 'Unknown signing key'
  });
  assert.equal(fetched.length, 2);
});

test('fetches the keys again at most once a minute for unknown key ids', async () => {
  const { signer, payload, verify, fetched } = await setup();
  await verify(await signer.sign(payload()));

  const stranger = await makeSigner('key-unknown');
  const token = await stranger.sign(payload());
  for (const later of [1000, 2000, 59000]) {
    await assert.rejects(verify(token, NOW + later), { message: 'Unknown signing key' });
  }
  assert.equal(fetched.length, 1);

  await assert.rejects(verify(token, NOW + 61000), { message: 'Unknown signing key' });
  assert.equal(fetched.length, 2);
});

test('picks up rotated signing keys', async () => {
  const { signer, certs, payload, verify, fetched } = await setup();
  await verify(await signer.sign(payload()));

  const rotated = await makeSigner('key-2');
  certs.keys = [rotated.jwk];
  const user = await verify(await rotated.sign(payload()), NOW + 61000);

  assert.equal(user.email, 'doctor@example.com');
  assert.equal(fetched.length, 2);
});
