import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Controls,
  Handle,
  MiniMap,
  Position,
  useReactFlow,
  type Edge,
  type MiniMapNodeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  useEdgeList,
  useEntitiesForTypes,
  useInspectEntity,
  useInstanceId,
  useStats,
} from "@/api/hooks";
import {
  EdgeGovernancePanel,
  edgeStroke,
  edgeStrokeRgba,
  useGovernedRelationshipTypes,
  type EdgeMetadata,
} from "@/components/graph/EdgeGovernance";
import { CosmosDots, type GlDotEdge, type GlDotNode } from "@/components/graph/CosmosDots";
import { isEntityRef } from "@/api/items";
import { entityPath } from "@/components/EntityLink";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState } from "@/components/Panel";
import { actionChipClass, toggleChipClass } from "@/components/Chip";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import {
  ConnectionList,
  PanelActions,
  PanelHeading,
  PanelSection,
  PropertyList,
} from "@/components/graph/PanelBits";
import { isColdEntity, isColdStatus } from "@/lib/cold";
import { LAYER_META, useLayerColoring, type KitLayer } from "@/lib/kit-layer";
import { buildTypeColors } from "@/lib/type-colors";
import { useSettings } from "@/lib/settings";
import { humanize, matchesText } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/** Dots are GPU points now (CosmosDots) — the budget is a sanity ceiling
 * against pathological instances, not a DOM cost cap. Verified at this scale:
 * pans/zooms at refresh rate, select < 50ms (see DECISION.md). */
const MAX_NODES_DOTS = 30000;
const MIN_DOTS_PER_TYPE = 25;
const MAX_NODES_CARDS = 600;
/** Card mode shows each type's best-connected members and folds the rest
 * into one overflow card — reading titles is the mode's whole point, so it
 * shows the members most worth reading. */
const CARDS_PER_TYPE = 40;
/** Sized for the raised dots budget (daemon list accepts it; KEV ships 14k). */
const EDGE_FETCH_LIMIT = 60000;
/** Kit-layer hues as plain hex, for surfaces that can't take a Tailwind
 * class: the cards MiniMap and the WebGL dot colors. */
const LAYER_DOT_HEX: Record<KitLayer, string> = {
  base: "#726f63",
  domain: "#a78bfa",
};
const FALLBACK_DOT_HEX = "#726f63";

/** Topology-identity row data: deliberately color-free, so switching the
 * color mode never invalidates the memos (and the WebGL graph + worker
 * layout keyed on them). Hue is resolved at paint time per renderer. */
interface DotNodeCore {
  entityType: string;
  entityId: string;
  title: string;
  status: string | undefined;
  properties: Record<string, unknown>;
}

type DotNodeData = DotNodeCore & {
  showLabel: boolean;
  matched: boolean;
  /** Kit-layer accent, stamped at card build time in kit color mode. */
  layer?: KitLayer | null;
  /** Resolved dot hue (hex), stamped at card build time in type color mode. */
  color?: string | null;
  /** Stamped by GraphCanvas: node is in the selected neighborhood. */
  lit?: boolean;
  [key: string]: unknown;
};

// Dots mode renders through CosmosDots (WebGL points) — no per-dot React
// component exists anymore. Cards below stay ReactFlow.

