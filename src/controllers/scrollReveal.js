/**
 * Adds .is-in to each matching element the first time it scrolls into view.
 * CSS (styles/animations.css) handles the fade-up, self-drawing paths and the ruler.
 */
export function initScrollReveal(root, { selector = '.io', threshold = 0.18, reducedMotion = false } = {}) {
  const targets = root.querySelectorAll(selector);

  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }
  }, { threshold });

  targets.forEach((el) => observer.observe(el));
}
