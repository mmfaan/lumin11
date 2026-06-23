/**
 * js/canvas/radar.js
 * Builds a pentagonal radar chart in SVG to visualise group focus areas.
 */

const DATA = [
  { label: 'Cybersecurity', val: 0.88 },
  { label: 'AI & ML',       val: 0.80 },
  { label: 'Research',      val: 0.75 },
  { label: 'Systems',       val: 0.70 },
  { label: 'Community',     val: 0.60 },
];

export function buildRadar() {
  const svgEl    = document.getElementById('radarSvg');
  const axesEl   = document.getElementById('radarAxes');
  const shapeEl  = document.getElementById('radarShape');
  const labelsEl = document.getElementById('radarLabels');
  if (!svgEl || !axesEl || !shapeEl || !labelsEl) return;

  const cx = 120, cy = 120, maxR = 90;
  const n  = DATA.length;
  axesEl.innerHTML = '';
  labelsEl.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';

  /** Angle for the i-th axis, starting at top (−π/2) */
  const angle = i => -Math.PI / 2 + (2 * Math.PI / n) * i;

  // grid rings at 33%, 66%, 100%
  for (const g of [0.33, 0.66, 1]) {
    const pts = DATA.map((_, i) => {
      const a = angle(i);
      return `${cx + maxR * g * Math.cos(a)},${cy + maxR * g * Math.sin(a)}`;
    }).join(' ');
    const poly = document.createElementNS(ns, 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'rgba(150,140,255,.12)');
    poly.setAttribute('stroke-width', '1');
    axesEl.appendChild(poly);
  }

  // axes + labels
  const pts = [];
  DATA.forEach((d, i) => {
    const a   = angle(i);
    const ax  = cx + maxR * Math.cos(a);
    const ay  = cy + maxR * Math.sin(a);
    const r   = d.val * maxR;

    // axis line
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', ax); line.setAttribute('y2', ay);
    line.setAttribute('stroke', 'rgba(150,140,255,.2)');
    line.setAttribute('stroke-width', '1');
    axesEl.appendChild(line);

    // data point
    pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });

    // label
    const lx  = cx + (maxR + 16) * Math.cos(a);
    const ly  = cy + (maxR + 16) * Math.sin(a);
    const txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', lx);
    txt.setAttribute('y', ly);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('dominant-baseline', 'middle');
    txt.setAttribute('class', 'radar-label');
    txt.textContent = d.label;
    labelsEl.appendChild(txt);
  });

  // filled shape
  shapeEl.setAttribute('points', pts.map(p => `${p.x},${p.y}`).join(' '));
}

export function initRadar() {
  const block = document.querySelector('.radar-block');
  if (!block) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { buildRadar(); io.unobserve(block); }
    });
  }, { threshold: 0.3 });
  io.observe(block);
}