function CardNode({ data }: NodeProps<Node<DotNodeData>>) {
  const accent = data.layer ? LAYER_META[data.layer] : null;
  return (
    <div
      className={`max-w-44 border px-2 py-1 text-left ${
        accent
          ? `${accent.border} ${accent.borderHover} bg-zinc-900`
          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      } ${data.matched ? "ring-2 ring-zinc-100" : ""}`}
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center gap-1 text-[8px] uppercase tracking-wide text-zinc-500">
        {data.color ? (
          <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: data.color }} />
        ) : (
          accent && (
            <span title={accent.label} className={`h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
          )
        )}
        {data.entityType}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="truncate text-[10px] leading-4 text-zinc-200">{data.title}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

function ClusterLabelNode({ data }: NodeProps<Node<{ label: string; count: number; [key: string]: unknown }>>) {
  return (
    <div className="pointer-events-none text-[12px] font-semibold uppercase tracking-wider text-zinc-500">
      {data.label} <span className="font-mono normal-case text-zinc-600">{data.count}</span>
    </div>
  );
}

function OverflowNode({ data }: NodeProps<Node<{ entityType: string; count: number; [key: string]: unknown }>>) {
  const instanceId = useInstanceId();
  return (
    <Link
      to={`/i/${instanceId}/browse/${data.entityType}`}
      className="block max-w-44 border border-dashed border-zinc-700 px-2 py-1 text-[10px] leading-4 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      +{data.count} more · browse →
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </Link>
  );
}

type MiniMapDotData = {
  color?: string | null;
  layer?: KitLayer | null;
};

function MiniMapDot({ id, x, y, width, height }: MiniMapNodeProps) {
  const { getNode } = useReactFlow();
  if (id.startsWith("__label:") || id.startsWith("__more:")) return null;

  const node = getNode(id);
  const data = node?.data as MiniMapDotData | undefined;
  const layer = data?.layer;
  const fill =
    typeof data?.color === "string" && data.color
      ? data.color
      : layer === "base" || layer === "domain"
        ? LAYER_DOT_HEX[layer]
        : FALLBACK_DOT_HEX;

  return (
    // r is in flow coordinates: the dots layout spans thousands of units, so
    // a node-true radius would scale to under a pixel in the minimap. 56
    // units ≈ a 2px dot — visible without smearing into neighbors, and
    // card-sized nodes still win via width/height.
    <circle
      cx={x + width / 2}
      cy={y + height / 2}
      r={Math.max(width, height, 56) / 2}
      fill={fill}
    />
  );
}

const nodeTypes = {
  card: CardNode,
  clusterLabel: ClusterLabelNode,
  overflowCard: OverflowNode,
};

/**
 * Card-mode layout: each type is a labeled near-square grid of cards packed
 * left-to-right into rows of a roughly square canvas, with the type's
 * overflow card (when capped) as the grid's last cell.
 */
function layoutCardClusters(
  rows: Array<{ id: string; data: DotNodeCore }>,
  overflow: Map<string, number>,
  decorate: (row: { id: string; data: DotNodeCore }) => Partial<DotNodeData>,
): Node[] {
  const COL_W = 190;
  const ROW_H = 48;
  const GAP_X = 200;
  const GAP_Y = 170;
  const LABEL_H = 30;

  const byType = new Map<string, typeof rows>();
  for (const r of rows) {
    byType.set(r.data.entityType, [...(byType.get(r.data.entityType) ?? []), r]);
  }
  const clusters = [...byType.entries()]
    .map(([type, members]) => {
      const cells = members.length + (overflow.has(type) ? 1 : 0);
      const cols = Math.ceil(Math.sqrt(cells));
      return {
        type,
        members,
        cols,
        width: cols * COL_W,
        height: Math.ceil(cells / cols) * ROW_H + LABEL_H,
      };
    })
    .sort((a, b) => b.members.length - a.members.length);

  const totalArea = clusters.reduce((s, c) => s + (c.width + GAP_X) * (c.height + GAP_Y), 0);
  const targetRowWidth = Math.max(Math.sqrt(totalArea) * 1.35, ...clusters.map((c) => c.width));

  const nodes: Node[] = [];
  let x = 0;
  let y = 0;
  let rowHeight = 0;
  for (const cluster of clusters) {
    if (x > 0 && x + cluster.width > targetRowWidth) {
      x = 0;
      y += rowHeight + GAP_Y;
      rowHeight = 0;
    }
    nodes.push({
      id: `__label:${cluster.type}`,
      type: "clusterLabel",
      position: { x, y },
      selectable: false,
      draggable: false,
      data: {
        label: humanize(cluster.type),
        count: cluster.members.length + (overflow.get(cluster.type) ?? 0),
      },
    });
    cluster.members.forEach((row, i) => {
      nodes.push({
        id: row.id,
        type: "card",
        position: {
          x: x + (i % cluster.cols) * COL_W,
          y: y + LABEL_H + Math.floor(i / cluster.cols) * ROW_H,
        },
        // Nominal card size for the MiniMap's dimension check (see dot nodes).
        initialWidth: 176,
        initialHeight: 42,
        data: { ...row.data, showLabel: true, ...decorate(row) },
      });
    });
    if (overflow.has(cluster.type)) {
      const i = cluster.members.length;
      nodes.push({
        id: `__more:${cluster.type}`,
        type: "overflowCard",
        position: {
          x: x + (i % cluster.cols) * COL_W,
          y: y + LABEL_H + Math.floor(i / cluster.cols) * ROW_H,
        },
        selectable: false,
        data: { entityType: cluster.type, count: overflow.get(cluster.type)! },
      });
    }
    x += cluster.width + GAP_X;
    rowHeight = Math.max(rowHeight, cluster.height);
  }
  return nodes;
}

/**
 * Governance-first legend: edge review state is the signal this graph
 * exists to show. Entity colors aren't repeated here — the type chips above
 * the canvas carry their own swatches; only kit-layer mode needs its two
 * layers explained. Entity status coloring is deliberately absent until
 * enum presentation semantics are config-owned
 * (oq-enum-presentation-semantics).
 */
function GraphLegend({ kitLayers, gl }: { kitLayers: boolean; gl?: boolean }) {
  const section = "text-[9px] font-semibold uppercase tracking-wider text-zinc-600";
  const row = "inline-flex items-center gap-1.5";
  return (
    <div className="flex flex-col gap-1 border border-zinc-800 bg-zinc-950/90 px-2 py-1.5 text-[10px] text-zinc-400">
      <span className={section}>Governed edges — review state</span>
      <span className={row}>
        <span className="h-px w-3 bg-emerald-500" /> Approved
      </span>
      <span className={row}>
        <span className="h-px w-3 bg-amber-400" /> Unreviewed / pending
      </span>
      <span className={row}>
        <span className="h-px w-3 bg-red-500" /> Rejected
      </span>
      <span className={`${section} mt-1`}>Deterministic edges</span>
      <span className={row}>
        <span className="h-px w-3 bg-zinc-500" /> Direct write · review n/a
      </span>
      {/* GL lines can't dash — inactive lifecycle renders faint instead. */}
      <span className={row}>
        {gl ? (
          <span className="h-px w-3 bg-zinc-500 opacity-40" />
        ) : (
          <span
            className="w-3 border-t border-dashed border-zinc-500"
            style={{ height: 0 }}
          />
        )}{" "}
        Inactive lifecycle{gl ? " (faint)" : ""}
      </span>
      {kitLayers && (
        <>
          <span className={`${section} mt-1`}>Entities — kit layer</span>
          <span className={row}>
            <span className={`h-1.5 w-1.5 rounded-full ${LAYER_META.base.dot}`} /> {LAYER_META.base.label}
          </span>
          <span className={row}>
            <span className={`h-1.5 w-1.5 rounded-full ${LAYER_META.domain.dot}`} /> {LAYER_META.domain.label}
          </span>
        </>
      )}
    </div>
  );
}

/**
 * Last-chosen display options (dots/cards, color mode, type chips) per
 * instance, applied when the graph is opened WITHOUT explicit URL params.
 * A shared link's params always win over the remembered state; focus is
 * navigation, not preference, and is never stored.
 */
interface GraphPrefs {
  view?: "dots" | "cards" | undefined;
  color?: "type" | "kit" | undefined;
  types?: string[] | undefined;
}

function prefsKey(instanceId: string) {
  return `cruxible-graph-prefs:${instanceId}`;
}

function loadGraphPrefs(instanceId: string): GraphPrefs {
  try {
    return (JSON.parse(localStorage.getItem(prefsKey(instanceId)) ?? "{}") ?? {}) as GraphPrefs;
  } catch {
    return {};
  }
}

function saveGraphPrefs(instanceId: string, patch: GraphPrefs) {
  try {
    // undefined patch values drop the key on stringify — "back to default".
    localStorage.setItem(
      prefsKey(instanceId),
      JSON.stringify({ ...loadGraphPrefs(instanceId), ...patch }),
    );
  } catch {
    // Storage unavailable (private mode, quota) — preference just won't stick.
  }
}

interface EdgeRow {
  from_type: string;
  from_id: string;
  to_type: string;
  to_id: string;
  relationship_type: string;
  edge_key: number;
  properties?: Record<string, unknown> | null;
  metadata?: EdgeMetadata | null;
}

// The force layout for dots mode lives in layout.worker.ts (same
// deterministic d3-force pipeline, streamed off the main thread by
// CosmosDots). Cards mode is a grid — no physics.

/** Node ids within `hops` of `rootId` over the drawn edges. */
function neighborhood(
  rootId: string,
  edges: Array<{ source: string; target: string }>,
  hops: number,
): Set<string> {
  const adjacency = new Map<string, string[]>();
  for (const e of edges) {
    adjacency.set(e.source, [...(adjacency.get(e.source) ?? []), e.target]);
    adjacency.set(e.target, [...(adjacency.get(e.target) ?? []), e.source]);
  }
  const seen = new Set([rootId]);
  let frontier = [rootId];
  for (let hop = 0; hop < hops; hop++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const nb of adjacency.get(id) ?? []) {
        if (!seen.has(nb)) {
          seen.add(nb);
          next.push(nb);
        }
      }
    }
    frontier = next;
  }
  return seen;
}

/**
 * The complete state graph: every live entity and edge on one canvas as
 * status-colored dots under a static force layout, with the shared
 * GraphCanvas selection model. Search highlights and jumps; "Isolate
 * neighborhood" (URL state) cuts the canvas down to k hops around one
 * entity. Hide-cold applies; dots mode samples dense types by degree when an
 * instance exceeds the node budget.
 */
export function StateGraphScreen() {
  const instanceId = useInstanceId();
  usePageTitle("State graph");
  const stats = useStats();
  const { settings } = useSettings();
  const layerColoring = useLayerColoring();
  const governedTypes = useGovernedRelationshipTypes();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectRequest, setSelectRequest] = useState<{ id: string; nonce: number } | null>(null);

  // types absent = all types; types present (even empty, from deselect-all)
  // = exactly the listed set.
  const typeFilter = useMemo(() => {
    const raw = searchParams.get("types");
    return raw === null ? null : new Set(raw.split(",").filter(Boolean));
  }, [searchParams]);
  const focus = searchParams.get("focus");
  const hops = Number(searchParams.get("hops") ?? 1) === 2 ? 2 : 1;
  // The focused entity is fetched directly (entity pages link here for any
  // entity), so focusing works even when the entity's type is auto-excluded
  // or its rows fall past the per-type list cap. Memoized: focusRef sits in
  // the layout memo's deps, and a fresh object every render would re-run the
  // force simulation on every keystroke.
  const focusRef = useMemo(() => {
    const colon = focus?.indexOf(":") ?? -1;
    return focus && colon > 0
      ? { type: focus.slice(0, colon), id: focus.slice(colon + 1) }
      : null;
  }, [focus]);
  const focusInspect = useInspectEntity(focusRef?.type ?? "", focusRef?.id ?? "", !!focusRef);
  // Two explicit renderings of the same graph: text-free dots for the whole
  // instance, constrained cards when titles should read at a glance.
  const mode: "dots" | "cards" = searchParams.get("view") === "cards" ? "cards" : "dots";
  const maxNodes = mode === "cards" ? MAX_NODES_CARDS : MAX_NODES_DOTS;
  // Entity hue: per-type colors by default; kit-layer accents opt-in (and
  // only offered when the instance actually spans layers).
  const colorMode: "type" | "kit" =
    searchParams.get("color") === "kit" && layerColoring.enabled ? "kit" : "type";

  // Opening the graph bare (sidebar click) restores the last-chosen options;
  // any explicit params (shared links, entity-page focus) win untouched.
  const hydratedPrefs = useRef(false);
  useEffect(() => {
    if (hydratedPrefs.current) return;
    hydratedPrefs.current = true;
    if ([...searchParams.keys()].length > 0) return;
    const prefs = loadGraphPrefs(instanceId);
    const sp = new URLSearchParams();
    if (prefs.view === "cards") sp.set("view", "cards");
    if (prefs.color === "kit") sp.set("color", "kit");
    if (prefs.types && prefs.types.length > 0) sp.set("types", prefs.types.join(","));
    if ([...sp.keys()].length > 0) setSearchParams(sp, { replace: true });
  }, [searchParams, setSearchParams, instanceId]);

  function setMode(next: "dots" | "cards") {
    const sp = new URLSearchParams(searchParams);
    if (next === "cards") sp.set("view", "cards");
    else sp.delete("view");
    setSearchParams(sp);
    saveGraphPrefs(instanceId, { view: next });
  }

  function setColorMode(next: "type" | "kit") {
    const sp = new URLSearchParams(searchParams);
    if (next === "kit") sp.set("color", "kit");
    else sp.delete("color");
    setSearchParams(sp);
    saveGraphPrefs(instanceId, { color: next });
  }

  // Colors key on the instance's FULL type vocabulary (not the filtered
  // view), so a type keeps its hue across chip toggles, hide-cold, and focus.
  const typeColorFor = useMemo(
    () => buildTypeColors(Object.keys(stats.data?.entity_counts ?? {})),
    [stats.data],
  );
  // Hue resolution for the current color mode, applied at paint time (card
  // build / GL color buffer) — never baked into the topology rows, so a
  // color-mode toggle restyles in place instead of rebuilding the graph.
  const dotStyleFor = useMemo(
    () =>
      (entityType: string): { color: string | null; layer: KitLayer | null } =>
        colorMode === "kit" && layerColoring.enabled
          ? { color: null, layer: layerColoring.layerFor(entityType) }
          : { color: typeColorFor(entityType), layer: null },
    [colorMode, layerColoring, typeColorFor],
  );
  const typeCounts = useMemo(() => {
    const statusCounts = (stats.data?.status_counts ?? {}) as Record<
      string,
      Record<string, number>
    >;
    return Object.entries(stats.data?.entity_counts ?? {})
      .map(([type, count]): [string, number] => {
        if (!settings.hideCold) return [type, count];
        const cold = Object.entries(statusCounts[type] ?? {})
          .filter(([status]) => isColdStatus(status))
          .reduce((s, [, n]) => s + n, 0);
        return [type, Math.max(0, count - cold)];
      })
      .filter(([, count]) => count > 0);
  }, [stats.data, settings.hideCold]);

  // Dots mode includes every selected type and enforces its budget inside the
  // layout memo, after degree can be computed from the fetched edge list.
  // Cards keep their existing smallest-first auto-fit behavior.
  const { includedTypes, autoExcluded } = useMemo(() => {
    if (typeFilter) {
      return {
        includedTypes: typeCounts.filter(([t]) => typeFilter.has(t)).map(([t]) => t),
        autoExcluded: [] as string[],
      };
    }
    if (mode === "dots") {
      return {
        includedTypes: typeCounts.map(([t]) => t),
        autoExcluded: [] as string[],
      };
    }
    const ascending = [...typeCounts].sort((a, b) => a[1] - b[1]);
    const included: string[] = [];
    let used = 0;
    for (const [type, count] of ascending) {
      // Card mode's per-type cap means a giant type only costs its cap.
      const cost = mode === "cards" ? Math.min(count, CARDS_PER_TYPE) : count;
      if (included.length > 0 && used + cost > maxNodes) continue;
      included.push(type);
      used += cost;
    }
    const order = typeCounts.map(([t]) => t);
    return {
      includedTypes: order.filter((t) => included.includes(t)),
      autoExcluded: order.filter((t) => !included.includes(t)),
    };
  }, [typeCounts, typeFilter, mode, maxNodes]);

  const projectedNodes = typeCounts
    .filter(([type]) => includedTypes.includes(type))
    .reduce(
      (s, [, n]) => s + (mode === "cards" ? Math.min(n, CARDS_PER_TYPE) : n),
      0,
    );
  // A focused view is small by construction — always drawable.
  const withinBudget =
    !!focusRef ||
    (projectedNodes > 0 &&
      (mode === "dots" || projectedNodes <= maxNodes || !typeFilter));

  // Fetch scope follows the mode: cards draw at most CARDS_PER_TYPE members
  // per type from a 600-node budget, so pulling the 30k dots budget per type
  // there is pure waste. 600/type still lets the degree ranking pick each
  // type's best-connected members from well beyond what it can draw.
  const entityResults = useEntitiesForTypes(
    includedTypes,
    mode === "cards" ? MAX_NODES_CARDS : MAX_NODES_DOTS,
    withinBudget,
  );
  const edgeList = useEdgeList(EDGE_FETCH_LIMIT, withinBudget);

  function toggleType(type: string) {
    const next = new Set(typeFilter ?? includedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    const sp = new URLSearchParams(searchParams);
    const all = next.size === typeCounts.length;
    if (all) sp.delete("types");
    else sp.set("types", [...next].sort().join(","));
    setSearchParams(sp);
    saveGraphPrefs(instanceId, all ? { types: undefined } : { types: [...next].sort() });
  }

  function setAllTypes(on: boolean) {
    const sp = new URLSearchParams(searchParams);
    if (on) sp.delete("types");
    else sp.set("types", "");
    setSearchParams(sp);
    // Select-all resets the remembered filter; deselect-all is a transient
    // narrowing step, not a preference worth restoring next visit.
    if (on) saveGraphPrefs(instanceId, { types: undefined });
  }

  function setFocus(nodeId: string | null, nextHops?: number) {
    const sp = new URLSearchParams(searchParams);
    if (nodeId) sp.set("focus", nodeId);
    else sp.delete("focus");
    if (nodeId && (nextHops ?? hops) === 2) sp.set("hops", "2");
    else sp.delete("hops");
    setSearchParams(sp);
  }

  // Entity rows + edge rows → the drawn graph's rows and links, in stages:
  // collect, isolate, budget. All pure derivation from fetch results + URL
  // state. Layout is downstream: grid for cards, worker force-layout for dots.
  const { rows, links, droppedEdges, sampledTypeCounts, overflow } = useMemo(() => {
    const rows: Array<{ id: string; data: DotNodeCore }> = [];
    const sampledTypeCounts = new Map<string, number>();
    for (let i = 0; i < includedTypes.length; i++) {
      const items = ((entityResults[i]?.data as { items?: unknown[] } | undefined)?.items ?? [])
        .filter(isEntityRef)
        .filter((e) => !settings.hideCold || !isColdEntity(e));
      for (const e of items) {
        rows.push({
          id: `${e.entity_type}:${e.entity_id}`,
          data: {
            entityType: e.entity_type,
            entityId: e.entity_id,
            title:
              typeof e.properties?.title === "string"
                ? e.properties.title
                : typeof e.properties?.name === "string"
                  ? e.properties.name
                  : e.entity_id,
            status:
              typeof e.properties?.status === "string" ? e.properties.status : undefined,
            properties: (e.properties ?? {}) as Record<string, unknown>,
          },
        });
      }
    }
    // Inject the focused entity and its 1-hop from the direct inspect read:
    // guarantees the center exists regardless of type chips or list caps.
    const inspectData = focusInspect.data as
      | {
          found?: boolean;
          properties?: Record<string, unknown>;
          neighbors?: Array<{
            direction: "incoming" | "outgoing";
            relationship_type: string;
            edge_key: number;
            properties?: Record<string, unknown> | null;
            metadata?: EdgeMetadata | null;
            entity: unknown;
          }>;
        }
      | undefined;
    const rowFor = (entityType: string, entityId: string, props: Record<string, unknown>) => ({
      id: `${entityType}:${entityId}`,
      data: {
        entityType,
        entityId,
        title:
          typeof props.title === "string"
            ? props.title
            : typeof props.name === "string"
              ? props.name
              : entityId,
        status: typeof props.status === "string" ? props.status : undefined,
        properties: props,
      },
    });
    if (focusRef && inspectData?.found) {
      const have = new Set(rows.map((r) => r.id));
      const inject = (r: ReturnType<typeof rowFor>) => {
        if (!have.has(r.id)) {
          have.add(r.id);
          rows.push(r);
        }
      };
      inject(rowFor(focusRef.type, focusRef.id, inspectData.properties ?? {}));
      for (const nb of inspectData.neighbors ?? []) {
        if (!isEntityRef(nb.entity)) continue;
        if (settings.hideCold && isColdEntity(nb.entity)) continue;
        inject(
          rowFor(
            nb.entity.entity_type,
            nb.entity.entity_id,
            (nb.entity.properties ?? {}) as Record<string, unknown>,
          ),
        );
      }
    }
    let present = new Set(rows.map((r) => r.id));

    const edgeRows = ((edgeList.data as { items?: EdgeRow[] } | undefined)?.items ?? []);
    let dropped = 0;
    let links: Array<{ row: EdgeRow; source: string; target: string }> = [];
    for (const row of edgeRows) {
      const source = `${row.from_type}:${row.from_id}`;
      const target = `${row.to_type}:${row.to_id}`;
      if (!present.has(source) || !present.has(target)) {
        dropped++;
        continue;
      }
      links.push({ row, source, target });
    }
    if (focusRef && inspectData?.found) {
      const centerId = `${focusRef.type}:${focusRef.id}`;
      const seenKeys = new Set(links.map((l) => l.row.edge_key));
      for (const nb of inspectData.neighbors ?? []) {
        if (!isEntityRef(nb.entity) || seenKeys.has(nb.edge_key)) continue;
        const otherId = `${nb.entity.entity_type}:${nb.entity.entity_id}`;
        if (!present.has(otherId)) continue;
        const [source, target] =
          nb.direction === "outgoing" ? [centerId, otherId] : [otherId, centerId];
        const [fromType, fromId] = source.split(/:(.+)/);
        const [toType, toId] = target.split(/:(.+)/);
        links.push({
          row: {
            from_type: fromType ?? "",
            from_id: fromId ?? "",
            to_type: toType ?? "",
            to_id: toId ?? "",
            relationship_type: nb.relationship_type,
            edge_key: nb.edge_key,
            properties: nb.properties ?? null,
            metadata: nb.metadata ?? null,
          },
          source,
          target,
        });
      }
    }

    // Isolation cuts nodes AND edges to the k-hop neighborhood before layout,
    // so the focused view relaxes into its own shape.
    if (focus && present.has(focus)) {
      const keep = neighborhood(focus, links, hops);
      present = new Set([...present].filter((id) => keep.has(id)));
      links = links.filter((l) => present.has(l.source) && present.has(l.target));
    }
    let drawnRows = rows.filter((r) => present.has(r.id));

    // Dots mode constraint: preserve every type, then keep each large type's
    // best-connected members by degree over the full fetched edge list.
    if (mode === "dots" && !focus && drawnRows.length > MAX_NODES_DOTS) {
      const degree = new Map<string, number>();
      for (const row of edgeRows) {
        const source = `${row.from_type}:${row.from_id}`;
        const target = `${row.to_type}:${row.to_id}`;
        degree.set(source, (degree.get(source) ?? 0) + 1);
        degree.set(target, (degree.get(target) ?? 0) + 1);
      }
      const byType = new Map<string, typeof drawnRows>();
      for (const r of drawnRows) {
        byType.set(r.data.entityType, [...(byType.get(r.data.entityType) ?? []), r]);
      }
      const totalCount = drawnRows.length;
      const keptByType = new Map<string, typeof drawnRows>();
      const keptIds = new Set<string>();
      for (const [type, members] of byType) {
        const keepLimit = Math.max(
          MIN_DOTS_PER_TYPE,
          Math.floor((MAX_NODES_DOTS * members.length) / totalCount),
        );
        const sorted = [...members].sort(
          (a, b) =>
            (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0) || a.id.localeCompare(b.id),
        );
        const kept = members.length <= keepLimit ? sorted : sorted.slice(0, keepLimit);
        keptByType.set(type, kept);
        for (const r of kept) keptIds.add(r.id);
      }

      let overBudget = keptIds.size - MAX_NODES_DOTS;
      if (overBudget > 0) {
        const trimOrder = [...byType.entries()].sort(
          (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
        );
        for (const [type] of trimOrder) {
          const kept = keptByType.get(type) ?? [];
          while (overBudget > 0 && kept.length > 0) {
            const tail = kept.pop();
            if (tail) keptIds.delete(tail.id);
            overBudget--;
          }
          if (overBudget === 0) break;
        }
      }

      for (const [type, members] of byType) {
        const kept = keptByType.get(type) ?? [];
        if (kept.length < members.length) sampledTypeCounts.set(type, kept.length);
      }
      dropped += links.filter(
        (l) => !keptIds.has(l.source) || !keptIds.has(l.target),
      ).length;
      links = links.filter((l) => keptIds.has(l.source) && keptIds.has(l.target));
      present = keptIds;
      drawnRows = drawnRows.filter((r) => present.has(r.id));
    }

    // Card mode constraint: keep each type's best-connected members (degree
    // over the drawn edges), fold the rest into one overflow card per type.
    const overflow = new Map<string, number>();
    if (mode === "cards") {
      const degree = new Map<string, number>();
      for (const l of links) {
        degree.set(l.source, (degree.get(l.source) ?? 0) + 1);
        degree.set(l.target, (degree.get(l.target) ?? 0) + 1);
      }
      const byType = new Map<string, typeof drawnRows>();
      for (const r of drawnRows) {
        byType.set(r.data.entityType, [...(byType.get(r.data.entityType) ?? []), r]);
      }
      const kept: typeof drawnRows = [];
      for (const [type, members] of byType) {
        // Focused views are already small — never fold a neighborhood member.
        if (focus || members.length <= CARDS_PER_TYPE) {
          kept.push(...members);
          continue;
        }
        const sorted = [...members].sort(
          (a, b) =>
            (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0) || a.id.localeCompare(b.id),
        );
        kept.push(...sorted.slice(0, CARDS_PER_TYPE));
        overflow.set(type, members.length - CARDS_PER_TYPE);
      }
      const keptIds = new Set(kept.map((r) => r.id));
      dropped += links.filter(
        (l) => !keptIds.has(l.source) || !keptIds.has(l.target),
      ).length;
      links = links.filter((l) => keptIds.has(l.source) && keptIds.has(l.target));
      drawnRows = kept;
    }

    return {
      rows: drawnRows,
      links,
      droppedEdges: dropped,
      sampledTypeCounts,
      overflow,
    };
    // search is deliberately NOT a dependency: match decoration happens in
    // the cheap passes below. Nor is anything color — see dotStyleFor.
  }, [entityResults, edgeList.data, includedTypes, settings.hideCold, focus, hops, mode, focusRef, focusInspect.data]);

  // Cheap per-keystroke pass: which drawn entities match the search.
  const { matchedIds, matchCount } = useMemo(() => {
    const q = search.trim();
    if (q === "") return { matchedIds: null, matchCount: 0 };
    const matchedIds = new Set<string>();
    for (const r of rows) {
      if (matchesText([r.data.entityId, r.data.title], q)) matchedIds.add(r.id);
    }
    return { matchedIds, matchCount: matchedIds.size };
  }, [rows, search]);

  // Cards mode: grid layout + SVG edges (ReactFlow, unchanged philosophy).
  const cardGraph = useMemo(() => {
    if (mode !== "cards") return null;
    const nodes = layoutCardClusters(rows, overflow, (row) => ({
      matched: matchedIds?.has(row.id) ?? false,
      ...dotStyleFor(row.data.entityType),
    }));
    // Stroke alpha carries softness: GraphCanvas owns style.opacity for its
    // selection dimming and would clobber a base opacity here.
    const edges: Edge[] = links.map(({ row, source, target }) => {
      const governed = governedTypes.has(row.relationship_type);
      return {
        id: `e${row.edge_key}`,
        source,
        target,
        data: { row, governed, revealLabel: row.relationship_type.replaceAll("_", " ") },
        style: {
          ...edgeStroke(
            governed,
            row.metadata?.assertion?.review?.status,
            row.metadata?.assertion?.lifecycle?.status,
          ),
          strokeWidth: 1.5,
        },
        animated: false,
      };
    });
    return { nodes, edges };
  }, [mode, rows, links, overflow, governedTypes, matchedIds, dotStyleFor]);

  // Dots mode: flat GPU buffers for CosmosDots. No arrowheads at dot
  // density — direction lives in the context panel. Topology only: dot hues
  // travel separately (glNodeColors) so a color-mode toggle can't invalidate
  // this identity and rebuild the graph.
  const glGraph = useMemo(() => {
    if (mode !== "dots") return null;
    const nodes: GlDotNode[] = rows.map((r) => ({
      id: r.id,
      title: r.data.title,
    }));
    const edges: GlDotEdge[] = links.map(({ row, source, target }) => {
      const governed = governedTypes.has(row.relationship_type);
      return {
        id: `e${row.edge_key}`,
        source,
        target,
        rgba: edgeStrokeRgba(
          governed,
          row.metadata?.assertion?.review?.status,
          row.metadata?.assertion?.lifecycle?.status,
        ).rgba,
        label: row.relationship_type.replaceAll("_", " "),
      };
    });
    return { nodes, edges };
  }, [mode, rows, links, governedTypes]);

  // Dot hues, index-aligned with glGraph.nodes. The only thing a color-mode
  // toggle recomputes — CosmosDots pushes it through setPointColors.
  const glNodeColors = useMemo(
    () =>
      rows.map((r) => {
        const s = dotStyleFor(r.data.entityType);
        return s.color ?? (s.layer ? LAYER_DOT_HEX[s.layer] : FALLBACK_DOT_HEX);
      }),
    [rows, dotStyleFor],
  );

  // Arriving with a focus target (entity page "View graph") also opens that
  // entity's context panel — focused mode IS the entity's neighborhood view,
  // not just a cropped canvas.
  const autoSelectedFocus = useRef<string | null>(null);
  useEffect(() => {
    if (!focus || autoSelectedFocus.current === focus) return;
    if (!rows.some((r) => r.id === focus)) return;
    autoSelectedFocus.current = focus;
    setSelectRequest({ id: focus, nonce: Date.now() });
  }, [focus, rows]);

  // O(1) lookups for the context panel — by-id access runs per connection
  // row, per lit edge, and on every selection render.
  const rowById = useMemo(() => new Map(rows.map((r) => [r.id, r.data])), [rows]);
  const linkById = useMemo(
    () => new Map(links.map((l) => [`e${l.row.edge_key}`, l])),
    [links],
  );
  // Minimal edge shape for the panel's ConnectionList (both modes).
  const panelEdges = useMemo(
    () =>
      links.map(({ row, source, target }) => ({
        id: `e${row.edge_key}`,
        source,
        target,
        label: row.relationship_type,
      })),
    [links],
  );

  if (stats.isPending) return <LoadState />;
  if (stats.error) return <LoadState error={stats.error} />;

  const loading =
    withinBudget && (edgeList.isPending || entityResults.some((r) => r.isPending));
  const drawnEdges = links.length;
  const fetchedEdges = drawnEdges + droppedEdges;
  const showDegenerateNotice =
    fetchedEdges > 50 && droppedEdges / fetchedEdges > 0.9;

  const labelFor = (id: string) => rowById.get(id)?.title ?? id;

  function jumpToFirstMatch() {
    if (!matchedIds) return;
    const first = rows.find((r) => matchedIds.has(r.id));
    if (first) setSelectRequest({ id: first.id, nonce: Date.now() });
  }

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      // Synthetic cluster labels / overflow cards carry no entity row.
      const d = rowById.get(selection.id);
      if (!d) return null;
      return (
        <div>
          <PanelHeading kicker={d.entityType} title={d.title} />
          <div className="break-all">
            <MonoId id={d.entityId} />
          </div>
          <PanelActions>
            <Link to={entityPath(instanceId, d.entityType, d.entityId)} className={actionChipClass}>
              Open entity →
            </Link>
            {focus === selection.id ? (
              <button onClick={() => setFocus(null)} className={actionChipClass}>
                Show whole graph
              </button>
            ) : (
              <button onClick={() => setFocus(selection.id)} className={actionChipClass}>
                Isolate neighborhood
              </button>
            )}
          </PanelActions>
          <PanelSection title="Properties">
            <PropertyList properties={d.properties} omit={["title"]} />
          </PanelSection>
          <PanelSection title="Connections">
            <ConnectionList
              nodeId={selection.id}
              edges={panelEdges}
              api={api}
              labelFor={labelFor}
            />
          </PanelSection>
        </div>
      );
    }
    const link = linkById.get(selection.id);
    if (!link) return null;
    const { row, source, target } = link;
    return (
      <EdgeGovernancePanel
        relationshipType={row.relationship_type}
        governed={governedTypes.has(row.relationship_type)}
        properties={row.properties ?? null}
        metadata={row.metadata ?? null}
        sourceLabel={labelFor(source)}
        targetLabel={labelFor(target)}
        onSelectSource={() => api.select(source)}
        onSelectTarget={() => api.select(target)}
      />
    );
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">State graph</h1>
        <span className="text-[12px] text-zinc-600">
          {withinBudget
            ? `${rows.length} entities · ${drawnEdges} edges`
            : "The whole instance state on one canvas"}
          {droppedEdges > 0 && !focus && ` · ${droppedEdges} edges to excluded or hidden entities not drawn`}
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className="inline-flex overflow-hidden border border-zinc-800 text-[12px]">
            {(["dots", "cards"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-px ${
                  mode === m ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m === "dots" ? "Dots" : "Cards"}
              </button>
            ))}
          </span>
          {/* Kit-layer hue is only an alternative when the instance spans layers. */}
          {layerColoring.enabled && (
            <span
              className="inline-flex overflow-hidden border border-zinc-800 text-[12px]"
              title="Entity color coding"
            >
              {(["type", "kit"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColorMode(c)}
                  className={`px-2 py-px ${
                    colorMode === c ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {c === "type" ? "By type" : "By kit"}
                </button>
              ))}
            </span>
          )}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") jumpToFirstMatch();
            }}
            placeholder="Find in graph…"
            className="w-44 border border-zinc-800 bg-transparent px-2 py-0.5 text-[13px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
          />
          {search.trim() !== "" && (
            <span className="text-[12px] text-zinc-500">
              {matchCount} {matchCount === 1 ? "match" : "matches"}
              {matchCount > 0 && " · Enter jumps"}
            </span>
          )}
        </span>
      </header>
      {focus && (
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px] text-zinc-400">
          <span>
            Focused on <span className="text-zinc-200">{labelFor(focus)}</span>
          </span>
          <span className="inline-flex overflow-hidden border border-zinc-800 text-[12px]">
            {[1, 2].map((h) => (
              <button
                key={h}
                onClick={() => setFocus(focus, h)}
                className={`px-2 py-px ${
                  hops === h ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {h} hop{h > 1 ? "s" : ""}
              </button>
            ))}
          </span>
          <button onClick={() => setFocus(null)} className={actionChipClass}>
            Show whole graph
          </button>
        </div>
      )}
      {!focus && typeCounts.length > 1 && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {typeCounts.map(([type, count]) => {
            const active = includedTypes.includes(type);
            const sampledCount = sampledTypeCounts.get(type);
            const countLabel =
              sampledCount === undefined ? String(count) : `${sampledCount}/${count}`;
            return (
              <button key={type} onClick={() => toggleType(type)} className={toggleChipClass(active)}>
                {/* The chip doubles as the color legend for its type's dots. */}
                <span
                  className={`mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                    colorMode === "kit" ? LAYER_META[layerColoring.layerFor(type)].dot : ""
                  } ${active ? "" : "opacity-40"}`}
                  style={colorMode === "type" ? { backgroundColor: typeColorFor(type) } : undefined}
                />
                {humanize(type)} <span className="font-mono text-[10px] text-zinc-500">{countLabel}</span>
              </button>
            );
          })}
          <button
            onClick={() => setAllTypes(includedTypes.length !== typeCounts.length)}
            className={actionChipClass}
          >
            {includedTypes.length === typeCounts.length ? "Deselect all" : "Select all"}
          </button>
          {mode === "cards" && autoExcluded.length > 0 && (
            <span className="text-[12px] text-zinc-600">
              {autoExcluded.map(humanize).join(", ")} left out to fit the {maxNodes}-node budget —
              toggle chips to trade
            </span>
          )}
        </div>
      )}
      {mode === "cards" && !withinBudget && projectedNodes > 0 && (
        <EmptyState>
          {projectedNodes.toLocaleString()} entities selected — this view draws up to {maxNodes}.
          Narrow the type chips above (or hide cold entities in Settings) to bring the selection
          under budget.
        </EmptyState>
      )}
      {projectedNodes === 0 && <EmptyState>No live entities in the selected types.</EmptyState>}
      {loading && <LoadState />}
      {withinBudget && !loading && glGraph && (
        <CosmosDots
          // Remount on graph-identity change so fit-view reframes the new shape
          // (focus in/out, hop change, type trades).
          key={`dots:${focus ?? "all"}:${hops}:${includedTypes.join("|")}`}
          nodes={glGraph.nodes}
          edges={glGraph.edges}
          nodeColors={glNodeColors}
          renderPanel={renderPanel}
          className="min-h-0 flex-1"
          overlay={
            <div className="flex flex-col gap-1.5">
              <GraphLegend kitLayers={colorMode === "kit"} gl />
              {showDegenerateNotice && (
                <div className="border border-zinc-800 bg-zinc-950/90 px-2 py-1.5 text-[12px] text-amber-400">
                  Most of this graph's edges connect to entities not drawn — adjust the type
                  chips or use Find / focus.
                </div>
              )}
            </div>
          }
          selectRequest={selectRequest}
          matchedIds={matchedIds}
        />
      )}
      {withinBudget && !loading && cardGraph && (
        <GraphCanvas
          // Remount on graph-identity change so fit-view reframes the new shape
          // (mode switch, focus in/out, hop change, type trades).
          key={`cards:${focus ?? "all"}:${hops}:${includedTypes.join("|")}`}
          nodes={cardGraph.nodes}
          edges={cardGraph.edges}
          nodeTypes={nodeTypes}
          renderPanel={renderPanel}
          className="min-h-0 flex-1"
          overlay={
            <div className="flex flex-col gap-1.5">
              <GraphLegend kitLayers={colorMode === "kit"} />
              {showDegenerateNotice && (
                <div className="border border-zinc-800 bg-zinc-950/90 px-2 py-1.5 text-[12px] text-amber-400">
                  Most of this graph's edges connect to entities not drawn — adjust the type
                  chips or use Find / focus.
                </div>
              )}
            </div>
          }
          selectRequest={selectRequest}
        >
          <Controls showInteractive={false} className="!shadow-none" />
          <MiniMap
            pannable
            zoomable
            className="!h-24 !w-36"
            bgColor="#09090b"
            maskColor="rgba(23,22,18,0.7)"
            nodeComponent={MiniMapDot}
          />
        </GraphCanvas>
      )}
    </div>
  );
}
