/**
 * js/ui/theme.js
 * Dark ↔ Light theme toggle with localStorage persistence.
 */
import { playClick } from '../audio.js';

const MOON_SVG = '<path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/>';
const SUN_SVG  = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';

export function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  // restore saved preference
  const saved = localStorage.getItem('lx-theme') || 'dark';
  setTheme(saved === 'light');

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setTheme(!isLight);
    playClick();
  });

  function setTheme(light) {
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
    icon.innerHTML = light ? SUN_SVG : MOON_SVG;
    localStorage.setItem('lx-theme', light ? 'light' : 'dark');
  }
}
