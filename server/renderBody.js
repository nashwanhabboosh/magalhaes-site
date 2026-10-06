// server/renderBody.js
//
// Converts a post body from the editor's JSON document into the HTML shown
// on the public site.
//
// The browser never sends HTML to be stored. It sends the editor's
// structured document, and this module builds the HTML from a fixed list
// of elements, escaping all text. Anything not on the list cannot appear
// on the public page, whatever the request contained.

import { isMediaUrl } from './media.js';
import { escapeHtml } from './html.js';

// Deeper nesting than any real post; stops a crafted document from
// recursing without limit.
const MAX_DEPTH = 30;

// The post title is the page's <h1>, so body headings start at <h2>.
const MIN_HEADING_LEVEL = 2;
const MAX_HEADING_LEVEL = 4;

const MARK_TAGS = {
  bold: 'strong',
  italic: 'em',
  underline: 'u',
  strike: 's',
  code: 'code'
};

// Web, email and phone links, plus links to pages on this site. Rules out
// javascript: and every other scheme.
const isSafeHref = (href) =>
  typeof href === 'string' &&
  (/^(https?:\/\/|mailto:|tel:)/i.test(href) || /^\/(?![/\\])/.test(href));

const renderText = (node) => {
  let html = escapeHtml(node.text || '');
  for (const mark of Array.isArray(node.marks) ? node.marks : []) {
    const tag = mark && MARK_TAGS[mark.type];
    if (tag) {
      html = `<${tag}>${html}</${tag}>`;
    } else if (mark && mark.type === 'link' && isSafeHref(mark.attrs?.href)) {
      const href = escapeHtml(mark.attrs.href);
      html = /^https?:/i.test(mark.attrs.href)
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${html}</a>`
        : `<a href="${href}">${html}</a>`;
    }
  }
  return html;
};

const renderChildren = (node, depth) =>
  (Array.isArray(node.content) ? node.content : [])
    .map((child) => renderNode(child, depth + 1))
    .join('');

const renderNode = (node, depth) => {
  if (!node || typeof node !== 'object' || depth > MAX_DEPTH) return '';

  switch (node.type) {
    case 'text':
      return renderText(node);
    case 'paragraph':
      return `<p>${renderChildren(node, depth)}</p>`;
    case 'heading': {
      const level = Math.min(
        Math.max(Number(node.attrs?.level) || MIN_HEADING_LEVEL, MIN_HEADING_LEVEL),
        MAX_HEADING_LEVEL
      );
      return `<h${level}>${renderChildren(node, depth)}</h${level}>`;
    }
    case 'bulletList':
      return `<ul>${renderChildren(node, depth)}</ul>`;
    case 'orderedList': {
      const start = node.attrs?.start;
      const startAttr = Number.isInteger(start) && start > 1 ? ` start="${start}"` : '';
      return `<ol${startAttr}>${renderChildren(node, depth)}</ol>`;
    }
    case 'listItem':
      return `<li>${renderChildren(node, depth)}</li>`;
    case 'blockquote':
      return `<blockquote>${renderChildren(node, depth)}</blockquote>`;
    case 'horizontalRule':
      return '<hr>';
    case 'hardBreak':
      return '<br>';
    case 'image': {
      // Only images uploaded through the admin, never an outside address.
      if (!isMediaUrl(node.attrs?.src)) return '';
      const alt = escapeHtml(node.attrs.alt || '');
      return `<img src="${escapeHtml(node.attrs.src)}" alt="${alt}" loading="lazy">`;
    }
    default:
      // Unknown element: keep any text inside it, drop the element itself.
      return renderChildren(node, depth);
  }
};

export const renderBodyHtml = (doc) =>
  doc && typeof doc === 'object' && doc.type === 'doc' ? renderChildren(doc, 0) : '';
