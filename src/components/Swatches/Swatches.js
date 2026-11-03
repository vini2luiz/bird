import { html } from '../../lib/dom.js';

export const Swatches = ({ swatches }) => html`
  <div class="swatches">
    ${swatches.map((s) => html`<span class="swatches__chip mono"><i style="background:${s.color}"></i>${s.name}</span>`)}
  </div>`;
