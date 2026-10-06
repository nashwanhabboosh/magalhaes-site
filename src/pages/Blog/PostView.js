// PostView.js
//
// The two pieces that make up how a blog post looks: the hero with its
// date and title, and the article underneath. They are shared by the
// public post page (BlogPost.js) and the Preview in the blog admin
// (pages/Admin/PostEditor.js), so a preview shows the real layout rather
// than an imitation of it.
import React from 'react';
import './Blog.css';

export const PostHero = ({ title, dateLabel }) => (
  <section className="blog-hero blog-hero-post">
    <div className="blog-hero-overlay"></div>
    <div className="blog-hero-content">
      {dateLabel && <span className="blog-hero-date">{dateLabel}</span>}
      <h1 className="blog-hero-title blog-post-title">{title}</h1>
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
