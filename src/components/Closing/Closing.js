import { html } from '../../lib/dom.js';
import { CtaButton } from '../Button/Button.js';

export const Closing = ({ lineHtml, cta }) => html`
  <div class="closing io">
    <p class="closing__line">${lineHtml}</p>
    ${CtaButton(cta)}
  </div>`;
