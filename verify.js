const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });
  await page.locator('#btn-dine-in').click();
  await page.locator('#btn-continue-start').click();
  await page.locator('button:has-text("TAMBAH")').first().click();
  const afterAdd = await page.locator('#toast-total').innerText();
  await page.locator('button:has-text("LIHAT PESANAN")').click();
  await page.locator('button:has-text("Hapus")').first().click();
  const afterRemove = await page.locator('#toast-total').innerText();
  const summary = await page.locator('#summary-total').innerText();
  console.log(JSON.stringify({ afterAdd, afterRemove, summary }, null, 2));
  await browser.close();
})();
