/**
 * js/ui/faq.js
 * Accordion-style FAQ: only one item open at a time.
 */
import { playClick } from '../audio.js';

export function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('is-open');

      // close all
      document.querySelectorAll('.faq-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-a').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
      playClick();
    });
  });
}
