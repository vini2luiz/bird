import { App } from './App.js';
import {
  REVEAL_AT,
  HARD_TIMEOUT_MS,
  BACKDROP_SAMPLE,
  GHOST_FACTOR,
  SCROLL_REVEAL_THRESHOLD,
} from './config.js';
import { prefersReducedMotion } from './lib/motion.js';
import { initHeroChoreography } from './controllers/heroChoreography.js';
import { initScrollReveal } from './controllers/scrollReveal.js';

const root = document.getElementById('app');
root.innerHTML = App();

const reducedMotion = prefersReducedMotion();
const hero = root.querySelector('[data-hero]');

initHeroChoreography({
  hero,
  video: hero.querySelector('[data-hero-video]'),
  replayButton: hero.querySelector('[data-replay]'),
  thumbnails: Array.from(hero.querySelectorAll('canvas[data-crop]')),
  revealAt: REVEAL_AT,
  timeoutMs: HARD_TIMEOUT_MS,
  backdropSample: BACKDROP_SAMPLE,
  ghostFactor: GHOST_FACTOR,
  reducedMotion,
});

initScrollReveal(root, { threshold: SCROLL_REVEAL_THRESHOLD, reducedMotion });
