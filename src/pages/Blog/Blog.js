// Blog.js
//
// The blog index at /blog/: every published post, newest first, with the
// newest shown large at the top. Posts are written in the admin and loaded
// from /api/posts (functions/api/posts/index.js), so nothing here is
// hand-maintained.
import React, { useState, useEffect } from 'react';
import './Blog.css';
import BlogCta from './BlogCta';
import { FeaturedPost, PostCard, PostCardSkeleton } from './PostCard';
import { BookIcon } from './icons';

// A short message in place of the posts: loading failed, or there are none.
export const BlogNotice = ({ title, children }) => (
  <div className="blog-notice">
    <div className="blog-notice-icon">
      <BookIcon />
    </div>
    {title && <h2 className="blog-notice-title">{title}</h2>}
    <div className="blog-notice-text">{children}</div>
  </div>
);

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
      <BlogNotice title="Our posts didn't load">
        <p>We couldn't load our posts just now. Please try again in a moment.</p>
      </BlogNotice>
    );
  } else if (posts === null) {
    content = (
      <>
        <PostCardSkeleton featured />
        <div className="blog-grid blog-grid-spaced">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </>
    );
  } else if (posts.length === 0) {
    content = (
      <BlogNotice title="Coming soon">
        <p>We haven't published any posts yet. Please check back soon.</p>
      </BlogNotice>
    );
  } else {
    const [latest, ...older] = posts;
    content = (
      <>
        <FeaturedPost post={latest} />
        {older.length > 0 && (
          <section className="blog-more" aria-labelledby="blog-more-title">
            <div className="blog-section-head">
              <h2 id="blog-more-title" className="blog-section-title">More Articles</h2>
            </div>
            <div className="blog-grid">
              {older.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero blog-hero-index">
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <span className="blog-hero-badge">Eye Health Insights</span>
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

      <div className="blog-content blog-content-overlap">{content}</div>

      <BlogCta />
    </div>
  );
};

export default Blog;
