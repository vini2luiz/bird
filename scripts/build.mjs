/**
 * Production build → dist/
 *   - pre-renders App() into index.html (real HTML for SEO, first paint and no-JS readers)
 *   - inlines every @import into one stylesheet (no request waterfall)
 *   - copies the JS modules and assets/ as they are (no bundler needed)
 */
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleCss } from './lib/bundle-css.mjs';
import { App } from '../src/App.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });

const css = await bundleCss(path.join(root, 'src/styles/main.css'));
await writeFile(path.join(dist, 'assets/app.css'), css);

let page = await readFile(path.join(root, 'index.html'), 'utf8');
// Markers are matched loosely so formatting (Prettier's `/>`, line breaks) can't break the build
page = replaceOnce(
  page,
  /<link\s+rel="stylesheet"\s+href="src\/styles\/main\.css"\s*\/?>/,
  '<link rel="stylesheet" href="assets/app.css" />',
);
page = replaceOnce(page, /<div\s+id="app"\s*><\/div>/, `<div id="app" data-prerendered>${App()}</div>`);
page = replaceOnce(page, /\s*<noscript[\s\S]*?<\/noscript\s*>/, '');
await writeFile(path.join(dist, 'index.html'), page);

await cp(path.join(root, 'src'), path.join(dist, 'src'), {
  recursive: true,
  filter: (source) => !source.endsWith('.css'),
});
await cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });

console.log(`Built dist/ — index.html ${kb(page)} · app.css ${kb(css)}`);

/** Replaces the first match of `pattern`, failing loudly if index.html no longer has the marker. */
function replaceOnce(source, pattern, replacement) {
  if (!pattern.test(source)) throw new Error(`build: marker not found in index.html: ${pattern}`);
  return source.replace(pattern, () => replacement);
}

function kb(text) {
  return `${(Buffer.byteLength(text) / 1024).toFixed(1)} kB`;
}
