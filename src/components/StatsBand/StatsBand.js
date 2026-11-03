import { html, cx } from '../../lib/dom.js';

/** One small visual per stat. The ruler and the strike curve animate once their cell gets .is-in. */
const vizzes = {
  ruler: ({ ticks = [] }) => html`
    <div class="stat__ruler-wrap">
      <div class="stat__ruler"><span class="stat__ruler-fill"></span></div>
      <div class="stat__ruler-ticks mono">${ticks.map((t) => html`<span>${t}</span>`)}</div>
    </div>`,

  orbs: ({ orbs = [] }) =>
    orbs.map(
      (label, i) => html`
      <span class="stat__orb-item">
        <span class="${cx('stat__orb', i === 0 ? 'stat__orb--solid' : 'stat__orb--dash')}"></span>
        <span class="mono">${label}</span>
      </span>`,
    ),

  shimmer: () => `<span class="stat__shimmer"></span>`,

  // Perch → arc → entry, drawn on the same vocabulary as the dive note
  strike: () => `
    <svg class="stat__strike" viewBox="0 0 200 44">
      <circle cx="6" cy="10" r="3" fill="#E3E8DE"/>
      <path class="draw" pathLength="1" d="M6 10 C 70 -6, 128 0, 156 36"/>
      <line x1="104" y1="36" x2="198" y2="36" stroke="rgba(227,232,222,.35)" stroke-dasharray="3 4"/>
      <ellipse class="stat__ripple" cx="156" cy="36" rx="10" ry="2.5"/>
    </svg>`,
};

const Stat = (stat, i) => html`
  <div class="stat io" style="--i:${i}" role="listitem">
    <span class="stat__label mono">${stat.label}</span>
    <span class="${cx('stat__value', stat.accent && 'stat__value--accent')}">${stat.value}${stat.unit && html`<small>${stat.unit}</small>`}</span>
    <div class="stat__viz" aria-hidden="true">${vizzes[stat.viz]?.(stat) ?? ''}</div>
    <span class="stat__caption mono">${stat.caption}</span>
  </div>`;

export const StatsBand = ({ stats }) => html`
  <div class="stats" role="list">${stats.map(Stat)}</div>`;
