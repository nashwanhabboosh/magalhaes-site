// functions/media/[[path]].js
//
// Cloudflare Pages Function — handles GET /media/<key>
// Serves blog photos from the R2 bucket bound as `MEDIA`. Only keys in the
// shape the upload function creates (blog/<year>/<month>/<uuid>.<ext>) are
// served, so nothing else in the bucket is reachable through this route.
//
// Browsers may keep each photo for a day. A key is never reused for a
// different file, so longer would be safe, but a photo deleted from a
// post (see server/postMedia.js) should stop showing soon after.
// Cloudflare's cache in front of www also keeps it for up to that day.

import { isMediaKey } from '../../server/media.js';

const notFound = () => new Response('Not found', { status: 404 });

export async function onRequestGet(context) {
  const { params, env } = context;

  const key = [].concat(params.path || []).join('/');
  if (!isMediaKey(key)) return notFound();

  const object = await env.MEDIA.get(key);
  if (!object) return notFound();

  return new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      // Browsers must take the type above at its word, never guess another.
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=86400',
      'ETag': object.httpEtag
    }
  });
}
