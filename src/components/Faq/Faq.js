import { html } from '../../lib/dom.js';
import { Section } from '../Section/Section.js';

/** Native <details> disclosure list: accessible and keyboard-ready with no JavaScript. */
export const Faq = ({ id, kicker, titleHtml, items }) =>
  Section({
    id,
    kicker,
    titleHtml,
    className: 'faq',
    children: html`
      <div class="faq__list">
        ${items.map(
          (item, i) => html`
          <details class="faq__item io" style="--i:${i}">
            <summary>
              <span>${item.question}</span>
              <span class="faq__icon" aria-hidden="true"></span>
            </summary>
            <p class="faq__answer">${item.answer}</p>
          </details>`,
        )}
      </div>`,
  });
