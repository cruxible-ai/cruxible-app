import { useMemo } from "react";
import { useKits } from "@/api/hooks";
import type { InstalledKit } from "@/api/schemas";
import { useSettings } from "@/lib/settings";
import { buildTypeColors } from "@/lib/type-colors";

/**
 * Owner layers for the ontology: which kit a SubjectKind or ClaimType comes
 * from, so the type map and sidebar can accent a composed instance by layer.
 *
 * No read serves ownership at the pinned contract (design gap G1:
 * `KitReceipt.owns` exists only as a Document body, which READ_ONLY cannot
 * read). Until GET /kits carries it, the layer is the identity's namespace
 * (the first dotted segment: `security.vulnerability` -> `security`), which
 * is how kits name what they ship, and the UI labels it as a namespace, not
 * a kit. `kitOwnership` is the seam: when the regenerated InstalledKit gains
 * `owns`, build the map there and every caller shows the owning kit.
 */

export type OwnedKind = "SubjectKind" | "ClaimType";

export interface TypeOwner {
  /** The kit id, or the namespace while ownership is not served. */
  layer: string;
  source: "kit" | "namespace";
}

/** `"SubjectKind:<kind>"` / `"ClaimType:<predicate>"` -> owning kit id. */
export type KitOwnership = ReadonlyMap<string, string>;

/** Owning kit per identity from GET /kits; null at the pinned contract (gap G1). */
export function kitOwnership(kits: readonly InstalledKit[] | undefined): KitOwnership | null {
  // InstalledKit has kit_id, version, drifted, providers, but not `owns` yet.
  void kits;
  return null;
}

/** First dotted segment of a kind or predicate; the whole name when undotted. */
export function namespaceOf(name: string): string {
  const dot = name.indexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

export function ownerOf(kind: OwnedKind, name: string, ownership: KitOwnership | null): TypeOwner {
  const kit = ownership?.get(`${kind}:${name}`);
  return kit ? { layer: kit, source: "kit" } : { layer: namespaceOf(name), source: "namespace" };
}

export interface LayerColoring {
  /** The settings toggle AND more than one layer among the kinds shown. */
  enabled: boolean;
  layers: { layer: string; color: string; source: TypeOwner["source"] }[];
  ownerOfKind: (kind: string) => TypeOwner;
  colorOf: (layer: string) => string;
}

/** Layer accents over a set of SubjectKinds; pure, for screens and tests. */
export function layerColoring(
  kinds: readonly string[],
  ownership: KitOwnership | null,
  setting: boolean,
): LayerColoring {
  const ownerOfKind = (kind: string) => ownerOf("SubjectKind", kind, ownership);
  const owners = new Map<string, TypeOwner>();
  for (const kind of kinds) {
    const owner = ownerOfKind(kind);
    owners.set(owner.layer, owner);
  }
  const names = [...owners.keys()].sort();
  const colorOf = buildTypeColors(names);
  return {
    // Coloring only means something when the shown kinds span layers: a
    // single-kit instance renders uniform and the accents would be noise.
    enabled: setting && names.length > 1,
    layers: names.map((layer) => ({ layer, color: colorOf(layer), source: owners.get(layer)!.source })),
    ownerOfKind,
    colorOf,
  };
}

/** `layerColoring` over the given kinds, with the settings toggle and GET /kits. */
export function useLayerColoring(kinds: readonly string[]): LayerColoring {
  const { settings } = useSettings();
  const kits = useKits();
  const ownership = useMemo(() => kitOwnership(kits.data?.kits), [kits.data]);
  // Keyed on the names, not the array identity, so callers can pass a fresh array.
  const key = kinds.join("\n");
  return useMemo(
    () => layerColoring(key === "" ? [] : key.split("\n"), ownership, settings.colorByLayer),
    [key, ownership, settings.colorByLayer],
  );
}
