/**
 * js/lab/morse.js
 * Real-time Latin text → Morse code translator.
 */

const MORSE = {
  A:'.-', B:'-...', C:'-.-.', D:'-..', E:'.', F:'..-.', G:'--.', H:'....', I:'..', J:'.---',
  K:'-.-', L:'.-..', M:'--', N:'-.', O:'---', P:'.--.', Q:'--.-', R:'.-.', S:'...', T:'-',
  U:'..-', V:'...-', W:'.--', X:'-..-', Y:'-.--', Z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
  '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  ' ': '/',
};

export function initMorse() {
  const input  = document.getElementById('morseInput');
  const output = document.getElementById('morseOutput');
  if (!input || !output) return;

  function translate() {
    const result = input.value.toUpperCase().split('')
      .map(ch => MORSE[ch] ?? '?')
      .join(' ');
    output.textContent = result || '—';
  }

  input.addEventListener('input', translate);
  // seed with default value
  translate();
}
