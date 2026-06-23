/**
 * js/canvas/signal.js
 * Decorative "world network pulse" canvas — animated nodes with ripple effects.
 */
import { Config } from '../config.js';

const NODE_LABELS = [
  'BASRA-01','BGHDAD-02','ERBIL-03','MOSUL-04','AMMAN-05',
  'DUBAI-06','CAIRO-07','RIYADH-08','LONDON-09','NYC-10',
  'BERLIN-11','TOKYO-12','SGPORE-13','SYDNEY-14','PARIS-15',
];
const COLORS = ['#2ee6dc','#7b5cfa','#ff4fd8','#34e7a1','#ffd166'];

export function initSignal() {
  const cvs = document.getElementById('signalCanvas');
  if (!cvs) return;

  const ctx = cvs.getContext('2d');
  let W, H, nodes = [], ripples = [];

  function resize() {
    W = cvs.width  = cvs.offsetWidth;
    H = cvs.height = cvs.offsetHeight;
    buildNodes();
  }

  function buildNodes() {
    const count = Math.min(NODE_LABELS.length, Math.floor(W / 50));
    nodes = Array.from({ length: count }, (_, i) => ({
      x:         20 + Math.random() * (W - 40),
      y:         20 + Math.random() * (H - 40),
      label:     NODE_LABELS[i],
      color:     COLORS[i % COLORS.length],
      pingTimer: Math.floor(Math.random() * 200),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // subtle grid
    ctx.strokeStyle = 'rgba(150,140,255,.06)';
    ctx.lineWidth   = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // update / trigger pings
    for (const n of nodes) {
      if (--n.pingTimer <= 0) {
        n.pingTimer = 60 + Math.floor(Math.random() * 180);
        const target = nodes[Math.floor(Math.random() * nodes.length)];
        if (target !== n) {
          ripples.push({ x: n.x, y: n.y, tx: target.x, ty: target.y, prog: 0, color: n.color, kind: 'line' });
          ripples.push({ x: n.x, y: n.y, r: 0, maxR: 80, color: n.color, kind: 'ring' });
        }
      }
    }

    // draw ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      if (rp.kind === 'line') {
        rp.prog = Math.min(rp.prog + 0.04, 1);
        const cx = rp.x + (rp.tx - rp.x) * rp.prog;
        const cy = rp.y + (rp.ty - rp.y) * rp.prog;
        ctx.globalAlpha = 0.35 * (1 - rp.prog);
        ctx.strokeStyle = rp.color;
        ctx.lineWidth   = 1;
        ctx.beginPath(); ctx.moveTo(rp.x, rp.y); ctx.lineTo(cx, cy); ctx.stroke();
        ctx.globalAlpha = 1;
        if (rp.prog >= 1) ripples.splice(i, 1);
      } else {
        rp.r += 1.4;
        ctx.globalAlpha = Math.max(0, 0.5 * (1 - rp.r / rp.maxR));
        ctx.strokeStyle = rp.color;
        ctx.lineWidth   = 1.5;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
        if (rp.r >= rp.maxR) ripples.splice(i, 1);
      }
    }

    // draw nodes
    for (const n of nodes) {
      ctx.shadowColor = n.color; ctx.shadowBlur = 10;
      ctx.fillStyle   = n.color;
      ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur  = 0;
      ctx.fillStyle   = 'rgba(200,200,255,.75)';
      ctx.font        = '8px monospace';
      ctx.fillText(n.label, n.x + 7, n.y + 3);
    }

    if (!Config.animation.reduceMotion) requestAnimationFrame(draw);
  }

  // only start when visible
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { resize(); draw(); io.unobserve(cvs); }
    });
  }, { threshold: 0.2 });
  io.observe(cvs);
  window.addEventListener('resize', resize, { passive: true });
}
