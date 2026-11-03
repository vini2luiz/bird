import { html } from '../../lib/dom.js';

export const TrustRow = ({ headline, sub, delay = 0 }) => html`
  <div class="trust rv" style="--d:${delay}">
    <div class="trust__avatars" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <div class="trust__text">
      <strong>${headline}</strong>
      <span>${sub}</span>
    </div>
  </div>`;
