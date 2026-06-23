/**
 * js/lab/cipher.js
 * Caesar cipher (ROT-N) encode / decode tool.
 * Operates purely on Latin characters; non-alpha chars pass through unchanged.
 */

function caesarCipher(text, shift, encode) {
  const s = encode ? shift : (26 - shift) % 26;
  return text.split('').map(ch => {
    const c = ch.charCodeAt(0);
    if (c >= 65 && c <= 90) return String.fromCharCode((c - 65 + s) % 26 + 65);
    if (c >= 97 && c <= 122) return String.fromCharCode((c - 97 + s) % 26 + 97);
    return ch;
  }).join('');
}

export function initCipher() {
  const input     = document.getElementById('cipherInput');
  const shiftEl   = document.getElementById('cipherShift');
  const shiftVal  = document.getElementById('cipherShiftVal');
  const output    = document.getElementById('cipherOutput');
  const modeGroup = document.getElementById('cipherMode');
  if (!input || !shiftEl || !output || !modeGroup) return;

  let encode = true;

  function update() {
    const shift = parseInt(shiftEl.value, 10);
    shiftVal.textContent = shift;
    output.textContent   = caesarCipher(input.value.toUpperCase(), shift, encode) || '—';
  }

  input.addEventListener('input', update);
  shiftEl.addEventListener('input', update);

  modeGroup.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      modeGroup.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      encode = btn.dataset.mode === 'encode';
      update();
    });
  });

  update();
}
