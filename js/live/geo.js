/**
 * js/live/geo.js — GitHub Pages / Static version
 * Calls ipapi.co directly from the browser (no server proxy needed).
 */

function setW(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('skeleton');
  el.textContent = val;
}

function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('Edg'))     return 'Microsoft Edge';
  if (ua.includes('Chrome'))  return 'Google Chrome';
  if (ua.includes('Firefox')) return 'Mozilla Firefox';
  if (ua.includes('Safari'))  return 'Safari';
  if (ua.includes('OPR'))     return 'Opera';
  return 'Unknown Browser';
}

function detectOS() {
  const p = navigator.platform || navigator.userAgent;
  if (/Win/i.test(p))             return 'Windows';
  if (/Mac/i.test(p))             return 'macOS';
  if (/Android/i.test(p))         return 'Android';
  if (/iPhone|iPad|iOS/i.test(p)) return 'iOS';
  if (/Linux/i.test(p))           return 'Linux';
  return 'Unknown';
}

export async function initGeo() {
  document.getElementById('wBrowser')?.classList.remove('skeleton');
  document.getElementById('wOs')?.classList.remove('skeleton');
  if (document.getElementById('wBrowser')) document.getElementById('wBrowser').textContent = detectBrowser();
  if (document.getElementById('wOs'))      document.getElementById('wOs').textContent      = detectOS();

  try {
    const res  = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setW('wIp',      data.ip           || '—');
    setW('wCountry', data.country_name || '—');
    setW('wCity',    data.city         || '—');
    setW('wIsp',     data.org          || '—');
  } catch (err) {
    console.warn('[geo]', err.message);
    ['wIp', 'wCountry', 'wCity', 'wIsp'].forEach(id => setW(id, 'N/A'));
  }
}
