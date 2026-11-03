import { html } from '../../lib/dom.js';

/**
 * Structural-colour band (shifts teal → cobalt on hover, like the feathers when the bird turns)
 * above a row of named colour chips.
 */
export const Swatches = ({ swatches, shift }) => html`
  <div class="swatches">
    ${
      shift &&
      html`
      <div class="swatches__shift" aria-hidden="true">
        <span class="swatches__band"></span>
        <span class="swatches__scale mono"><span>${shift.from}</span><span>${shift.label}</span><span>${shift.to}</span></span>
      </div>`
    }
    <div class="swatches__chips">
      ${swatches.map((s) => html`<span class="swatches__chip mono"><i style="background:${s.color}"></i>${s.name}</span>`)}
    </div>
  </div>`;
