import { html, cx } from '../../lib/dom.js';

const ReplayIcon = () => `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4"/><path d="M2.5 2.5v3h3"/>
  </svg>`;

/** Bottom strip of the hero. The replay button is wired up by controllers/heroChoreography.js via [data-replay]. */
export const SpeciesStrip = ({ species, latin, geo, replay, className, delay = 0 }) => html`
  <div class="${cx('species-strip mono rv', className)}" style="--d:${delay}">
    <div class="species-strip__species">${species} <em>${latin}</em></div>
    <div class="species-strip__geo">${geo}</div>
    <button class="species-strip__replay mono" type="button" data-replay>
      ${ReplayIcon()}
      ${replay}
    </button>
  </div>`;
