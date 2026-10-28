// functions/api/admin/posts/[id]/index.js
//
// Cloudflare Pages Function — handles /api/admin/posts/<id>
//   GET     one post, with the editor document needed to reopen it
//   PUT     save the title, summary, cover photo and body
//   DELETE  remove the post for good
//
// Saving never changes whether a post is public; see publish.js and
// unpublish.js. Photos that a save or delete leaves unused by every post
// are deleted from R2 (see server/postMedia.js). Sign-in is enforced by
// ../../_middleware.js.

import {
  getPost,
  getPostPhotoFields,
  updatePost,
  deletePost,
  parsePostInput,
  parsePostId
} from '../../../../../server/posts.js';
import {
  deleteUnusedPhotos,
  findMissingPhoto,
  photosRemoved,
  photosUsedBy
} from '../../../../../server/postMedia.js';
import { json, readJsonObject } from '../../../../../server/http.js';

const notFound = () => json({ error: 'Post not found' }, 404);

export async function onRequestGet(context) {
  const id = parsePostId(context.params.id);
  const post = id && (await getPost(context.env.DB, id));
  return post ? json({ post }) : notFound();
}

export async function onRequestPut(context) {
  const { request, env, params } = context;

  const id = parsePostId(params.id);
  if (!id) return notFound();

  const input = await readJsonObject(request);
  if (!input) return json({ error: 'Invalid request body' }, 400);

  const { values, error } = parsePostInput(input);
  if (error) return json({ error }, 400);

  const before = await getPostPhotoFields(env.DB, id);
  if (!before) return notFound();

  const missing = await findMissingPhoto(env.MEDIA, values);
  if (missing) return json({ error: missing }, 400);

  const post = await updatePost(env.DB, id, values);
  if (!post) return notFound();

  await deleteUnusedPhotos(env.DB, env.MEDIA, photosRemoved(before, values));
  return json({ post });
}

export async function onRequestDelete(context) {
  const { env, params } = context;

  const id = parsePostId(params.id);
  const photos = id && (await getPostPhotoFields(env.DB, id));
  if (!photos || !(await deletePost(env.DB, id))) return notFound();

  await deleteUnusedPhotos(env.DB, env.MEDIA, photosUsedBy(photos));
  return json({ success: true });
}
