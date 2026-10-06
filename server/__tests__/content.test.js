// server/__tests__/content.test.js
//
// Run with: npm run test:server
//
// Covers the rules that decide what a post may contain and where it
// lives: body HTML, slugs, image keys and input validation.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderBodyHtml } from '../renderBody.js';
import { slugify } from '../slug.js';
import { isMediaKey, isMediaUrl, matchesImageSignature, newMediaKey } from '../media.js';
import { parsePostInput, parsePostId, MAX_TITLE_LENGTH } from '../posts.js';

const KEY = 'blog/2026/10/3f2a9c1e-5b7d-4e8a-9c21-7d4e5f6a8b90.jpg';

const doc = (...content) => ({ type: 'doc', content });
const text = (value, marks) => ({ type: 'text', text: value, ...(marks ? { marks } : {}) });
const paragraph = (...content) => ({ type: 'paragraph', content });

// --- renderBodyHtml --------------------------------------------------------

test('renders the supported elements', () => {
  const html = renderBodyHtml(
    doc(
      { type: 'heading', attrs: { level: 2 }, content: [text('Eye exams')] },
      paragraph(text('Have one '), text('every year', [{ type: 'bold' }]), text('.')),
      {
        type: 'bulletList',
        content: [{ type: 'listItem', content: [paragraph(text('Children'))] }]
      },
      {
        type: 'orderedList',
        attrs: { start: 3 },
        content: [{ type: 'listItem', content: [paragraph(text('Adults'))] }]
      },
      { type: 'blockquote', content: [paragraph(text('Quote'))] },
      { type: 'horizontalRule' },
      paragraph(text('Line one'), { type: 'hardBreak' }, text('Line two'))
    )
  );
  assert.equal(
    html,
    '<h2>Eye exams</h2>' +
      '<p>Have one <strong>every year</strong>.</p>' +
      '<ul><li><p>Children</p></li></ul>' +
      '<ol start="3"><li><p>Adults</p></li></ol>' +
      '<blockquote><p>Quote</p></blockquote>' +
      '<hr>' +
      '<p>Line one<br>Line two</p>'
  );
});

test('keeps blank lines inside a post but drops them at the end', () => {
  const html = renderBodyHtml(
    doc(
      paragraph(text('First')),
      { type: 'paragraph' },
      paragraph(text('Second')),
      { type: 'paragraph' },
      { type: 'paragraph', content: [] }
    )
  );
  assert.equal(html, '<p>First</p><p><br></p><p>Second</p>');
  assert.equal(renderBodyHtml(doc({ type: 'paragraph' })), '');
});

test('escapes text, so typed HTML is shown rather than run', () => {
  const html = renderBodyHtml(doc(paragraph(text('<script>alert("x")</script> & more'))));
  assert.equal(html, '<p>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; more</p>');
});

test('keeps the text of unknown elements but drops the elements', () => {
  const html = renderBodyHtml(
    doc(
      { type: 'iframe', attrs: { src: 'https://evil.example' } },
      { type: 'script', content: [text('alert(1)')] },
      paragraph(text('safe', [{ type: 'onclick', attrs: { handler: 'x' } }]))
    )
  );
  assert.equal(html, 'alert(1)<p>safe</p>');
});

test('keeps body headings between h2 and h4', () => {
  const heading = (level) => ({ type: 'heading', attrs: { level }, content: [text('T')] });
  assert.equal(renderBodyHtml(doc(heading(1))), '<h2>T</h2>');
  assert.equal(renderBodyHtml(doc(heading(3))), '<h3>T</h3>');
  assert.equal(renderBodyHtml(doc(heading(6))), '<h4>T</h4>');
  assert.equal(renderBodyHtml(doc(heading('2 onclick=x'))), '<h2>T</h2>');
});

test('opens outside links in a new tab and leaves site links alone', () => {
  const link = (href) => renderBodyHtml(doc(paragraph(text('here', [{ type: 'link', attrs: { href } }]))));
  assert.equal(
    link('https://www.aoa.org/'),
    '<p><a href="https://www.aoa.org/" target="_blank" rel="noopener noreferrer">here</a></p>'
  );
  assert.equal(link('/contact/'), '<p><a href="/contact/">here</a></p>');
  assert.equal(link('tel:+15085551234'), '<p><a href="tel:+15085551234">here</a></p>');
});

test('drops links with unsafe addresses but keeps their text', () => {
  const link = (href) => renderBodyHtml(doc(paragraph(text('here', [{ type: 'link', attrs: { href } }]))));
  for (const href of [
    'javascript:alert(1)',
    ' javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    '//evil.example',
    '/\\evil.example',
    undefined,
    42
  ]) {
    assert.equal(link(href), '<p>here</p>', `href: ${href}`);
  }
});

test('cannot break out of a link attribute', () => {
  const html = renderBodyHtml(
    doc(paragraph(text('x', [{ type: 'link', attrs: { href: 'https://a.example/" onmouseover="alert(1)' } }])))
  );
  assert.ok(!html.includes('" onmouseover="'));
  assert.ok(html.includes('&quot; onmouseover=&quot;'));
});

