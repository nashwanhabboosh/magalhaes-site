// PostList.js
//
// The first screen of the blog admin: every post, drafts included, most
// recently edited first, with a button to start a new one.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listPosts, SignedOutError } from './api';
import { useAdmin } from './adminContext';
import { formatPostDate } from '../Blog/Blog';

const PostList = () => {
  const { reportSignedOut } = useAdmin();
  // null while loading
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    listPosts()
      .then((loaded) => {
        if (!cancelled) setPosts(loaded);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SignedOutError) reportSignedOut();
        setError(
          err instanceof SignedOutError
            ? 'Sign in again, then reload this page to see your posts.'
            : err.message
        );
      });

    return () => {
      cancelled = true;
    };
  }, [reportSignedOut]);

  let content;
  if (error) {
    content = <p className="admin-notice error" role="alert">{error}</p>;
  } else if (posts === null) {
    content = <p className="admin-empty">Loading your posts…</p>;
  } else if (posts.length === 0) {
    content = (
      <p className="admin-empty">
        You haven't written any posts yet. Click <strong>New post</strong> to start your first one.
      </p>
    );
  } else {
    content = (
      <ul className="admin-post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/admin/posts/${post.id}`} className="admin-post-row">
              <span className="admin-post-row-main">
                <span className="admin-post-row-title">{post.title || 'Untitled draft'}</span>
                <span className="admin-post-row-date">
                  Last edited {formatPostDate(post.updatedAt)}
                </span>
              </span>
              <span className={`admin-status ${post.status}`}>
                {post.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-heading-row">
        <h1 className="admin-heading">Blog posts</h1>
        <Link to="/admin/posts/new" className="admin-btn primary">New post</Link>
      </div>
      {content}
    </div>
  );
};

export default PostList;
