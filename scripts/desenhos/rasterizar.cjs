// Converte os SVGs em PNG (fonte Montserrat via Google Fonts).
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const [dir, out] = process.argv.slice(2)
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 800, height: 600 } })
  await p.setContent('<html><head><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet"></head><body style="margin:0"><div id="c"></div></body></html>', { waitUntil: 'networkidle' })
  fs.mkdirSync(out, { recursive: true })
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.svg')).sort()) {
    await p.evaluate((s) => { document.getElementById('c').innerHTML = s }, fs.readFileSync(path.join(dir, f), 'utf8'))
    await p.evaluate(() => document.fonts.ready)
    await p.locator('#c svg').screenshot({ path: path.join(out, f.replace('.svg', '.png')) })
  }
  await b.close()
})()
