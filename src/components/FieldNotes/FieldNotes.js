import { html } from '../../lib/dom.js';
import { NoteCard, NoteMeta } from '../NoteCard/NoteCard.js';
import { DiveArc } from '../DiveArc/DiveArc.js';
import { Swatches } from '../Swatches/Swatches.js';
import { EyeTarget } from '../EyeTarget/EyeTarget.js';
import { StatsBand } from '../StatsBand/StatsBand.js';
import { Closing } from '../Closing/Closing.js';
import { Footer } from '../Footer/Footer.js';

/** Maps a note's `visual.type` (from data/content.js) to the component that renders it. */
const visuals = {
  dive: DiveArc,
  swatches: Swatches,
  meta: NoteMeta,
  eye: EyeTarget,
};

const renderVisual = (visual) => (visual ? visuals[visual.type]?.(visual) ?? '' : '');

/** "02 Field notes — Why a kingfisher": header, bento of notes, stats band, closing CTA. */
export const FieldNotes = ({ kicker, titleHtml, intro, notes, stats, closing, footer }) => html`
  <section class="field-notes" id="why" aria-labelledby="why-title">
    <div class="wrap">
      <div class="field-notes__head">
        <div>
          <p class="field-notes__kicker mono io"><b>${kicker.number}</b>${kicker.label}</p>
          <h2 class="field-notes__title io" style="--i:1" id="why-title">${titleHtml}</h2>
        </div>
        <p class="field-notes__intro io" style="--i:2">${intro}</p>
      </div>

      <div class="field-notes__bento">
        ${notes.map((note, i) => NoteCard({ ...note, visual: renderVisual(note.visual), delay: i }))}
      </div>

      ${StatsBand({ stats })}
      ${Closing(closing)}
      ${Footer(footer)}
    </div>
  </section>`;
