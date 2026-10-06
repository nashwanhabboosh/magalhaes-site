// functions/api/admin/images.js
//
// Cloudflare Pages Function — handles POST /api/admin/images
// Stores one uploaded photo in R2 and returns where it can be loaded from.
// The request body is the image file itself, with its type in the
// Content-Type header (JPEG, PNG or WebP).
//
// Requires the R2 bucket bound to the Pages project as `MEDIA`.
// Sign-in is enforced by ./_middleware.js.

import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  matchesImageSignature,
  newMediaKey,
  mediaUrl
} from '../../../server/media.js';
import { json } from '../../../server/http.js';

const tooLarge = () => json({ error: 'That photo is too large.' }, 413);

export async function onRequestPost(context) {
  const { request, env } = context;

  const contentType = request.headers.get('Content-Type') || '';
  if (!IMAGE_TYPES[contentType]) {
    return json({ error: 'Photos must be JPG, PNG or WebP files.' }, 415);
  }

  // Refuse an oversized upload before reading it where the size is
  // declared, then check what actually arrived.
  if (Number(request.headers.get('Content-Length')) > MAX_IMAGE_BYTES) return tooLarge();
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.length > MAX_IMAGE_BYTES) return tooLarge();

  if (!matchesImageSignature(contentType, bytes)) {
    return json({ error: 'That file is not a valid photo.' }, 400);
  }

  const key = newMediaKey(contentType);
  await env.MEDIA.put(key, bytes, { httpMetadata: { contentType } });

  // `key` is what a post stores as its cover photo; `url` is what an
  // <img> loads, and what the editor inserts into the post body.
  return json({ key, url: mediaUrl(key) }, 201);
}
