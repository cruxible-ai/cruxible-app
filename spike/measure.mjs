// Drives the spike harnesses in headed Chromium (real GPU, not SwiftShader)
// and prints mount / zoom-frame / select-latency / heap numbers per library
// and fixture. Usage: node spike/measure.mjs <baseUrl>
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:5322";
const results = [];

const browser = await chromium.launch({
  headless: false,
  args: ["--enable-gpu", "--window-position=2000,2000"],
});

for (const lib of ["cosmos", "sigma"]) {
  for (const fixture of ["kev", "kev30k"]) {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(`${base}/spike/${lib}.html?fixture=${fixture}`);
    try {
      await page.waitForFunction(() => window.__spike !== undefined, null, { timeout: 60000 });
    } catch {
      results.push({ lib, fixture, error: errors.join("; ") || "timeout waiting for __spike" });
      await context.close();
      continue;
    }
    // Settle before benching.
    await page.waitForTimeout(1200);
    const stats = await page.evaluate(async () => {
      const s = window.__spike;
      const zoom = await s.zoomBench();
      const sel = await s.selectBench();
      return {
        nodes: s.nodes,
        edges: s.edges,
        mountMs: s.mountMs,
        mountHeapMB: s.heapMB,
        zoom,
        sel,
      };
    });
    const frames = [stats.zoom.in, stats.zoom.out, stats.zoom.back];
    const med = (xs) => xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)];
    results.push({
      lib,
      fixture,
      nodes: stats.nodes,
      edges: stats.edges,
      mountMs: stats.mountMs,
      zoomP50: Math.max(...frames.map((f) => f.p50)).toFixed(1),
      zoomP95: Math.max(...frames.map((f) => f.p95)).toFixed(1),
      zoomMax: Math.max(...frames.map((f) => f.max)).toFixed(1),
      selectMs: med(stats.sel.select).toFixed(1),
      clearMs: med(stats.sel.clear).toFixed(1),
      heapMB: stats.zoom.heapMB,
      errors: errors.length ? errors.join("; ") : undefined,
    });
    await context.close();
  }
}

await browser.close();
console.table(results);
console.log(JSON.stringify(results, null, 2));
