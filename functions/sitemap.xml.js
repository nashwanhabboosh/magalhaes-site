// functions/sitemap.xml.js
//
// Cloudflare Pages Function — handles GET /sitemap.xml
// The XML sitemap for search engines (the page at /sitemap is the
// human-readable one). Lists every route that has SEO metadata in
// src/data/seo.js, plus every published blog post, so a new post is
// discoverable as soon as it is published.

import { seoByPath, getCanonicalUrl } from '../src/data/seo';
import { listPublishedPosts } from '../server/posts.js';
import { escapeHtml } from '../server/html.js';

const urlEntry = (loc, lastmod) =>
  `  <url><loc>${escapeHtml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;

export async function onRequestGet(context) {
  const entries = Object.keys(seoByPath).map((path) => urlEntry(getCanonicalUrl(path)));

  try {
    const posts = await listPublishedPosts(context.env.DB);
    for (const post of posts) {
      // lastmod takes a date; updatedAt is an ISO timestamp.
      entries.push(urlEntry(getCanonicalUrl(`/blog/${post.slug}`), post.updatedAt.slice(0, 10)));
    }
  } catch (err) {
    // Still serve the fixed pages if the database is unavailable.
    console.error('Error listing blog posts for the sitemap:', err);
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${entries.join('\n')}\n` +
    '</urlset>\n';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
