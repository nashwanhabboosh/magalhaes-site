// server/http.js
//
// Small helpers shared by the blog's API functions.

// JSON response. `no-store` so a post that was just published, edited or
// unpublished is never served from a stale browser cache.
export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });

// Parses a JSON request body. Returns null when the body is missing or
// is not a JSON object.
export const readJsonObject = async (request) => {
  try {
    const data = await request.json();
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch (err) {
    return null;
  }
};
