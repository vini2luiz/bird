/**
 * Tagged template for component markup: arrays are joined, null/undefined/false render nothing.
 * Values are inserted as-is — all content in this project is static and trusted.
 * Escape anything user-supplied before passing it in.
 */
export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += render(value) + strings[i + 1];
  });
  return out;
}

function render(value) {
  if (Array.isArray(value)) return value.map(render).join('');
  if (value === null || value === undefined || value === false) return '';
  return String(value);
}

/** Joins class names, skipping falsy entries. */
export const cx = (...names) => names.filter(Boolean).join(' ');
