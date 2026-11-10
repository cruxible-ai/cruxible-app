// Dev utility: render an app route in Playwright's Firefox, dump a screenshot,
// the page's WebGL details, and (where lit labels are showing, e.g. on
// /i/<instance>/graph?focus=<subject>) whether each label's dot is under it.
// Usage: node scripts/screenshot-firefox.mjs <url-path> <outfile> [height]
//
// UI_HOST/UI_PORT/UI_SETTLE_MS as in scripts/screenshot.mjs. UI_HEADED=1 runs
// a headed window. UI_BROWSER=chromium renders the same route in Chromium for
// comparison (headed there, off-screen: see screenshot.mjs). FIREFOX_PREFS is a
// JSON object of Firefox prefs (e.g. '{"webgl.disable-angle":true}').
//
// The WebGL report names the values cosmos depends on: MAX_TEXTURE_SIZE <= 8192
// makes cosmos clamp its space size to 4096 (it warns "The `spaceSize` has
// been reduced"), the path that drew dots away from their labels before the
// CosmosDots fix.
import { chromium, firefox } from "@playwright/test";

const [, , urlPath = "/", outfile = "/tmp/shot-firefox.png", height = "900"] = process.argv;
const host = process.env.UI_HOST ?? "localhost";
const settleMs = Number(process.env.UI_SETTLE_MS ?? "3000");
const useChromium = process.env.UI_BROWSER === "chromium";
const headed = useChromium || process.env.UI_HEADED === "1";

const browser = useChromium
  ? await chromium.launch({ headless: false, args: ["--window-position=-3000,-3000", "--window-size=1460,960"] })
  : await firefox.launch({ headless: !headed, firefoxUserPrefs: JSON.parse(process.env.FIREFOX_PREFS ?? "{}") });
const page = await browser.newPage({ viewport: { width: 1440, height: Number(height) } });
const messages = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") messages.push(`${msg.type()}: ${msg.text()}`);
});
page.on("pageerror", (err) => messages.push(`pageerror: ${err}`));

await page.goto(`http://${host}:${process.env.UI_PORT ?? "5173"}${urlPath}`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(settleMs);
await page.screenshot({ path: outfile, fullPage: false });
console.log(`saved ${outfile} (${browser.browserType().name()} ${browser.version()}, ${headed ? "headed" : "headless"})`);

const report = await page.evaluate(() => {
  const gl = document.createElement("canvas").getContext("webgl");
  const out = {};
  if (gl) {
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const precision = (shader) => {
      const p = gl.getShaderPrecisionFormat(shader, gl.HIGH_FLOAT);
      return p ? `${p.rangeMin}/${p.rangeMax}/${p.precision}` : null;
    };
    out.webgl = {
      renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
      vendor: dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
      version: gl.getParameter(gl.VERSION),
      webgl2: !!document.createElement("canvas").getContext("webgl2"),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: Array.from(gl.getParameter(gl.MAX_VIEWPORT_DIMS)),
      pointSizeRange: Array.from(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)),
      vertexHighFloat: precision(gl.VERTEX_SHADER),
      fragmentHighFloat: precision(gl.FRAGMENT_SHADER),
      extensions: (gl.getSupportedExtensions() ?? []).filter((e) =>
        /float|half|color_buffer|instanced|blend/i.test(e),
      ),
      devicePixelRatio: window.devicePixelRatio,
    };
  } else out.webgl = null;

  // Dot alignment: each lit label carries where its dot should be on screen.
  const anchors = [...document.querySelectorAll("[data-dot-anchor]")];
  const canvas = anchors[0]?.closest(".relative")?.querySelector("canvas");
  if (canvas) {
    const copy = document.createElement("canvas");
    copy.width = canvas.width;
    copy.height = canvas.height;
    const ctx = copy.getContext("2d");
    ctx.drawImage(canvas, 0, 0);
    const px = ctx.getImageData(0, 0, copy.width, copy.height).data;
    const sx = canvas.width / canvas.clientWidth;
    const sy = canvas.height / canvas.clientHeight;
    const bright = (x, y) => {
      if (x < 0 || y < 0 || x >= copy.width || y >= copy.height) return false;
      const k = (y * copy.width + x) * 4;
      return Math.abs(px[k] - 9) + Math.abs(px[k + 1] - 9) + Math.abs(px[k + 2] - 11) > 150;
    };
    const misses = [];
    for (const el of anchors) {
      const [x, y] = el.getAttribute("data-dot-anchor").split(" ").map(Number);
      let hit = false;
      for (let dy = -3; dy <= 3 && !hit; dy++)
        for (let dx = -3; dx <= 3 && !hit; dx++) hit = bright(Math.round(x * sx) + dx, Math.round(y * sy) + dy);
      if (!hit) misses.push(`${el.textContent} @ ${x},${y}`);
    }
    out.dots = { canvas: [canvas.width, canvas.height], labels: anchors.length, misses };
  }
  return out;
});
console.log(JSON.stringify(report, null, 2));
if (messages.length) {
  console.log("CONSOLE ERRORS/WARNINGS:");
  for (const m of messages) console.log(" -", m.slice(0, 300));
}
await browser.close();
