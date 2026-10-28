// server/__tests__/testDb.js
//
// Test helpers: an in-memory database with D1's limits, and an in-memory
// R2 bucket. Not a test file itself.

import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

// D1 refuses LIKE patterns longer than this many bytes.
const D1_LIKE_PATTERN_LIMIT = 50;

const SCHEMA = readFileSync(
  new URL('../../migrations/0001_create_posts.sql', import.meta.url),
  'utf8'
);

// A stand-in for the D1 binding: the same prepare/bind/first/all calls,
// backed by Node's built-in SQLite.
export const openTestDb = () => {
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
        run: async () => {
          const { changes } = statement.run(...params);
          return { meta: { changes } };
        }
      };
      return bound;
    }
  };
};

// A stand-in for the R2 binding: head/put/delete over a set of keys.
export const openTestBucket = (keys = []) => {
  const objects = new Set(keys);
  return {
    objects,
    head: async (key) => (objects.has(key) ? { key } : null),
    put: async (key) => {
      objects.add(key);
    },
    delete: async (key) => {
      objects.delete(key);
    }
  };
};
