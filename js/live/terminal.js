/**
 * js/live/terminal.js
 * Types simulated SOC terminal output line by line when scrolled into view.
 */
import { Config } from '../config.js';

const { lineDelay, lineJitter } = Config.terminal;

const LINES = [
  { cls: 't-mute', text: 'lumin-soc:~$ initiate_session --node=BASRA-01 --secure' },
  { cls: 't-info', text: '[INFO] Connecting to Security Operations Center...' },
  { cls: 't-ok',   text: '[OK]   Session established — RTT 12ms | TLS 1.3 | AES-256-GCM' },
  { cls: 't-mute', text: 'lumin-soc:~$ scan --target=net-range/24 --ports=all --depth=full' },
  { cls: 't-info', text: '[SCAN] Probing 248 endpoints on internal network fabric...' },
  { cls: 't-warn', text: '[WARN] Anomalous outbound traffic on port 4444 detected' },
  { cls: 't-warn', text: '[WARN] Source: 10.0.0.47 | Dest: 185.220.x.x | Proto: TCP' },
  { cls: 't-ok',   text: '[OK]   Automated containment applied — session quarantined' },
  { cls: 't-mute', text: 'lumin-soc:~$ ai-model load --task=anomaly-detect --lang=ar --accuracy=97.2' },
  { cls: 't-info', text: '[AI]   Arabic NLP model loaded — 97.2% accuracy on regional threat corpus' },
  { cls: 't-ok',   text: '[OK]   Behavioural baseline recalibrated — 0 new anomalies flagged' },
  { cls: 't-mute', text: 'lumin-soc:~$ intel-feed --source=osint --region=MENA --filter=IQ' },
  { cls: 't-info', text: '[INTEL] Fetching open-source threat intelligence for Iraq region...' },
  { cls: 't-ok',   text: '[OK]   3 new CVEs relevant to regional infra — advisory queued' },
  { cls: 't-mute', text: 'lumin-soc:~$ status --all --verbose' },
  { cls: 't-ok',   text: '[STATUS] All 4 Lumin divisions: OPERATIONAL ✓ | Uptime 99.98%' },
];

export function initTerminal() {
  const body = document.getElementById('termBody');
  const wrap = document.querySelector('.terminal');
  if (!body || !wrap) return;

  let started = false;

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting && !started) {
        started = true;
        typeLines();
        io.unobserve(wrap);
      }
    });
  }, { threshold: 0.3 });
  io.observe(wrap);

  function typeLines() {
    body.innerHTML = '';
    let i = 0;
    const next = () => {
      if (i >= LINES.length) {
        const caret = document.createElement('span');
        caret.className = 'caret';
        body.appendChild(caret);
        return;
      }
      const row      = document.createElement('div');
      row.className  = `ln ${LINES[i].cls}`;
      row.textContent = LINES[i].text;
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
      i++;
      setTimeout(next, lineDelay + Math.random() * lineJitter);
    };
    next();
  }
}
