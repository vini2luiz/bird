/**
 * Where a media element's picture actually lands inside its box under `object-fit: cover`.
 * @param {number} boxW - element width
 * @param {number} boxH - element height
 * @param {number} mediaW - intrinsic width (videoWidth)
 * @param {number} mediaH - intrinsic height (videoHeight)
 * @param {number} [posX=0.5] - object-position x as a fraction
 * @param {number} [posY=0.5] - object-position y as a fraction
 * @returns {{x: number, y: number, width: number, height: number}} in box coordinates
 */
export function coverRect(boxW, boxH, mediaW, mediaH, posX = 0.5, posY = 0.5) {
  const scale = Math.max(boxW / mediaW, boxH / mediaH);
  const width = mediaW * scale;
  const height = mediaH * scale;
  return { x: (boxW - width) * posX, y: (boxH - height) * posY, width, height };
}

const KEYWORDS = { left: 0, top: 0, center: 0.5, right: 1, bottom: 1 };

/**
 * Parses a computed `object-position` ("54% 50%", "center top") into fractions.
 * Length values (px) are not supported and fall back to centre.
 * @returns {[number, number]}
 */
export function parseObjectPosition(value = '50% 50%') {
  const [x = '50%', y = '50%'] = value.trim().split(/\s+/);
  return [toFraction(x), toFraction(y)];
}

function toFraction(token) {
  if (token in KEYWORDS) return KEYWORDS[token];
  if (token.endsWith('%')) return parseFloat(token) / 100;
  return 0.5;
}
