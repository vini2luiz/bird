/**
 * Tagged template for component markup: arrays are joined, null/undefined/false render nothing.
 * Values are inserted as-is — content in this project is static and trusted, and fields that may
 * contain inline markup end in `Html`. Pass anything else that could contain `<` or `&` through escapeHtml.
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

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapes text for safe insertion into HTML content or attribute values. */
export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (ch) => ENTITIES[ch]);
