import { html } from '../../lib/dom.js';

/** "Watch a build": the hero film with controls, in a native modal <dialog> (controllers/dialogs.js). */
export const BuildModal = ({ id, kicker, title, caption, close, videoSrc }) => html`
  <dialog class="build-modal" id="${id}" aria-labelledby="${id}-title">
    <div class="build-modal__inner">
      <header class="build-modal__head">
        <div>
          <p class="build-modal__kicker mono">${kicker}</p>
          <h2 class="build-modal__title" id="${id}-title">${title}</h2>
        </div>
        <form method="dialog">
          <button class="build-modal__close" type="submit" aria-label="${close}">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>
          </button>
        </form>
      </header>
      <video class="build-modal__video" src="${videoSrc}" controls muted playsinline loop preload="none"></video>
      <p class="build-modal__caption">${caption}</p>
    </div>
  </dialog>`;
