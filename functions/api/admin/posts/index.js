// functions/api/admin/posts/index.js
//
// Cloudflare Pages Function — handles /api/admin/posts
//   GET   every post, drafts included, most recently edited first
//   POST  create a new draft
//
// Sign-in is enforced by ../_middleware.js.

import { listAllPosts, createPost, parsePostInput } from '../../../../server/posts.js';
import { json, readJsonObject } from '../../../../server/http.js';

export async function onRequestGet(context) {
  return json({ posts: await listAllPosts(context.env.DB) });
}

export async function onRequestPost(context) {
  const { request, env, data } = context;

  const input = await readJsonObject(request);
  if (!input) return json({ error: 'Invalid request body' }, 400);

  const { values, error } = parsePostInput(input);
  if (error) return json({ error }, 400);

  // The author is whoever is signed in, never a value from the request.
  const post = await createPost(env.DB, values, data.user.email);
  return json({ post }, 201);
}
