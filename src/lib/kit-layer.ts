import { useMemo } from "react";
import { useInstanceSchema } from "@/api/hooks";
import { useSettings } from "@/lib/settings";

/**
 * Kit-layer ("config locality") classification: which kit layer of a composed
 * instance owns each entity type. Multi-kit compose (`init --kit A --kit B`)
 * merges a base kit with domain overlays, and graph/type views color-accent
 * nodes by owning layer so the composed shape reads at a glance.
 *
 * INTERIM HEURISTIC — the daemon's /schema serves the fully composed config
 * with no per-type provenance (verified against a live composed instance:
 * `extends` is null post-compose and entity_types entries carry only
 * description/properties/constraints/write_policy/auth_managed). Until core
 * exposes ownership, we key on the agent-operation base kit's fixed
 * vocabulary: its eight entity types are "base", every other type is
 * "domain".
 *
 * The real fields this module is shaped to consume the moment core ships
 * them (proposed upstream):
 *
 *   schema.composed_from: [{ name: "agent-operation", role: "base" },
 *                          { name: "case-law-monitoring", role: "overlay" }]
 *   schema.entity_types[T].source_kit: "agent-operation"
 *
 * When both appear in a payload they win over the heuristic — no caller
 * changes needed. At that point flip the `colorByLayer` default in
 * settings.tsx to true (heuristic data ships default-off).
 */

export type KitLayer = "base" | "domain";

/** Entity types declared by kits/agent-operation/config.yaml (the only base kit). */
const AGENT_OPERATION_BASE_TYPES: ReadonlySet<string> = new Set([
  "Actor",
  "SubjectRef",
  "WorkItem",
  "ReviewRequest",
  "Decision",
  "Risk",
  "OpenQuestion",
  "StateNote",
]);

interface ComposedFromEntry {
  name?: string;
  role?: string;
}

interface LayeredSchemaShape {
  composed_from?: ComposedFromEntry[];
  entity_types?: Record<string, { source_kit?: string | null } | undefined>;
}

/** Base kit name from the proposed composed_from field, if the payload has it. */
function baseKitName(s: LayeredSchemaShape | undefined): string | null {
  const composed = s?.composed_from;
  if (!Array.isArray(composed) || composed.length === 0) return null;
  const base = composed.find((k) => k?.role === "base") ?? composed[0];
  return typeof base?.name === "string" ? base.name : null;
}

/** True when the payload carries real per-type provenance (future API field). */
export function hasRealLayerData(schema: unknown): boolean {
  const s = schema as LayeredSchemaShape | undefined;
  if (!baseKitName(s)) return false;
  return Object.values(s?.entity_types ?? {}).some(
    (et) => typeof et?.source_kit === "string",
  );
}

/**
 * Owning layer for one entity type. Real provenance fields win when present;
 * otherwise the agent-operation heuristic decides.
 */
export function typeLayer(schema: unknown, entityType: string): KitLayer {
  const s = schema as LayeredSchemaShape | undefined;
  const base = baseKitName(s);
  const sourceKit = s?.entity_types?.[entityType]?.source_kit;
  if (base && typeof sourceKit === "string") {
    return sourceKit === base ? "base" : "domain";
  }
  return AGENT_OPERATION_BASE_TYPES.has(entityType) ? "base" : "domain";
}

/**
 * Coloring only means something when the ontology actually spans layers: a
 * single-kit instance (all base, or all domain) renders uniform and the
 * accents would be noise, so callers gate on this.
 */
export function hasLayerSplit(schema: unknown): boolean {
  const s = schema as LayeredSchemaShape | undefined;
  const types = Object.keys(s?.entity_types ?? {});
  if (types.length === 0) return false;
  const layers = new Set(types.map((t) => typeLayer(schema, t)));
  return layers.size > 1;
}

/**
 * Muted per-layer accents: base keeps the existing zinc look (toggling the
 * feature on must not restyle the operating layer), domain overlays get a
 * quiet violet tint — the one hue the status vocabulary doesn't use. Border
 * tints and small dots only; fills stay zinc.
 */
export const LAYER_META: Record<
  KitLayer,
  { label: string; dot: string; border: string; borderHover: string }
> = {
  base: {
    label: "base kit",
    dot: "bg-zinc-500",
    border: "border-zinc-700",
    borderHover: "hover:border-zinc-500",
  },
  domain: {
    label: "domain overlay",
    dot: "bg-violet-400",
    border: "border-violet-900",
    borderHover: "hover:border-violet-700",
  },
};

/**
 * Screen-side switch: the settings toggle AND a real layer split in the
 * current schema. `layerFor` is stable per schema payload so it can sit in
 * useMemo deps.
 */
export function useLayerColoring(): {
  enabled: boolean;
  layerFor: (entityType: string) => KitLayer;
} {
  const schema = useInstanceSchema();
  const { settings } = useSettings();
  const data = schema.data;
  return useMemo(
    () => ({
      enabled: settings.colorByLayer && hasLayerSplit(data),
      layerFor: (entityType: string) => typeLayer(data, entityType),
    }),
    [data, settings.colorByLayer],
  );
}
