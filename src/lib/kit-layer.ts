import { useMemo } from "react";
import { useSubjectKinds } from "@/api/hooks";
import type { OrientSubjectKind } from "@/api/schemas";
import { buildTypeColors } from "@/lib/type-colors";

/**
 * Owner layers for the ontology: which installed kit a SubjectKind comes
 * from, read from orient's `subject_kinds` rows (`kit`), so the type map,
 * sidebar and neighborhood can accent a composed instance by kit. A kind
 * with no kit was authored in this instance.
 */

export interface TypeOwner {
  /** The kit id, or "instance" for a kind authored here. */
  layer: string;
  source: "kit" | "instance";
}

/** SubjectKind -> owning kit id, from orient's subject_kinds section. */
export type KitOwnership = ReadonlyMap<string, string>;

export function kitOwnership(rows: readonly OrientSubjectKind[] | undefined): KitOwnership {
  const out = new Map<string, string>();
  for (const row of rows ?? []) if (row.kit) out.set(row.kind, row.kit);
  return out;
}

export const INSTANCE_LAYER = "instance";

export function ownerOf(kind: string, ownership: KitOwnership): TypeOwner {
  const kit = ownership.get(kind);
  return kit ? { layer: kit, source: "kit" } : { layer: INSTANCE_LAYER, source: "instance" };
}

export interface LayerColoring {
  /** More than one layer among the kinds shown. */
  enabled: boolean;
  layers: { layer: string; color: string; source: TypeOwner["source"] }[];
  ownerOfKind: (kind: string) => TypeOwner;
  colorOf: (layer: string) => string;
}

/** Layer accents over a set of SubjectKinds; pure, for screens and tests. */
export function layerColoring(kinds: readonly string[], ownership: KitOwnership, setting: boolean): LayerColoring {
  const ownerOfKind = (kind: string) => ownerOf(kind, ownership);
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

/** `layerColoring` over the given kinds, with kit ownership. */
export function useLayerColoring(kinds: readonly string[]): LayerColoring {
  const subjectKinds = useSubjectKinds();
  const ownership = useMemo(() => kitOwnership(subjectKinds.data?.rows), [subjectKinds.data]);
  // Keyed on the names, not the array identity, so callers can pass a fresh array.
  const key = kinds.join("\n");
  return useMemo(
    // Kit accents show whenever kinds span kits (a single-kit instance never draws them).
    () => layerColoring(key === "" ? [] : key.split("\n"), ownership, true),
    [key, ownership],
  );
}
