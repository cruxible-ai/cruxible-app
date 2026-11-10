import { existsSync } from "node:fs";
import { expect, firefox, test } from "@playwright/test";

// The State graph's dots are drawn by WebGL (cosmos) from the positions the
// component uploads; its labels are DOM placed from the same positions through
// cosmos's screen map. This checks they agree: under every lit-neighborhood
// label (its data-dot-anchor) the canvas has a bright, dot-coloured pixel.
//
// MAX_TEXTURE_SIZE is reported as 8192 so cosmos clamps its space size to 4096
// on every machine: the path where cosmos 2.0.0-beta.20 drew the dots
// zoom*2048 px up and right of the labels (the Firefox symptom).
//
// Runs under Chromium and Firefox (skipped where Playwright's Firefox is not
// installed). The pixels are read back from the canvas (preserveDrawingBuffer),
// which headless Chromium serves even though its screenshots show no dots.
const FOCUS = "security.product/p-000";
const BACKGROUND = [9, 9, 11];

test("State graph: every lit label has its dot under it", async ({ page, browserName }) => {
  test.skip(
    browserName === "firefox" && !existsSync(firefox.executablePath()),
    "Playwright's Firefox is not installed",
  );
  test.setTimeout(60_000);

  await page.addInitScript(() => {
    const proto = WebGLRenderingContext.prototype;
    const getParameter = proto.getParameter;
    proto.getParameter = function (this: WebGLRenderingContext, pname: number) {
      return pname === this.MAX_TEXTURE_SIZE ? 8192 : getParameter.call(this, pname);
    };
  });
  await page.goto(`/i/inst_fixture/graph?focus=${encodeURIComponent(FOCUS)}`);
  await expect(page.getByRole("heading", { name: "State graph" })).toBeVisible();

  // The focus selects the Subject: its one-hop labels show once it is drawn.
  const labels = page.locator("[data-dot-anchor]");
  await expect(labels.first()).toBeVisible({ timeout: 20_000 });
  // Layout streams and eases in; compare once the anchors stop moving.
  let previous = "";
  await expect
    .poll(
      async () => {
        const now = (await labels.evaluateAll((els) => els.map((el) => el.getAttribute("data-dot-anchor")))).join("|");
        const settled = now === previous;
        previous = now;
        return settled;
      },
      { timeout: 20_000, intervals: [750] },
    )
    .toBe(true);
  await page.waitForTimeout(500);

  const result = await page.evaluate((background) => {
    const anchors = [...document.querySelectorAll<HTMLElement>("[data-dot-anchor]")];
    const canvas = anchors[0]?.closest(".relative")?.querySelector("canvas");
    if (!canvas) return { error: "no canvas" };
    const copy = document.createElement("canvas");
    copy.width = canvas.width;
    copy.height = canvas.height;
    const ctx = copy.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0);
    const pixels = ctx.getImageData(0, 0, copy.width, copy.height).data;
    const sx = canvas.width / canvas.clientWidth;
    const sy = canvas.height / canvas.clientHeight;
    // A lit dot is a saturated kind colour; dimmed dots and lines stay near the background.
    const bright = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= copy.width || y >= copy.height) return false;
      const k = (y * copy.width + x) * 4;
      return (
        Math.abs(pixels[k]! - background[0]!) +
          Math.abs(pixels[k + 1]! - background[1]!) +
          Math.abs(pixels[k + 2]! - background[2]!) >
        150
      );
    };
    const misses: string[] = [];
    for (const el of anchors) {
      const [x, y] = el.getAttribute("data-dot-anchor")!.split(" ").map(Number);
      const cx = Math.round(x! * sx);
      const cy = Math.round(y! * sy);
      let hit = false;
      for (let dy = -3; dy <= 3 && !hit; dy += 1)
        for (let dx = -3; dx <= 3 && !hit; dx += 1) hit = bright(cx + dx, cy + dy);
      if (!hit) misses.push(`${el.textContent} @ ${x},${y}`);
    }
    return { labels: anchors.length, misses };
  }, BACKGROUND);

  expect(result).not.toHaveProperty("error");
  expect(result.labels).toBeGreaterThan(2);
  expect(result.misses).toEqual([]);
});
