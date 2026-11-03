/**
 * Alpha map of a frame: 255 where the pixel matches the backdrop, 0 where it doesn't (the subject).
 * Distance is the sum of absolute channel differences (cheap, and plenty for a flat backdrop).
 * @param {Uint8ClampedArray} rgba - ImageData.data
 * @param {[number, number, number]} backdrop - backdrop colour
 * @param {number} threshold - channel-sum distance above which a pixel counts as subject
 * @returns {Uint8ClampedArray} one alpha value per pixel
 */
export function silhouetteAlpha(rgba, [br, bg, bb], threshold) {
  const count = rgba.length / 4;
  const alpha = new Uint8ClampedArray(count);
  for (let i = 0; i < count; i++) {
    const o = i * 4;
    const distance = Math.abs(rgba[o] - br) + Math.abs(rgba[o + 1] - bg) + Math.abs(rgba[o + 2] - bb);
    alpha[i] = distance > threshold ? 0 : 255;
  }
  return alpha;
}

/**
 * Grows the transparent holes by `radius` pixels (a separable min filter), so the cut-out
 * still covers the subject's soft edges and small movements between updates.
 */
export function dilateHoles(alpha, width, height, radius) {
  if (radius <= 0) return alpha;
  const horizontal = new Uint8ClampedArray(alpha.length);
  const out = new Uint8ClampedArray(alpha.length);

  for (let y = 0; y < height; y++) {
    const row = y * width;
    for (let x = 0; x < width; x++) {
      let min = 255;
      for (let k = Math.max(0, x - radius); k <= Math.min(width - 1, x + radius); k++) {
        if (alpha[row + k] < min) min = alpha[row + k];
      }
      horizontal[row + x] = min;
    }
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let min = 255;
      for (let k = Math.max(0, y - radius); k <= Math.min(height - 1, y + radius); k++) {
        if (horizontal[k * width + x] < min) min = horizontal[k * width + x];
      }
      out[y * width + x] = min;
    }
  }
  return out;
}
