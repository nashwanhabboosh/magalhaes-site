// functions/api/admin/_middleware.js
//
// Cloudflare Pages middleware that runs before every function under
// /api/admin/. Nothing in this folder runs unless the request passes the
// checks here, so a new admin endpoint is protected just by living in it.
//
//   1. Address check. The API only answers on addresses that Cloudflare
//      Access stands in front of (see server/config.js), so signing out
//      or being removed from the Access policy always takes effect.
//   2. Same-site check. Requests that change something must come from a
//      page on this site. Without it, another website could submit a form
//      to /api/admin/... from the browser of someone who is signed in.
//   3. Sign-in check. The request must carry a valid Cloudflare Access
//      token for the application named by the ACCESS_AUD variable (see
//      server/access.js). The signed-in person's email is passed to the
//      function as `context.data.user.email`.
//
// Local development: Cloudflare Access does not run on your own machine.
// When the site is served from localhost AND a `.dev.vars` file sets
// ACCESS_DEV_EMAIL, that email is treated as signed in. Both conditions
// are required, and neither can be true on the live site.

import { verifyAccessToken, isAccessProtectedHost, AccessError } from '../../../server/access.js';
import { json } from '../../../server/http.js';

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1'];
const READ_ONLY_METHODS = ['GET', 'HEAD'];

export async function onRequest(context) {
  const { request, env, data, next } = context;
  const url = new URL(request.url);
  const isLocal = LOCAL_HOSTNAMES.includes(url.hostname);

  if (!isLocal && !isAccessProtectedHost(url.hostname)) {
    return json({ error: 'The blog admin only works at www.lenscraftersdoctor.com/admin/.' }, 403);
  }

  if (
    !READ_ONLY_METHODS.includes(request.method) &&
    request.headers.get('Origin') !== url.origin
  ) {
    return json({ error: 'Request refused' }, 403);
  }

  if (isLocal && env.ACCESS_DEV_EMAIL) {
    data.user = { email: env.ACCESS_DEV_EMAIL };
  } else {
    try {
      data.user = await verifyAccessToken(request.headers.get('Cf-Access-Jwt-Assertion'), {
        audiences: [env.ACCESS_AUD]
      });
    } catch (err) {
      if (err instanceof AccessError) {
        return json({ error: 'Not signed in' }, 401);
      }
      console.error('Error checking sign-in:', err);
      return json({ error: 'Server error' }, 500);
    }
  }

  try {
    return await next();
  } catch (err) {
    console.error('Blog admin API error:', err);
    return json({ error: 'Server error' }, 500);
  }
}
