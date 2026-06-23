/**
 * js/audio.js
 * Web Audio API — lightweight sound effects (click, hover, success).
 * All sounds are synthesised; no external audio files needed.
 */

import { Config } from './config.js';

let ctx  = null;
let _on  = Config.sound.defaultOn;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

/**
 * Play a synthesised tone.
 * @param {number} freq      Frequency in Hz
 * @param {OscillatorType} type  Oscillator waveform
 * @param {number} dur       Duration in seconds
 * @param {number} vol       Peak gain (0–1)
 */
function playTone(freq, type = 'sine', dur = 0.08, vol = 0.04) {
  if (!_on) return;
  try {
    const ac    = getCtx();
    const osc   = ac.createOscillator();
    const gain  = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    gain.gain.setValueAtTime(vol, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    osc.start();
    osc.stop(ac.currentTime + dur);
  } catch (_) { /* AudioContext may be blocked */ }
}

export function playClick()   { playTone(880,  'square', 0.08, 0.025); }
export function playHover()   { playTone(1200, 'sine',   0.05, 0.012); }
export function playSuccess() {
  playTone(440, 'sine', 0.12, 0.04);
  setTimeout(() => playTone(660, 'sine', 0.18, 0.04), 100);
}

export function setSound(enabled) { _on = enabled; }
export function isSound()          { return _on; }

/** Wire up the sound toggle button */
export function initSound() {
  const btn    = document.getElementById('soundToggleBtn');
  const waves  = document.getElementById('soundWaves');
  if (!btn) return;

  btn.addEventListener('click', () => {
    _on = !_on;
    if (waves) waves.style.display = _on ? '' : 'none';
    playClick();
  });

  // Attach hover sounds to interactive elements
  if (!Config.animation.touchDevice) {
    document.querySelectorAll('.btn, .nav-links a, .faq-q, .sector-card, .paper-card').forEach(el => {
      el.addEventListener('mouseenter', playHover);
    });
  }
}
