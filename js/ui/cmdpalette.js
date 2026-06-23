/**
 * js/ui/cmdpalette.js
 * Keyboard-driven command palette (Ctrl+K / ⌘K).
 */
import { LANG, t } from '../i18n.js';
import { playClick } from '../audio.js';
import { toggleMatrix } from '../canvas/matrix.js';

const ITEMS = [
  { ar: 'الرئيسية',              en: 'Home',               href: '#home',      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { ar: 'من نحن',                en: 'About',              href: '#about',     icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>' },
  { ar: 'القطاعات',             en: 'Sectors',            href: '#sectors',   icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  { ar: 'المرصد الحي',           en: 'Live Observatory',   href: '#live',      icon: '<path d="M3 17l6-6 4 4 8-8"/>' },
  { ar: 'المختبر التفاعلي',     en: 'Interactive Lab',    href: '#lab',       icon: '<path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18"/>' },
  { ar: 'الأبحاث',              en: 'Research',           href: '#research',  icon: '<path d="M4 19.5V6a2 2 0 012-2h13v15"/>' },
  { ar: 'الرئيس',               en: 'President',          href: '#president', icon: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  { ar: 'تواصل معنا',           en: 'Contact',            href: '#contact',   icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' },
  { ar: 'الموقع الشخصي للرئيس', en: "President's Site",   href: 'https://muhamed1.netlify.app', icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20"/>'},
  { ar: 'تبديل المظهر',         en: 'Toggle Theme',       href: '#__theme',   icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2"/>' },
  { ar: 'وضع المصفوفة',         en: 'Matrix Mode',        href: '#__matrix',  icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
];

const SVG_WRAP = inner =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export function initCmdPalette() {
  const overlay = document.getElementById('cmdkOverlay');
  const input   = document.getElementById('cmdkInput');
  const list    = document.getElementById('cmdkList');
  const trigger = document.getElementById('cmdkTrigger');
  if (!overlay || !input || !list) return;

  let active = 0;

  const open = () => {
    overlay.classList.add('is-open');
    input.value = '';
    active = 0;
    render('');
    setTimeout(() => input.focus(), 50);
  };
  const close = () => overlay.classList.remove('is-open');

  const execute = href => {
    close();
    if (href === '#__theme')  { document.getElementById('themeToggle')?.click(); return; }
    if (href === '#__matrix') { toggleMatrix(); return; }
    if (href.startsWith('http')) { window.open(href, '_blank', 'noopener'); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playClick();
  };

  function render(q) {
    const filtered = ITEMS.filter(it => {
      const label = LANG === 'ar' ? it.ar : it.en;
      return label.toLowerCase().includes(q.toLowerCase()) || it.href.includes(q);
    });

    if (!filtered.length) {
      list.innerHTML = `<div class="cmdk-empty">${LANG === 'ar' ? 'لا توجد نتائج' : 'No results'}</div>`;
      return;
    }

    list.innerHTML = filtered.map((it, i) => {
      const label = LANG === 'ar' ? it.ar : it.en;
      return `<div class="cmdk-item${i === active ? ' is-active' : ''}" data-href="${it.href}">
        ${SVG_WRAP(it.icon)}<b>${label}</b><span>↵</span>
      </div>`;
    }).join('');

    list.querySelectorAll('.cmdk-item').forEach(item => {
      item.addEventListener('click', () => execute(item.dataset.href));
    });
  }

  input.addEventListener('input', () => { active = 0; render(input.value); });
  input.addEventListener('keydown', e => {
    const items = list.querySelectorAll('.cmdk-item');
    if (e.key === 'ArrowDown') { active = Math.min(active + 1, items.length - 1); render(input.value); }
    else if (e.key === 'ArrowUp')  { active = Math.max(active - 1, 0); render(input.value); }
    else if (e.key === 'Enter')    { const it = items[active]; if (it) execute(it.dataset.href); }
    else if (e.key === 'Escape')   { close(); }
  });

  trigger?.addEventListener('click', open);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
}
