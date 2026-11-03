import { html, cx } from '../../lib/dom.js';

const icons = {
  pause: '<path d="M5 3.5v9M11 3.5v9"/>',
  play: '<path d="M5 3.2v9.6L12.6 8Z" fill="currentColor"/>',
  replay: '<path d="M2.5 8a5.5 5.5 0 1 0 1.7-4"/><path d="M2.5 2.5v3h3"/>',
};

/**
 * Frosted pill controlling the hero film. Its state (pause / play / replay) and labels are
 * driven by controllers/mediaToggle.js; every label lives in data-* so the controller has no copy.
 */
export const MediaToggle = ({ pause, play, replay, pauseAria, playAria, replayAria, className }) => html`
  <button class="${cx('media-toggle mono', className)}" type="button" data-media-toggle data-state="pause"
          data-label-pause="${pause}" data-label-play="${play}" data-label-replay="${replay}"
          data-aria-pause="${pauseAria}" data-aria-play="${playAria}" data-aria-replay="${replayAria}"
          aria-label="${pauseAria}">
    ${Object.entries(icons).map(
      ([state, path]) => html`
      <svg class="media-toggle__icon media-toggle__icon--${state}" viewBox="0 0 16 16" fill="none" stroke="currentColor"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`,
    )}
    <span data-media-label>${pause}</span>
  </button>`;
