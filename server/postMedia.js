// server/postMedia.js
//
// Keeps the photos in R2 in step with the posts. A photo is deleted once
// no saved post uses it any more, so taking a photo out of a post,
// replacing or removing the cover photo, or deleting the post takes that
// photo off the website.
//
// A photo that was uploaded but never saved in a post is left alone: it
// was never on a public page, its address can't be guessed, and it may
// belong to a post that is still being written.
//
// `db` is the D1 database bound as DB and `bucket` the R2 bucket bound as
// MEDIA. A `post` here is anything with a post's photo fields,
// { coverImage, bodyJson }: the values from parsePostInput() or the
// result of getPostPhotoFields().

import { mediaKeysInText } from './media.js';
import { isPhotoInUse } from './posts.js';

// Button names as they appear in the editor (pages/Admin/PostEditor.js).
const MISSING_COVER =
  'The cover photo is no longer on the website. Click Change cover photo to choose one again, or Remove, then save.';
const MISSING_BODY_PHOTO =
  'A photo in this post is no longer on the website, so it shows as a broken image. Delete it from the post, use Photo to add it again if you still want it, then save.';

// Keys of every photo the post uses: its cover and any photo its body
// refers to.
export const photosUsedBy = (post) => {
  const keys = mediaKeysInText(post?.bodyJson);
  if (post?.coverImage) keys.add(post.coverImage);
  return keys;
};

// Keys of the photos `before` used that `after` no longer does.
export const photosRemoved = (before, after) => {
  const kept = photosUsedBy(after);
  return [...photosUsedBy(before)].filter((key) => !kept.has(key));
};

// A post can still refer to a photo that has already been deleted: the
// author clicks Undo after saving a post with a photo taken out, or saves
// an older copy of the post from another tab. Saving that would publish a
// broken image, so it returns a message for the author instead, or null
// if every photo is there.
export async function findMissingPhoto(bucket, post) {
  if (post.coverImage && !(await bucket.head(post.coverImage))) return MISSING_COVER;
  for (const key of mediaKeysInText(post.bodyJson)) {
    if (!(await bucket.head(key))) return MISSING_BODY_PHOTO;
  }
  return null;
}

// Deletes each of `keys` that no post uses any more. Call it after the
// post has been saved or deleted. A failure here is logged, not reported:
// the author's change has gone through, and the photo is only left behind.
export async function deleteUnusedPhotos(db, bucket, keys) {
  for (const key of keys) {
    try {
      if (!(await isPhotoInUse(db, key))) await bucket.delete(key);
    } catch (err) {
      console.error(`Could not delete unused photo ${key}:`, err);
    }
  }
}
