// server/__tests__/posts.test.js
//
// Run with: npm run test:server
//
// Runs the post queries against an in-memory SQLite database with D1's
// limits, and checks the address each post gets when it is published.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { createPost, parsePostInput, publishPost } from '../posts.js';

// D1 refuses LIKE patterns longer than this many bytes.
const D1_LIKE_PATTERN_LIMIT = 50;

const SCHEMA = readFileSync(
  new URL('../../migrations/0001_create_posts.sql', import.meta.url),
  'utf8'
);

// A stand-in for the D1 binding: the same prepare/bind/first/all calls,
// backed by Node's built-in SQLite.
const openTestDb = () => {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.limits.likePatternLength = D1_LIKE_PATTERN_LIMIT;
  sqlite.exec(SCHEMA);
  return {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      let params = [];
      const bound = {
        bind: (...values) => {
          params = values;
          return bound;
        },
        first: async () => statement.get(...params) ?? null,
        all: async () => ({ results: statement.all(...params) }),
        run: async () => statement.run(...params)
      };
      return bound;
    }
  };
};

// Creates a draft with this title, publishes it and returns its slug.
const publishNew = async (db, title) => {
  const { values } = parsePostInput({ title });
  const draft = await createPost(db, values, 'doctor@example.com');
  const { post } = await publishPost(db, draft.id);
  return post.slug;
};

test('publishes posts whose titles make long slugs', async () => {
  const db = openTestDb();
  assert.equal(
    await publishNew(db, 'Screens and Your Eyes: How the 20-20-20 Rule Helps'),
    'screens-and-your-eyes-how-the-20-20-20-rule-helps'
  );
  const longest = await publishNew(db, 'word '.repeat(40));
  assert.ok(longest.length > 75 && longest.length <= 80);
});

test('numbers later posts that would get the same slug', async () => {
  const db = openTestDb();
  const title = 'What to Expect at Your First Comprehensive Eye Exam With Us';
  const first = await publishNew(db, title);
  assert.equal(await publishNew(db, title), `${first}-2`);
  assert.equal(await publishNew(db, title), `${first}-3`);
});

test('is not confused by slugs that only start the same way', async () => {
  const db = openTestDb();
  await publishNew(db, 'Eye Exams for Kids');
  assert.equal(await publishNew(db, 'Eye Exams'), 'eye-exams');
  assert.equal(await publishNew(db, 'Eye Exams'), 'eye-exams-2');
});
