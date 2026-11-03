import { html, cx } from '../../lib/dom.js';

/**
 * Shared page section: mono kicker with an orange index, serif title (one italic word),
 * optional intro paragraph beside it, then the section's own content.
 */
export const Section = ({ id, kicker, titleHtml, intro, className, children }) => html`
  <section class="${cx('section', className)}" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      <div class="${cx('section__head', !intro && 'section__head--solo')}">
        <div>
          <p class="section__kicker mono io"><b>${kicker.number}</b>${kicker.label}</p>
          <h2 class="section__title io" style="--i:1" id="${id}-title">${titleHtml}</h2>
        </div>
        ${intro && html`<p class="section__intro io" style="--i:2">${intro}</p>`}
      </div>
      <div class="section__body">${children}</div>
    </div>
  </section>`;
