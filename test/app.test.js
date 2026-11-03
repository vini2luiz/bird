import { test } from 'node:test';
import assert from 'node:assert/strict';
import { App } from '../src/App.js';
import { REVEAL_AT } from '../src/config.js';

const page = App();
const ids = [...page.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);

test('renders without leaked placeholders', () => {
  for (const leak of ['undefined', 'NaN', '[object Object]']) {
    assert.ok(!page.includes(leak), `page contains "${leak}"`);
  }
});

test('element ids are unique', () => {
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert.deepEqual(duplicates, []);
});

test('every in-page link and aria reference points at an existing id', () => {
  const references = [
    ...[...page.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]),
    ...[...page.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)].map((m) => m[1]),
    ...[...page.matchAll(/data-open-dialog="([^"]+)"/g)].map((m) => m[1]),
    ...[...page.matchAll(/data-copy="#([^"]+)"/g)].map((m) => m[1]),
  ];
  for (const ref of references) assert.ok(ids.includes(ref), `missing #${ref}`);
});

test('the hero reveal staggers nine elements in order', () => {
  const slots = [...page.matchAll(/class="[^"]*\brv\b[^"]*"\s+style="--d:(\d+)"/g)].map((m) => Number(m[1]));
  assert.deepEqual(slots, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test('the media toggle sits outside the reveal so the film can always be paused', () => {
  const toggle = /<button[^>]*data-media-toggle[^>]*>/.exec(page)?.[0];
  assert.ok(toggle, 'media toggle rendered');
  assert.ok(!/\brv\b/.test(toggle));
});

test('exactly one template panel is visible at first', () => {
  const panels = [...page.matchAll(/<div class="prompt-panel"[^>]*>/g)].map((m) => m[0]);
  assert.equal(panels.length, 3);
  assert.equal(panels.filter((tag) => !/\shidden\b/.test(tag)).length, 1);
});

test('REVEAL_AT is a positive number of seconds', () => {
  assert.ok(Number.isFinite(REVEAL_AT) && REVEAL_AT > 0);
});
