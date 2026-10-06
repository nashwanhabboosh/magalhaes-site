// api.js
//
// Browser-side client for the blog admin API (functions/api/admin/).
// Every function either resolves with data or rejects with one of the two
// errors below, so screens only have to handle those.

// The Cloudflare Access sign-in has expired or is missing.
export class SignedOutError extends Error {}

// Anything else. `message` is written for the author and safe to show.
export class ApiError extends Error {}

const request = async (method, path, { json, body, contentType } = {}) => {
  let response;
  try {
    response = await fetch(`/api/admin${path}`, {
      method,
      // When a sign-in has expired, Cloudflare Access answers with a
      // redirect to its sign-in page instead of passing the request on.
      // "manual" lets us recognise that, rather than having the browser
      // follow the redirect and fail with an error we can't tell apart
      // from being offline.
      redirect: 'manual',
      headers: json ? { 'Content-Type': 'application/json' } : contentType ? { 'Content-Type': contentType } : {},
      body: json ? JSON.stringify(json) : body
    });
  } catch (err) {
    throw new ApiError("We couldn't reach the website. Check your internet connection and try again.");
  }

  if (response.type === 'opaqueredirect' || response.status === 401) {
    throw new SignedOutError('Signed out');
  }

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    // Not JSON: handled below as a failed request.
  }

  if (!response.ok || !data) {
    throw new ApiError(data?.error || 'Something went wrong. Please try again.');
  }
  return data;
};

export const listPosts = async () => (await request('GET', '/posts')).posts;

export const getPost = async (id) => (await request('GET', `/posts/${id}`)).post;

export const createPost = async (fields) =>
  (await request('POST', '/posts', { json: fields })).post;

export const updatePost = async (id, fields) =>
  (await request('PUT', `/posts/${id}`, { json: fields })).post;

export const publishPost = async (id) => (await request('POST', `/posts/${id}/publish`)).post;

export const unpublishPost = async (id) =>
  (await request('POST', `/posts/${id}/unpublish`)).post;

export const deletePost = (id) => request('DELETE', `/posts/${id}`);

// Renders the given fields as the public page would, without saving.
export const previewPost = async (fields) =>
  (await request('POST', '/preview', { json: fields })).preview;

// Resolves with { key, url }: `key` is what a post stores as its cover
// photo, `url` is what an <img> loads.
export const uploadImage = (blob) =>
  request('POST', '/images', { body: blob, contentType: blob.type });
