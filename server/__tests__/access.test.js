// server/__tests__/access.test.js
//
// Run with: npm run test:server
//
// Signs real tokens with a throwaway key pair and checks that
// verifyAccessToken accepts only the ones it should.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyAccessToken, AccessError } from '../access.js';

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
  const verify = (token) =>
    verifyAccessToken(token, { teamDomain, audiences: [AUD], fetchImpl, now: NOW });
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
  const { verify } = await setup();
  await assert.rejects(verify(null), AccessError);
  await assert.rejects(verify(''), AccessError);
  await assert.rejects(verify('only.two'), AccessError);
  await assert.rejects(verify('not!base64.not!base64.not!base64'), AccessError);
});

test('refuses a token meant for a different Access application', async () => {
  const { signer, payload, verify } = await setup();
  const token = await signer.sign(payload({ aud: ['some-other-application'] }));
  await assert.rejects(verify(token), { message: 'Wrong audience' });
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
  const { payload, verify, fetched } = await setup();
  const stranger = await makeSigner('key-unknown');
  await assert.rejects(verify(await stranger.sign(payload())), { message: 'Unknown signing key' });
  assert.equal(fetched.length, 2);
});

test('picks up rotated signing keys', async () => {
  const { signer, certs, payload, verify, fetched } = await setup();
  await verify(await signer.sign(payload()));

  const rotated = await makeSigner('key-2');
  certs.keys = [rotated.jwk];
  const user = await verify(await rotated.sign(payload()));

  assert.equal(user.email, 'doctor@example.com');
  assert.equal(fetched.length, 2);
});
