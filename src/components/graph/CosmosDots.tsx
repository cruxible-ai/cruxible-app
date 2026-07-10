import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Graph, type GraphConfigInterface } from "@cosmograph/cosmos";
import { Maximize2, Minimize2, Minus, Plus, Scan, X } from "lucide-react";
import type { GraphPanelApi, GraphSelection } from "./GraphCanvas";
import type { EdgeRgba } from "./EdgeGovernance";
import type { LayoutUpdate } from "./layout.worker";

/** Clears the focused-point ring. GraphConfigInterface declares the index as
 * non-optional under exactOptionalPropertyTypes, but the library treats
 * undefined as "no focus" — hence the cast. */
const UNFOCUS = { focusedPointIndex: undefined } as unknown as Partial<GraphConfigInterface>;

/** A dot in the WebGL state graph. Color arrives separately (nodeColors) so
 * a palette swap never changes topology identity. */
export interface GlDotNode {
  id: string;
  title: string;
}

/** A line in the WebGL state graph. */
export interface GlDotEdge {
  id: string;
  source: string;
  target: string;
  /** Review-state stroke from edgeStrokeRgba (inactive lifecycle pre-faded). */
  rgba: EdgeRgba;
  /** Relationship label revealed while the edge is lit. */
  label: string;
}

const PANEL_WIDTH = 320;
/** Same reveal cap as GraphCanvas: labels help only while the lit
 * neighborhood is small enough to read. */
const REVEAL_LABEL_CAP = 40;
/** Search rings are an orientation aid, not a result list — past this many
 * the header count + Enter-to-jump carry the rest. */
const MATCH_RING_CAP = 150;
const EDGE_HIT_TOLERANCE_PX = 6;
/** Constant screen-pixel glyph size — semantic zoom keeps dots this size
 * while zoom stretches the space between them. */
const POINT_SIZE = 7;

/**
 * WebGL dots renderer for the state graph: cosmos draws every dot and line
 * as GPU points/lines, HTML overlays carry the text (hover label, search
 * rings, lit-neighborhood labels), and the GraphCanvas selection philosophy
 * is reproduced GPU-side — click a node and its 1-hop neighborhood stays
 * lit while the rest dims (a greyout texture, not a React re-render); click
 * a line to light the edge and its endpoints; Esc clears; the same floating
 * context panel renders on the right.
 *
 * Layout runs in a Web Worker (deterministic d3-force, streamed), so first
 * paint shows the seeded spiral immediately and organizes live.
 */
