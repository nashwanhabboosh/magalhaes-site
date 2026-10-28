// server/media.js
//
// Naming and validation rules for blog images. Images are stored in the
// R2 bucket bound as MEDIA under blog/<year>/<month>/<uuid>.<ext> and are
// served from this site at /media/<key> (see functions/media/[[path]].js),
// so stored posts never depend on the bucket's public address.

// Accepted upload types and the file extension each is stored with.
export const IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

// The editor resizes photos in the browser before uploading, so anything
// near this size is not a normal upload.
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

// One image key, as regular expression source for the two patterns below.
const KEY_SOURCE =
  String.raw`blog/\d{4}/\d{2}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpg|png|webp)`;

const KEY_PATTERN = new RegExp(`^${KEY_SOURCE}$`);

const MEDIA_PREFIX = '/media/';

const MEDIA_URL_IN_TEXT = new RegExp(`${MEDIA_PREFIX}(${KEY_SOURCE})`, 'g');

// hasOwn, so names every object inherits ("constructor") don't count.
export const isImageType = (contentType) => Object.hasOwn(IMAGE_TYPES, contentType);

export const isMediaKey = (key) => typeof key === 'string' && KEY_PATTERN.test(key);

export const mediaUrl = (key) => `${MEDIA_PREFIX}${key}`;

export const isMediaUrl = (url) =>
  typeof url === 'string' &&
  url.startsWith(MEDIA_PREFIX) &&
  isMediaKey(url.slice(MEDIA_PREFIX.length));

// The keys of every /media/ address in a piece of text, such as a post's
// stored body.
export const mediaKeysInText = (text) =>
  new Set(Array.from(String(text ?? '').matchAll(MEDIA_URL_IN_TEXT), (match) => match[1]));

export const newMediaKey = (contentType, date = new Date()) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `blog/${year}/${month}/${crypto.randomUUID()}.${IMAGE_TYPES[contentType]}`;
};

const startsWith = (bytes, signature, offset = 0) =>
  signature.every((byte, index) => bytes[offset + index] === byte);

// Checks the file's leading bytes against the type the upload claims to
// be, so only real images end up being served from this site.
export const matchesImageSignature = (contentType, bytes) => {
  switch (contentType) {
    case 'image/jpeg':
      return startsWith(bytes, [0xff, 0xd8, 0xff]);
    case 'image/png':
      return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case 'image/webp':
      // "RIFF" <4-byte size> "WEBP"
      return (
        startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) &&
        startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)
      );
    default:
      return false;
  }
};
