import { html } from '../../lib/dom.js';
import { Section } from '../Section/Section.js';
import { NoteCard } from '../NoteCard/NoteCard.js';
import { DiveArc } from '../DiveArc/DiveArc.js';
import { Swatches } from '../Swatches/Swatches.js';
import { Eyelid } from '../Eyelid/Eyelid.js';
import { EyeTarget } from '../EyeTarget/EyeTarget.js';
import { StatsBand } from '../StatsBand/StatsBand.js';

/** Maps a note's `visual.type` (from data/content.js) to the component that renders it. */
const visuals = {
  dive: DiveArc,
  swatches: Swatches,
  eyelid: Eyelid,
  eye: EyeTarget,
};

const renderVisual = (visual) => (visual ? (visuals[visual.type]?.(visual) ?? '') : '');

/** "02 Field notes — Why a kingfisher": bento of notes, then the stats band. */
export const FieldNotes = ({ id, kicker, titleHtml, intro, notes, stats }) =>
  Section({
    id,
    kicker,
    titleHtml,
    intro,
    className: 'field-notes',
    children: html`
      <div class="field-notes__bento">
        ${notes.map((note, i) => NoteCard({ ...note, visual: renderVisual(note.visual), delay: i }))}
      </div>
      ${StatsBand({ stats })}`,
  });
