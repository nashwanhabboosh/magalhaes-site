// server/slug.js
//
// Turns a post title into the URL segment used at /blog/<slug>.

const MAX_SLUG_LENGTH = 80;

// "How Often Should You Have an Eye Exam?" -> "how-often-should-you-have-an-eye-exam"
export const slugify = (title) => {
  const slug = String(title)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents: "Magalhães" -> "Magalhaes"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, '');
  return slug || 'post';
};
