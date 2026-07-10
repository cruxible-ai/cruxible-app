// Visual sanity shots: overview, zoomed (semantic zoom check), selected.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:5322";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--window-position=2000,2000"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

for (const lib of ["cosmos", "sigma"]) {
  await page.goto(`${base}/spike/${lib}.html?fixture=kev`);
  await page.waitForFunction(() => window.__spike !== undefined);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `spike/shot-${lib}-overview.png` });
  // Wheel-zoom like a user, centered on canvas — semantic zoom check.
  for (let i = 0; i < 12; i++) {
    await page.mouse.move(800, 500);
    await page.mouse.wheel(0, -240);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `spike/shot-${lib}-zoomed.png` });
  await page.goto(`${base}/spike/${lib}.html?fixture=kev`);
  await page.waitForFunction(() => window.__spike !== undefined);
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.__spike.applySelect());
  await page.waitForTimeout(400);
  await page.screenshot({ path: `spike/shot-${lib}-selected.png` });
}
await browser.close();
console.log("done");
