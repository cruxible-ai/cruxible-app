// Dev utility: render app routes headlessly and dump screenshots + console
// errors. Usage: node scripts/screenshot.mjs <url-path> <outfile> [height]
import { chromium } from "@playwright/test";

const [, , urlPath = "/", outfile = "/tmp/shot.png", height = "900"] = process.argv;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: Number(height) } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(`http://localhost:${process.env.UI_PORT ?? "5173"}${urlPath}`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: outfile, fullPage: false });
console.log(`saved ${outfile}`);
if (errors.length) {
  console.log("CONSOLE ERRORS:");
  for (const e of errors) console.log(" -", e.slice(0, 300));
}
await browser.close();
