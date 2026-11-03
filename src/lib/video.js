/** True once the element has a decoded frame that can be drawn. */
export const hasFrame = (video) => video.readyState >= 2 && video.videoWidth > 0;
