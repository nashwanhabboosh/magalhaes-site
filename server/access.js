// server/access.js
//
// Verifies the sign-in token that Cloudflare Access attaches to every
// request it lets through to the blog admin (the `Cf-Access-Jwt-Assertion`
// header).
//
// The Access rule on www.lenscraftersdoctor.com is not enough on its own:
// the same site is also reachable at its *.pages.dev addresses and at the
// bare domain, none of which pass through that rule. Checking the token
// here is what actually keeps the admin API closed, whichever address a
// request arrives on.

import { ACCESS_TEAM_DOMAIN, ACCESS_AUDS } from './config.js';

// How long Cloudflare's public signing keys are reused before being
// fetched again.
const CERTS_TTL_MS = 60 * 60 * 1000;

// Tolerance for small clock differences when checking "not before".
const CLOCK_SKEW_SECONDS = 60;

// teamDomain -> { keys, fetchedAt }
const certsCache = new Map();

// Thrown for any token that should not be trusted.
export class AccessError extends Error {}

const base64UrlToBytes = (value) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const decodeJsonPart = (part) =>
  JSON.parse(new TextDecoder().decode(base64UrlToBytes(part)));

const getSigningKeys = async (teamDomain, fetchImpl, now, forceRefresh) => {
  const cached = certsCache.get(teamDomain);
  if (cached && !forceRefresh && now - cached.fetchedAt < CERTS_TTL_MS) {
    return cached.keys;
  }
  const response = await fetchImpl(`${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) {
    throw new Error(`Could not load Access signing keys (${response.status})`);
  }
  const { keys } = await response.json();
  certsCache.set(teamDomain, { keys: keys || [], fetchedAt: now });
  return keys || [];
};

// Returns { email } for a valid token. Throws AccessError otherwise.
//
// The options exist so tests can supply their own keys and clock; callers
// in the app pass only the token.
export async function verifyAccessToken(token, options = {}) {
  const {
    teamDomain = ACCESS_TEAM_DOMAIN,
    audiences = ACCESS_AUDS,
    fetchImpl = fetch,
    now = Date.now()
  } = options;

  if (!token) throw new AccessError('Missing token');

  const parts = token.split('.');
  if (parts.length !== 3) throw new AccessError('Malformed token');

  let header;
  let payload;
  let signature;
  try {
    header = decodeJsonPart(parts[0]);
    payload = decodeJsonPart(parts[1]);
    signature = base64UrlToBytes(parts[2]);
  } catch (err) {
    throw new AccessError('Malformed token');
  }

  // Only the algorithm Access signs with. In particular this refuses
  // "none" and any HMAC algorithm.
  if (header.alg !== 'RS256' || !header.kid) {
    throw new AccessError('Unsupported token');
  }

  // Access rotates its keys, so an unknown key id gets one fresh fetch
  // before the token is refused.
  let jwk = (await getSigningKeys(teamDomain, fetchImpl, now, false))
    .find((key) => key.kid === header.kid);
  if (!jwk) {
    jwk = (await getSigningKeys(teamDomain, fetchImpl, now, true))
      .find((key) => key.kid === header.kid);
  }
  if (!jwk) throw new AccessError('Unknown signing key');

  const key = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const signedData = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, signedData);
  if (!valid) throw new AccessError('Bad signature');

  const nowSeconds = Math.floor(now / 1000);
  if (typeof payload.exp !== 'number' || payload.exp <= nowSeconds) {
    throw new AccessError('Token expired');
  }
  if (typeof payload.nbf === 'number' && payload.nbf > nowSeconds + CLOCK_SKEW_SECONDS) {
    throw new AccessError('Token not yet valid');
  }
  if (payload.iss !== teamDomain) throw new AccessError('Wrong issuer');

  const tokenAudiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!tokenAudiences.some((aud) => audiences.includes(aud))) {
    throw new AccessError('Wrong audience');
  }

  // Tokens for people always carry an email. Service tokens do not, and
  // have no business in the blog admin.
  if (typeof payload.email !== 'string' || !payload.email) {
    throw new AccessError('Token has no email');
  }

  return { email: payload.email.toLowerCase() };
}
