// PostCard.js
//
// Links to posts, as listed on the blog index (Blog.js) and under
// "More from our blog" on a post page (BlogPost.js). `post` is one entry
// from /api/posts.
import React from 'react';
import { Link } from 'react-router-dom';
import { PostMeta } from './PostView';
import { ArrowRightIcon } from './icons';

const postPath = (post) => `/blog/${post.slug}/`;

// The cover photo, or the practice logo on a navy panel for a post that
// doesn't have one, so every card keeps the same shape. Decorative: the
// title next to it says what the post is.
const CardCover = ({ src }) =>
  src ? (
    <img className="blog-cover" src={src} alt="" loading="lazy" />
  ) : (
    <div className="blog-cover blog-cover-placeholder">
      <img src="/logo_transparent.png" alt="" />
    </div>
  );

export const PostCard = ({ post }) => (
  <Link to={postPath(post)} className="blog-card">
    <div className="blog-card-media">
      <CardCover src={post.coverImageUrl} />
    </div>
    <div className="blog-card-body">
      <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
      <h3 className="blog-card-title">{post.title}</h3>
      {post.summary && <p className="blog-card-summary">{post.summary}</p>}
      <span className="blog-card-more">
        Read article <ArrowRightIcon />
      </span>
    </div>
  </Link>
);

// The newest post, shown large at the top of the blog index.
export const FeaturedPost = ({ post }) => (
  <Link to={postPath(post)} className="blog-featured">
    <div className="blog-featured-media">
      <CardCover src={post.coverImageUrl} />
      <span className="blog-featured-label">Latest post</span>
    </div>
    <div className="blog-featured-body">
      <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
      <h2 className="blog-featured-title">{post.title}</h2>
      {post.summary && <p className="blog-featured-summary">{post.summary}</p>}
      <span className="blog-featured-button">
        Read the article <ArrowRightIcon />
      </span>
    </div>
  </Link>
);

// Grey placeholders in the shape of the cards while posts load.
export const PostCardSkeleton = ({ featured = false }) => {
  const block = featured ? 'blog-featured' : 'blog-card';
  return (
    <div className={`${block} blog-skeleton-card`} aria-hidden="true">
      <div className={`${block}-media`}>
        <div className="blog-cover blog-skeleton"></div>
      </div>
      <div className={`${block}-body`}>
        <div className="blog-skeleton blog-skeleton-line short"></div>
        <div className="blog-skeleton blog-skeleton-line title"></div>
        <div className="blog-skeleton blog-skeleton-line title medium"></div>
        <div className="blog-skeleton blog-skeleton-line"></div>
        <div className="blog-skeleton blog-skeleton-line"></div>
        <div className="blog-skeleton blog-skeleton-line medium"></div>
      </div>
    </div>
  );
};
