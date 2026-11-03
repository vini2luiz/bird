import { html, cx } from '../../lib/dom.js';

/** One small visual per stat. Ruler and strike curve animate once their cell gets .is-in. */
const vizzes = {
  ruler: () => `<div class="stat__ruler" aria-hidden="true"><span class="stat__ruler-fill"></span></div>`,
  orbs: () => `<span class="stat__orb stat__orb--solid"></span><span class="stat__orb stat__orb--dash"></span>`,
  shimmer: () => `<span class="stat__shimmer"></span>`,
  strike: () => `
    <svg class="stat__strike" viewBox="0 0 200 34" preserveAspectRatio="none">
      <path class="draw" pathLength="1" d="M2 6 C 70 0, 120 4, 150 30 L 198 30"/>
    </svg>`,
};

const Stat = ({ label, value, unit, viz, caption, accent = false }, i) => html`
  <div class="stat io" style="--i:${i}" role="listitem">
    <span class="stat__label mono">${label}</span>
    <span class="${cx('stat__value', accent && 'stat__value--accent')}">${value}${unit && html`<small>${unit}</small>`}</span>
    <div class="stat__viz" aria-hidden="true">${vizzes[viz]?.() ?? ''}</div>
    <span class="stat__caption mono">${caption}</span>
  </div>`;

export const StatsBand = ({ stats }) => html`
  <div class="stats" role="list">${stats.map(Stat)}</div>`;
