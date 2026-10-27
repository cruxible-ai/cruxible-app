import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ChevronsDownUp, ChevronsUpDown, X } from "lucide-react";
import { FloatingEdge } from "./FloatingEdge";
import { RoutedEdge } from "./RoutedEdge";
import { FocusChip } from "./FocusChip";

export type GraphSelection = { kind: "node"; id: string } | { kind: "edge"; id: string };

export interface GraphPanelApi {
  /** Move the selection to another node and recenter on it. */
  select: (nodeId: string) => void;
}

const edgeTypes = { floating: FloatingEdge, routed: RoutedEdge };

/** What the focus chip names: the node's id, or an edge as source → target. */
function selectionLabel(selection: GraphSelection, edges: Edge[], name: (id: string) => string = (id) => id): string {
  if (selection.kind === "node") return name(selection.id);
  const edge = edges.find((e) => e.id === selection.id);
  return edge ? `${name(edge.source)} → ${name(edge.target)}` : selection.id;
}

/** What stays lit around a selected node (default: the node and its 1-hop neighborhood). */
export type Neighborhood = (nodeId: string, edges: Edge[]) => { nodes: Set<string>; edges: Set<string> };
const PANEL_WIDTH = 320;

/**
 * Shared graph shell: floating straight edges, one selection model (node →
 * 1-hop neighborhood stays lit, everything else dims; edge → edge + endpoints
 * stay lit), a floating context panel over the canvas, recenter-on-select
 * offset for the panel, and an expand toggle (a taller canvas in place). Esc clears selection, then
 * collapses it. All graph screens render through this so the philosophy
 * stays identical everywhere.
 */
export function GraphCanvas(props: {
  nodes: Node[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  renderPanel: (selection: GraphSelection, api: GraphPanelApi) => ReactNode;
  className?: string;
  /** Extra controls rendered top-left inside the canvas (e.g. legends). */
  overlay?: ReactNode;
  /** Rendered inside the ReactFlow element (Controls, MiniMap, ...). */
  children?: ReactNode;
  /** External selection request (a search hit, a URL param); re-fires on nonce change. */
  selectRequest?: { id: string; nonce: number; kind?: GraphSelection["kind"] } | null;
  /** What a selected node keeps lit; default its 1-hop neighborhood. */
  neighborhood?: Neighborhood;
  /** Told whenever the selection changes (null: cleared). */
  onSelectionChange?: (selection: GraphSelection | null) => void;
  /** Recenter the canvas on a selected node (off for graphs that fit whole). */
  recenter?: boolean;
  /** How the focus chip names a node (default its id). */
  nodeName?: (id: string) => string;
  /** Space fitView leaves around the graph, as a share of the canvas (default 0.12). */
  fitPadding?: number;
}) {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  );
}

