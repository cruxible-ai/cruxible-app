// Dev utility: open an entity page, expand the first evidence ref, screenshot.
import { chromium } from "@playwright/test";

const [, , urlPath, outfile = "/tmp/evidence.png"] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
await page.goto(`http://localhost:${process.env.UI_PORT ?? "5173"}${urlPath}`, {
  waitUntil: "networkidle",
});
const toggle = page.locator("button", { hasText: /SRC-/ }).first();
await toggle.click();
await page.waitForTimeout(800);
await toggle.scrollIntoViewIfNeeded();
await page.screenshot({ path: outfile });
console.log(`saved ${outfile}`);
await browser.close();
