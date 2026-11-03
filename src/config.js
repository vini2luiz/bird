/**
 * Runtime configuration. Everything you might tune when swapping the footage lives here.
 */

/** Hero footage, self-hosted next to index.html (relative so it works in dev and in dist/). */
export const VIDEO_SRC = 'assets/media/hero.mp4';

/** Second in the clip when the bird settles on the twig. Change this to match your footage. */
export const REVEAL_AT = 4.3;

/** Reveal the UI no matter what after this long, so the hero is never left blank. */
export const HARD_TIMEOUT_MS = 9000;

/** Where to sample the footage's backdrop colour, as fractions of the frame (top-right corner). */
export const BACKDROP_SAMPLE = { x: 0.94, y: 0.12 };

/** --ghost = sampled backdrop × this factor: just dark enough to read, light enough for the bird to win. */
export const GHOST_FACTOR = 0.955;

/**
 * Ghost-word cut-out (controllers/ghostWordMask.js): pixels further than SILHOUETTE_THRESHOLD
 * (sum of RGB differences) from the backdrop count as bird; holes grow by SILHOUETTE_DILATE
 * mask pixels to cover soft edges and small head movements.
 */
export const SILHOUETTE_THRESHOLD = 54;
export const SILHOUETTE_DILATE = 2;

/** Visible fraction an element needs before it fades up below the fold. */
export const SCROLL_REVEAL_THRESHOLD = 0.18;
