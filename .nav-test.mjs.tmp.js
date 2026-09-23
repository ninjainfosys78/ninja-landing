const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  let hits = 0;

  const N = 10;
  for (let i = 0; i < N; i++) {
    const page = await browser.newPage();
    let mismatch = false;
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('hydrat')) mismatch = true;
    });
    await page.goto('http://localhost:3003/about/', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(400);
    if (mismatch) hits++;
    console.log(`run ${i}: mismatch=${mismatch}`);
    await page.close();
  }
  console.log(`TOTAL: ${hits}/${N} runs had hydration mismatch on /about/`);

  hits = 0;
  for (let i = 0; i < N; i++) {
    const page = await browser.newPage();
    let mismatch = false;
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('hydrat')) mismatch = true;
    });
    await page.goto('http://localhost:3003/blogs/', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(400);
    if (mismatch) hits++;
    await page.close();
  }
  console.log(`TOTAL: ${hits}/${N} runs had hydration mismatch on /blogs/`);

  await browser.close();
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
