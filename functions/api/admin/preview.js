// functions/api/admin/preview.js
//
// Cloudflare Pages Function — handles POST /api/admin/preview
// Returns the post being edited exactly as the public page would show it,
// without saving anything. The editor's Preview button uses this, so
// previewing changes to a post that is already live never alters it.
//
// Sign-in is enforced by ./_middleware.js.

import { parsePostInput } from '../../../server/posts.js';
import { mediaUrl } from '../../../server/media.js';
import { json, readJsonObject } from '../../../server/http.js';

export async function onRequestPost(context) {
  const input = await readJsonObject(context.request);
  if (!input) return json({ error: 'Invalid request body' }, 400);

  const { values, error } = parsePostInput(input);
  if (error) return json({ error }, 400);

  return json({
    preview: {
      title: values.title,
      summary: values.summary,
      coverImageUrl: values.coverImage ? mediaUrl(values.coverImage) : null,
      bodyHtml: values.bodyHtml
    }
  });
}
