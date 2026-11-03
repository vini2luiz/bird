import { html } from './lib/dom.js';
import { VIDEO_SRC } from './config.js';
import { nav, hero, fieldNotes } from './data/content.js';
import { Hero } from './components/Hero/Hero.js';
import { FieldNotes } from './components/FieldNotes/FieldNotes.js';

/** Page composition: content in, markup out. No behaviour here — see controllers/. */
export const App = () => html`
  ${Hero({ nav, hero, videoSrc: VIDEO_SRC })}
  <main>
    ${FieldNotes(fieldNotes)}
  </main>`;
