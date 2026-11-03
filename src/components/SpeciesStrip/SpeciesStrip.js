import { html, cx } from '../../lib/dom.js';

/** Bottom strip of the hero. Its right-hand cell is left free for the hero's media toggle. */
export const SpeciesStrip = ({ species, latin, geo, className, delay = 0 }) => html`
  <div class="${cx('species-strip mono rv', className)}" style="--d:${delay}">
    <div class="species-strip__species">${species} <em>${latin}</em></div>
    <div class="species-strip__geo">${geo}</div>
  </div>`;
