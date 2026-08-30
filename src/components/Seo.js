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
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION
} from '../data/seo';

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);

    document.title = seo?.title || DEFAULT_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', seo?.description || DEFAULT_DESCRIPTION);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (seo) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', getCanonicalUrl(pathname));
    } else if (canonical) {
      canonical.remove();
    }
  }, [pathname]);

  return null;
};

export default Seo;
