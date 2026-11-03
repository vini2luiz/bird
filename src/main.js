import {
  REVEAL_AT,
  HARD_TIMEOUT_MS,
  BACKDROP_SAMPLE,
  GHOST_FACTOR,
  SILHOUETTE_THRESHOLD,
  SILHOUETTE_DILATE,
  SCROLL_REVEAL_THRESHOLD,
} from './config.js';
import { prefersReducedMotion } from './lib/motion.js';
import { createGhostWordMask } from './controllers/ghostWordMask.js';
import { initHeroChoreography } from './controllers/heroChoreography.js';
import { initMediaToggle } from './controllers/mediaToggle.js';
import { initScrollReveal } from './controllers/scrollReveal.js';
import { initTabs } from './controllers/tabs.js';
import { initCopyButtons } from './controllers/copyButtons.js';
import { initDialogs } from './controllers/dialogs.js';

const root = document.getElementById('app');

// The production build ships pre-rendered HTML; in development the page is rendered here.
// The dynamic import keeps components and copy out of the production module graph.
if (!root.hasAttribute('data-prerendered')) {
  const { App } = await import('./App.js');
  root.innerHTML = App();
}

const reducedMotion = prefersReducedMotion();
const hero = root.querySelector('[data-hero]');
const video = hero.querySelector('[data-hero-video]');

const mask = createGhostWordMask({
  hero,
  word: hero.querySelector('[data-ghost-word]'),
  video,
  threshold: SILHOUETTE_THRESHOLD,
  dilate: SILHOUETTE_DILATE,
});

const choreography = initHeroChoreography({
  hero,
  video,
  thumbnails: Array.from(hero.querySelectorAll('canvas[data-crop]')),
  mask,
  revealAt: REVEAL_AT,
  timeoutMs: HARD_TIMEOUT_MS,
  backdropSample: BACKDROP_SAMPLE,
  ghostFactor: GHOST_FACTOR,
  reducedMotion,
});

initMediaToggle({ button: hero.querySelector('[data-media-toggle]'), video, choreography });
initScrollReveal(root, { threshold: SCROLL_REVEAL_THRESHOLD, reducedMotion });
initTabs(root);
initCopyButtons(root, { live: root.querySelector('[data-live-region]') });
initDialogs(root);
