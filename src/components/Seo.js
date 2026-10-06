// Seo.js
//
// Keeps the document head in sync with the current route during
// client-side navigation: title, meta description, and canonical link.
//
// On a full page load these values are already correct — Cloudflare
// Pages middleware (functions/_middleware.js) injects them into the
// HTML at the edge from the same src/data/seo.js module. This component
// only matters for in-app <Link> navigation, where the served HTML head
// would otherwise go stale.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getSeoForPath,
  getCanonicalUrl,
  getBlogPostSlug,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION
} from '../data/seo';

// Writes a title, meta description and canonical link into the document
// head. A null canonicalUrl removes the canonical link.
export const applySeo = ({ title, description, canonicalUrl }) => {
  document.title = title;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', description);
  }

  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonicalUrl) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  } else if (canonical) {
    canonical.remove();
  }
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // A blog post's metadata comes from the post itself, which this
    // component does not have. pages/Blog/BlogPost.js sets it once the
    // post has loaded.
    if (getBlogPostSlug(pathname)) return;

    // The blog admin sets its own title (pages/Admin/Admin.js).
    if (pathname.startsWith('/admin')) return;

    const seo = getSeoForPath(pathname);
    applySeo({
      title: seo?.title || DEFAULT_TITLE,
      description: seo?.description || DEFAULT_DESCRIPTION,
      canonicalUrl: seo ? getCanonicalUrl(pathname) : null
    });
  }, [pathname]);

  return null;
};

export default Seo;
