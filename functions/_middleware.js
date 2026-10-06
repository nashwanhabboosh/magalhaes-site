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
// Blog post pages (/blog/<slug>) are handled separately, because posts
// live in the D1 database rather than in src/data/seo.js: see
// renderBlogPost() below.
//
// Non-HTML responses (JS/CSS/images, /api/*) pass through untouched.
// The React app keeps the same values in sync during client-side
// navigation via src/components/Seo.js.

import {
  getSeoForPath,
  getCanonicalUrl,
  normalizePath,
  seoByPath,
  getBlogPostSlug,
  getPostSeo,
  CANONICAL_ORIGIN,
  PRELOADED_POST_ELEMENT_ID
} from '../src/data/seo';
import { getSchemaForPath, getPostSchema } from '../src/data/schema';
import { getPublishedPostBySlug } from '../server/posts.js';
import { escapeHtml } from '../server/html.js';

const CANONICAL_HOST = 'www.lenscraftersdoctor.com';
const REDIRECT_HOSTS = ['lenscraftersdoctor.com'];

// JSON for embedding in a <script> element. <-escaped so a "</script>"
// inside any string value can't terminate the script block early.
const jsonForScript = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

// Copy of the page shell that browsers will not reuse. The shell's own
// ETag only changes when the site is redeployed, so leaving it on a blog
// page would let a browser keep showing a post after it was edited or
// unpublished.
const withoutCaching = (response, status) => {
  const headers = new Headers(response.headers);
  headers.delete('ETag');
  headers.delete('Last-Modified');
  headers.set('Cache-Control', 'no-store');
  return new Response(response.body, { status, headers });
};

// Blog post page: looks the post up by its slug and writes it into the
// page shell, so crawlers and link previews get the whole article without
// running JavaScript:
//
//   - <title>, meta description, canonical link and Open Graph tags
//   - BlogPosting structured data
//   - the article itself inside #root (React replaces it on load)
//   - the post as JSON, which pages/Blog/BlogPost.js reads so it can
//     render immediately instead of requesting the post again
//
// A slug with no published post gets the same shell with a 404 status.
const renderBlogPost = async (context, response, path, slug) => {
  let post;
  try {
    post = await getPublishedPostBySlug(context.env.DB, slug);
  } catch (err) {
    // Database unavailable: serve the plain shell and let the app try.
    console.error('Error loading blog post for the page head:', err);
    return response;
  }

  if (!post) {
    return new HTMLRewriter()
      .on('head', {
        element(element) {
          element.append('<meta name="robots" content="noindex" />', { html: true });
        }
      })
      .transform(withoutCaching(response, 404));
  }

  const seo = getPostSeo(post);
  const canonicalUrl = getCanonicalUrl(path);

  const headExtras = [
    `<link rel="canonical" href="${canonicalUrl}" />`,
    '<meta property="og:type" content="article" />',
    `<meta property="og:title" content="${escapeHtml(post.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    post.coverImageUrl
      ? `<meta property="og:image" content="${CANONICAL_ORIGIN}${post.coverImageUrl}" />`
      : '',
    `<script type="application/ld+json">${jsonForScript(getPostSchema(post))}</script>`,
    `<script type="application/json" id="${PRELOADED_POST_ELEMENT_ID}">${jsonForScript(post)}</script>`
  ].join('');

  // post.bodyHtml was built on the server from a fixed list of elements
  // (server/renderBody.js), so it is safe to insert as HTML.
  const article =
    `<article class="blog-prerender"><h1>${escapeHtml(post.title)}</h1>${post.bodyHtml}</article>`;

  return new HTMLRewriter()
    .on('title', {
      element(element) {
        element.setInnerContent(seo.title);
      }
    })
    .on('meta[name="description"]', {
      element(element) {
        // setAttribute escapes quotes but not "&". The summary is typed by
        // an author, so without this a literal "&copy;" would become ©.
        element.setAttribute('content', seo.description.replace(/&/g, '&amp;'));
      }
    })
    .on('head', {
      element(element) {
        element.append(headExtras, { html: true });
      }
    })
    .on('div#root', {
      element(element) {
        element.setInnerContent(article, { html: true });
      }
    })
    .transform(withoutCaching(response, 200));
};

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

  const postSlug = getBlogPostSlug(path);
  if (postSlug) return renderBlogPost(context, response, path, postSlug);

  const seo = getSeoForPath(path);
  const isKnownRoute = path === '/' || Boolean(seoByPath[path]);

  // Build the tags to append inside <head>.
  let headExtras = '';
  if (isKnownRoute) {
    headExtras += `<link rel="canonical" href="${getCanonicalUrl(path)}" />`;
  }
  const schema = getSchemaForPath(path);
  if (schema) {
    headExtras += `<script type="application/ld+json">${jsonForScript(schema)}</script>`;
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
