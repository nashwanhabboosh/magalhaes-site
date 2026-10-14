// PostView.js
//
// The pieces that make up how a blog post looks: the hero with its date,
// reading time, title and summary, and the article underneath. They are
// shared by the public post page (BlogPost.js) and the Preview in the blog
// admin (pages/Admin/PostEditor.js), so a preview shows the real layout
// rather than an imitation of it.
import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from './icons';

// "2026-10-06T17:52:49Z" -> "October 6, 2026"
export const formatPostDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

// Date and reading time, as shown on the post cards and in the post hero.
export const PostMeta = ({ publishedAt, readingMinutes, className = '' }) => (
  <div className={`blog-meta ${className}`}>
    <span className="blog-meta-item">
      <CalendarIcon />
      <time dateTime={publishedAt}>{formatPostDate(publishedAt)}</time>
    </span>
    {readingMinutes > 0 && (
      <span className="blog-meta-item">
        <ClockIcon />
        {readingMinutes} min read
      </span>
    )}
  </div>
);

// `title` is the only required prop: the loading and not-found states of
// the post page show just a heading. `backLink` is off in the admin
// preview, where leaving for the blog would abandon the editor.
export const PostHero = ({ title, publishedAt, readingMinutes, summary, backLink = false }) => (
  <section className="blog-hero blog-hero-post">
    <div className="blog-hero-overlay"></div>
    <div className="blog-hero-content">
      {backLink && (
        <Link to="/blog/" className="blog-hero-back">
          <ArrowLeftIcon /> All posts
        </Link>
      )}
      {publishedAt && (
        <PostMeta
          className="blog-meta-hero"
          publishedAt={publishedAt}
          readingMinutes={readingMinutes}
        />
      )}
      <h1 className="blog-hero-title blog-post-title">{title}</h1>
      {summary && <p className="blog-hero-subtitle blog-post-summary">{summary}</p>}
    </div>
    <div className="hero-wave">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
      </svg>
    </div>
  </section>
);

export const PostArticle = ({ post }) => (
  <article className="blog-article">
    {post.coverImageUrl && (
      <img className="blog-article-cover" src={post.coverImageUrl} alt={post.title} />
    )}
    {/* bodyHtml is built on the server from a fixed list of elements
        (server/renderBody.js), never taken from the browser as HTML. */}
    <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
  </article>
);
