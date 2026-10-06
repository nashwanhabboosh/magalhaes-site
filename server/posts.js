// server/posts.js
//
// Everything that reads or writes the `posts` table (see
// migrations/0001_create_posts.sql). The API functions under
// functions/api/ call these and never run SQL themselves.
//
// `db` is the D1 database bound to the Pages project as `DB`.

import { renderBodyHtml } from './renderBody.js';
import { isMediaKey, mediaUrl } from './media.js';
import { slugify } from './slug.js';

export const MAX_TITLE_LENGTH = 200;
export const MAX_SUMMARY_LENGTH = 300;
const MAX_BODY_JSON_LENGTH = 500000;

// Same format as the table's default timestamps.
const NOW = "strftime('%Y-%m-%dT%H:%M:%SZ', 'now')";

// --- Input ---------------------------------------------------------------

// Validates the editable fields sent by the admin editor. Returns
// { values } ready for the database, or { error } with a message that is
// safe to show to the author.
export function parsePostInput(data) {
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const summary = typeof data.summary === 'string' ? data.summary.trim() : '';
  const coverImage = data.coverImage ?? null;
  const body = data.body ?? null;

  if (title.length > MAX_TITLE_LENGTH) {
    return { error: `The title must be ${MAX_TITLE_LENGTH} characters or fewer.` };
  }
  if (summary.length > MAX_SUMMARY_LENGTH) {
    return { error: `The summary must be ${MAX_SUMMARY_LENGTH} characters or fewer.` };
  }
  if (coverImage !== null && !isMediaKey(coverImage)) {
    return { error: 'The cover photo is not a photo uploaded through this page.' };
  }
  if (body !== null && (typeof body !== 'object' || body.type !== 'doc')) {
    return { error: 'The post text could not be read.' };
  }

  const bodyJson = body ? JSON.stringify(body) : '';
  if (bodyJson.length > MAX_BODY_JSON_LENGTH) {
    return { error: 'The post is too long to save.' };
  }

  return {
    values: { title, summary, coverImage, bodyJson, bodyHtml: renderBodyHtml(body) }
  };
}

// Post ids arrive as URL segments. Returns the id, or null if the segment
// is not a positive whole number.
export const parsePostId = (value) =>
  /^[1-9]\d{0,14}$/.test(String(value)) ? Number(value) : null;

// --- Output shapes -------------------------------------------------------

const coverImageUrl = (row) => (row.cover_image ? mediaUrl(row.cover_image) : null);

const toPublicSummary = (row) => ({
  slug: row.slug,
  title: row.title,
  summary: row.summary,
  coverImageUrl: coverImageUrl(row),
  publishedAt: row.published_at,
  updatedAt: row.updated_at
});

const toPublicPost = (row) => ({
  ...toPublicSummary(row),
  bodyHtml: row.body_html
});

const toAdminSummary = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  status: row.status,
  updatedAt: row.updated_at,
  publishedAt: row.published_at
});

const toAdminPost = (row) => ({
  ...toAdminSummary(row),
  summary: row.summary,
  coverImage: row.cover_image,
  coverImageUrl: coverImageUrl(row),
  body: row.body_json ? JSON.parse(row.body_json) : null,
  bodyHtml: row.body_html,
  authorEmail: row.author_email,
  createdAt: row.created_at
});

// --- Public site ---------------------------------------------------------

export async function listPublishedPosts(db) {
  const { results } = await db
    .prepare(
      `SELECT slug, title, summary, cover_image, published_at, updated_at
         FROM posts
        WHERE status = 'published'
        ORDER BY published_at DESC, id DESC`
    )
    .all();
  return results.map(toPublicSummary);
}

export async function getPublishedPostBySlug(db, slug) {
  const row = await db
    .prepare(`SELECT * FROM posts WHERE slug = ?1 AND status = 'published'`)
    .bind(slug)
    .first();
  return row ? toPublicPost(row) : null;
}

// --- Admin ---------------------------------------------------------------

export async function listAllPosts(db) {
  const { results } = await db
    .prepare(
      `SELECT id, slug, title, status, updated_at, published_at
         FROM posts
        ORDER BY updated_at DESC, id DESC`
    )
    .all();
  return results.map(toAdminSummary);
}

export async function getPost(db, id) {
  const row = await db.prepare(`SELECT * FROM posts WHERE id = ?1`).bind(id).first();
  return row ? toAdminPost(row) : null;
}

export async function createPost(db, values, authorEmail) {
  const row = await db
    .prepare(
      `INSERT INTO posts (title, summary, cover_image, body_json, body_html, author_email)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)
       RETURNING *`
    )
    .bind(
      values.title,
      values.summary,
      values.coverImage,
      values.bodyJson,
      values.bodyHtml,
      authorEmail
    )
    .first();
  return toAdminPost(row);
}

// Returns the updated post, or null if there is no post with that id.
export async function updatePost(db, id, values) {
  const row = await db
    .prepare(
      `UPDATE posts
          SET title = ?1, summary = ?2, cover_image = ?3,
              body_json = ?4, body_html = ?5, updated_at = ${NOW}
        WHERE id = ?6
        RETURNING *`
    )
    .bind(
      values.title,
      values.summary,
      values.coverImage,
      values.bodyJson,
      values.bodyHtml,
      id
    )
    .first();
  return row ? toAdminPost(row) : null;
}

// Picks `base`, or `base-2`, `base-3`... if earlier posts already use it.
// `base` comes from slugify(), so it contains no LIKE wildcards.
const findFreeSlug = async (db, base) => {
  const { results } = await db
    .prepare(`SELECT slug FROM posts WHERE slug = ?1 OR slug LIKE ?2`)
    .bind(base, `${base}-%`)
    .all();
  const taken = new Set(results.map((row) => row.slug));
  if (!taken.has(base)) return base;
  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
};

// Makes a post public. The slug and the published date are set the first
// time only: unpublishing and republishing, or editing the title later,
// never changes a post's address or its date.
//
// Returns { post }, { notFound: true } or { error } (message for the author).
export async function publishPost(db, id) {
  const existing = await db
    .prepare(`SELECT slug, title FROM posts WHERE id = ?1`)
    .bind(id)
    .first();
  if (!existing) return { notFound: true };
  if (!existing.title) return { error: 'Add a title before publishing.' };

  const slug = existing.slug || (await findFreeSlug(db, slugify(existing.title)));
  const row = await db
    .prepare(
      `UPDATE posts
          SET status = 'published', slug = ?1,
              published_at = COALESCE(published_at, ${NOW}), updated_at = ${NOW}
        WHERE id = ?2
        RETURNING *`
    )
    .bind(slug, id)
    .first();
  return { post: toAdminPost(row) };
}

// Returns the post as a private draft again, or null if it does not exist.
export async function unpublishPost(db, id) {
  const row = await db
    .prepare(
      `UPDATE posts SET status = 'draft', updated_at = ${NOW} WHERE id = ?1 RETURNING *`
    )
    .bind(id)
    .first();
  return row ? toAdminPost(row) : null;
}

// Returns true if a post was deleted.
export async function deletePost(db, id) {
  const result = await db.prepare(`DELETE FROM posts WHERE id = ?1`).bind(id).run();
  return result.meta.changes > 0;
}
