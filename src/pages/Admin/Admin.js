// Admin.js
//
// The blog admin at /admin/, where Dr. Magalhães or someone posting for
// him writes and publishes blog posts. It has its own layout: the site
// header and footer are hidden on these pages (see SiteChrome in App.js).
//
// Who may open it is decided before this code ever runs: Cloudflare Access
// asks for a sign-in on /admin and /api/admin, and the API checks that
// sign-in again on every request (functions/api/admin/_middleware.js).
// Nothing here is a security boundary.
//
// This file and everything it imports is loaded on demand (React.lazy in
// App.js), so the editor is never downloaded by ordinary visitors.
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Admin.css';
import { AdminContext } from './adminContext';
import PostList from './PostList';
import PostEditor from './PostEditor';

const Admin = () => {
  const [signedOut, setSignedOut] = useState(false);
  const reportSignedOut = useCallback(() => setSignedOut(true), []);

  useEffect(() => {
    document.title = 'Blog Admin | Dr. Magalhaes and Associates';
  }, []);

  return (
    <AdminContext.Provider value={{ reportSignedOut }}>
      <div className="admin-page">
        <header className="admin-topbar">
          <div className="admin-topbar-inner">
            <div className="admin-brand">
              <span className="admin-brand-name">Dr. Magalhães and Associates</span>
              <span className="admin-brand-section">Blog Admin</span>
            </div>
            <nav className="admin-topbar-links">
              <a href="/blog/" target="_blank" rel="noopener noreferrer">View blog</a>
              {/* Cloudflare Access's own sign-out address for this site. */}
              <a href="/cdn-cgi/access/logout">Sign out</a>
            </nav>
          </div>
        </header>

        {signedOut && (
          // Signing in again happens in a new tab so that whatever is
          // being written in this one is not lost.
          <div className="admin-banner" role="alert">
            <p>
              <strong>You've been signed out.</strong> Nothing you've written is lost.{' '}
              <a href="/admin/" target="_blank" rel="noopener noreferrer">
                Sign in again
              </a>{' '}
              (it opens in a new tab), then come back to this tab and carry on.
            </p>
            <button type="button" className="admin-btn secondary small" onClick={() => setSignedOut(false)}>
              I've signed in
            </button>
          </div>
        )}

        <main className="admin-main">
          <Routes>
            <Route index element={<PostList />} />
            {/* ":id" is "new" for a post that has not been saved yet. */}
            <Route path="posts/:id" element={<PostEditor />} />
          </Routes>
        </main>
      </div>
    </AdminContext.Provider>
  );
};

export default Admin;
