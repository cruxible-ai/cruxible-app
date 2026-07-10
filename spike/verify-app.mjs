// End-to-end verification of the WebGL state graph:
//  1. Real app on the KEV daemon: mount timing, select/deselect via search,
//     wheel-zoom long tasks, semantic-zoom screenshots, deliverable shot.
//  2. Component harness at 30k: mount, select/deselect, zoom frames.
// Usage: node spike/verify-app.mjs <appBase> <harnessBase>
import { chromium } from "@playwright/test";

const appBase = process.argv[2] ?? "http://localhost:5320";
const harnessBase = process.argv[3] ?? "http://localhost:5322";
const out = {};

const browser = await chromium.launch({
  headless: false,
  args: ["--enable-gpu", "--window-position=2000,2000"],
});

// ---------- real app on KEV ----------
{
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const t0 = Date.now();
  await page.goto(`${appBase}/i/inst_d27fae46afbb4727/graph`);
  // Mount = graph canvas present and painting (excludes our nav overhead,
  // includes data fetch through the dev proxy).
  await page.waitForSelector("canvas", { timeout: 30000 });
  out.appCanvasAtMs = Date.now() - t0;
  // Let the worker layout finish streaming (12 frames over ~3s at 5k).
  await page.waitForTimeout(6000);
  await page.screenshot({ path: "spike/app-overview.png" });

  // Long tasks + frame times during user wheel-zoom.
  await page.evaluate(() => {
    window.__longTasks = [];
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__longTasks.push(e.duration);
    }).observe({ entryTypes: ["longtask"] });
    window.__frames = [];
    let last = performance.now();
    const tick = (now) => {
      window.__frames.push(now - last);
      last = now;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  for (let i = 0; i < 14; i++) {
    await page.mouse.move(700, 500);
    await page.mouse.wheel(0, -200);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(300);
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(80);
  }
  const zoomStats = await page.evaluate(() => {
    const f = window.__frames.slice().sort((a, b) => a - b);
    return {
      longTasks: window.__longTasks,
      frameP50: f[Math.floor(f.length * 0.5)],
      frameP95: f[Math.floor(f.length * 0.95)],
      frameMax: f[f.length - 1],
      frames: f.length,
    };
  });
  out.appZoom = zoomStats;

  // Select via search jump (Enter) — the shipped selectRequest path.
  await page.fill('input[placeholder="Find in graph…"]', "Microsoft");
  await page.waitForTimeout(400);
  const selT0 = Date.now();
  await page.keyboard.press("Enter");
  await page.waitForSelector('text=Open entity', { timeout: 5000 });
  out.appSelectToPanelMs = Date.now() - selT0;
  await page.waitForTimeout(600);
  await page.screenshot({ path: "spike/app-selected.png" });
  const deselT0 = Date.now();
  await page.keyboard.press("Escape");
  await page.waitForSelector('text=Open entity', { state: "detached", timeout: 5000 });
  out.appDeselectMs = Date.now() - deselT0;

  // Deliverable screenshot: clean overview.
  await page.fill('input[placeholder="Find in graph…"]', "");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  await page.screenshot({ path: "webgl-kev.png" });
  // Semantic-zoom evidence pair: overview then deep zoom, no selection.
  await page.screenshot({ path: "spike/app-semzoom-1.png" });
  for (let i = 0; i < 11; i++) {
    await page.mouse.move(700, 450);
    await page.mouse.wheel(0, -220);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: "spike/app-semzoom-2.png" });
  await context.close();
}

// ---------- component harness at 30k ----------
for (const fixture of ["kev", "kev30k"]) {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();
  const t0 = Date.now();
  await page.goto(`${harnessBase}/spike/component.html?fixture=${fixture}`);
  await page.waitForSelector("canvas", { timeout: 60000 });
  const canvasAt = Date.now() - t0;
  await page.waitForFunction(() => window.__harness !== undefined);
  // Wait for layout worker to finish (30k: 48 ticks, seconds off-thread).
  await page.waitForTimeout(fixture === "kev30k" ? 25000 : 8000);

  await page.evaluate(() => {
    window.__frames = [];
    window.__longTasks = [];
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__longTasks.push(e.duration);
    }).observe({ entryTypes: ["longtask"] });
    let last = performance.now();
    const tick = (now) => {
      window.__frames.push(now - last);
      last = now;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
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
  const zoom = await page.evaluate(() => {
    const f = window.__frames.slice().sort((a, b) => a - b);
    return {
      longTasks: window.__longTasks,
      frameP50: f[Math.floor(f.length * 0.5)],
      frameP95: f[Math.floor(f.length * 0.95)],
      frameMax: f[f.length - 1],
    };
  });

  // Select the max-degree hub through the component's selectRequest path.
  const selects = [];
  const deselects = [];
  for (let i = 0; i < 3; i++) {
    const s0 = Date.now();
    await page.evaluate(() => window.__harness.driveSelect(window.__harness.hubId));
    await page.waitForSelector('[data-testid="panel"]', { timeout: 5000 });
    selects.push(Date.now() - s0);
    const d0 = Date.now();
    await page.keyboard.press("Escape");
    await page.waitForSelector('[data-testid="panel"]', { state: "detached", timeout: 5000 });
    deselects.push(Date.now() - d0);
    await page.waitForTimeout(150);
  }
  if (fixture === "kev30k") {
    await page.screenshot({ path: "spike/component-30k.png" });
  }
  const heap = await page.evaluate(() =>
    Math.round((performance.memory?.usedJSHeapSize ?? 0) / 1048576),
  );
  out[`harness_${fixture}`] = { canvasAt, zoom, selects, deselects, heapMB: heap };
  await context.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
