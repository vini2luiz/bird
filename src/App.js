import { html } from './lib/dom.js';
import { VIDEO_SRC } from './config.js';
import {
  nav,
  hero,
  buildModal,
  fieldNotes,
  templates,
  studios,
  pricing,
  faq,
  closing,
  footer,
} from './data/content.js';
import { Hero } from './components/Hero/Hero.js';
import { FieldNotes } from './components/FieldNotes/FieldNotes.js';
import { Templates } from './components/Templates/Templates.js';
import { Studios } from './components/Studios/Studios.js';
import { Pricing } from './components/Pricing/Pricing.js';
import { Faq } from './components/Faq/Faq.js';
import { Closing } from './components/Closing/Closing.js';
import { Footer } from './components/Footer/Footer.js';
import { BuildModal } from './components/BuildModal/BuildModal.js';

/**
 * Page composition: content in, markup out. No behaviour here — see controllers/.
 * Runs in the browser (dev) and in Node (scripts/build.mjs pre-renders it into dist/index.html).
 */
export const App = () => html`
  ${Hero({ nav, hero, videoSrc: VIDEO_SRC })}
  <main>
    ${FieldNotes(fieldNotes)}
    ${Templates(templates)}
    ${Studios(studios)}
    ${Pricing(pricing)}
    ${Faq(faq)}
    ${Closing(closing)}
  </main>
  ${Footer(footer)}
  ${BuildModal({ ...buildModal, videoSrc: VIDEO_SRC })}
  <div class="sr-only" aria-live="polite" data-live-region></div>`;
