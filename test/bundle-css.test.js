import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleCss } from '../scripts/lib/bundle-css.mjs';

test('bundleCss inlines nested imports once, in order', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'kf-css-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await mkdir(path.join(dir, 'parts'));
  await writeFile(
    path.join(dir, 'main.css'),
    '@import url("./parts/a.css");\n@import url(\'./parts/b.css\');\n.main{}',
  );
  await writeFile(path.join(dir, 'parts/a.css'), '.a{}');
  await writeFile(path.join(dir, 'parts/b.css'), '@import url("./a.css");\n.b{}');

  const css = await bundleCss(path.join(dir, 'main.css'));
  assert.equal(css.replace(/\s+/g, ''), '.a{}.b{}.main{}');
});

test('the real stylesheet bundles with no imports left over', async () => {
  const css = await bundleCss(fileURLToPath(new URL('../src/styles/main.css', import.meta.url)));
  assert.ok(!/@import\s+url\(/.test(css));
  assert.ok(css.includes('.hero__word'));
  assert.ok(css.includes('.stat__ruler-fill'));
});
