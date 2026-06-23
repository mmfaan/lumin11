/**
 * js/ui/header.js
 * Handles: sticky header shrink on scroll, mobile nav burger,
 * scroll-progress bar, back-to-top FAB, marquee speed on scroll.
 */
import { playClick } from '../audio.js';

export function initHeader() {
  const header    = document.getElementById('siteHeader');
  const bar       = document.getElementById('scrollbar');
  const toTop     = document.getElementById('toTop');
  const burger    = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const marquee   = document.getElementById('marqueeTrack');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const max      = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // progress bar
    if (bar) bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';

    // header shrink
    header?.classList.toggle('is-scrolled', scrolled > 40);

    // back-to-top visibility
    toTop?.classList.toggle('show', scrolled > 500);

    // marquee speed reacts to scroll velocity
    if (marquee) {
      const vel   = Math.abs(scrolled - lastScroll);
      const speed = Math.max(8, 32 - vel * 0.5);
      marquee.style.animationDuration = `${speed}s`;
    }
    lastScroll = scrolled;
  }, { passive: true });

  // Back-to-top click
  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClick();
  });

  // Burger / mobile nav
  burger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('is-open');
    playClick();
  });
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('is-open'));
  });
}

/** Smooth scroll for all in-page anchor links */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href   = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
