import { html, cx } from '../../lib/dom.js';

/**
 * A bento note.
 *   variant "dark"  — tall panel spanning two rows
 *   variant "light" — frosted card
 *   variant "wide"  — light card spanning two columns, text beside the visual
 * `visual` is pre-rendered markup placed after the body (or beside it, for "wide").
 */
export function NoteCard({ variant = 'light', index, titleHtml, body, visual = '', delay = 0 }) {
  const text = html`
    <p class="note__index mono">${index}</p>
    <h3 class="note__title">${titleHtml}</h3>
    <p class="note__body">${body}</p>`;

  return html`
    <article class="${cx('note io', `note--${variant}`)}" style="--i:${delay}">
      ${variant === 'wide' ? html`<div class="note__text">${text}</div>` : text}
      ${visual}
    </article>`;
}

/** Small mono footer line with a leading rule. */
export const NoteMeta = ({ label }) => html`<p class="note__meta mono">${label}</p>`;
