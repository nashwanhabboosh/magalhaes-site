// functions/api/posts/index.js
//
// Cloudflare Pages Function — handles GET /api/posts
// Public list of published blog posts, newest first. Drafts are never
// included.

import { listPublishedPosts } from '../../../server/posts.js';
import { json } from '../../../server/http.js';

export async function onRequestGet(context) {
  try {
    return json({ posts: await listPublishedPosts(context.env.DB) });
  } catch (err) {
    console.error('Error listing blog posts:', err);
    return json({ error: 'Server error' }, 500);
  }
}
