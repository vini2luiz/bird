import { html } from '../../lib/dom.js';
import { CtaButton } from '../Button/Button.js';

/** Last word on the page: a serif line and the orange CTA. */
export const Closing = ({ lineHtml, cta }) => html`
  <section class="closing" aria-label="Get started">
    <div class="wrap">
      <div class="closing__inner io">
        <p class="closing__line">${lineHtml}</p>
        ${CtaButton(cta)}
      </div>
    </div>
  </section>`;
