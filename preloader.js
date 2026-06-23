/**
 * js/preloader.js
 * Animates the percentage counter and hides the preloader on window load.
 */

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const percEl    = document.getElementById('prePercent');
  if (!preloader) return;

  let pct   = 0;
  const iv  = setInterval(() => {
    pct = Math.min(pct + Math.random() * 14, 99);
    if (percEl) percEl.textContent = `${Math.floor(pct)}%`;
  }, 80);

  window.addEventListener('load', () => {
    clearInterval(iv);
    if (percEl) percEl.textContent = '100%';
    setTimeout(() => preloader.classList.add('is-hidden'), 500);
  });
}