export function CosmosDots({
  nodes,
  edges,
  nodeColors,
  renderPanel,
  overlay,
  className = "min-h-0 flex-1",
  selectRequest,
  matchedIds,
}: {
  nodes: GlDotNode[];
  edges: GlDotEdge[];
  /** Dot fill per node (#rrggbb, index-aligned with `nodes`). Color-only
   * changes (By type ↔ By kit) restyle the live graph via setPointColors —
   * no rebuild, no relayout, camera untouched. */
  nodeColors: string[];
  renderPanel: (selection: GraphSelection, api: GraphPanelApi) => ReactNode;
  /** Extra controls rendered top-left inside the canvas (e.g. legends). */
  overlay?: ReactNode;
  className?: string;
  /** External select-and-center request (e.g. a search hit); re-fires on nonce change. */
  selectRequest?: { id: string; nonce: number } | null;
  /** Node ids matching the current search — drawn as overlay rings. */
  matchedIds?: Set<string> | null;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const [selection, setSelectionState] = useState<GraphSelection | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  // Overlay elements read the camera imperatively; this bumps a re-render
  // (rAF-throttled) whenever camera or layout positions move under them.
  const [, bumpOverlay] = useReducer((x: number) => x + 1, 0);
  const overlayFrame = useRef(0);
  // Once the user has driven the camera (or navigated a selection), layout
  // progress must stop auto-fitting the view out from under them.
  const cameraOwnedRef = useRef(false);
  const scheduleOverlaySync = useCallback(() => {
    if (overlayFrame.current) return;
    overlayFrame.current = requestAnimationFrame(() => {
      overlayFrame.current = 0;
      bumpOverlay();
    });
  }, []);

  // Buffers and adjacency, all index-addressed in `nodes` order. Topology
  // only — colors live in their own memo so a palette swap can't invalidate
  // this identity (the graph + layout lifecycle keys on it).
  const data = useMemo(() => {
    const idToIndex = new Map<string, number>();
    nodes.forEach((n, i) => idToIndex.set(n.id, i));

    // d3-force's phyllotaxis seed — the exact frame the worker starts from,
    // so the picture refines rather than jumps once layout streams in.
    const seedPositions = new Float32Array(nodes.length * 2);
    const initialAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodes.length; i++) {
      const radius = 10 * Math.sqrt(0.5 + i);
      const angle = i * initialAngle;
      seedPositions[i * 2] = radius * Math.cos(angle);
      seedPositions[i * 2 + 1] = radius * Math.sin(angle);
    }

    const drawn = edges.filter(
      (e) => idToIndex.has(e.source) && idToIndex.has(e.target),
    );
    const linkIndices = new Float32Array(drawn.length * 2);
    const workerLinks = new Uint32Array(drawn.length * 2);
    const linkColors = new Float32Array(drawn.length * 4);
    const adjacency: number[][] = nodes.map(() => []);
    const incidentEdges: number[][] = nodes.map(() => []);
    drawn.forEach((e, i) => {
      const s = idToIndex.get(e.source)!;
      const t = idToIndex.get(e.target)!;
      linkIndices[i * 2] = s;
      linkIndices[i * 2 + 1] = t;
      workerLinks[i * 2] = s;
      workerLinks[i * 2 + 1] = t;
      linkColors[i * 4] = e.rgba[0] / 255;
      linkColors[i * 4 + 1] = e.rgba[1] / 255;
      linkColors[i * 4 + 2] = e.rgba[2] / 255;
      linkColors[i * 4 + 3] = e.rgba[3];
      adjacency[s]!.push(t);
      adjacency[t]!.push(s);
      incidentEdges[s]!.push(i);
      if (t !== s) incidentEdges[t]!.push(i);
    });
    const edgeIndexById = new Map(drawn.map((e, i) => [e.id, i]));
    return {
      idToIndex,
      seedPositions,
      drawn,
      linkIndices,
      workerLinks,
      linkColors,
      adjacency,
      incidentEdges,
      edgeIndexById,
    };
  }, [nodes, edges]);

  // Cosmos consumes raw 0..1 floats (its docstrings claim 0-255; the shader
  // says otherwise — see DECISION.md). Kept apart from `data`: a color-mode
  // toggle re-runs only this and the push effect below.
  const pointColors = useMemo(() => {
    const buf = new Float32Array(nodes.length * 4);
    nodeColors.forEach((c, i) => {
      buf[i * 4] = parseInt(c.slice(1, 3), 16) / 255;
      buf[i * 4 + 1] = parseInt(c.slice(3, 5), 16) / 255;
      buf[i * 4 + 2] = parseInt(c.slice(5, 7), 16) / 255;
      buf[i * 4 + 3] = 1;
    });
    return buf;
  }, [nodes.length, nodeColors]);
  // Render-body ref assignment (same pattern as handlersRef): the lifecycle
  // effect reads the current colors at graph construction without taking
  // them as a dependency.
  const pointColorsRef = useRef(pointColors);
  pointColorsRef.current = pointColors;

  // Live handlers behind a ref: cosmos config callbacks bind once at
  // construction and must always see current state.
  const handlersRef = useRef<{
    click: (index: number | undefined, event: MouseEvent) => void;
    hover: (index: number | null) => void;
  }>({ click: () => {}, hover: () => {} });

  // The lit sets mirror what the GPU greyout is showing, for the HTML label
  // overlay. Dimming itself never touches React.
  const litSets = useMemo(() => {
    if (!selection) return null;
    const litNodes = new Set<string>();
    const litEdges = new Set<number>();
    if (selection.kind === "node") {
      const idx = data.idToIndex.get(selection.id);
      if (idx === undefined) return null;
      litNodes.add(selection.id);
      for (const ei of data.incidentEdges[idx] ?? []) {
        const e = data.drawn[ei]!;
        litEdges.add(ei);
        litNodes.add(e.source);
        litNodes.add(e.target);
      }
    } else {
      const ei = data.edgeIndexById.get(selection.id);
      if (ei === undefined) return null;
      const e = data.drawn[ei]!;
      litEdges.add(ei);
      litNodes.add(e.source);
      litNodes.add(e.target);
    }
    return { litNodes, litEdges };
  }, [selection, data]);

  /** Push the selection's dim/lit state to the GPU. */
  const applySelection = useCallback(
    (sel: GraphSelection | null) => {
      const g = graphRef.current;
      if (!g) return;
      if (!sel) {
        g.unselectPoints();
        g.setConfig(UNFOCUS);
        return;
      }
      if (sel.kind === "node") {
        const idx = data.idToIndex.get(sel.id);
        if (idx === undefined) return;
        // Selecting the 1-hop node set makes the link shader keep exactly
        // the neighborhood's edges lit (a link dims if either endpoint is
        // greyed out).
        g.selectPointsByIndices([idx, ...(data.adjacency[idx] ?? [])]);
        g.setConfig({ focusedPointIndex: idx });
      } else {
        const ei = data.edgeIndexById.get(sel.id);
        if (ei === undefined) return;
        const e = data.drawn[ei]!;
        g.selectPointsByIndices([
          data.idToIndex.get(e.source)!,
          data.idToIndex.get(e.target)!,
        ]);
        g.setConfig(UNFOCUS);
      }
    },
    [data],
  );

  const setSelection = useCallback(
    (sel: GraphSelection | null) => {
      setSelectionState(sel);
      applySelection(sel);
    },
    [applySelection],
  );

  const select = useCallback(
    (nodeId: string) => {
      setSelection({ kind: "node", id: nodeId });
      const g = graphRef.current;
      const idx = data.idToIndex.get(nodeId);
      if (g && idx !== undefined) {
        // Center at the current zoom — selection is navigation, not zoom.
        cameraOwnedRef.current = true;
        g.zoomToPointByIndex(idx, 350, g.getZoomLevel(), true);
      }
    },
    [data, setSelection],
  );

  /** Nearest drawn edge within tolerance of a canvas point, else null. */
  const pickEdgeAt = useCallback(
    (px: number, py: number): string | null => {
      const g = graphRef.current;
      const pos = positionsRef.current;
      const el = containerRef.current;
      if (!g || !pos || !el) return null;
      // spaceToScreenPosition is affine; probe it once and transform inline
      // instead of calling it 2x per edge.
      const o = g.spaceToScreenPosition([0, 0]);
      const u = g.spaceToScreenPosition([1, 0]);
      const v = g.spaceToScreenPosition([0, 1]);
      const axx = u[0] - o[0];
      const axy = u[1] - o[1];
      const ayx = v[0] - o[0];
      const ayy = v[1] - o[1];
      const tol = EDGE_HIT_TOLERANCE_PX;
      let bestD2 = tol * tol;
      let best: string | null = null;
      const li = data.linkIndices;
      for (let i = 0; i < li.length / 2; i++) {
        const s = li[i * 2]!;
        const t = li[i * 2 + 1]!;
        const x1 = o[0] + axx * pos[s * 2]! + ayx * pos[s * 2 + 1]!;
        const y1 = o[1] + axy * pos[s * 2]! + ayy * pos[s * 2 + 1]!;
        const x2 = o[0] + axx * pos[t * 2]! + ayx * pos[t * 2 + 1]!;
        const y2 = o[1] + axy * pos[t * 2]! + ayy * pos[t * 2 + 1]!;
        if (
          Math.min(x1, x2) > px + tol ||
          Math.max(x1, x2) < px - tol ||
          Math.min(y1, y2) > py + tol ||
          Math.max(y1, y2) < py - tol
        )
          continue;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len2 = dx * dx + dy * dy;
        const tt = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2));
        const ex = x1 + tt * dx - px;
        const ey = y1 + tt * dy - py;
        const d2 = ex * ex + ey * ey;
        if (d2 < bestD2) {
          bestD2 = d2;
          best = data.drawn[i]!.id;
        }
      }
      return best;
    },
    [data],
  );

  handlersRef.current = {
    click: (index, event) => {
      if (index !== undefined) {
        select(nodes[index]!.id);
        return;
      }
      const hit = pickEdgeAt(event.offsetX, event.offsetY);
      setSelection(hit ? { kind: "edge", id: hit } : null);
    },
    hover: (index) => setHoverId(index === null ? null : (nodes[index]?.id ?? null)),
  };

  // Graph + layout worker lifecycle, one per dataset.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || nodes.length === 0) return;
    cameraOwnedRef.current = false; // fresh graph, fresh framing
    const graph = new Graph(container, {
      backgroundColor: "#09090b",
      disableSimulation: true,
      fitViewOnInit: false,
      pointSize: POINT_SIZE,
      scalePointsOnZoom: false,
      renderLinks: true,
      linkWidth: 1,
      // Long links fade with distance by default; keep them readable — the
      // review-state alpha already encodes softness.
      linkVisibilityMinTransparency: 0.4,
      pointGreyoutOpacity: 0.18,
      linkGreyoutOpacity: 0.12,
      // Fill-rate governor: dense instances multiply link overdraw, and the
      // per-frame GPU cost lands on the main thread as hover-readback stalls
      // during zoom. Half resolution at high edge counts keeps wheel-zoom at
      // frame rate; the visual difference at dot density is negligible.
      pixelRatio: data.drawn.length > 30000 ? 1 : 2,
      hoveredPointCursor: "pointer",
      renderHoveredPointRing: true,
      hoveredPointRingColor: "#e4e4e7",
      focusedPointRingColor: "#f4f4f5",
      disableAttribution: true,
      // Cosmos's config types don't survive its internal path-alias import
      // under our tsconfig, so callback params are annotated explicitly.
      onClick: (index: number | undefined, _pos: [number, number] | undefined, event: MouseEvent) =>
        handlersRef.current.click(index, event),
      onPointMouseOver: (index: number) => handlersRef.current.hover(index),
      onPointMouseOut: () => handlersRef.current.hover(null),
      onZoom: (_e: unknown, userDriven: boolean) => {
        if (userDriven) cameraOwnedRef.current = true;
        scheduleOverlaySync();
      },
    });
    graph.setPointPositions(data.seedPositions);
    graph.setPointColors(pointColorsRef.current);
    graph.setLinks(data.linkIndices);
    graph.setLinkColors(data.linkColors);
    graph.render();
    graph.fitView(0);
    graphRef.current = graph;
    positionsRef.current = data.seedPositions;

    const worker = new Worker(new URL("./layout.worker.ts", import.meta.url), {
      type: "module",
    });
    worker.postMessage({ count: nodes.length, links: data.workerLinks });
    worker.onerror = (e) => {
      // Layout failure leaves the seeded spiral — visible but unorganized;
      // surface the cause instead of failing silently.
      console.error("layout worker failed:", e.message, e);
    };
    let firstUpdate = true;
    worker.onmessage = (e: MessageEvent<LayoutUpdate>) => {
      positionsRef.current = e.data.positions;
      graph.setPointPositions(e.data.positions);
      // setPointPositions only stages the buffer; render() applies staged
      // data (it is the library's "data changed" entry point, cheap here).
      graph.render();
      // Keep the forming picture framed, but never yank a camera the user
      // has already taken over.
      if ((firstUpdate || e.data.done) && !cameraOwnedRef.current) {
        graph.fitView(e.data.done ? 400 : 0);
      }
      firstUpdate = false;
      scheduleOverlaySync();
    };
    return () => {
      worker.terminate();
      graph.destroy();
      // destroy() clears the canvas but leaves it in the DOM; drop it so a
      // remount (StrictMode, data change) doesn't stack dead canvases.
      container.replaceChildren();
      graphRef.current = null;
      positionsRef.current = null;
    };
    // scheduleOverlaySync is stable (useCallback []).
  }, [data, nodes, scheduleOverlaySync]);

  // Color-only updates restyle the live graph in place. On mount this
  // re-applies what the lifecycle effect already set — harmless; on a
  // palette swap it is the whole job: stage + render (setters stage, render()
  // applies — the beta staging quirk, see DECISION.md).
  useEffect(() => {
    const g = graphRef.current;
    if (!g) return;
    g.setPointColors(pointColors);
    g.render();
  }, [pointColors]);

  // Re-assert GPU selection after the graph remounts under an existing
  // selection (e.g. hide-cold toggled while a node is selected).
  useEffect(() => {
    if (selection) {
      const stillThere =
        selection.kind === "node"
          ? data.idToIndex.has(selection.id)
          : data.edgeIndexById.has(selection.id);
      if (stillThere) applySelection(selection);
      else setSelection(null);
    }
    // Runs when data (and thus the graph instance) changes.
  }, [data, applySelection]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectRequest) select(selectRequest.id);
    // Re-fire on nonce so repeating the same search hit still recenters.
  }, [selectRequest, select]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setSelectionState((sel) => {
        if (sel) {
          applySelection(null);
          return null;
        }
        setFullscreen(false);
        return sel;
      });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [applySelection]);

  // ---- HTML overlay (labels, rings) ------------------------------------
  // Everything here is read imperatively from the camera each throttled
  // sync — a few dozen positioned divs, never the dataset.
  const el = containerRef.current;
  const g = graphRef.current;
  const pos = positionsRef.current;
  const width = el?.clientWidth ?? 0;
  const height = el?.clientHeight ?? 0;
  const toScreen = (i: number): [number, number] | null => {
    if (!g || !pos) return null;
    const p = g.spaceToScreenPosition([pos[i * 2]!, pos[i * 2 + 1]!]);
    if (p[0] < -24 || p[0] > width + 24 || p[1] < -24 || p[1] > height + 24) return null;
    return p;
  };

  const revealLabels =
    litSets !== null && litSets.litNodes.size <= REVEAL_LABEL_CAP ? litSets : null;
  const labelled: Array<{ key: string; x: number; y: number; text: string; edge?: boolean }> = [];
  if (g && pos) {
    if (revealLabels) {
      for (const id of revealLabels.litNodes) {
        const i = data.idToIndex.get(id);
        if (i === undefined) continue;
        const p = toScreen(i);
        if (p) labelled.push({ key: `n${id}`, x: p[0], y: p[1], text: nodes[i]!.title });
      }
      for (const ei of revealLabels.litEdges) {
        const e = data.drawn[ei]!;
        const s = toScreen(data.idToIndex.get(e.source)!);
        const t = toScreen(data.idToIndex.get(e.target)!);
        if (s && t)
          labelled.push({
            key: `e${e.id}`,
            x: (s[0] + t[0]) / 2,
            y: (s[1] + t[1]) / 2,
            text: e.label,
            edge: true,
          });
      }
    }
    if (hoverId !== null && !(revealLabels?.litNodes.has(hoverId) ?? false)) {
      const i = data.idToIndex.get(hoverId);
      if (i !== undefined) {
        const p = toScreen(i);
        if (p) labelled.push({ key: `h${hoverId}`, x: p[0], y: p[1], text: nodes[i]!.title });
      }
    }
  }
  const rings: Array<{ key: string; x: number; y: number }> = [];
  if (g && pos && matchedIds && matchedIds.size > 0) {
    for (let i = 0; i < nodes.length && rings.length < MATCH_RING_CAP; i++) {
      if (!matchedIds.has(nodes[i]!.id)) continue;
      const p = toScreen(i);
      if (p) rings.push({ key: nodes[i]!.id, x: p[0], y: p[1] });
    }
  }

  const panel = selection ? renderPanel(selection, { select }) : null;
  const zoomBy = (factor: number) => {
    const gr = graphRef.current;
    if (gr) gr.setZoomLevel(gr.getZoomLevel() * factor, 250);
  };

  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-zinc-950 p-3"
          : `relative flex flex-col ${className}`
      }
    >
      <div className="relative min-h-0 flex-1 overflow-hidden border border-zinc-800">
        <div ref={containerRef} className="absolute inset-0" />

        {/* Overlay text layer: hover label, lit-neighborhood labels, search
            rings. Pointer events pass through to the canvas. */}
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          {rings.map((r) => (
            <div
              key={r.key}
              style={{ transform: `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)` }}
              className="absolute left-0 top-0 h-4 w-4 rounded-full ring-2 ring-zinc-100"
            />
          ))}
          {labelled.map((l) =>
            l.edge ? (
              <div
                key={l.key}
                style={{ transform: `translate(${l.x}px, ${l.y}px) translate(-50%, -50%)` }}
                className="absolute left-0 top-0 whitespace-nowrap bg-zinc-950/85 px-1 text-[9px] leading-3 text-zinc-400"
              >
                {l.text}
              </div>
            ) : (
              <div
                key={l.key}
                style={{ transform: `translate(${l.x + 8}px, ${l.y}px) translateY(-50%)` }}
                className="absolute left-0 top-0 whitespace-nowrap bg-zinc-950/85 px-1 text-[10px] leading-4 text-zinc-300"
              >
                {l.text}
              </div>
            ),
          )}
        </div>

        {overlay && <div className="absolute left-2 top-2 z-10">{overlay}</div>}

        {/* Canvas controls: zoom in/out, fit, fullscreen — square, warm-dark,
            matching the ReactFlow Controls the cards mode keeps. */}
        <div className="absolute bottom-2 left-2 z-10 flex flex-col border border-zinc-800 bg-zinc-950/90">
          <button
            onClick={() => zoomBy(1.5)}
            title="Zoom in"
            className="p-1.5 text-zinc-400 hover:text-zinc-200"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => zoomBy(1 / 1.5)}
            title="Zoom out"
            className="border-t border-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-200"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => graphRef.current?.fitView(300)}
            title="Fit view"
            className="border-t border-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-200"
          >
            <Scan className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          onClick={() => setFullscreen((f) => !f)}
          title={fullscreen ? "Exit full screen (Esc)" : "Full screen"}
          className="absolute right-2 top-2 z-10 border border-zinc-800 bg-zinc-950/90 p-1.5 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
        >
          {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>

        {panel && (
          <div
            style={{ width: PANEL_WIDTH }}
            className="absolute bottom-2 right-2 top-12 z-10 overflow-y-auto border border-zinc-700 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur"
          >
            <button
              onClick={() => setSelection(null)}
              title="Close (Esc)"
              className="absolute right-2 top-2 p-0.5 text-zinc-500 hover:text-zinc-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {panel}
          </div>
        )}
      </div>
    </div>
  );
}
