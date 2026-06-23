/**
 * js/forms.js — GitHub Pages / Static version
 * Contact form shows success UI (no backend).
 * To receive real emails, integrate with Formspree: https://formspree.io
 */
import { playSuccess } from './audio.js';
import { LANG } from './i18n.js';

export function initForms() {
  initContactForm();
  initNewsletter();
}

function initContactForm() {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');
  const btn   = form?.querySelector('[type="submit"]');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (btn) {
      btn.disabled    = true;
      btn.textContent = LANG === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
    }

    /*
     * ──────────────────────────────────────────────────────────
     * لتفعيل الإرسال الحقيقي بدون خادم:
     * 1. سجّل في https://formspree.io وأنشئ نموذجاً
     * 2. استبدل YOUR_FORM_ID أدناه بالـ ID الخاص بك
     * 3. احذف السطر الذي يمنع الإرسال (preventDefault)
     * ──────────────────────────────────────────────────────────
     * const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *   method:  'POST',
     *   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
     *   body: JSON.stringify({
     *     name:    form.querySelector('#fname')?.value,
     *     email:   form.querySelector('#femail')?.value,
     *     subject: form.querySelector('#fsubject')?.value,
     *     message: form.querySelector('#fmsg')?.value,
     *   }),
     * });
     */

    // Demo success — replace with Formspree fetch above for real emails
    await new Promise(r => setTimeout(r, 600));
    toast?.classList.add('show');
    form.reset();
    playSuccess();
    setTimeout(() => toast?.classList.remove('show'), 4500);

    if (btn) {
      btn.disabled    = false;
      btn.textContent = LANG === 'ar' ? 'إرسال الرسالة' : 'Send Message';
    }
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.innerHTML = `<span style="color:var(--success);font-family:var(--font-mono);font-size:.85rem">
      ✓ ${LANG === 'ar' ? 'تم التسجيل بنجاح!' : 'Subscribed successfully!'}
    </span>`;
    playSuccess();
  });
}
