// functions/api/admin/posts/[id]/unpublish.js
//
// Cloudflare Pages Function — handles POST /api/admin/posts/<id>/unpublish
// Takes a post off the public site and returns it to a private draft. It
// keeps its address and published date, so publishing it again restores
// it exactly as it was.
//
// Sign-in is enforced by ../../_middleware.js.

import { unpublishPost, parsePostId } from '../../../../../server/posts.js';
import { json } from '../../../../../server/http.js';

export async function onRequestPost(context) {
  const id = parsePostId(context.params.id);
  const post = id && (await unpublishPost(context.env.DB, id));
  return post ? json({ post }) : json({ error: 'Post not found' }, 404);
}
