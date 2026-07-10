// Interaction verification on the live KEV app: node click, edge click
// (nearest-edge picking), Esc clear, isolate-neighborhood URL state,
// fullscreen, cards mode intact.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:5320";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--window-position=2000,2000"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const results = {};

await page.goto(`${base}/i/inst_d27fae46afbb4727/graph`);
await page.waitForSelector("canvas");
await page.waitForTimeout(8000); // layout settle

// 1. Node select via search Enter, then walk a connection, then isolate.
await page.fill('input[placeholder="Find in graph…"]', "CVE-2024-3400");
await page.keyboard.press("Enter");
await page.waitForSelector("text=Open entity", { timeout: 5000 });
results.nodePanel = true;
// Walk to a neighbor through ConnectionList.
const conn = page.locator("button", { hasText: "vulnerability affects product" }).first();
await conn.click();
await page.waitForTimeout(600);
results.connectionWalk = await page.locator("text=Open entity").isVisible();
// Isolate neighborhood → URL gains focus=
await page.click("text=Isolate neighborhood");
await page.waitForTimeout(2500);
results.isolateUrl = page.url().includes("focus=");
results.isolateHeader = await page.locator("header, h1").first().textContent();
const headerLine = await page.locator("text=/\\d+ entities · \\d+ edges/").first().textContent();
results.isolatedCount = headerLine;
await page.screenshot({ path: "spike/app-isolated.png" });
// Show whole graph again
await page.click("text=Show whole graph");
await page.waitForTimeout(4000);
results.wholeGraphRestored = !page.url().includes("focus=");

// Clear selection state fully (search box + Esc)
await page.fill('input[placeholder="Find in graph…"]', "");
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

// 2. Edge click: sample canvas points until an edge panel appears.
let edgeHit = false;
let nodeHits = 0;
const canvas = await page.locator("canvas").boundingBox();
outer: for (let gy = 0.25; gy <= 0.75; gy += 0.1) {
  for (let gx = 0.25; gx <= 0.75; gx += 0.1) {
    const x = canvas.x + canvas.width * gx;
    const y = canvas.y + canvas.height * gy;
    await page.mouse.click(x, y);
    await page.waitForTimeout(350);
    if (await page.locator("text=Relationship").first().isVisible().catch(() => false)) {
      edgeHit = true;
      await page.screenshot({ path: "spike/app-edge-selected.png" });
      break outer;
    }
    if (await page.locator("text=Open entity").first().isVisible().catch(() => false)) {
      nodeHits++;
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
    }
  }
}
results.edgeClickPanel = edgeHit;
results.incidentalNodeHits = nodeHits;
await page.keyboard.press("Escape");

// 3. Esc clears panel
results.escCleared = !(await page.locator("text=Relationship").first().isVisible().catch(() => false));

// 4. Fullscreen toggle
await page.click('button[title="Full screen"]');
await page.waitForTimeout(400);
results.fullscreenOn = await page.locator('button[title="Exit full screen (Esc)"]').isVisible();
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
results.fullscreenOffViaEsc = await page.locator('button[title="Full screen"]').isVisible();

// 5. Cards mode intact (ReactFlow path)
await page.click("text=Cards");
await page.waitForTimeout(4000);
results.cardsRendered = (await page.locator(".react-flow__node").count()) > 0;
await page.screenshot({ path: "spike/app-cards.png" });
await page.click("text=Dots");
await page.waitForTimeout(3000);

// 6. Semantic zoom evidence: zoomed-in screenshot with settled layout.
for (let i = 0; i < 10; i++) {
  await page.mouse.move(canvas.x + canvas.width / 2, canvas.y + canvas.height / 2);
  await page.mouse.wheel(0, -220);
  await page.waitForTimeout(70);
}
await page.waitForTimeout(600);
await page.screenshot({ path: "spike/app-zoomed2.png" });

console.log(JSON.stringify(results, null, 2));
await browser.close();
