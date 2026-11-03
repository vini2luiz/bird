/**
 * Reads a single pixel of the current video frame.
 * @param {HTMLVideoElement} video - must already have a frame (see hasFrame)
 * @param {{x: number, y: number}} point - position as fractions of the frame
 * @returns {[number, number, number] | null} RGB, or null when readback is blocked
 *   (a tainted canvas, e.g. on file:// or a non-CORS source)
 */
export function readPixel(video, { x, y }) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const sx = Math.floor(video.videoWidth * x);
    const sy = Math.floor(video.videoHeight * y);
    ctx.drawImage(video, sx, sy, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  } catch {
    return null;
  }
}

/** A black lead-in frame is not the backdrop — callers should sample again later. */
export const isNearBlack = ([r, g, b]) => r + g + b < 24;

/**
 * Writes the sampled colour to --bg and a slightly darker --ghost,
 * so the page and the footage share one continuous backdrop.
 */
export function applyBackdrop([r, g, b], ghostFactor, root = document.documentElement) {
  const k = ghostFactor;
  root.style.setProperty('--bg', `rgb(${r} ${g} ${b})`);
  root.style.setProperty('--ghost', `rgb(${Math.round(r * k)} ${Math.round(g * k)} ${Math.round(b * k)})`);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', `rgb(${r}, ${g}, ${b})`);
}
