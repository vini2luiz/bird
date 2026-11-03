import { html } from '../../lib/dom.js';

/**
 * Dive from PERCH to ENTRY. The orange route draws itself (.draw) once its note gets .is-in;
 * the ripples fade in after it lands. Optional `figures` render as a stat row underneath.
 */
export const DiveArc = ({ figures = [] } = {}) => html`
  <svg class="dive" viewBox="0 0 420 250" role="img" aria-label="A dive arc from the perch, up and over, down into the water entry point">
    <line x1="22" y1="72" x2="118" y2="64" stroke="rgba(227,232,222,.5)" stroke-width="3" stroke-linecap="round"/>
    <line x1="96" y1="66" x2="112" y2="80" stroke="rgba(227,232,222,.35)" stroke-width="2" stroke-linecap="round"/>
    <text x="22" y="50">PERCH</text>
    <path class="dive__ghost" d="M72 64 C 150 -14, 292 -6, 344 196"/>
    <path class="dive__route draw" pathLength="1" d="M72 64 C 150 -14, 292 -6, 344 196"/>
    <circle cx="72" cy="66" r="4" fill="#E3E8DE"/>
    <line x1="170" y1="200" x2="412" y2="200" stroke="rgba(227,232,222,.32)" stroke-dasharray="3 5"/>
    <line x1="214" y1="214" x2="396" y2="214" stroke="rgba(227,232,222,.16)" stroke-dasharray="3 7"/>
    <line x1="252" y1="228" x2="380" y2="228" stroke="rgba(227,232,222,.1)" stroke-dasharray="3 9"/>
    <ellipse class="dive__ripple" cx="344" cy="200" rx="13" ry="3"/>
    <ellipse class="dive__ripple" cx="344" cy="200" rx="28" ry="6" style="stroke-opacity:.45"/>
    <circle cx="344" cy="200" r="3.5" fill="#E8732A"/>
    <text x="300" y="246">ENTRY</text>
  </svg>
  ${
    figures.length > 0 &&
    html`
    <div class="dive__figures">
      ${figures.map((f) => html`<div><b>${f.value}</b><span class="mono">${f.label}</span></div>`)}
    </div>`
  }`;
