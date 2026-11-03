import { hasFrame } from './video.js';

/**
 * Paints square crops of the current video frame into canvases.
 *
 * Each canvas declares its crop as data-crop="x,y,size":
 *   x, y — crop centre, as fractions of the frame
 *   size — side of the square, as a fraction of the frame width
 *
 * drawImage still works where pixel readback is blocked (file://), so this never needs CORS.
 * @returns {boolean} true if at least one canvas was painted
 */
export function paintThumbnails(video, canvases) {
  if (!hasFrame(video)) return false;
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let painted = false;

  for (const canvas of canvases) {
    const [fx, fy, fs] = canvas.dataset.crop.split(',').map(Number);
    const s = Math.min(fs * vw, vw, vh);
    const sx = clamp(fx * vw - s / 2, 0, vw - s);
    const sy = clamp(fy * vh - s / 2, 0, vh - s);
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
