/**
 * js/canvas/network.js
 * Hero background: interactive particle network with mouse repulsion.
 */
import { Config } from '../config.js';

const C = Config.network;

export function initNetwork() {
  const cvs  = document.getElementById('netCanvas');
  const hero = document.querySelector('.hero');
  if (!cvs || !hero) return;

  const ctx = cvs.getContext('2d');
  let W, H, nodes = [];
  let mx = -9999, my = -9999;

  function resize() {
    W = cvs.width  = hero.offsetWidth;
    H = cvs.height = hero.offsetHeight;
    const count = Math.min(C.maxNodes, Math.floor(W / C.nodePerPixel));
    nodes = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * C.speed,
      vy: (Math.random() - 0.5) * C.speed,
      r:  1.2 + Math.random() * 1.8,
    }));
  }

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  }, { passive: true });
  hero.addEventListener('mouseleave', () => { mx = -9999; my = -9999; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // update positions
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // mouse repulsion
      const dx = n.x - mx, dy = n.y - my;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < C.repelRadius) {
        n.x += (dx / d) * C.repelStrength;
        n.y += (dy / d) * C.repelStrength;
      }
    }

    // draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < C.connectDist) {
          ctx.strokeStyle = `rgba(123,92,250,${0.18 * (1 - dist / C.connectDist)})`;
          ctx.lineWidth   = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // draw nodes
    ctx.fillStyle = 'rgba(46,230,220,.7)';
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!Config.animation.reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });
}
