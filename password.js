/**
 * js/lab/password.js
 * Real-time password strength analyser using Shannon entropy estimation.
 * All analysis is 100% local — nothing is sent to any server.
 */
import { LANG } from '../i18n.js';

function calcEntropy(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw))       pool += 26;
  if (/[A-Z]/.test(pw))       pool += 26;
  if (/[0-9]/.test(pw))       pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  return pool > 0 ? pw.length * Math.log2(pool) : 0;
}

const LEVELS = [
  { max: 28, ar: 'ضعيفة جداً',  en: 'Very Weak', color: 'var(--danger)',  arTip: 'أضف حروفاً وأرقاماً ورموزاً.',          enTip: 'Add letters, digits and symbols.' },
  { max: 50, ar: 'ضعيفة',       en: 'Weak',       color: '#ff8c42',        arTip: 'حاول إضافة رموز وأرقام إضافية.',          enTip: 'Try adding more symbols and digits.' },
  { max: 70, ar: 'متوسطة',      en: 'Fair',       color: 'var(--gold)',    arTip: 'جيدة — لكن يمكن تقويتها.',              enTip: 'Good — but more complexity helps.' },
  { max: 90, ar: 'قوية',        en: 'Strong',     color: 'var(--cyan)',    arTip: 'كلمة مرور قوية!',                         enTip: 'Strong password!' },
  { max: Infinity, ar: 'ممتازة 🔥', en: 'Excellent 🔥', color: 'var(--success)', arTip: 'هذه كلمة مرور يصعب كسرها جداً.',  enTip: 'This password is very hard to crack.' },
];

export function initPassword() {
  const input   = document.getElementById('pwInput');
  const bar     = document.getElementById('pwBar');
  const label   = document.getElementById('pwLabel');
  const entropy = document.getElementById('pwEntropy');
  const tips    = document.getElementById('pwTips');
  if (!input || !bar) return;

  const emptyText = { ar: 'بانتظار الإدخال...', en: 'Waiting for input...' };
  const defTip    = { ar: 'جرّب مزج الأحرف الكبيرة والصغيرة والأرقام والرموز.', en: 'Try mixing uppercase, lowercase, numbers and symbols.' };

  input.addEventListener('input', () => {
    const pw = input.value;
    if (!pw) {
      bar.style.width      = '0%';
      bar.style.background = '';
      if (label)   label.textContent   = LANG === 'ar' ? emptyText.ar : emptyText.en;
      if (entropy) entropy.textContent = '0 bits';
      if (tips)    tips.textContent    = LANG === 'ar' ? defTip.ar : defTip.en;
      return;
    }

    const e   = calcEntropy(pw);
    const pct = Math.min((e / 100) * 100, 100);
    const lvl = LEVELS.find(l => e < l.max) || LEVELS[LEVELS.length - 1];

    bar.style.width      = `${pct}%`;
    bar.style.background = lvl.color;
    if (label)   label.textContent   = LANG === 'ar' ? lvl.ar  : lvl.en;
    if (entropy) entropy.textContent = `${Math.floor(e)} bits`;
    if (tips)    tips.textContent    = LANG === 'ar' ? lvl.arTip : lvl.enTip;
  });
}
