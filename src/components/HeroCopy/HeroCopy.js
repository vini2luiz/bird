import { html, cx } from '../../lib/dom.js';
import { CtaButton, UnderlineLink } from '../Button/Button.js';

/** Left-hand hero copy. `delay` is the stagger slot of the first element; the rest follow. */
export const HeroCopy = ({ eyebrow, titleHtml, lede, primaryCta, secondaryCta, className, delay = 1 }) => html`
  <div class="${cx('hero-copy', className)}">
    <p class="hero-copy__eyebrow mono rv" style="--d:${delay}">${eyebrow}</p>
    <h1 class="hero-copy__title rv" style="--d:${delay + 1}">${titleHtml}</h1>
    <p class="hero-copy__lede rv" style="--d:${delay + 2}">${lede}</p>
    <div class="hero-copy__actions rv" style="--d:${delay + 3}">
      ${CtaButton(primaryCta)}
      ${UnderlineLink(secondaryCta)}
    </div>
  </div>`;
