// server/__tests__/postMedia.test.js
//
// Run with: npm run test:server
//
// Checks that photos are deleted once no post uses them, and only then.
// The steps mirror what functions/api/admin/posts/ does on save and delete.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPost, deletePost, getPostPhotoFields, parsePostInput, updatePost } from '../posts.js';
import {
  deleteUnusedPhotos,
  findMissingPhoto,
  photosRemoved,
  photosUsedBy
} from '../postMedia.js';
import { mediaUrl } from '../media.js';
import { openTestDb, openTestBucket } from './testDb.js';

const key = (n) => `blog/2026/10/00000000-0000-4000-8000-00000000000${n}.jpg`;
const [COVER, PHOTO_A, PHOTO_B, SHARED] = [1, 2, 3, 4].map(key);

const doc = (...content) => ({ type: 'doc', content });
const image = (photoKey) => ({ type: 'image', attrs: { src: mediaUrl(photoKey), alt: '' } });
const paragraph = (value) => ({ type: 'paragraph', content: [{ type: 'text', text: value }] });

const input = (fields) => {
  const { values, error } = parsePostInput({ title: 'Post', ...fields });
  assert.equal(error, undefined);
  return values;
};

// What PUT /api/admin/posts/<id> does.
const save = async (db, bucket, id, values) => {
  const before = await getPostPhotoFields(db, id);
  const missing = await findMissingPhoto(bucket, values);
  if (missing) return { error: missing };
  await updatePost(db, id, values);
  await deleteUnusedPhotos(db, bucket, photosRemoved(before, values));
  return {};
};

// What DELETE /api/admin/posts/<id> does.
const remove = async (db, bucket, id) => {
  const photos = await getPostPhotoFields(db, id);
  await deletePost(db, id);
  await deleteUnusedPhotos(db, bucket, photosUsedBy(photos));
};

const setup = async () => {
  const db = openTestDb();
  const bucket = openTestBucket([COVER, PHOTO_A, PHOTO_B, SHARED]);
  const post = await createPost(
    db,
    input({ coverImage: COVER, body: doc(image(PHOTO_A), paragraph('Hello'), image(PHOTO_B), image(SHARED)) }),
    'doctor@example.com'
  );
  const other = await createPost(db, input({ coverImage: SHARED }), 'doctor@example.com');
  return { db, bucket, post, other };
};

test('finds the cover photo and every photo the body refers to', () => {
  const values = input({
    coverImage: COVER,
    body: doc(image(PHOTO_A), {
      type: 'paragraph',
      content: [{ type: 'text', text: 'see', marks: [{ type: 'link', attrs: { href: mediaUrl(PHOTO_B) } }] }]
    })
  });
  assert.deepEqual([...photosUsedBy(values)].sort(), [COVER, PHOTO_A, PHOTO_B].sort());
  assert.deepEqual([...photosUsedBy(input({}))], []);
  assert.deepEqual([...photosUsedBy(null)], []);
});

test('deletes a photo taken out of a post and a replaced cover', async () => {
  const { db, bucket, post } = await setup();
  const result = await save(
    db,
    bucket,
    post.id,
    input({ coverImage: PHOTO_B, body: doc(paragraph('Hello'), image(PHOTO_B), image(SHARED)) })
  );
  assert.deepEqual(result, {});
  assert.ok(!bucket.objects.has(COVER), 'old cover deleted');
  assert.ok(!bucket.objects.has(PHOTO_A), 'removed photo deleted');
  assert.ok(bucket.objects.has(PHOTO_B), 'photo still in the post kept');
});

test('keeps a photo that another post still uses', async () => {
  const { db, bucket, post } = await setup();
  await save(db, bucket, post.id, input({ coverImage: COVER, body: doc(paragraph('Hello')) }));
  assert.ok(bucket.objects.has(SHARED), "other post's cover kept");
  assert.ok(!bucket.objects.has(PHOTO_A));
});

test('saving without changing the photos deletes nothing', async () => {
  const { db, bucket, post } = await setup();
  const fields = await getPostPhotoFields(db, post.id);
  await save(db, bucket, post.id, { ...input({}), ...fields });
  assert.equal(bucket.objects.size, 4);
});

test('deleting a post deletes the photos no other post uses', async () => {
  const { db, bucket, post, other } = await setup();
  await remove(db, bucket, post.id);
  assert.deepEqual([...bucket.objects], [SHARED]);

  await remove(db, bucket, other.id);
  assert.equal(bucket.objects.size, 0);
});

test('refuses to save a post that refers to a photo already deleted', async () => {
  const { db, bucket, post } = await setup();
  await save(db, bucket, post.id, input({ coverImage: COVER, body: doc(paragraph('Hello')) }));

  // Undo in the editor brings PHOTO_A back into the post.
  const undone = await save(db, bucket, post.id, input({ coverImage: COVER, body: doc(image(PHOTO_A)) }));
  assert.match(undone.error, /no longer on the website/);
  assert.match(undone.error, /Photo/);

  const oldCover = await save(db, bucket, post.id, input({ coverImage: PHOTO_A }));
  assert.match(oldCover.error, /Change cover photo/);

  // Nothing was saved by the refused attempts.
  assert.equal((await getPostPhotoFields(db, post.id)).bodyJson.includes(PHOTO_A), false);
});

test('a failed photo deletion does not stop the others', async () => {
  const { db, bucket, post } = await setup();
  const failing = {
    ...bucket,
    delete: async (photoKey) => {
      if (photoKey === COVER) throw new Error('R2 unavailable');
      bucket.objects.delete(photoKey);
    }
  };
  const logged = [];
  const originalError = console.error;
  console.error = (...args) => logged.push(args);
  try {
    await remove(db, failing, post.id);
  } finally {
    console.error = originalError;
  }
  assert.deepEqual([...bucket.objects].sort(), [COVER, SHARED].sort());
  assert.equal(logged.length, 1);
});
