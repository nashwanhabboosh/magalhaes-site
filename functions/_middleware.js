// functions/_middleware.js
//
// Cloudflare Pages middleware that runs on every request. For HTML
// responses (the SPA shell), it rewrites the head at the edge so that
// crawlers receive the correct per-page metadata in the initial HTML,
// without executing JavaScript:
//
//   - <title> and <meta name="description">  (from src/data/seo.js)
//   - <link rel="canonical">                 (known routes only)
//   - JSON-LD structured data                (from src/data/schema.js,
//     on the four pages specified in the SEO schema handoff)
//
// It also 301-redirects the bare hostname to the canonical
// www.lenscraftersdoctor.com so only one host is indexed.
//
// Non-HTML responses (JS/CSS/images, /api/*) pass through untouched.
// The React app keeps the same values in sync during client-side
// navigation via src/components/Seo.js.

import {
  getSeoForPath,
  getCanonicalUrl,
  normalizePath,
  seoByPath
} from '../src/data/seo';
import { getSchemaForPath } from '../src/data/schema';

const CANONICAL_HOST = 'www.lenscraftersdoctor.com';
const REDIRECT_HOSTS = ['lenscraftersdoctor.com'];

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Canonical-host redirect (safe methods only, so API POSTs are never
  // converted to GETs by a redirect).
  if (
    REDIRECT_HOSTS.includes(url.hostname) &&
    (context.request.method === 'GET' || context.request.method === 'HEAD')
  ) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  const path = normalizePath(url.pathname === '/index.html' ? '/' : url.pathname);
  const seo = getSeoForPath(path);
  const isKnownRoute = path === '/' || Boolean(seoByPath[path]);

  // Build the tags to append inside <head>.
  let headExtras = '';
  if (isKnownRoute) {
    headExtras += `<link rel="canonical" href="${getCanonicalUrl(path)}" />`;
  }
  const schema = getSchemaForPath(path);
  if (schema) {
    // <-escape so a "</script>" inside any string value can't
    // terminate the script block early.
    const json = JSON.stringify(schema).replace(/</g, '\\u003c');
    headExtras += `<script type="application/ld+json">${json}</script>`;
  }

  const rewriter = new HTMLRewriter().on('head', {
    element(element) {
      if (headExtras) element.append(headExtras, { html: true });
    }
  });

  if (seo) {
    rewriter
      .on('title', {
        element(element) {
          element.setInnerContent(seo.title);
        }
      })
      .on('meta[name="description"]', {
        element(element) {
          element.setAttribute('content', seo.description);
        }
      });
  }

  return rewriter.transform(response);
}
