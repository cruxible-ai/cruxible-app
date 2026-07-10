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

- **cosmos is 2.0.0-beta.20.** API is stable enough in practice, but two dist
  docstrings lie (`setPointColors`/`setLinkColors` claim 0–255 RGB; the
  shader consumes raw 0–1 floats). Pinned exact version in package.json.
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

See the final work-item report. Summary against the same baselines
(ReactFlow DOM dots, 3,000-node budget): mount 12 s → ~1.3 s at 5k real data;
select/deselect 1.5–3 s → <50 ms; zoom long-tasks 75–114 ms → none observed
(frame p95 at the display floor); 30k nodes pans/zooms at refresh rate (the
DOM renderer could not draw 30k at all).
