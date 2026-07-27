import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  useEdgeList,
  useEntitiesForTypes,
  useInspectEntity,
  useInstanceId,
  useStats,
} from "@/api/hooks";
import {
  EdgeGovernancePanel,
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
import type { GraphPanelApi, GraphSelection } from "@/components/graph/GraphCanvas";
import {
  ConnectionList,
  PanelActions,
  PanelHeading,
  PanelSection,
  PropertyList,
} from "@/components/graph/PanelBits";
import { isColdEntity, isColdStatus } from "@/lib/cold";
import { focusInternalModel, useInternalModel } from "@/lib/internal-model";
import { LAYER_META, useLayerColoring, type KitLayer } from "@/lib/kit-layer";
import { buildTypeColors } from "@/lib/type-colors";
import { useSettings } from "@/lib/settings";
import { humanize, matchesText } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/** Dots are GPU points (CosmosDots) — the budget is a sanity ceiling against
 * pathological instances, not a DOM cost cap. Verified at this scale:
 * pans/zooms at refresh rate, select < 50ms (see DECISION.md). */
const MAX_NODES_DOTS = 30000;
const MIN_DOTS_PER_TYPE = 25;
/** Sized for the raised dots budget (daemon list accepts it; KEV ships 14k). */
const EDGE_FETCH_LIMIT = 60000;
/** Kit-layer hues as plain hex, for the WebGL dot colors (no Tailwind class
 * reaches a GPU color buffer). */
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

// Every node is a GPU point (CosmosDots) — no per-dot React component exists.

/**
 * Governance-first legend: edge review state is the signal this graph
 * exists to show. Entity colors aren't repeated here — the type chips above
 * the canvas carry their own swatches; only kit-layer mode needs its two
 * layers explained. Entity status coloring is deliberately absent until
 * enum presentation semantics are config-owned
 * (oq-enum-presentation-semantics).
 */
function GraphLegend({ kitLayers }: { kitLayers: boolean }) {
  const section = "text-[10px] font-semibold uppercase tracking-wider text-zinc-600";
  const row = "inline-flex items-center gap-1.5";
  return (
    <div className="flex flex-col gap-1 border border-zinc-800 bg-zinc-950/90 px-2 py-1.5 text-[11px] text-zinc-400">
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
        <span className="h-px w-3 bg-zinc-500 opacity-40" /> Inactive lifecycle (faint)
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
 * Last-chosen display options (scope, color mode, type chips, internal-model
 * overrides) per instance, applied when the graph is opened WITHOUT explicit
 * URL params. A shared link's params always win over the remembered state;
 * focus is navigation, not preference, and is never stored.
 */
interface GraphPrefs {
  color?: "type" | "kit" | undefined;
  types?: string[] | undefined;
  scope?: "all" | "internal" | undefined;
  /** Types the operator has promoted back out of the derived reference layer.
   * The derivation supplies the default; this is the saved correction. */
  internalTypes?: string[] | undefined;
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

// The force layout lives in layout.worker.ts (deterministic d3-force,
// streamed off the main thread by CosmosDots).

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
 * typed dots under a static force layout, with the shared GraphCanvas
 * selection model. Search highlights and jumps; "Isolate neighborhood" (URL
 * state) cuts the canvas down to k hops around one entity; the internal-model
 * scope cuts the ingested reference layer down to the rows local judgment has
 * actually touched. Hide-cold applies; dense types are sampled by degree when
 * an instance exceeds the node budget.
 */
export function StateGraphScreen() {
  const instanceId = useInstanceId();
  usePageTitle("State graph");
  const stats = useStats();
  const { settings } = useSettings();
  const layerColoring = useLayerColoring();
  const internalModel = useInternalModel();
  const governedTypes = useGovernedRelationshipTypes();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectRequest, setSelectRequest] = useState<{ id: string; nonce: number } | null>(null);

  // A select request is an event, not state to keep: the mounted renderer
  // consumes it in its own effect (child effects run before this parent
  // one), after which holding onto it only lets a renderer REMOUNT — e.g.
  // hide-cold changing the type set and thus the remount key — replay the
  // old jump and yank the camera. Drop it as soon as it has been seen.
  useEffect(() => {
    if (selectRequest) setSelectRequest(null);
  }, [selectRequest]);

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
  // Scope: the whole instance, or only what bears on the internal model. Only
  // offered where the ontology actually splits into a local layer and an
  // ingested reference layer.
  const scope: "all" | "internal" =
    searchParams.get("scope") === "internal" && internalModel.available ? "internal" : "all";
  // Entity hue: per-type colors by default; kit-layer accents opt-in (and
  // only offered when the instance actually spans layers).
  const colorMode: "type" | "kit" =
    searchParams.get("color") === "kit" && layerColoring.enabled ? "kit" : "type";

  // The saved correction to the derived split (see internal-model.ts): a type
  // the operator has promoted back into their own model. Empty by default —
  // the derivation is the default, this is the escape hatch.
  const [promotedTypes, setPromotedTypes] = useState<ReadonlySet<string>>(
    () => new Set(loadGraphPrefs(instanceId).internalTypes ?? []),
  );
  // Switching instances changes only the route param — this screen stays
  // mounted, and the correction belongs to the instance it was made on.
  const promotedFor = useRef(instanceId);
  useEffect(() => {
    if (promotedFor.current === instanceId) return;
    promotedFor.current = instanceId;
    setPromotedTypes(new Set(loadGraphPrefs(instanceId).internalTypes ?? []));
  }, [instanceId]);

  // Opening the graph bare (sidebar click) restores the last-chosen options;
  // any explicit params (shared links, entity-page focus) win untouched.
  const hydratedPrefs = useRef(false);
  useEffect(() => {
    if (hydratedPrefs.current) return;
    hydratedPrefs.current = true;
    if ([...searchParams.keys()].length > 0) return;
    const prefs = loadGraphPrefs(instanceId);
    const sp = new URLSearchParams();
    if (prefs.scope === "internal") sp.set("scope", "internal");
    if (prefs.color === "kit") sp.set("color", "kit");
    if (prefs.types && prefs.types.length > 0) sp.set("types", prefs.types.join(","));
    if ([...sp.keys()].length > 0) setSearchParams(sp, { replace: true });
  }, [searchParams, setSearchParams, instanceId]);

  function setScope(next: "all" | "internal") {
    const sp = new URLSearchParams(searchParams);
    if (next === "internal") sp.set("scope", "internal");
    else sp.delete("scope");
    setSearchParams(sp);
    saveGraphPrefs(instanceId, { scope: next });
  }

  function togglePromoted(type: string) {
    const next = new Set(promotedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setPromotedTypes(next);
    saveGraphPrefs(instanceId, { internalTypes: next.size > 0 ? [...next].sort() : undefined });
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
  // Hue resolution for the current color mode, applied at paint time (the GL
  // color buffer) — never baked into the topology rows, so a color-mode
  // toggle restyles in place instead of rebuilding the graph.
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

  // Every selected type is included; the node budget is enforced inside the
  // layout memo, after degree can be computed from the fetched edge list.
  const includedTypes = useMemo(
    () =>
      typeFilter
        ? typeCounts.filter(([t]) => typeFilter.has(t)).map(([t]) => t)
        : typeCounts.map(([t]) => t),
    [typeCounts, typeFilter],
  );

  const projectedNodes = typeCounts
    .filter(([type]) => includedTypes.includes(type))
    .reduce((s, [, n]) => s + n, 0);
  // A focused view is small by construction — always drawable.
  const hasSelection = !!focusRef || projectedNodes > 0;

  const entityResults = useEntitiesForTypes(includedTypes, MAX_NODES_DOTS, hasSelection);
  const edgeList = useEdgeList(EDGE_FETCH_LIMIT, hasSelection);

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
  // collect, isolate, scope, budget. All pure derivation from fetch results +
  // URL state. Layout is downstream (the worker force layout).
  const {
    rows,
    links,
    droppedEdges,
    scopeHiddenEdges,
    sampledTypeCounts,
    keptReferenceByType,
  } = useMemo(() => {
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

    // Internal-model scope: drop the ingested reference bulk, keeping only the
    // reference rows a judgment edge actually reaches. Skipped under focus —
    // an isolated neighborhood is already legible, and the focused entity may
    // itself be a reference row somebody navigated in from.
    const keptReferenceByType = new Map<string, number>();
    // Counted apart from `dropped`: an edge cut by the scope is deliberately
    // out of frame, not evidence that the drawn selection is degenerate.
    let scopeHiddenEdges = 0;
    if (scope === "internal" && !focus) {
      // Seed every reference type at zero, so a type the judgment never
      // reaches reads "0/343" on its chip rather than silently claiming 343.
      for (const r of drawnRows) {
        const type = r.data.entityType;
        if (internalModel.referenceEntityTypes.has(type) && !promotedTypes.has(type)) {
          keptReferenceByType.set(type, 0);
        }
      }
      const focused = focusInternalModel(drawnRows, links, internalModel, promotedTypes);
      scopeHiddenEdges = links.length - focused.links.length;
      drawnRows = focused.rows;
      links = focused.links;
      present = new Set(drawnRows.map((r) => r.id));
      for (const [type, count] of focused.keptReferenceByType) {
        keptReferenceByType.set(type, count);
      }
    }

    // Node budget: preserve every type, then keep each large type's
    // best-connected members by degree over the full fetched edge list.
    if (!focus && drawnRows.length > MAX_NODES_DOTS) {
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

    return {
      rows: drawnRows,
      links,
      droppedEdges: dropped,
      scopeHiddenEdges,
      sampledTypeCounts,
      keptReferenceByType,
    };
    // search is deliberately NOT a dependency: match decoration happens in
    // the cheap passes below. Nor is anything color — see dotStyleFor.
  }, [
    entityResults,
    edgeList.data,
    includedTypes,
    settings.hideCold,
    focus,
    hops,
    focusRef,
    focusInspect.data,
    scope,
    internalModel,
    promotedTypes,
  ]);

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

  // Flat GPU buffers for CosmosDots. No arrowheads at dot density —
  // direction lives in the context panel. Topology only: dot hues travel
  // separately (glNodeColors) so a color-mode toggle can't invalidate this
  // identity and rebuild the graph.
  const glGraph = useMemo(() => {
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
  }, [rows, links, governedTypes]);

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
  // Minimal edge shape for the panel's ConnectionList.
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
    hasSelection && (edgeList.isPending || entityResults.some((r) => r.isPending));
  const drawnEdges = links.length;
  const fetchedEdges = drawnEdges + droppedEdges;
  const showDegenerateNotice =
    fetchedEdges > 50 && droppedEdges / fetchedEdges > 0.9;

  const labelFor = (id: string) => rowById.get(id)?.title ?? id;
  // Reference types the instance actually holds rows for, for the scope row.
  const referenceTypes = typeCounts.filter(([type]) =>
    internalModel.referenceEntityTypes.has(type),
  );

  function jumpToFirstMatch() {
    if (!matchedIds) return;
    const first = rows.find((r) => matchedIds.has(r.id));
    if (first) setSelectRequest({ id: first.id, nonce: Date.now() });
  }

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
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
          {hasSelection
            ? `${rows.length.toLocaleString()} entities · ${drawnEdges.toLocaleString()} edges`
            : "The whole instance state on one canvas"}
          {droppedEdges > 0 && !focus && ` · ${droppedEdges.toLocaleString()} edges to excluded or hidden entities not drawn`}
          {scopeHiddenEdges > 0 && ` · ${scopeHiddenEdges.toLocaleString()} reference-layer edges out of scope`}
        </span>
        <span className="ml-auto flex items-center gap-2">
          {/* Scope is only a choice on an instance that actually carries an
              ingested reference layer beside its local model. */}
          {internalModel.available && (
            <span
              className="inline-flex overflow-hidden border border-zinc-800 text-[12px]"
              title="Internal model: the entities and edges your own state is made of, plus only the reference rows your judgment has reached"
            >
              {(["all", "internal"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setScope(s)}
                  className={`px-2 py-px ${
                    scope === s ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {s === "all" ? "Everything" : "Internal model"}
                </button>
              ))}
            </span>
          )}
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
            const drawnCount = sampledTypeCounts.get(type) ?? keptReferenceByType.get(type);
            const countLabel =
              drawnCount === undefined
                ? count.toLocaleString()
                : `${drawnCount.toLocaleString()}/${count.toLocaleString()}`;
            return (
              <button key={type} onClick={() => toggleType(type)} className={toggleChipClass(active)}>
                {/* The chip doubles as the color legend for its type's dots. */}
                <span
                  className={`mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                    colorMode === "kit" ? LAYER_META[layerColoring.layerFor(type)].dot : ""
                  } ${active ? "" : "opacity-40"}`}
                  style={colorMode === "type" ? { backgroundColor: typeColorFor(type) } : undefined}
                />
                {humanize(type)} <span className="font-mono text-[11px] text-zinc-500">{countLabel}</span>
              </button>
            );
          })}
          <button
            onClick={() => setAllTypes(includedTypes.length !== typeCounts.length)}
            className={actionChipClass}
          >
            {includedTypes.length === typeCounts.length ? "Deselect all" : "Select all"}
          </button>
        </div>
      )}
      {scope === "internal" && !focus && referenceTypes.length > 0 && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[12px] text-zinc-500">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
            Reference layer
          </span>
          {referenceTypes.map(([type, count]) => {
            const promoted = promotedTypes.has(type);
            const kept = keptReferenceByType.get(type) ?? 0;
            return (
              <button
                key={type}
                onClick={() => togglePromoted(type)}
                title={
                  promoted
                    ? `${humanize(type)} is being drawn in full. Click to return it to the reference layer.`
                    : `Drawn only where a judgment edge reaches it. Click to treat ${humanize(type)} as part of the internal model.`
                }
                className={toggleChipClass(promoted)}
              >
                {humanize(type)}{" "}
                <span className="font-mono text-[11px] text-zinc-500">
                  {promoted ? count.toLocaleString() : `${kept.toLocaleString()}/${count.toLocaleString()}`}
                </span>
              </button>
            );
          })}
          <span className="text-zinc-600">
            {internalModel.source === "upstream_ownership"
              ? "owned by the upstream release — this instance cannot write them"
              : "ingested feeds, reached across governed edges"}
          </span>
        </div>
      )}
      {projectedNodes === 0 && <EmptyState>No live entities in the selected types.</EmptyState>}
      {loading && <LoadState />}
      {hasSelection && !loading && glGraph && (
        <CosmosDots
          // Remount on graph-identity change so fit-view reframes the new shape
          // (focus in/out, hop change, type trades).
          key={`dots:${scope}:${focus ?? "all"}:${hops}:${includedTypes.join("|")}`}
          nodes={glGraph.nodes}
          edges={glGraph.edges}
          nodeColors={glNodeColors}
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
          matchedIds={matchedIds}
        />
      )}
    </div>
  );
}
