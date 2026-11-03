import { hasFrame } from '../lib/video.js';
import { readPixel, isNearBlack, applyBackdrop } from '../lib/backdrop.js';
import { paintThumbnails, clearThumbnails } from '../lib/thumbnails.js';

/**
 * Hero choreography: play the clip, match the page to the footage, and reveal the UI
 * (.is-revealed on the hero) the moment the bird lands.
 *
 * The hero is never left blank — it also reveals on `ended`, on `error`, when play() is
 * rejected, and after a hard timeout. With reduced motion it jumps to the last frame instead.
 *
 * @param {object} options
 * @param {HTMLElement} options.hero
 * @param {HTMLVideoElement} options.video
 * @param {HTMLCanvasElement[]} options.thumbnails - canvases with data-crop
 * @param {{update: Function, clear: Function}} [options.mask] - ghost-word cut-out (ghostWordMask.js)
 * @param {number} options.revealAt - seconds into the clip when the bird lands
 * @param {number} options.timeoutMs - hard fallback before revealing regardless
 * @param {{x: number, y: number}} options.backdropSample - where to read the backdrop colour
 * @param {number} options.ghostFactor - --ghost = backdrop × this
 * @param {boolean} options.reducedMotion
 * @returns {{ reveal: () => void, replay: () => void }}
 */
export function initHeroChoreography({
  hero,
  video,
  thumbnails,
  mask,
  revealAt,
  timeoutMs,
  backdropSample,
  ghostFactor,
  reducedMotion,
}) {
  const state = {
    started: false,
    revealed: false,
    landed: false,
    painted: false,
    backdrop: null,
    backdropDone: false,
    retriedWithoutCors: false,
    failsafe: 0,
    frameWatch: 0,
  };

  /* ── Backdrop ─────────────────────────────────────────── */

  function syncBackdrop() {
    if (state.backdropDone || !hasFrame(video)) return;
    const rgb = readPixel(video, backdropSample);
    if (rgb === null) {
      state.backdropDone = true; // readback blocked (file://, no CORS): keep the CSS fallbacks
      return;
    }
    if (isNearBlack(rgb)) return; // black lead-in frame: try again on the next timeupdate
    applyBackdrop(rgb, ghostFactor);
    state.backdrop = rgb;
    state.backdropDone = true;
  }

  /* ── Reveal ───────────────────────────────────────────── */

  function paint() {
    state.painted = paintThumbnails(video, thumbnails) || state.painted;
  }

  function reveal() {
    if (state.revealed) return;
    state.revealed = true;
    clearTimeout(state.failsafe);
    hero.classList.add('is-revealed');
  }

  /** The bird is on the twig: reveal, crop the thumbnails, and keep the word's cut-out in step. */
  function onLanded() {
    if (video.seeking) return;
    state.landed = true;
    reveal();
    if (!state.painted) paint();
    mask?.update(state.backdrop);
  }

  function armFailsafe() {
    clearTimeout(state.failsafe);
    state.failsafe = setTimeout(reveal, timeoutMs);
  }

  /* ── Playback ─────────────────────────────────────────── */

  /** Frame-accurate landing check where supported; timeupdate (~4 Hz) covers everything else. */
  function watchFrames() {
    if (!('requestVideoFrameCallback' in HTMLVideoElement.prototype)) return;
    const id = ++state.frameWatch;
    const tick = (_now, meta) => {
      if (id !== state.frameWatch) return;
      if (meta.mediaTime >= revealAt) onLanded();
      else video.requestVideoFrameCallback(tick);
    };
    video.requestVideoFrameCallback(tick);
  }

  function play() {
    const pending = video.play();
    pending?.catch?.((err) => {
      if (err?.name !== 'AbortError') reveal(); // autoplay blocked, decode failure…
    });
    watchFrames();
  }

  function jumpToLastFrame() {
    const seekToEnd = () => {
      video.pause();
      video.addEventListener(
        'seeked',
        () => {
          syncBackdrop();
          onLanded();
          paint();
        },
        { once: true },
      );
      video.currentTime = Math.max(0, video.duration - 0.05);
    };
    if (Number.isFinite(video.duration)) seekToEnd();
    else video.addEventListener('loadedmetadata', seekToEnd, { once: true });
  }

  function start() {
    if (state.started) return;
    state.started = true;
    syncBackdrop();
    if (reducedMotion) {
      reveal();
      jumpToLastFrame();
    } else {
      play();
    }
  }

  function onError() {
    // If the CORS request fails, retry as a plain one: thumbnails still work, only colour matching is lost
    if (!state.retriedWithoutCors && video.hasAttribute('crossorigin')) {
      state.retriedWithoutCors = true;
      state.started = false;
      video.removeAttribute('crossorigin');
      video.load();
      return;
    }
    reveal();
  }

  /** Restart the film. User-initiated, so it plays even with reduced motion (transitions stay off). */
  function replay() {
    state.revealed = false;
    state.landed = false;
    state.painted = false;
    hero.classList.remove('is-revealed');
    clearThumbnails(thumbnails);
    mask?.clear();
    try {
      video.currentTime = 0;
    } catch {
      /* not seekable yet */
    }
    play();
    armFailsafe();
  }

  /* ── Wiring ───────────────────────────────────────────── */

  video.addEventListener('loadeddata', start);
  video.addEventListener('timeupdate', () => {
    syncBackdrop();
    if (video.currentTime >= revealAt) onLanded();
  });
  video.addEventListener('ended', () => {
    reveal();
    paint();
    mask?.update(state.backdrop);
  });
  video.addEventListener('error', onError);

  armFailsafe();
  if (video.readyState >= 2) start(); // loadeddata may already have fired

  return { reveal, replay };
}
