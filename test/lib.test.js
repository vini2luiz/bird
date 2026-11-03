import { test } from 'node:test';
import assert from 'node:assert/strict';
import { html, cx, escapeHtml } from '../src/lib/dom.js';
import { computeCrop, parseCrop } from '../src/lib/thumbnails.js';
import { ghostOf, isNearBlack } from '../src/lib/backdrop.js';
import { coverRect, parseObjectPosition } from '../src/lib/geometry.js';
import { silhouetteAlpha, dilateHoles } from '../src/lib/silhouette.js';

test('html joins arrays and drops null, undefined and false', () => {
  assert.equal(html`<a>${['x', 'y']}</a>`, '<a>xy</a>');
  assert.equal(html`${null}${undefined}${false}${0}`, '0');
  assert.equal(html`<i>${[['a'], ['b']]}</i>`, '<i>ab</i>');
});

test('cx skips falsy class names', () => {
  assert.equal(cx('a', false, null, 'b', ''), 'a b');
});

test('escapeHtml neutralises markup characters', () => {
  assert.equal(
    escapeHtml(`<a href="x">Tom & 'Jerry'</a>`),
    '&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;',
  );
});

test('computeCrop centres a square on the given point', () => {
  assert.deepEqual(computeCrop(1000, 500, [0.5, 0.5, 0.2]), { sx: 400, sy: 150, size: 200 });
});

test('computeCrop clamps the square inside the frame', () => {
  assert.deepEqual(computeCrop(1000, 500, [0, 1, 0.2]), { sx: 0, sy: 300, size: 200 });
  assert.equal(computeCrop(1000, 500, [0.5, 0.5, 0.9]).size, 500, 'never larger than the short side');
});

test('parseCrop reads the data-crop attribute', () => {
  assert.deepEqual(parseCrop('0.555,0.335,0.22'), [0.555, 0.335, 0.22]);
});

test('ghostOf scales the backdrop and rounds each channel', () => {
  assert.deepEqual(ghostOf([182, 195, 176], 0.955), [174, 186, 168]);
});

test('isNearBlack flags lead-in frames only', () => {
  assert.equal(isNearBlack([5, 6, 7]), true);
  assert.equal(isNearBlack([182, 195, 176]), false);
});

test('coverRect fills the box and crops the overflowing axis', () => {
  // 16:9 media in a square box: scaled to the height, centred horizontally
  assert.deepEqual(coverRect(900, 900, 1600, 900), { x: -350, y: 0, width: 1600, height: 900 });
  // object-position 0% pins the left edge
  assert.ok(coverRect(900, 900, 1600, 900, 0).x === 0);
});

test('parseObjectPosition handles percentages and keywords', () => {
  assert.deepEqual(parseObjectPosition('54% 50%'), [0.54, 0.5]);
  assert.deepEqual(parseObjectPosition('right top'), [1, 0]);
  assert.deepEqual(parseObjectPosition('12px 50%'), [0.5, 0.5], 'lengths fall back to centre');
});

test('silhouetteAlpha keeps the backdrop and cuts out the subject', () => {
  const backdrop = [180, 190, 175];
  const pixels = new Uint8ClampedArray([
    180,
    190,
    175,
    255, // backdrop
    184,
    186,
    179,
    255, // backdrop with compression noise
    240,
    240,
    240,
    255, // white cheek patch
    20,
    40,
    60,
    255, //    dark feathers
  ]);
  assert.deepEqual([...silhouetteAlpha(pixels, backdrop, 54)], [255, 255, 0, 0]);
});

test('dilateHoles grows holes by the radius in both axes', () => {
  const width = 5;
  const alpha = new Uint8ClampedArray(25).fill(255);
  alpha[12] = 0; // centre pixel
  const grown = dilateHoles(alpha, width, 5, 1);
  const holes = [...grown].map((a, i) => (a === 0 ? i : -1)).filter((i) => i >= 0);
  assert.deepEqual(holes, [6, 7, 8, 11, 12, 13, 16, 17, 18]);
  assert.equal(dilateHoles(alpha, width, 5, 0), alpha, 'radius 0 is a no-op');
});
