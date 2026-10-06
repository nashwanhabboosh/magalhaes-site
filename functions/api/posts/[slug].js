// functions/api/posts/[slug].js
//
// Cloudflare Pages Function — handles GET /api/posts/<slug>
// One published blog post, including its body HTML. A draft's slug
// returns 404, the same as a slug that does not exist.

import { getPublishedPostBySlug } from '../../../server/posts.js';
import { json } from '../../../server/http.js';

export async function onRequestGet(context) {
  try {
    const post = await getPublishedPostBySlug(context.env.DB, context.params.slug);
    return post ? json({ post }) : json({ error: 'Post not found' }, 404);
  } catch (err) {
    console.error('Error loading blog post:', err);
    return json({ error: 'Server error' }, 500);
  }
}
