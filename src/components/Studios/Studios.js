import { html } from '../../lib/dom.js';
import { Section } from '../Section/Section.js';

/** Social proof: a row of studio wordmarks, then three short quotes. */
export const Studios = ({ id, kicker, titleHtml, intro, logos, quotes }) =>
  Section({
    id,
    kicker,
    titleHtml,
    intro,
    className: 'studios',
    children: html`
      <ul class="studios__logos io" aria-label="Studios using Kingfisher">
        ${logos.map((logo) => html`<li class="studios__logo studios__logo--${logo.style}">${logo.name}</li>`)}
      </ul>
      <div class="studios__quotes">
        ${quotes.map(
          (q, i) => html`
          <figure class="studios__quote io" style="--i:${i}">
            <blockquote>${q.quote}</blockquote>
            <figcaption>
              <span class="studios__avatar studios__avatar--${q.tone}" aria-hidden="true"></span>
              <span><strong>${q.name}</strong><span class="mono">${q.role}</span></span>
            </figcaption>
          </figure>`,
        )}
      </div>`,
  });
