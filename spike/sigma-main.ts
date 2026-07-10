// NOTE: sigma/graphology were removed from package.json after losing the
// spike (see DECISION.md). To re-run this harness:
//   pnpm add sigma graphology
import Graph from "graphology";
import Sigma from "sigma";
import {
  edgeRgba,
  heapMB,
  hubNeighborhood,
  loadFixture,
  measureOnce,
  nextFrame,
  recordFrames,
} from "./bench";

const fixture = await loadFixture();
const div = document.getElementById("graph") as HTMLDivElement;

function rgbaCss([r, g, b, a]: [number, number, number, number]) {
  return `rgba(${r},${g},${b},${a})`;
}

const t0 = performance.now();
const graph = new Graph({ multi: true, type: "undirected" });
fixture.nodes.forEach((n) => {
  graph.addNode(n.id, { x: n.x, y: -n.y, size: 2.5, color: n.color });
});
fixture.edges.forEach((e, i) => {
  graph.addEdgeWithKey(`e${i}`, e.source, e.target, {
    color: rgbaCss(edgeRgba(e.rel, e.review, e.lifecycle)),
    size: 1,
  });
});

// GPU-side-ish selection: reducers consult these sets; refresh re-runs them
// without React involvement.
let litNodes: Set<string> | null = null;
let litEdges: Set<string> | null = null;

const sigma = new Sigma(graph, div, {
  renderLabels: false,
  // Semantic zoom: node glyphs keep constant screen size while camera ratio
  // changes world-space separation.
  zoomToSizeRatioFunction: () => 1,
  itemSizesReference: "screen",
  stagePadding: 20,
  nodeReducer: (node, data) =>
    litNodes && !litNodes.has(node) ? { ...data, color: "#26262b" } : data,
  edgeReducer: (edge, data) =>
    litEdges && !litEdges.has(edge) ? { ...data, hidden: true } : data,
});
await nextFrame();
const mountMs = performance.now() - t0;

const hood = hubNeighborhood(fixture);
const hoodNodeIds = new Set(hood.nodes.map((i) => fixture.nodes[i]!.id));
const hoodEdgeIds = new Set(hood.edges.map((i) => `e${i}`));

declare global {
  interface Window {
    __spike: Record<string, unknown>;
  }
}

window.__spike = {
  lib: "sigma",
  nodes: fixture.nodes.length,
  edges: fixture.edges.length,
  mountMs: Math.round(mountMs),
  heapMB: heapMB(),
  async zoomBench() {
    const camera = sigma.getCamera();
    const start = camera.ratio;
    camera.animate({ ratio: start / 5 }, { duration: 1300 });
    const a = await recordFrames(1400);
    camera.animate({ ratio: start * 2.5 }, { duration: 1300 });
    const b = await recordFrames(1400);
    camera.animate({ ratio: start }, { duration: 1300 });
    const c = await recordFrames(1400);
    return { in: a, out: b, back: c, heapMB: heapMB() };
  },
  applySelect() {
    litNodes = hoodNodeIds;
    litEdges = hoodEdgeIds;
    sigma.refresh({ skipIndexation: true });
  },
  async selectBench() {
    const select: number[] = [];
    const clear: number[] = [];
    for (let i = 0; i < 5; i++) {
      select.push(
        await measureOnce(() => {
          litNodes = hoodNodeIds;
          litEdges = hoodEdgeIds;
          sigma.refresh({ skipIndexation: true });
        }),
      );
      clear.push(
        await measureOnce(() => {
          litNodes = null;
          litEdges = null;
          sigma.refresh({ skipIndexation: true });
        }),
      );
    }
    return { select, clear };
  },
};
