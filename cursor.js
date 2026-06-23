/**
 * js/cursor.js
 * Custom cursor with lagging ring and glowing particle trail.
 */
import { Config } from './config.js';

const { touchDevice } = Config.animation;

export function initCursor() {
  if (touchDevice) return;

  const dot   = document.getElementById('cursorDot');
  const ring  = document.getElementById('cursorRing');
  const cvs   = document.getElementById('trailCanvas');
  if (!dot || !ring || !cvs) return;

  const ctx = cvs.getContext('2d');
  let W, H;
  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  const trail = [];

  function resize() {
    W = cvs.width  = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    trail.push({ x: mx, y: my });
    if (trail.length > 30) trail.shift();
  }, { passive: true });

  (function loop() {
    // smooth ring follow
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;

    // draw trail
    ctx.clearRect(0, 0, W, H);
    for (let i = 1; i < trail.length; i++) {
      const p  = trail[i];
      const pp = trail[i - 1];
      const t  = i / trail.length;
      ctx.beginPath();
      ctx.moveTo(pp.x, pp.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(46,230,220,${0.22 * t})`;
      ctx.lineWidth   = t * 3.5;
      ctx.lineCap     = 'round';
      ctx.stroke();
    }
    requestAnimationFrame(loop);
  })();

  // cursor enlarges on interactive elements
  const targets = 'a, button, input, textarea, select, .sector-card, .paper-card, .lab-card, .faq-q';
  document.querySelectorAll(targets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
}
