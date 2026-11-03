import { coverRect, parseObjectPosition } from '../lib/geometry.js';
import { silhouetteAlpha, dilateHoles } from '../lib/silhouette.js';

const MASK_WIDTH = 320;

/**
 * `darken` keeps the darker of word and footage per channel. The bird is darker than the word almost
 * everywhere — except its white cheek patch (and the brightest orange), where the word shows through.
 *
 * Once the bird has landed, this cuts the bird's silhouette out of the word's mask so the bird always
 * wins. The blend still does all the work in flight; this is a correction for the perched pose.
 * Needs pixel readback — where that's blocked (file://, non-CORS footage) the blend alone carries it.
 *
 * @returns {{ update: (backdrop: number[]) => Promise<void>, clear: () => void }}
 */
export function createGhostWordMask({ hero, word, video, threshold, dilate }) {
  const raw = document.createElement('canvas');
  const soft = document.createElement('canvas');
  let objectUrl = '';
  let busy = false;
  let generation = 0;

  /** Aligns the mask image with the video's on-screen picture, relative to the word's box. */
  function place() {
    if (!word.classList.contains('has-silhouette') || !video.videoWidth) return;
    const videoBox = video.getBoundingClientRect();
    const wordBox = word.getBoundingClientRect();
    const [posX, posY] = parseObjectPosition(getComputedStyle(video).objectPosition);
    const picture = coverRect(videoBox.width, videoBox.height, video.videoWidth, video.videoHeight, posX, posY);
    word.style.setProperty('--silhouette-size', `${picture.width}px ${picture.height}px`);
    word.style.setProperty(
      '--silhouette-pos',
      `${videoBox.left + picture.x - wordBox.left}px ${videoBox.top + picture.y - wordBox.top}px`,
    );
  }

  async function update(backdrop) {
    if (busy || !backdrop || !video.videoWidth) return;
    busy = true;
    const run = generation;
    try {
      const width = MASK_WIDTH;
      const height = Math.round((width * video.videoHeight) / video.videoWidth);
      raw.width = soft.width = width;
      raw.height = soft.height = height;

      const ctx = raw.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(video, 0, 0, width, height);
      const frame = ctx.getImageData(0, 0, width, height); // throws when readback is blocked
      const alpha = dilateHoles(silhouetteAlpha(frame.data, backdrop, threshold), width, height, dilate);
      for (let i = 0; i < alpha.length; i++) {
        frame.data[i * 4 + 3] = alpha[i];
      }
      ctx.putImageData(frame, 0, 0);

      const softCtx = soft.getContext('2d');
      softCtx.clearRect(0, 0, width, height);
      softCtx.filter = 'blur(1px)';
      softCtx.drawImage(raw, 0, 0);

      const blob = await new Promise((resolve) => soft.toBlob(resolve));
      if (!blob || run !== generation) return; // cleared (replay) while encoding

      const previous = objectUrl;
      objectUrl = URL.createObjectURL(blob);
      word.style.setProperty('--silhouette', `url("${objectUrl}")`);
      word.classList.add('has-silhouette');
      place();
      if (previous) URL.revokeObjectURL(previous);
    } catch {
      /* readback blocked: the blend alone carries the effect */
    } finally {
      busy = false;
    }
  }

  function clear() {
    generation++;
    word.classList.remove('has-silhouette');
    word.style.removeProperty('--silhouette');
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = '';
  }

  new ResizeObserver(place).observe(hero);

  return { update, clear };
}
