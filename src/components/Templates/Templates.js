import { html, escapeHtml } from '../../lib/dom.js';
import { Section } from '../Section/Section.js';

/**
 * Template picker (tabs, controllers/tabs.js) beside a dark prompt viewer whose
 * Copy button copies the visible prompt (controllers/copyButtons.js).
 */
export const Templates = ({ id, viewerId, kicker, titleHtml, intro, items, copy }) =>
  Section({
    id,
    kicker,
    titleHtml,
    intro,
    className: 'templates',
    children: html`
      <div class="templates__layout" data-tabs>
        <div class="templates__list" role="tablist" aria-label="Templates" aria-orientation="vertical">
          ${items.map((item, i) => Tab(item, i))}
        </div>
        <div class="templates__viewer io" id="${viewerId}" style="--i:1">
          ${items.map((item, i) => Panel(item, i, copy))}
        </div>
      </div>`,
  });

const Tab = ({ slug, index, nameHtml, meta }, i) => html`
  <button class="templates__tab io" style="--i:${i}" type="button" role="tab"
          id="tab-${slug}" aria-controls="panel-${slug}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
    <span class="templates__tab-index mono">${index}</span>
    <span class="templates__tab-name">${nameHtml}</span>
    <span class="templates__tab-meta mono">${meta}</span>
  </button>`;

const Panel = ({ slug, file, tags, prompt }, i, copy) => html`
  <div class="prompt-panel" role="tabpanel" id="panel-${slug}" aria-labelledby="tab-${slug}" ${i > 0 && 'hidden'}>
    <header class="prompt-panel__head mono">
      <span class="prompt-panel__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>${file}</span>
    </header>
    <pre class="prompt-panel__body" id="prompt-${slug}" tabindex="0"><code>${escapeHtml(prompt)}</code></pre>
    <footer class="prompt-panel__foot">
      <ul class="prompt-panel__tags mono" aria-label="Tags">${tags.map((tag) => html`<li>${tag}</li>`)}</ul>
      <button class="prompt-panel__copy mono" type="button" data-copy="#prompt-${slug}"
              data-label-done="${copy.done}" data-label-fail="${copy.fail}">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <rect x="5" y="5" width="8.5" height="8.5" rx="1.5"/><path d="M3 10.5V3.8C3 3.4 3.4 3 3.8 3h6.7"/>
        </svg>
        <span data-copy-label>${copy.idle}</span>
      </button>
    </footer>
  </div>`;
