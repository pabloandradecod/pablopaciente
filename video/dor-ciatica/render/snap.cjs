// Tira prints de instantes específicos para revisão: node snap.cjs out_dir t1 t2 ...
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [out, ...ts] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
  p.on('pageerror', e => console.log('pageerror:', e.message));
  await p.goto('file://' + path.join(__dirname, 'index.html'));
  await p.evaluate(() => window.READY);
  for (const t of ts) {
    let tt = t;
    if (t.includes(':')) { // cena:beat:offset
      const [si, bi, off] = t.split(':').map(Number);
      tt = await p.evaluate(([si, bi, off]) => { const s = TL.scenes[si]; return (bi >= 0 ? s.beats[bi].start : s.start) + off; }, [si, bi, off || 0]);
    }
    const type = await p.evaluate(t => renderFrame(t), Number(tt));
    await p.screenshot({ path: path.join(out, `t_${String(t).replace(/:/g, '-')}.jpg`), type: 'jpeg', quality: 80 });
    console.log(t, Number(tt).toFixed(2), type);
  }
  await b.close();
})();
