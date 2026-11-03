import { html, cx } from '../../lib/dom.js';
import { BirdMark } from '../BirdMark/BirdMark.js';
import { PillButton } from '../Button/Button.js';

export const Nav = ({ brand, links, signIn, cta, className, delay = 0 }) => html`
  <nav class="${cx('nav rv', className)}" style="--d:${delay}" aria-label="Primary">
    <a class="nav__brand" href="#" aria-label="${brand} home">${BirdMark()}${brand}</a>
    <ul class="nav__links mono">
      ${links.map((link) => html`<li><a href="${link.href}">${link.label}</a></li>`)}
    </ul>
    <div class="nav__end">
      <a class="nav__signin" href="${signIn.href}">${signIn.label}</a>
      ${PillButton(cta)}
    </div>
  </nav>`;
