import { html, cx } from '../../lib/dom.js';
import { Section } from '../Section/Section.js';
import { CtaButton, PillButton } from '../Button/Button.js';

const Check = () => `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7"/>
  </svg>`;

const Tier = ({ name, price, period, blurb, features, cta, featured = false, badge }, i) => html`
  <article class="${cx('tier io', featured && 'tier--featured')}" style="--i:${i}">
    <header class="tier__head">
      <h3 class="tier__name mono">${name}</h3>
      ${badge && html`<span class="tier__badge mono">${badge}</span>`}
    </header>
    <p class="tier__price"><span class="tier__amount">${price}</span><span class="tier__period mono">${period}</span></p>
    <p class="tier__blurb">${blurb}</p>
    <ul class="tier__features">
      ${features.map((feature) => html`<li>${Check()}${feature}</li>`)}
    </ul>
    <div class="tier__cta">${featured ? CtaButton(cta) : PillButton({ ...cta, variant: 'outline' })}</div>
  </article>`;

export const Pricing = ({ id, kicker, titleHtml, intro, tiers }) =>
  Section({
    id,
    kicker,
    titleHtml,
    intro,
    className: 'pricing',
    children: html`<div class="pricing__tiers">${tiers.map(Tier)}</div>`,
  });
