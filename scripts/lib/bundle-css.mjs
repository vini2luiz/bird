import { readFile } from 'node:fs/promises';
import path from 'node:path';

const IMPORT = /@import\s+url\(\s*["']?([^"')]+)["']?\s*\)\s*;?/g;

/**
 * Inlines `@import url("…")` statements recursively, producing one stylesheet.
 * Each file is included once, in first-import order. Only relative imports are supported,
 * and url() references inside imported files are not rewritten (this project has none).
 * @param {string} entry - path to the entry stylesheet
 * @returns {Promise<string>}
 */
export async function bundleCss(entry, seen = new Set()) {
  const file = path.resolve(entry);
  if (seen.has(file)) return '';
  seen.add(file);

  const source = await readFile(file, 'utf8');
  let out = '';
  let last = 0;
  for (const match of source.matchAll(IMPORT)) {
    out += source.slice(last, match.index);
    out += await bundleCss(path.resolve(path.dirname(file), match[1]), seen);
    last = match.index + match[0].length;
  }
  return out + source.slice(last);
}
