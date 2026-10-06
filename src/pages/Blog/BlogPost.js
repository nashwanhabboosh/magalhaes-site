// BlogPost.js
//
// A single blog post at /blog/<slug>/.
//
// On a direct visit the post is already in the page: the edge middleware
// (functions/_middleware.js) embeds it as JSON, so it renders immediately.
// When the visitor arrives by an in-app link instead, the post is loaded
// from /api/posts/<slug> (functions/api/posts/[slug].js).
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Blog.css';
import AppointmentButton from '../../components/AppointmentButton';
import { applySeo } from '../../components/Seo';
import { formatPostDate } from './Blog';
import { PostHero, PostArticle } from './PostView';
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

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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
        dateLabel={status === 'ready' ? formatPostDate(post.publishedAt) : null}
      />

      <div className="blog-content">
        {status === 'ready' && <PostArticle post={post} />}

        {status === 'missing' && (
          <p className="blog-message">
            We couldn't find that post. It may have been moved or removed.
          </p>
        )}

        {status === 'error' && (
          <p className="blog-message">
            We couldn't load this post just now. Please try again in a moment.
          </p>
        )}

        {status !== 'loading' && (
          <Link to="/blog/" className="blog-back-link">
            <span className="blog-back-arrow">←</span> All posts
          </Link>
        )}
      </div>

      {/* CTA Section */}
      {status === 'ready' && (
        <section className="blog-cta-section">
          <div className="blog-cta-content">
            <h2 className="blog-cta-title">Questions About Your Eyes?</h2>
            <p className="blog-cta-text">
              Our doctors are happy to help. Schedule a visit at either of
              our locations, or get in touch with our team.
            </p>
            <div className="blog-cta-buttons">
              <AppointmentButton className="blog-cta-btn primary" label="Schedule Appointment" />
              <button className="blog-cta-btn secondary" onClick={() => navigate('/contact/')}>
                Contact Us
              </button>
            </div>
          </div>
          <div className="cta-waves">
            <div className="wave-bg wave-bg-1"></div>
            <div className="wave-bg wave-bg-2"></div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
