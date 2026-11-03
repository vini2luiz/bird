const RESET_MS = 2000;
const timers = new WeakMap();

/**
 * [data-copy="#selector"] buttons copy that element's text. The button's [data-copy-label] swaps to
 * data-label-done / data-label-fail for two seconds, and the live region announces the result.
 */
export function initCopyButtons(root, { live } = {}) {
  root.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    const source = root.querySelector(button.dataset.copy);
    if (!source) return;

    const ok = await copyText(source.textContent.trim());
    const label = button.querySelector('[data-copy-label]') ?? button;
    button.dataset.labelIdle ??= label.textContent;

    label.textContent = ok ? button.dataset.labelDone : button.dataset.labelFail;
    button.classList.toggle('is-done', ok);
    if (live) live.textContent = ok ? 'Prompt copied to clipboard.' : 'Copy failed — select the text to copy it.';

    clearTimeout(timers.get(button));
    timers.set(
      button,
      setTimeout(() => {
        label.textContent = button.dataset.labelIdle;
        button.classList.remove('is-done');
      }, RESET_MS),
    );
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API unavailable (insecure context, old browser): fall back to a hidden textarea
    const area = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
    area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}
