// Shared measurement helpers for the renderer spike harnesses.

export interface FrameStats {
  p50: number;
  p95: number;
  max: number;
  frames: number;
}

export interface Fixture {
  nodes: Array<{ id: string; type: string; title: string; color: string; x: number; y: number }>;
  edges: Array<{
    source: string;
    target: string;
    rel: string;
    review: string | null;
    lifecycle: string | null;
  }>;
}

export async function loadFixture(): Promise<Fixture> {
  const name = new URLSearchParams(location.search).get("fixture") ?? "kev";
  const res = await fetch(`/spike/fixtures/${name}.json`);
  return (await res.json()) as Fixture;
}

/** Record rAF deltas for `durationMs` and summarize. */
export function recordFrames(durationMs: number): Promise<FrameStats> {
  return new Promise((resolve) => {
    const deltas: number[] = [];
    let last = performance.now();
    const start = last;
    function tick(now: number) {
      deltas.push(now - last);
      last = now;
      if (now - start < durationMs) requestAnimationFrame(tick);
      else {
        deltas.sort((a, b) => a - b);
        resolve({
          p50: deltas[Math.floor(deltas.length * 0.5)] ?? 0,
          p95: deltas[Math.floor(deltas.length * 0.95)] ?? 0,
          max: deltas[deltas.length - 1] ?? 0,
          frames: deltas.length,
        });
      }
    }
    requestAnimationFrame(tick);
  });
}

/** Double-rAF: resolves after the next frame has been presented. */
export function nextFrame(): Promise<number> {
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(performance.now()))));
}

/** Time from invoking `fn` to the following presented frame. */
export async function measureOnce(fn: () => void): Promise<number> {
  const t0 = performance.now();
  fn();
  await nextFrame();
  return performance.now() - t0;
}

export function heapMB(): number | null {
  const m = (performance as { memory?: { usedJSHeapSize: number } }).memory;
  return m ? Math.round(m.usedJSHeapSize / 1048576) : null;
}

/** [r,g,b] 0-255 from #rrggbb. */
export function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

/** Edge stroke by governance/review — mirrors edgeStroke in EdgeGovernance.tsx. */
export function edgeRgba(
  rel: string,
  review: string | null,
  lifecycle: string | null,
): [number, number, number, number] {
  // The KEV kit's only governed relationship type is vulnerability_affects_product.
  const governed = rel === "vulnerability_affects_product";
  let rgb: [number, number, number];
  let a: number;
  if (!governed) [rgb, a] = [[150, 150, 162], 0.5];
  else if (review === "approved") [rgb, a] = [[16, 185, 129], 0.7];
  else if (review === "rejected") [rgb, a] = [[239, 68, 68], 0.7];
  else [rgb, a] = [[245, 158, 11], 0.75];
  if (lifecycle != null && lifecycle !== "active") a *= 0.45; // dashed → fainter
  return [rgb[0], rgb[1], rgb[2], a];
}

/** Index of the highest-degree node + its 1-hop neighborhood (indices). */
export function hubNeighborhood(fixture: Fixture): { hub: number; nodes: number[]; edges: number[] } {
  const idToIndex = new Map(fixture.nodes.map((n, i) => [n.id, i]));
  const degree = new Map<number, number>();
  for (const e of fixture.edges) {
    const s = idToIndex.get(e.source)!;
    const t = idToIndex.get(e.target)!;
    degree.set(s, (degree.get(s) ?? 0) + 1);
    degree.set(t, (degree.get(t) ?? 0) + 1);
  }
  let hub = 0;
  let best = -1;
  for (const [i, d] of degree) if (d > best) [hub, best] = [i, d];
  const nodes = new Set<number>([hub]);
  const edges: number[] = [];
  fixture.edges.forEach((e, ei) => {
    const s = idToIndex.get(e.source)!;
    const t = idToIndex.get(e.target)!;
    if (s === hub || t === hub) {
      nodes.add(s);
      nodes.add(t);
      edges.push(ei);
    }
  });
  return { hub, nodes: [...nodes], edges };
}
