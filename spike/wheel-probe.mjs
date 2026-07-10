// Isolate wheel-zoom long tasks: raw cosmos harness vs the React component.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:5322";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--window-position=2000,2000"] });

for (const pagePath of ["spike/cosmos.html", "spike/component.html"]) {
  for (const fixture of ["kev30k"]) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
    await page.goto(`${base}/${pagePath}?fixture=${fixture}`);
    await page.waitForSelector("canvas");
    await page.waitForTimeout(pagePath.includes("component") ? 22000 : 3000);
    await page.evaluate(() => {
      window.__longTasks = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__longTasks.push(Math.round(e.duration));
      }).observe({ entryTypes: ["longtask"] });
    });
    for (let i = 0; i < 14; i++) {
      await page.mouse.move(700, 500);
      await page.mouse.wheel(0, -200);
      await page.waitForTimeout(80);
    }
    for (let i = 0; i < 14; i++) {
      await page.mouse.wheel(0, 200);
      await page.waitForTimeout(80);
    }
    const lt = await page.evaluate(() => window.__longTasks);
    console.log(pagePath, fixture, "longTasks:", JSON.stringify(lt));
    await page.close();
  }
}
await browser.close();
