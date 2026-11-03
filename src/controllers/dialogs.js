/**
 * [data-open-dialog="id"] opens <dialog id="id"> as a modal. Clicking the backdrop closes it,
 * and any video inside plays on open and rewinds on close.
 */
export function initDialogs(root) {
  root.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open-dialog]');
    if (!opener) return;
    const dialog = document.getElementById(opener.dataset.openDialog);
    if (!dialog?.showModal) return;
    event.preventDefault();
    dialog.showModal();
    dialog
      .querySelector('video')
      ?.play()
      .catch(() => {});
  });

  for (const dialog of root.querySelectorAll('dialog')) {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close(); // a click on the ::backdrop targets the dialog itself
    });
    dialog.addEventListener('close', () => {
      const video = dialog.querySelector('video');
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
  }
}
