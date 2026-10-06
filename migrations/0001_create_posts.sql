-- migrations/0001_create_posts.sql
--
-- Blog posts written in the /admin editor. One row per post.
--
--   slug         Built from the title the first time a post is published,
--                then never changed, so shared links and search results
--                keep working. NULL until then (SQLite allows any number
--                of NULLs in a UNIQUE column).
--   cover_image  R2 object key of the cover photo, not a full URL.
--   body_json    The editor's document as JSON: the source of truth when
--                a post is reopened for editing.
--   body_html    HTML generated from body_json on the server at save time.
--                This is what the public page and the SEO middleware use.
--   author_email Taken from the Cloudflare Access sign-in, never from the
--                browser.
--
-- Timestamps are ISO 8601 UTC strings.

CREATE TABLE posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT UNIQUE,
  title        TEXT NOT NULL DEFAULT '',
  summary      TEXT NOT NULL DEFAULT '',
  cover_image  TEXT,
  body_json    TEXT NOT NULL DEFAULT '',
  body_html    TEXT NOT NULL DEFAULT '',
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_email TEXT NOT NULL,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  published_at TEXT
);

-- The public blog list: published posts, newest first.
CREATE INDEX idx_posts_status_published_at ON posts (status, published_at DESC);
