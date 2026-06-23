/**
 * js/live/crypto.js — GitHub Pages / Static version
 * Calls CoinGecko directly from the browser (no server proxy needed).
 */

const COINS = [
  { sym: 'BTC / USD', key: 'bitcoin'  },
  { sym: 'ETH / USD', key: 'ethereum' },
  { sym: 'SOL / USD', key: 'solana'   },
];

export async function initCrypto() {
  const ticker = document.getElementById('cryptoTicker');
  if (!ticker) return;

  try {
    const res  = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true',
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const html = COINS.map(c => {
      const coin = data[c.key];
      if (!coin) return '';
      const price = coin.usd
        ? coin.usd.toLocaleString('en-US', { maximumFractionDigits: 2 })
        : '—';
      const chg  = coin.usd_24h_change ?? 0;
      const cls  = chg >= 0 ? 'up' : 'down';
      const sign = chg >= 0 ? '▲' : '▼';
      return `
        <div class="pulse-row">
          <span class="sym">${c.sym}</span>
          <span style="display:flex;align-items:center;gap:8px">
            <b style="font-family:var(--font-mono)">$${price}</b>
            <span class="chg ${cls}">${sign} ${Math.abs(chg).toFixed(2)}%</span>
          </span>
        </div>`;
    }).join('');

    ticker.innerHTML = html || '<p class="widget-note">No data.</p>';
  } catch (err) {
    console.warn('[crypto]', err.message);
    ticker.innerHTML = '<p class="widget-note" style="margin:0">Market data unavailable.</p>';
  }
}
