// Dev utility: render app routes headlessly and dump screenshots + console
// errors. Usage: node scripts/screenshot.mjs <url-path> <outfile> [height]
//
// UI_HOST/UI_PORT select the dev server; UI_SETTLE_MS extends the post-load
// pause for views that keep polling (the live feed never reaches networkidle,
// so waiting on load + a settle window is the only reliable capture point).
import { chromium } from "@playwright/test";

const [, , urlPath = "/", outfile = "/tmp/shot.png", height = "900"] = process.argv;
const host = process.env.UI_HOST ?? "localhost";
const settleMs = Number(process.env.UI_SETTLE_MS ?? "400");

// UI_HEADED=1 captures the WebGL state graph.
//
// Headless Chromium reports a working WebGL2 context (SwiftShader, all the
// float-texture extensions present) and cosmos runs against it without a
// single console error — it clears its background, the layout worker returns,
// and the HTML overlays land in the right places. The point and link passes
// simply never appear. Everything else in the app captures fine headless, so
// this is opt-in: a real GPU context, in a window parked off-screen so a
// capture cannot interrupt whatever is on the desktop.
const headed = process.env.UI_HEADED === "1";
const browser = await chromium.launch(
  headed
    ? { headless: false, args: ["--window-position=-3000,-3000", "--window-size=1460,960"] }
    : {},
);
const page = await browser.newPage({ viewport: { width: 1440, height: Number(height) } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(`http://${host}:${process.env.UI_PORT ?? "5173"}${urlPath}`, {
  waitUntil: "domcontentloaded",
});
await page.waitForTimeout(settleMs);
await page.screenshot({ path: outfile, fullPage: false });
console.log(`saved ${outfile}`);
if (errors.length) {
  console.log("CONSOLE ERRORS:");
  for (const e of errors) console.log(" -", e.slice(0, 300));
}
await browser.close();
