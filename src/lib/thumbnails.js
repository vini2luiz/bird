import { hasFrame } from './video.js';

/**
 * Source rectangle for a square crop of a frame.
 * @param {number} vw - frame width
 * @param {number} vh - frame height
 * @param {[number, number, number]} crop - [x, y, size]: x/y are the crop centre as fractions
 *   of the frame, size is the side of the square as a fraction of the frame width
 * @returns {{sx: number, sy: number, size: number}} clamped inside the frame
 */
export function computeCrop(vw, vh, [fx, fy, fs]) {
  const size = Math.min(fs * vw, vw, vh);
  return {
    sx: clamp(fx * vw - size / 2, 0, vw - size),
    sy: clamp(fy * vh - size / 2, 0, vh - size),
    size,
  };
}

/** "0.555,0.335,0.22" → [0.555, 0.335, 0.22] */
export const parseCrop = (value) => value.split(',').map(Number);

/**
 * Paints each <canvas data-crop="x,y,size"> with its crop of the current video frame.
 * drawImage still works where pixel readback is blocked (file://), so this never needs CORS.
 * @returns {boolean} true if at least one canvas was painted
 */
export function paintThumbnails(video, canvases) {
  if (!hasFrame(video)) return false;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let painted = false;

  for (const canvas of canvases) {
    const { sx, sy, size: s } = computeCrop(video.videoWidth, video.videoHeight, parseCrop(canvas.dataset.crop));
    const size = Math.max(1, Math.round((canvas.clientWidth || 180) * dpr));
    canvas.width = canvas.height = size;
    try {
      canvas.getContext('2d').drawImage(video, sx, sy, s, s, 0, 0, size, size);
      canvas.classList.add('is-drawn');
      painted = true;
    } catch {
      /* leave the placeholder gradient */
    }
  }
  return painted;
}

export function clearThumbnails(canvases) {
  canvases.forEach((canvas) => canvas.classList.remove('is-drawn'));
}

const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
