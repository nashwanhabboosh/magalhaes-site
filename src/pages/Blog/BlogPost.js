// BlogPost.js
//
// A single blog post at /blog/<slug>/.
//
// On a direct visit the post is already in the page: the edge middleware
// (functions/_middleware.js) embeds it as JSON, so it renders immediately.
// When the visitor arrives by an in-app link instead, the post is loaded
// from /api/posts/<slug> (functions/api/posts/[slug].js).
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Blog.css';
import { applySeo } from '../../components/Seo';
import { BlogNotice } from './Blog';
import BlogCta from './BlogCta';
import { PostCard } from './PostCard';
import { PostHero, PostArticle } from './PostView';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';
import {
  getPostSeo,
  getCanonicalUrl,
  DEFAULT_DESCRIPTION,
  PRELOADED_POST_ELEMENT_ID
} from '../../data/seo';

const readPreloadedPost = (slug) => {
  try {
    const element = document.getElementById(PRELOADED_POST_ELEMENT_ID);
    const post = element ? JSON.parse(element.textContent) : null;
    return post && post.slug === slug ? post : null;
  } catch (err) {
    return null;
  }
};

const initialState = (slug) => {
  const post = readPreloadedPost(slug);
  return post ? { status: 'ready', post } : { status: 'loading', post: null };
};

// How many other posts to suggest under the article.
const MORE_POSTS_COUNT = 3;

// The newest other posts, under the article. Falls back to a plain link
// to the blog if there are none or they fail to load: the article is
// what matters on this page.
const MorePosts = ({ currentSlug }) => {
  // null while loading
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/posts')
      .then((response) => {
        if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const others = data.posts.filter((other) => other.slug !== currentSlug);
        setPosts(others.slice(0, MORE_POSTS_COUNT));
      })
      .catch((err) => {
        console.error('Error loading more blog posts:', err);
        if (!cancelled) setPosts([]);
      });

    return () => {
      cancelled = true;
    };
  }, [currentSlug]);

  if (posts === null) return null;

  if (posts.length === 0) {
    return (
      <Link to="/blog/" className="blog-back-link">
        <ArrowLeftIcon /> All posts
      </Link>
    );
  }

  return (
    <section className="blog-more" aria-labelledby="blog-more-title">
      <div className="blog-section-head">
        <h2 id="blog-more-title" className="blog-section-title">More From Our Blog</h2>
        <Link to="/blog/" className="blog-section-link">
          View all posts <ArrowRightIcon />
        </Link>
      </div>
      <div className="blog-grid">
        {posts.map((other) => (
          <PostCard key={other.slug} post={other} />
        ))}
      </div>
    </section>
  );
};

// Grey lines in the shape of an article while the post loads.
const ArticleSkeleton = () => (
  <div className="blog-article blog-skeleton-card" aria-hidden="true">
    <div className="blog-body">
      <div className="blog-skeleton blog-skeleton-line"></div>
      <div className="blog-skeleton blog-skeleton-line"></div>
      <div className="blog-skeleton blog-skeleton-line medium"></div>
      <div className="blog-skeleton blog-skeleton-line title medium"></div>
      <div className="blog-skeleton blog-skeleton-line"></div>
      <div className="blog-skeleton blog-skeleton-line"></div>
      <div className="blog-skeleton blog-skeleton-line short"></div>
    </div>
  </div>
);

const BlogPost = () => {
  const { slug } = useParams();
  // status: 'loading' | 'ready' | 'missing' | 'error'
  const [state, setState] = useState(() => initialState(slug));

  useEffect(() => {
    const initial = initialState(slug);
    setState(initial);
    if (initial.status === 'ready') return undefined;

    let cancelled = false;

    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then((response) => {
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setState(data ? { status: 'ready', post: data.post } : { status: 'missing', post: null });
      })
      .catch((err) => {
        console.error('Error loading blog post:', err);
        if (!cancelled) setState({ status: 'error', post: null });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Head metadata, matching what the middleware serves for this post.
  useEffect(() => {
    if (state.status === 'ready') {
      applySeo({
        ...getPostSeo(state.post),
        canonicalUrl: getCanonicalUrl(`/blog/${state.post.slug}`)
      });
    } else if (state.status === 'missing') {
      applySeo({
        title: 'Post not found | Dr. Magalhaes and Associates',
        description: DEFAULT_DESCRIPTION,
        canonicalUrl: null
      });
    }
  }, [state]);

  const { status, post } = state;

  const heroTitle = {
    ready: post?.title,
    loading: 'Loading…',
    missing: 'Post Not Found',
    error: 'Something Went Wrong'
  }[status];

  return (
    <div className="blog-page">
      <PostHero
        title={heroTitle}
        backLink
        publishedAt={status === 'ready' ? post.publishedAt : null}
        readingMinutes={post?.readingMinutes}
        summary={post?.summary}
      />

      <div className="blog-content blog-content-overlap">
        {status === 'ready' && (
          <>
            <PostArticle post={post} />
            <MorePosts currentSlug={post.slug} />
          </>
        )}

        {status === 'loading' && <ArticleSkeleton />}

        {status === 'missing' && (
          <BlogNotice>
            <p>We couldn't find that post. It may have been moved or removed.</p>
            <Link to="/blog/" className="blog-notice-button">
              See all posts <ArrowRightIcon />
            </Link>
          </BlogNotice>
        )}

        {status === 'error' && (
          <BlogNotice>
            <p>We couldn't load this post just now. Please try again in a moment.</p>
            <Link to="/blog/" className="blog-notice-button">
              See all posts <ArrowRightIcon />
            </Link>
          </BlogNotice>
        )}
      </div>

      {status === 'ready' && <BlogCta />}
    </div>
  );
};

export default BlogPost;
