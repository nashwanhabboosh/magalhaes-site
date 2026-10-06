// Blog.js
//
// The blog index at /blog/: every published post, newest first. Posts are
// written in the admin and loaded from /api/posts
// (functions/api/posts/index.js), so nothing here is hand-maintained.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// "2026-10-06T17:52:49Z" -> "October 6, 2026"
export const formatPostDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

const Blog = () => {
  // null while loading
  const [posts, setPosts] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/posts')
      .then((response) => {
        if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setPosts(data.posts);
      })
      .catch((err) => {
        console.error('Error loading blog posts:', err);
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  let content;
  if (failed) {
    content = (
      <p className="blog-message">
        We couldn't load our posts just now. Please try again in a moment.
      </p>
    );
  } else if (posts === null) {
    content = <p className="blog-message">Loading posts…</p>;
  } else if (posts.length === 0) {
    content = (
      <p className="blog-message">
        We haven't published any posts yet. Please check back soon.
      </p>
    );
  } else {
    content = (
      <div className="blog-grid">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}/`} className="blog-card">
            {post.coverImageUrl && (
              // Decorative here: the title right below says what the post is.
              <img className="blog-card-image" src={post.coverImageUrl} alt="" loading="lazy" />
            )}
            <div className="blog-card-body">
              <span className="blog-card-date">{formatPostDate(post.publishedAt)}</span>
              <h2 className="blog-card-title">{post.title}</h2>
              {post.summary && <p className="blog-card-summary">{post.summary}</p>}
              <span className="blog-card-more">
                Read more <span className="blog-card-arrow">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">
            Our <span className="highlight">Blog</span>
          </h1>
          <p className="blog-hero-subtitle">
            Eye health advice, answers to common questions, and news from
            our doctors
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      <div className="blog-content">{content}</div>
    </div>
  );
};

export default Blog;
