import { html, cx } from '../../lib/dom.js';

/**
 * Dark card whose thumbnail is a crop of the hero video's final frame.
 * The <canvas data-crop> is painted by lib/thumbnails.js once the bird lands;
 * until then a teal/orange radial placeholder shows through.
 */
export const PromptCard = ({ title, index, crop, caption, alt, stat, drop = false, delay = 0 }) => html`
  <article class="${cx('prompt-card rv', drop && 'prompt-card--drop')}" style="--d:${delay}">
    <header class="prompt-card__head mono"><span>${title}</span><span>${index}</span></header>
    <div class="prompt-card__thumb" role="img" aria-label="${alt}">
      <canvas data-crop="${crop}"></canvas>
      <span class="prompt-card__caption mono">${caption}</span>
    </div>
    <div class="prompt-card__stat">${stat}</div>
    <div class="prompt-card__dots" aria-hidden="true"><i></i><i></i><i></i></div>
  </article>`;

export const PromptCardGrid = (cards, { delay = 0 } = {}) => html`
  <div class="prompt-cards">
    ${cards.map((card, i) => PromptCard({ ...card, delay: delay + i }))}
  </div>`;
