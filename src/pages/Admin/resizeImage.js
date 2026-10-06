// resizeImage.js
//
// Shrinks a photo in the browser before it is uploaded. Phone photos are
// often 5-10 MB and far larger than any screen needs; this turns them into
// a JPEG no more than 1600px on its longest side, typically a few hundred
// KB, so posts load quickly and uploads are fast on a slow connection.

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.85;

// `message` is written for the author and safe to show.
export class ImageError extends Error {}

const UNREADABLE = "That file couldn't be opened as a photo. Please choose a JPG or PNG.";

const decode = async (file) => {
  try {
    // Applies the rotation phones record in the photo, so portrait shots
    // don't end up sideways.
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch (err) {
    // Older browsers reject the options argument.
    return createImageBitmap(file);
  }
};

// Resolves with a JPEG Blob.
export async function resizeImage(file) {
  let bitmap;
  try {
    bitmap = await decode(file);
  } catch (err) {
    throw new ImageError(UNREADABLE);
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));

  const context = canvas.getContext('2d');
  // JPEG has no transparency. Without a white background, the transparent
  // parts of a PNG would come out black.
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
  });
  if (!blob) throw new ImageError(UNREADABLE);
  return blob;
}
