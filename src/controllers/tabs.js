const KEY_STEP = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/**
 * WAI-ARIA tabs for every [data-tabs] container: click to select, arrow keys / Home / End to move.
 * Each [role="tab"] names its panel with aria-controls; inactive panels get `hidden`.
 */
export function initTabs(root) {
  for (const container of root.querySelectorAll('[data-tabs]')) {
    const tabs = Array.from(container.querySelectorAll('[role="tab"]'));

    const select = (tab, { focus = true } = {}) => {
      for (const t of tabs) {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
      }
      if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, { focus: false }));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key in KEY_STEP) next = tabs[(i + KEY_STEP[event.key] + tabs.length) % tabs.length];
        else if (event.key === 'Home') next = tabs[0];
        else if (event.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        event.preventDefault();
        select(next);
      });
    });
  }
}
