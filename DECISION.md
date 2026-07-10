# State graph WebGL renderer — spike decision

wi-state-graph-webgl phase 1. Both candidates were evaluated with a minimal
harness (`spike/`) fed the real KEV demo graph (5,153 entities / 13,807 edges,
fetched once from the demo daemon and cached as a JSON fixture with
precomputed deterministic d3-force positions) and a 6x-replicated 30k-scale
variant (30,918 nodes / 82,842 edges). Both harnesses drew the identical
precomputed layout so the numbers compare rendering, not layout.

Measured in headed Chromium (Playwright, real GPU, Apple Silicon, 1600x1000
viewport, 165 Hz display — frame floor is ~6.1 ms). `select` = apply a
max-degree hub's 1-hop neighborhood as the lit set and re-render; the number
includes a two-frame vsync wait, so ~12 ms means "no measurable CPU cost".

## Measurements

| | cosmos kev (5k) | cosmos 30k | sigma kev (5k) | sigma 30k |
|---|---|---|---|---|
| Mount (data ready → first frame) | 1,058 ms* | 90 ms | 288 ms | 408 ms |
| Zoom/pan frame p50 | 6.1 ms | 6.0 ms | 6.1 ms | 6.1 ms |
| Zoom/pan frame p95 | 6.8 ms | 6.8 ms | 6.7 ms | 6.7 ms |
| Zoom/pan frame max | 6.8 ms | 6.9 ms | 12.5 ms | 12.6 ms |
| Select (median of 5) | 12.0 ms | **12.1 ms** | 15.5 ms | **84.7 ms** |
| Deselect (median of 5) | 12.1 ms | 12.0 ms | 15.1 ms | 89.3 ms |
| JS heap after bench | 18 MB | 80 MB | 17 MB | 107 MB |

\* cosmos pays first-WebGL-context shader compilation once per browser
session; the 30k run in the same session mounted in 90 ms. Either way both
libraries mount far inside the 3 s budget.

## Decision: @cosmograph/cosmos

Both libraries pan/zoom at the display's refresh rate at 30k. The differences
that decide it:

1. **Selection dimming is truly GPU-side in cosmos.** `selectPointsByIndices`
   writes a greyout-status texture; the link shader dims any link with a
   greyed endpoint (verified in the dist shader source), so selecting the
   1-hop node set produces exactly the lit-neighborhood/dim-rest semantics
   with zero per-element JS. Sigma's equivalent is a nodeReducer/edgeReducer
   pass — main-thread JS over every element plus buffer re-upload, which
   already costs ~85–89 ms at 30k, over the 50 ms select budget.
