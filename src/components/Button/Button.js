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

/** Pill link: dark by default, or `variant: 'outline'` for a hairline ink border. */
export const PillButton = ({ label, href = '#', variant = 'dark', className }) => html`
  <a class="${cx('pill', `pill--${variant}`, className)}" href="${href}">${label}</a>`;

/**
 * Underlined text action with a trailing ↗ (forced to text presentation, never emoji).
 * With `dialog`, it renders a button that opens <dialog id={dialog}> (controllers/dialogs.js).
 */
export const UnderlineLink = ({ label, href = '#', dialog, className }) =>
  dialog
    ? html`<button class="${cx('link-u', className)}" type="button" data-open-dialog="${dialog}" aria-haspopup="dialog">${label} ↗&#xFE0E;</button>`
    : html`<a class="${cx('link-u', className)}" href="${href}">${label} ↗&#xFE0E;</a>`;
