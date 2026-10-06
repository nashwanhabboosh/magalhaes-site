// functions/api/admin/posts/[id]/publish.js
//
// Cloudflare Pages Function — handles POST /api/admin/posts/<id>/publish
// Makes a post public. The first time, this also fixes the post's address
// (/blog/<slug>, built from its title) and its published date.
//
// Sign-in is enforced by ../../_middleware.js.

import { publishPost, parsePostId } from '../../../../../server/posts.js';
import { json } from '../../../../../server/http.js';

export async function onRequestPost(context) {
  const id = parsePostId(context.params.id);
  if (!id) return json({ error: 'Post not found' }, 404);

  const { post, notFound, error } = await publishPost(context.env.DB, id);
  if (notFound) return json({ error: 'Post not found' }, 404);
  if (error) return json({ error }, 400);
  return json({ post });
}
