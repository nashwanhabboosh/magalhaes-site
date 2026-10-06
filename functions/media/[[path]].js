// functions/media/[[path]].js
//
// Cloudflare Pages Function — handles GET /media/<key>
// Serves blog photos from the R2 bucket bound as `MEDIA`. Only keys in the
// shape the upload function creates (blog/<year>/<month>/<uuid>.<ext>) are
// served, so nothing else in the bucket is reachable through this route.
//
// A key is never reused for a different file, so browsers are told they
// can keep each photo for a year.

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
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': object.httpEtag
    }
  });
}
