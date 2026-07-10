// Drives the SHIPPED CosmosDots component (worker layout, GPU selection,
// HTML overlays) with the spike fixtures — the honest 30k-scale validation
// of the real code path, without hammering the demo daemons.
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { CosmosDots, type GlDotEdge, type GlDotNode } from "../src/components/graph/CosmosDots";
import { edgeStrokeRgba } from "../src/components/graph/EdgeGovernance";
import { loadFixture } from "./bench";
import "../src/index.css";

const fixture = await loadFixture();

const nodes: GlDotNode[] = fixture.nodes.map((n) => ({
  id: n.id,
  title: n.title,
  color: n.color,
}));
const edges: GlDotEdge[] = fixture.edges.map((e, i) => ({
  id: `e${i}`,
  source: e.source,
  target: e.target,
  rgba: edgeStrokeRgba(e.rel === "vulnerability_affects_product", e.review, e.lifecycle).rgba,
  label: e.rel.replaceAll("_", " "),
}));

declare global {
  interface Window {
    __harness: {
      mountedAt: number;
      driveSelect: (id: string) => void;
      hubId: string;
      nodeCount: number;
      edgeCount: number;
    };
  }
}

// Highest-degree node = the worst-case 1-hop selection.
const degree = new Map<string, number>();
for (const e of fixture.edges) {
  degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
  degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
}
let hubId = nodes[0]!.id;
let best = -1;
for (const [id, d] of degree) if (d > best) [hubId, best] = [id, d];

function Harness() {
  const [selectRequest, setSelectRequest] = useState<{ id: string; nonce: number } | null>(null);
  window.__harness = {
    mountedAt: performance.now(),
    driveSelect: (id: string) => setSelectRequest({ id, nonce: Date.now() }),
    hubId,
    nodeCount: nodes.length,
    edgeCount: edges.length,
  };
  return (
    <CosmosDots
      nodes={nodes}
      edges={edges}
      renderPanel={(sel) => <div data-testid="panel">{sel.kind}</div>}
      selectRequest={selectRequest}
      matchedIds={null}
      className="min-h-0 flex-1"
    />
  );
}

const strict = !location.search.includes("nostrict");
createRoot(document.getElementById("root")!).render(
  strict ? (
    <StrictMode>
      <Harness />
    </StrictMode>
  ) : (
    <Harness />
  ),
);
