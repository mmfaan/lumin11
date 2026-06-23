/**
 * js/config.js
 * Global configuration — change values here, not scattered across modules.
 */

export const Config = Object.freeze({
  /** API endpoints — use relative paths so server proxy works */
  api: {
    geo:     '/api/geo',
    crypto:  '/api/crypto',
    contact: '/api/contact',
  },

  /** Animation toggles */
  animation: {
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    touchDevice:  !window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  },

  /** Particle network (hero canvas) */
  network: {
    maxNodes:      80,
    nodePerPixel:  18,   // 1 node per N pixels of width
    connectDist:   150,
    repelRadius:   90,
    repelStrength: 1.2,
    speed:         0.38,
  },

  /** Terminal simulator */
  terminal: {
    lineDelay:    260,   // ms base delay between lines
    lineJitter:   180,   // ms random jitter added to each line
  },

  /** Quote carousel */
  carousel: {
    interval: 4200, // ms between auto-advances
  },

  /** Matrix mode */
  matrix: {
    fontSize:   14,
    chars:      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789LUMININFINITY∞⟨⟩{}[]<>=+-*',
    fadeFill:   'rgba(4,5,15,.04)',
  },

  /** Sound FX */
  sound: {
    defaultOn: true,
  },
});
