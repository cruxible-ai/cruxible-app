/**
 * Deterministic force layout off the main thread. Exactly the pipeline the
 * DOM dots renderer ran synchronously (d3-force with phyllotaxis seeding and
 * a fixed tick budget — same data always draws the same picture), but here
 * it streams intermediate positions so first paint never waits for layout:
 * the canvas shows the seeded spiral immediately and organizes in front of
 * the user.
 *
 * Protocol: one request per worker lifetime.
 *   in:  { count, links: Uint32Array [s0,t0,s1,t1,...] }
 *   out: { positions: Float32Array [x0,y0,...], done: boolean } (repeated)
 */
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";

export interface LayoutRequest {
  count: number;
  links: Uint32Array;
}

export interface LayoutUpdate {
  positions: Float32Array;
  done: boolean;
}

/** Ticks by size: the budget the DOM renderer used, plus a cheaper tier for
 * canvases it could never draw. Layout quality saturates well before cost. */
function tickBudget(count: number): number {
  if (count <= 800) return 160;
  if (count <= 12000) return 90;
  return 48;
}

/** Stream roughly this many progress frames regardless of graph size. */
const PROGRESS_FRAMES = 12;

// The DOM lib types `self` as Window; this file only ever runs as a worker.
// (Referencing lib="webworker" instead would conflict with DOM program-wide.)
const workerSelf = self as unknown as Worker;

workerSelf.onmessage = (e: MessageEvent<LayoutRequest>) => {
  const { count, links } = e.data;
  const simNodes: SimulationNodeDatum[] = Array.from({ length: count }, () => ({}));
  const simLinks: Array<SimulationLinkDatum<SimulationNodeDatum>> = [];
  for (let i = 0; i < links.length; i += 2) {
    simLinks.push({ source: links[i]!, target: links[i + 1]! });
  }
  const sim = forceSimulation(simNodes)
    .force("charge", forceManyBody().strength(-45).distanceMax(600))
    .force("link", forceLink(simLinks).distance(55).strength(0.4))
    .force("x", forceX(0).strength(0.06))
    .force("y", forceY(0).strength(0.06))
    .force("collide", forceCollide(10))
    .stop();

  const post = (done: boolean) => {
    const positions = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      positions[i * 2] = simNodes[i]!.x ?? 0;
      positions[i * 2 + 1] = simNodes[i]!.y ?? 0;
    }
    workerSelf.postMessage({ positions, done } satisfies LayoutUpdate, [positions.buffer]);
  };

  const ticks = tickBudget(count);
  const chunk = Math.max(1, Math.round(ticks / PROGRESS_FRAMES));
  for (let i = 1; i <= ticks; i++) {
    sim.tick();
    if (i === ticks) post(true);
    else if (i % chunk === 0) post(false);
  }
};
