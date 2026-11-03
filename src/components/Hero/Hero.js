import { html } from '../../lib/dom.js';
import { Nav } from '../Nav/Nav.js';
import { HeroCopy } from '../HeroCopy/HeroCopy.js';
import { TrustRow } from '../TrustRow/TrustRow.js';
import { PromptCardGrid } from '../PromptCard/PromptCard.js';
import { SpeciesStrip } from '../SpeciesStrip/SpeciesStrip.js';
import { MediaToggle } from '../MediaToggle/MediaToggle.js';

/**
 * Full-viewport hero. Layer order (bottom → top):
 *   video → ghost word (mix-blend-mode: darken) → legibility veil → UI.
 * Stagger slots (--d): nav 0 · eyebrow 1 · h1 2 · lede 3 · buttons 4 · trust 5 · cards 6–7 · strip 8.
 * The media toggle is deliberately outside the reveal: the film must be pausable from the first frame.
 * Behaviour lives in controllers/ and hooks onto the data-* attributes.
 */
export const Hero = ({ nav, hero, videoSrc }) => html`
  <header class="hero" data-hero>
    <video class="hero__video" data-hero-video
           src="${videoSrc}"
           muted playsinline preload="auto" crossorigin="anonymous"
           aria-hidden="true" tabindex="-1"></video>

    <p class="hero__word" data-ghost-word aria-hidden="true">${hero.ghostWord.plain}<em>${hero.ghostWord.italic}</em></p>
    <div class="hero__veil" aria-hidden="true"></div>

    ${Nav({ ...nav, className: 'hero__nav', delay: 0 })}

    ${HeroCopy({ ...hero, className: 'hero__copy', delay: 1 })}

    <aside class="hero__cluster" aria-label="Highlights">
      ${TrustRow({ ...hero.trust, delay: 5 })}
      ${PromptCardGrid(hero.cards, { delay: 6 })}
    </aside>

    ${SpeciesStrip({ ...hero.strip, className: 'hero__strip', delay: 8 })}
    ${MediaToggle({ ...hero.media, className: 'hero__media' })}
  </header>`;
