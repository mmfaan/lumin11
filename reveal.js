/**
 * js/ui/reveal.js
 * Scroll-triggered reveal animations, animated counters, live clock, quote carousel.
 */
import { Config } from '../config.js';

/* ── Reveal on scroll ──────────────────────────────────────────────── */
export function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

/* ── Stagger card grids ────────────────────────────────────────────── */
export function initStagger() {
  const sel = '.sector-grid, .research-grid, .lab-grid';
  document.querySelectorAll(sel).forEach(grid => {
    grid.querySelectorAll('.sector-card, .paper-card, .lab-card').forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity .6s var(--ease) ${i * 0.09}s, transform .6s var(--ease) ${i * 0.09}s`;
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.querySelectorAll('.sector-card, .paper-card, .lab-card').forEach(card => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          });
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    io.observe(grid);
  });
}

/* ── Animated counters ─────────────────────────────────────────────── */
function animCount(el) {
  if (el.dataset.static) return;
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const dur    = 1600;
  let t0 = null;

  function step(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

export function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { animCount(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

/* ── Live clock ────────────────────────────────────────────────────── */
export function initClock() {
  const clockEl  = document.getElementById('liveClock');
  const offsetEl = document.getElementById('utcOffset');
  if (!clockEl) return;

  function tick() {
    const d   = new Date();
    const pad = n => String(n).padStart(2, '0');
    clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    if (offsetEl) {
      const off = -d.getTimezoneOffset() / 60;
      offsetEl.textContent = (off >= 0 ? '+' : '') + off;
    }
  }
  tick();
  setInterval(tick, 1000);
}

/* ── Quote carousel ────────────────────────────────────────────────── */
export function initCarousel() {
  const slides   = Array.from(document.querySelectorAll('.quote-slide:not(.quote-dots)'));
  const dotsWrap = document.getElementById('quoteDots');
  if (!slides.length || !dotsWrap) return;

  let active = 0;

  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Quote ${i + 1}`);
    btn.addEventListener('click', () => go(i));
    dotsWrap.appendChild(btn);
  });

  function go(n) {
    slides[active].classList.remove('is-active');
    dotsWrap.children[active]?.classList.remove('is-active');
    active = ((n % slides.length) + slides.length) % slides.length;
    slides[active].classList.add('is-active');
    dotsWrap.children[active]?.classList.add('is-active');
  }

  go(0);
  setInterval(() => go(active + 1), Config.carousel.interval);
}

/* ── 3-D tilt effect ───────────────────────────────────────────────── */
export function initTilt() {
  if (Config.animation.touchDevice || Config.animation.reduceMotion) return;
  document.querySelectorAll('.sector-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * 9}deg) rotateX(${-dy * 9}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .6s var(--ease)';
    });
  });
}

/* ── Magnetic buttons ──────────────────────────────────────────────── */
export function initMagnetic() {
  if (Config.animation.touchDevice || Config.animation.reduceMotion) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
      btn.style.transform = `translate(${(e.clientX - cx) * 0.28}px, ${(e.clientY - cy) * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform  = '';
      btn.style.transition = 'transform .5s var(--ease)';
    });
  });
}
