/**
 * js/canvas/matrix.js
 * "Matrix rain" easter-egg overlay.
 * Renders falling Katakana + ASCII + Lumin chars on a fixed canvas.
 */
import { Config } from '../config.js';

const { chars, fontSize, fadeFill } = Config.matrix;

let cvs, ctx, cols = [], raf = null, _on = false;

function resize() {
  cvs.width  = window.innerWidth;
  cvs.height = window.innerHeight;
  const n = Math.floor(cvs.width / fontSize);
  cols = Array.from({ length: n }, () => Math.floor(Math.random() * cvs.height / fontSize));
}

function draw() {
  ctx.fillStyle = fadeFill;
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.font = `${fontSize}px JetBrains Mono, monospace`;

  for (let i = 0; i < cols.length; i++) {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    const x  = i * fontSize;
    const y  = cols[i] * fontSize;

    // leading character — bright white
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fillText(ch, x, y);

    // trailing character — cyan
    ctx.fillStyle = 'rgba(46,230,220,.65)';
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);

    if (y > cvs.height && Math.random() > 0.97) cols[i] = 0;
    else cols[i]++;
  }

  if (_on) raf = requestAnimationFrame(draw);
}

export function initMatrix() {
  cvs = document.getElementById('matrixCanvas');
  if (!cvs) return;
  ctx = cvs.getContext('2d');
  window.addEventListener('resize', () => { if (_on) resize(); }, { passive: true });
}

export function toggleMatrix() {
  _on = !_on;
  const overlay = document.getElementById('matrixOverlay');
  const btn     = document.getElementById('matrixToggleBtn');

  if (_on) {
    overlay?.classList.add('is-on');
    btn?.classList.add('is-on');
    document.body.style.filter = 'hue-rotate(100deg)';
    resize();
    draw();
  } else {
    overlay?.classList.remove('is-on');
    btn?.classList.remove('is-on');
    document.body.style.filter = '';
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    ctx?.clearRect(0, 0, cvs.width, cvs.height);
  }
}
