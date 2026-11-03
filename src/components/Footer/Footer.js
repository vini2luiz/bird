import { html } from '../../lib/dom.js';

export const Footer = ({ left, right }) => html`
  <footer class="site-footer">
    <div class="wrap site-footer__inner mono">
      <span>${left}</span>
      <span>${right}</span>
    </div>
  </footer>`;