2. **Semantic zoom is a config flag** (`scalePointsOnZoom: false`): glyphs hold
   constant screen size while zoom multiplies world-space separation.
   Verified visually — overlapping dots at overview resolve into individuals
   when zoomed, without growing. (Sigma can do this too via
   `zoomToSizeRatioFunction`, so this alone wasn't decisive.)
3. **GPU force layout is available for free later** (cosmos is a GPU
   simulation first); we currently feed it deterministic CPU positions but
   the escape hatch matters at 100k+.
4. Built-in hover picking (`onPointMouseOver` + spatial index), a
   focused-point ring (`focusedPointIndex`), `zoomToPointByIndex` for search
   jump, and `spaceToScreenPosition` for the HTML overlay layer.

deck.gl (the fallback) was not needed — cosmos meets every target.

## Noted tradeoffs

- **cosmos is 2.0.0-beta.20.** API is stable enough in practice, but four
  dist behaviors are underdocumented (learned the hard way, all handled in
  CosmosDots): (1) `setPointColors`/`setLinkColors` docstrings claim 0–255
  RGB; the shader consumes raw 0–1 floats. (2) `setPointPositions` after the
  initial render only stages the buffer — `render()` must be called again to
  apply it (matters for streamed layout). (3) `destroy()` clears but does not
  remove its canvas from the container; a React remount must clear the
  container or dead canvases stack. (4) `destroy()` also never releases the
  WebGL context — cleanup explicitly grabs `WEBGL_lose_context` and calls
  `loseContext()` before dropping the canvas, otherwise every remount leaves
  an undead context lingering until GC, counting against the browser's
  per-page context cap. Pinned exact version in package.json.
- **Hover picking costs a GPU readback every third frame** (`readPixels`
  pipeline sync, unconditional while the mouse is on canvas). On dense
  layouts the sync waits on the full link-overdraw frame and lands on the
  main thread as 50–95 ms stalls during zoom. Mitigated with a fill-rate
  governor: `pixelRatio` drops from 2 to 1 above 30k drawn links, which
  returned wheel-zoom at 30k nodes / 83k links to p95 8.2 ms with zero long
  tasks (visual difference at dot scale: negligible).
- **Selection lights slightly more than the old DOM renderer did.** Cosmos's
  greyout is per-point: selecting a node's 1-hop set keeps every edge whose
  two endpoints are both in that set lit — including neighbor↔neighbor edges,
  where the DOM renderer lit only the edges incident to the selected node.
  Inherent to the shader's endpoint-based dimming; arguably more informative
  (the lit subgraph is the induced neighborhood), accepted as-is.
- **Search rings cap at the first 150 visible matches** (`MATCH_RING_CAP`);
  the old renderer ringed every match. Past that many, rings are noise — the
  header match count and Enter-to-jump carry the rest.
- **No edge picking in cosmos** (points only). Edge click is implemented
  app-side: nearest-edge hit test in screen space on canvas clicks that miss
  a point; lighting the edge = selecting its two endpoints (the shader then
  keeps exactly the edge + endpoints lit). Parallel edges between the same
  pair light together — acceptable, they're indistinguishable at dot scale
  anyway.
- **Minimap: dropped for dots mode.** Cosmos has none; a downscaled second
  cosmos instance costs a second WebGL context + sync plumbing and the
  overview-fit + fit-view button covers the "where am I" need at dot density.
  Cards mode (ReactFlow) keeps its MiniMap.
- **Dashed strokes don't exist for GL lines** here; inactive-lifecycle edges
  encode as the same hue at ~45% of the base alpha (legend updated to say
  "faint"). The edge context panel still states lifecycle status exactly.
- **Determinism kept.** Layout stays the exact d3-force pipeline the DOM
  renderer used (same forces, same deterministic phyllotaxis seed, fixed tick
  budget), moved into a Web Worker that streams positions — same data still
  draws the same picture, and first paint no longer waits for it (cosmos's
  own GPU layout would be faster at 30k but is not reproducible across GPUs;
  rejected for now).
- Node dragging (a ReactFlow freebie in the old dots mode) is dropped —
  repositioning individual dots in a 30k force layout had no inspection value.

## Perf verification of the shipped implementation

Measured on the shipped CosmosDots component (headed Chromium, 165 Hz
display, wheel-zoom, longtask observer; select = worst-case hub 1-hop via
the shipped selectRequest path, timed to context-panel paint):

| | Baseline (DOM dots @3k) | KEV live app (5,153 / 13,807) | Harness 30k (30,918 / 82,842) |
|---|---|---|---|
| Mount (data ready → painted) | ~12 s | ~0.4 s (3.8 s nav→canvas incl. fetch) | ~0.5 s |
| Zoom frame p95 / long tasks | 75–114 ms long tasks | 8.5 ms / none | 8.2 ms / none |
| Select → panel | 1.5–3 s freeze | ~97 ms (25–35 ms GPU+panel warm) | 29–39 ms |
| Deselect | 1.5–3 s freeze | 6 ms | ~5 ms |
| JS heap | — | ~48 MB | ~99 MB |

Layout (worker, deterministic): ~3 s at 5k, ~15–20 s at 30k, streamed in 12
progress frames — the canvas is interactive from first paint throughout.

## Post-merge findings (2026-07-11, manager pass)

- **Coordinate space**: layout coordinates are now mapped into cosmos's
  positive space (`toSpace`: center 2048, fixed 0.45 scale) instead of
  raw origin-centered d3 output. On GL environments that clamp cosmos's
  spaceSize to 4096 (software GL), raw negative coordinates rendered as
  a corner-crushed graph; hardware GL was unaffected, so the same state
  drew different pictures on different machines.
- **Software GL (SwiftShader) caveat**: even with in-space coordinates,
  cosmos 2.0.0-beta.20 renders nothing under software GL — separate
  from the coordinate issue, not diagnosed further (near-zero real-user
  population). Follow-up idea if it ever matters: probe the GL renderer
  string and steer to Cards mode. Screenshot tooling should run headed
  or with GPU flags.
- **Intro easing**: worker layout batches are targets for a rAF
  exponential-smoothing loop (~120ms time constant) rather than applied
  directly — the first-load unfold flows instead of jumping per batch.
