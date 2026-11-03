import { html } from '../../lib/dom.js';

export const Footer = ({ left, right }) => html`
  <footer class="site-footer mono">
    <span>${left}</span>
    <span>${right}</span>
  </footer>`;