test('only shows images uploaded through the admin', () => {
  const image = (attrs) => renderBodyHtml(doc({ type: 'image', attrs }));
  assert.equal(
    image({ src: `/media/${KEY}`, alt: 'A "phoropter"' }),
    `<img src="/media/${KEY}" alt="A &quot;phoropter&quot;" loading="lazy">`
  );
  assert.equal(image({ src: 'https://tracker.example/pixel.gif' }), '');
  assert.equal(image({ src: `/media/${KEY}" onerror="alert(1)` }), '');
  assert.equal(image({ src: '/media/blog/2026/10/../../../secrets.txt' }), '');
  assert.equal(image({}), '');
});

test('handles empty, invalid and absurdly nested documents', () => {
  assert.equal(renderBodyHtml(null), '');
  assert.equal(renderBodyHtml('<p>hi</p>'), '');
  assert.equal(renderBodyHtml({ type: 'paragraph', content: [text('x')] }), '');
  assert.equal(renderBodyHtml(doc()), '');

  let nested = paragraph(text('deep'));
  for (let i = 0; i < 500; i += 1) nested = { type: 'blockquote', content: [nested] };
  const html = renderBodyHtml(doc(nested));
  assert.ok(!html.includes('deep'));
  assert.ok(html.startsWith('<blockquote>'));
});

// --- slugify ---------------------------------------------------------------

test('builds readable slugs from titles', () => {
  assert.equal(slugify('How Often Should You Have an Eye Exam?'), 'how-often-should-you-have-an-eye-exam');
  assert.equal(slugify('  Dr. Magalhães & Associates: 2026 update  '), 'dr-magalhaes-associates-2026-update');
  assert.equal(slugify('LASIK — is it right for you?'), 'lasik-is-it-right-for-you');
  assert.equal(slugify('???'), 'post');
  assert.equal(slugify(''), 'post');
});

test('keeps slugs to a sensible length without a trailing dash', () => {
  const slug = slugify(`${'a'.repeat(79)} bcd`);
  assert.equal(slug, 'a'.repeat(79));
  assert.match(slugify('word '.repeat(60)), /^[a-z0-9]+(-[a-z0-9]+)*$/);
  assert.ok(slugify('word '.repeat(60)).length <= 80);
});

// --- media -----------------------------------------------------------------

test('recognises only the image keys the upload function creates', () => {
  assert.ok(isMediaKey(KEY));
  assert.ok(isMediaKey(newMediaKey('image/png')));
  assert.match(newMediaKey('image/webp', new Date(Date.UTC(2026, 0, 5))), /^blog\/2026\/01\/.+\.webp$/);
  assert.ok(!isMediaKey('videos/office-tour.mp4'));
  assert.ok(!isMediaKey('blog/2026/10/../../secrets.txt'));
  assert.ok(!isMediaKey(`${KEY}.html`));
  assert.ok(!isMediaKey(null));
  assert.ok(isMediaUrl(`/media/${KEY}`));
  assert.ok(!isMediaUrl(`https://evil.example/media/${KEY}`));
});

test('checks that an upload really is the image type it claims', () => {
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0]);
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0]);
  const webp = new Uint8Array([...Buffer.from('RIFF'), 1, 2, 3, 4, ...Buffer.from('WEBP')]);
  const html = new Uint8Array(Buffer.from('<html><script>alert(1)</script>'));

  assert.ok(matchesImageSignature('image/jpeg', jpeg));
  assert.ok(matchesImageSignature('image/png', png));
  assert.ok(matchesImageSignature('image/webp', webp));
  assert.ok(!matchesImageSignature('image/png', jpeg));
  assert.ok(!matchesImageSignature('image/jpeg', html));
  assert.ok(!matchesImageSignature('image/jpeg', new Uint8Array()));
  assert.ok(!matchesImageSignature('image/svg+xml', html));
});

// --- post input ------------------------------------------------------------

test('accepts a normal post and renders its body', () => {
  const { values, error } = parsePostInput({
    title: '  Eye exams  ',
    summary: ' Why they matter. ',
    coverImage: KEY,
    body: doc(paragraph(text('Hello')))
  });
  assert.equal(error, undefined);
  assert.equal(values.title, 'Eye exams');
  assert.equal(values.summary, 'Why they matter.');
  assert.equal(values.coverImage, KEY);
  assert.equal(values.bodyHtml, '<p>Hello</p>');
  assert.deepEqual(JSON.parse(values.bodyJson), doc(paragraph(text('Hello'))));
});

test('accepts an empty draft', () => {
  const { values } = parsePostInput({});
  assert.deepEqual(values, { title: '', summary: '', coverImage: null, bodyJson: '', bodyHtml: '' });
});

test('rejects invalid post input', () => {
  assert.ok(parsePostInput({ title: 'x'.repeat(MAX_TITLE_LENGTH + 1) }).error);
  assert.ok(parsePostInput({ summary: 'x'.repeat(301) }).error);
  assert.ok(parsePostInput({ coverImage: 'https://evil.example/a.jpg' }).error);
  assert.ok(parsePostInput({ body: '<p>raw html</p>' }).error);
  assert.ok(parsePostInput({ body: { type: 'paragraph' } }).error);
  assert.ok(parsePostInput({ body: doc(paragraph(text('x'.repeat(600000)))) }).error);
});

test('reads post ids from URL segments', () => {
  assert.equal(parsePostId('12'), 12);
  assert.equal(parsePostId('0'), null);
  assert.equal(parsePostId('-1'), null);
  assert.equal(parsePostId('1.5'), null);
  assert.equal(parsePostId('12abc'), null);
  assert.equal(parsePostId('1 OR 1=1'), null);
  assert.equal(parsePostId(undefined), null);
});
