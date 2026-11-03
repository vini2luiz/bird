/**
 * Runtime configuration. Everything you might tune when swapping the footage lives here.
 */

/** Hero footage. Served with CORS (Access-Control-Allow-Origin: *) so its pixels can be read. */
export const VIDEO_SRC = 'https://thinkingods.com/demos/kingfisher-hero/hero.mp4';

/** Second in the clip when the bird settles on the twig. Change this to match your footage. */
export const REVEAL_AT = 4.3;

/** Reveal the UI no matter what after this long, so the hero is never left blank. */
export const HARD_TIMEOUT_MS = 9000;

/** Where to sample the footage's backdrop colour, as fractions of the frame (top-right corner). */
export const BACKDROP_SAMPLE = { x: 0.94, y: 0.12 };

/** --ghost = sampled backdrop × this factor: just dark enough to read, light enough for the bird to win. */
export const GHOST_FACTOR = 0.955;

/** Visible fraction an element needs before it fades up below the fold. */
export const SCROLL_REVEAL_THRESHOLD = 0.18;
