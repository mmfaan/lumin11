/**
 * js/main.js
 * Application entry point.
 * Imports every module and calls its init function in the right order.
 *
 * Load order matters:
 *   1. Preloader (first so it covers the page during hydration)
 *   2. i18n (text must be translated before anything else renders)
 *   3. Audio (needed by interactive modules)
 *   4. Canvas / visual effects
 *   5. UI interactivity
 *   6. Live / network data (last — non-blocking)
 */

import { initPreloader }               from './preloader.js';
import { initI18n }                    from './i18n.js';
import { initSound }                   from './audio.js';
import { initCursor }                  from './cursor.js';

import { initNetwork }                 from './canvas/network.js';
import { initSignal }                  from './canvas/signal.js';
import { initMatrix, toggleMatrix }    from './canvas/matrix.js';
import { initRadar }                   from './canvas/radar.js';

import { initHeader, initSmoothScroll }from './ui/header.js';
import { initTheme }                   from './ui/theme.js';
import { initCmdPalette }              from './ui/cmdpalette.js';
import {
  initReveal, initStagger, initCounters,
  initClock, initCarousel, initTilt, initMagnetic,
}                                      from './ui/reveal.js';
import { initFAQ }                     from './ui/faq.js';

import { initGeo }                     from './live/geo.js';
import { initCrypto }                  from './live/crypto.js';
import { initTerminal }                from './live/terminal.js';

import { initCipher }                  from './lab/cipher.js';
import { initPassword }                from './lab/password.js';
import { initMorse }                   from './lab/morse.js';

import { initForms }                   from './forms.js';

/* ── Boot ──────────────────────────────────────────────────────────── */
(function boot() {

  // 1. Preloader
  initPreloader();

  // 2. Language
  initI18n();

  // 3. Audio
  initSound();

  // 4. Canvas
  initNetwork();
  initSignal();
  initMatrix();
  initRadar();

  // 5. UI
  initCursor();
  initHeader();
  initSmoothScroll();
  initTheme();
  initCmdPalette();
  initReveal();
  initStagger();
  initCounters();
  initClock();
  initCarousel();
  initTilt();
  initMagnetic();
  initFAQ();

  // 6. Matrix FAB
  document.getElementById('matrixToggleBtn')
    ?.addEventListener('click', () => { toggleMatrix(); });

  // 7. Lab tools
  initCipher();
  initPassword();
  initMorse();

  // 8. Forms
  initForms();

  // 9. Live data (non-blocking, last)
  initTerminal();
  initGeo();
  initCrypto();

})();
