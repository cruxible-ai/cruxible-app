import { Graph } from "@cosmograph/cosmos";
import {
  edgeRgba,
  heapMB,
  hexToRgb,
  hubNeighborhood,
  loadFixture,
  measureOnce,
  nextFrame,
  recordFrames,
} from "./bench";

const fixture = await loadFixture();
const div = document.getElementById("graph") as HTMLDivElement;

const idToIndex = new Map(fixture.nodes.map((n, i) => [n.id, i]));
const positions = new Float32Array(fixture.nodes.length * 2);
const colors = new Float32Array(fixture.nodes.length * 4);
fixture.nodes.forEach((n, i) => {
  positions[i * 2] = n.x;
  positions[i * 2 + 1] = n.y;
  // Despite the docstring, setPointColors feeds the shader raw — 0..1.
  const [r, g, b] = hexToRgb(n.color);
  colors.set([r / 255, g / 255, b / 255, 1], i * 4);
});
const links = new Float32Array(fixture.edges.length * 2);
const linkColors = new Float32Array(fixture.edges.length * 4);
fixture.edges.forEach((e, i) => {
  links[i * 2] = idToIndex.get(e.source)!;
  links[i * 2 + 1] = idToIndex.get(e.target)!;
  const [r, g, b, a] = edgeRgba(e.rel, e.review, e.lifecycle);
  linkColors.set([r / 255, g / 255, b / 255, a], i * 4);
});

const t0 = performance.now();
const graph = new Graph(div, {
  backgroundColor: "#09090b",
  disableSimulation: true,
  fitViewOnInit: true,
  fitViewDelay: 0,
  pointSize: 5,
  scalePointsOnZoom: false,
  renderLinks: true,
  linkWidth: 1,
  linkVisibilityMinTransparency: 0.35,
  pointGreyoutOpacity: 0.18,
  linkGreyoutOpacity: 0.12,
  disableAttribution: true,
});
graph.setPointPositions(positions);
graph.setPointColors(colors);
graph.setLinks(links);
graph.setLinkColors(linkColors);
graph.render();
await nextFrame();
const mountMs = performance.now() - t0;

const hood = hubNeighborhood(fixture);

declare global {
  interface Window {
    __spike: Record<string, unknown>;
  }
}

window.__spike = {
  lib: "cosmos",
  nodes: fixture.nodes.length,
  edges: fixture.edges.length,
  mountMs: Math.round(mountMs),
  heapMB: heapMB(),
  async zoomBench() {
    // Animated zoom in 5x, out to 0.4x, back to 1 — camera churn a user causes.
    const z = graph.getZoomLevel();
    graph.setZoomLevel(z * 5, 1300);
    const a = await recordFrames(1400);
    graph.setZoomLevel(z * 0.4, 1300);
    const b = await recordFrames(1400);
    graph.setZoomLevel(z, 1300);
    const c = await recordFrames(1400);
    return { in: a, out: b, back: c, heapMB: heapMB() };
  },
  applySelect() {
    graph.selectPointsByIndices(hood.nodes);
  },
  async selectBench() {
    const select: number[] = [];
    const clear: number[] = [];
    for (let i = 0; i < 5; i++) {
      select.push(await measureOnce(() => graph.selectPointsByIndices(hood.nodes)));
      clear.push(await measureOnce(() => graph.unselectPoints()));
    }
    return { select, clear };
  },
};
