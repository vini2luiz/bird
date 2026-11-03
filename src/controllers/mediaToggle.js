/**
 * One button for the hero film: Pause while playing, Play when paused mid-clip, Replay at the end.
 * Visible from the first frame, so motion that runs past five seconds can always be stopped (WCAG 2.2.2).
 * Labels come from the button's data-label-* / data-aria-* attributes.
 */
export function initMediaToggle({ button, video, choreography }) {
  const label = button.querySelector('[data-media-label]');
  const atEnd = () => video.ended || (Number.isFinite(video.duration) && video.currentTime >= video.duration - 0.1);

  function render() {
    const state = !video.paused && !video.ended ? 'pause' : atEnd() ? 'replay' : 'play';
    button.dataset.state = state;
    label.textContent = button.dataset[`label${capitalise(state)}`];
    button.setAttribute('aria-label', button.dataset[`aria${capitalise(state)}`]);
  }

  button.addEventListener('click', () => {
    switch (button.dataset.state) {
      case 'pause':
        video.pause();
        choreography.reveal(); // the viewer took control — don't keep the UI waiting
        break;
      case 'play':
        video.play().catch(() => {});
        break;
      default:
        choreography.replay();
    }
  });

  for (const type of ['play', 'playing', 'pause', 'ended', 'seeked', 'emptied']) {
    video.addEventListener(type, render);
  }
  render();
}

const capitalise = (word) => word[0].toUpperCase() + word.slice(1);