function Canvas({
  nodes,
  edges,
  nodeTypes,
  renderPanel,
  className = "h-full min-h-[60vh]",
  overlay,
  children,
  selectRequest,
  neighborhood,
  onSelectionChange,
  recenter = true,
  nodeName,
  fitPadding = 0.12,
}: Parameters<typeof GraphCanvas>[0]) {
  const rf = useReactFlow();
  const [selection, setSelection] = useState<GraphSelection | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  // Panning must not clear the selection: only a true click on the pane
  // (pointer down → up with no viewport move in between) deselects, so you
  // can drag around a lit neighborhood without losing it.
  const pannedRef = useRef(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setSelection((sel) => {
        if (sel) return null;
        setFullscreen(false);
        return sel;
      });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const centerOn = useCallback(
    (nodeId: string) => {
      const internal = rf.getInternalNode(nodeId);
      if (!internal) return;
      const { width = 0, height = 0 } = internal.measured ?? {};
      const zoom = rf.getViewport().zoom;
      // Shift the target left so the node centers in the canvas area the
      // panel doesn't cover.
      rf.setCenter(
        internal.internals.positionAbsolute.x + width / 2 + PANEL_WIDTH / 2 / zoom,
        internal.internals.positionAbsolute.y + height / 2,
        { zoom, duration: 350 },
      );
    },
    [rf],
  );

  const select = useCallback(
    (nodeId: string) => {
      setSelection({ kind: "node", id: nodeId });
      if (recenter) centerOn(nodeId);
    },
    [centerOn, recenter],
  );

  // Tell the screen about every selection change (a click, Esc, the chip, the pane).
  const reported = useRef<GraphSelection | null>(null);
  useEffect(() => {
    if (!onSelectionChange || reported.current === selection) return;
    reported.current = selection;
    onSelectionChange(selection);
  }, [selection, onSelectionChange]);

  useEffect(() => {
    if (!selectRequest) return;
    if (selectRequest.kind === "edge") setSelection({ kind: "edge", id: selectRequest.id });
    else select(selectRequest.id);
    // Re-fire on nonce so repeating the same search hit still recenters.
  }, [selectRequest, select]);

  // Focus sets: with a node selected, its 1-hop neighborhood stays lit; with
  // an edge selected, the edge and its endpoints stay lit.
  const { litNodes, litEdges } = useMemo(() => {
    if (!selection) return { litNodes: null as Set<string> | null, litEdges: null as Set<string> | null };
    const litNodes = new Set<string>();
    const litEdges = new Set<string>();
    if (selection.kind === "node" && neighborhood) {
      const lit = neighborhood(selection.id, edges);
      return { litNodes: lit.nodes, litEdges: lit.edges };
    }
    if (selection.kind === "node") {
      litNodes.add(selection.id);
      for (const e of edges) {
        if (e.source === selection.id || e.target === selection.id) {
          litEdges.add(e.id);
          litNodes.add(e.source);
          litNodes.add(e.target);
        }
      }
    } else {
      const edge = edges.find((e) => e.id === selection.id);
      if (edge) {
        litEdges.add(edge.id);
        litNodes.add(edge.source);
        litNodes.add(edge.target);
      }
    }
    return { litNodes, litEdges };
  }, [selection, edges, neighborhood]);

  // `data.lit` marks the selection's neighborhood so node/edge renderers can
  // reveal detail (labels) that stays hidden at full-canvas density — but
  // only while the neighborhood is small enough to read. A hub's hundreds of
  // lit nodes would smear into overlap, so past the cap only the dimming
  // applies and the context panel carries the list. False when nothing is
  // selected — "everything lit" is not a neighborhood.
  //
  // Both maps cache per-id: an element whose (source object, computed flags)
  // didn't change keeps its previous OBJECT IDENTITY, so ReactFlow's node/
  // edge memoization skips it — a search keystroke or selection change only
  // re-renders the elements it actually touched.
  const revealDetail = litNodes !== null && litNodes.size <= 40;
  const nodeCache = useRef(
    new Map<string, { src: Node; dim: boolean; lit: boolean; out: Node }>(),
  );
  const styledNodes = useMemo(() => {
    const prev = nodeCache.current;
    const next = new Map<string, { src: Node; dim: boolean; lit: boolean; out: Node }>();
    const out = nodes.map((n) => {
      const dim = litNodes !== null && !litNodes.has(n.id);
      const lit = !dim && revealDetail;
      const hit = prev.get(n.id);
      if (hit && hit.src === n && hit.dim === dim && hit.lit === lit) {
        next.set(n.id, hit);
        return hit.out;
      }
      const styled: Node = dim
        ? { ...n, style: { ...n.style, opacity: 0.18, transition: "opacity 150ms" } }
        : {
            ...n,
            data: { ...n.data, lit },
            // Lift lit nodes so their revealed labels draw over dimmed dots.
            ...(lit ? { zIndex: 10 } : {}),
            style: { ...n.style, opacity: 1, transition: "opacity 150ms" },
          };
      next.set(n.id, { src: n, dim, lit, out: styled });
      return styled;
    });
    nodeCache.current = next;
    return out;
  }, [nodes, litNodes, revealDetail]);

  const edgeCache = useRef(
    new Map<string, { src: Edge; lit: boolean; reveal: boolean; selected: boolean; out: Edge }>(),
  );
  const styledEdges = useMemo(() => {
    const prev = edgeCache.current;
    const next = new Map<
      string,
      { src: Edge; lit: boolean; reveal: boolean; selected: boolean; out: Edge }
    >();
    const out = edges.map((e) => {
      const lit = !litEdges || litEdges.has(e.id);
      const reveal = revealDetail && litEdges !== null && lit;
      const selected = selection?.kind === "edge" && selection.id === e.id;
      const hit = prev.get(e.id);
      if (hit && hit.src === e && hit.lit === lit && hit.reveal === reveal && hit.selected === selected) {
        next.set(e.id, hit);
        return hit.out;
      }
      const styled: Edge = {
        ...e,
        // Edges routed by a layout keep their route; the rest float.
        type: e.type ?? "floating",
        data: { ...e.data, lit: reveal },
        style: {
          ...e.style,
          opacity: lit ? 1 : 0.12,
          strokeWidth: selected ? 2.25 : e.style?.strokeWidth,
          transition: "opacity 150ms",
        },
      };
      next.set(e.id, { src: e, lit, reveal, selected, out: styled });
      return styled;
    });
    edgeCache.current = next;
    return out;
  }, [edges, litEdges, selection, revealDetail]);

  const panel = selection ? renderPanel(selection, { select }) : null;

  return (
    <div
      // Expanded = a taller canvas in place (the page scrolls), never full screen.
      className={`relative flex flex-col ${className}`}
      style={fullscreen ? { height: "85vh", minHeight: "85vh", flex: "none" } : undefined}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden border border-zinc-800">
        <ReactFlow
          nodes={styledNodes}
          edges={styledEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ maxZoom: 1.15, padding: fitPadding }}
          colorMode="dark"
          nodesDraggable
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, node) => select(node.id)}
          onEdgeClick={(_, edge) => setSelection({ kind: "edge", id: edge.id })}
          onPointerDownCapture={() => {
            pannedRef.current = false;
          }}
          onMove={() => {
            pannedRef.current = true;
          }}
          onPaneClick={() => {
            if (!pannedRef.current) setSelection(null);
          }}
        >
          <Background color="#2a2822" gap={24} />
          {children}
        </ReactFlow>

        {(selection || overlay) && (
          <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-24rem)] flex-wrap items-center gap-2">
            {selection && <FocusChip label={selectionLabel(selection, edges, nodeName)} onClear={() => setSelection(null)} />}
            {overlay}
          </div>
        )}

        <button
          onClick={() => setFullscreen((f) => !f)}
          title={fullscreen ? "Make the graph smaller (Esc)" : "Make the graph taller"}
          aria-label={fullscreen ? "Make the graph smaller" : "Make the graph taller"}
          className="absolute right-2 top-2 z-10 border border-zinc-800 bg-zinc-950/90 p-1.5 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
        >
          {fullscreen ? <ChevronsDownUp className="h-3.5 w-3.5" /> : <ChevronsUpDown className="h-3.5 w-3.5" />}
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
