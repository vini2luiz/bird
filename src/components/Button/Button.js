import { html, cx } from '../../lib/dom.js';

const ArrowIcon = () => `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>`;

/** Orange gradient pill with the arrow in a dark circle. */
export const CtaButton = ({ label, href = '#', className }) => html`
  <a class="${cx('btn-cta', className)}" href="${href}">
    ${label}
    <span class="btn-cta__arrow" aria-hidden="true">${ArrowIcon()}</span>
  </a>`;

/** Dark pill, used for GET ACCESS in the nav. */
export const PillButton = ({ label, href = '#', className }) => html`
  <a class="${cx('pill-dark', className)}" href="${href}">${label}</a>`;

/** Underlined text link with a trailing ↗ (forced to text presentation, never emoji). */
export const UnderlineLink = ({ label, href = '#', className }) => html`
  <a class="${cx('link-u', className)}" href="${href}">${label} ↗&#xFE0E;</a>`;
