import { describe, expect, it } from "vitest";
import { buildPathGraph } from "./PathGraph";
import type { EntityRef, PathItem, PathSegment } from "@/api/items";

function ref(entity_type: string, entity_id: string, title?: string): EntityRef {
  return {
    entity_type,
    entity_id,
    properties: title ? { title } : {},
    metadata: {},
  } as EntityRef;
}

function seg(
  relationship_type: string,
  from: EntityRef,
  to: EntityRef,
  reviewStatus?: string,
): PathSegment {
  return {
    relationship_type,
    from_type: from.entity_type,
    from_id: from.entity_id,
    to_type: to.entity_type,
    to_id: to.entity_id,
    edge_key: 1,
    properties: {},
    metadata: reviewStatus ? { assertion: { review: { status: reviewStatus } } } : {},
  } as PathSegment;
}

// Blast-radius shape: one incident fanning out through a shared supplier to
// two components, plus a direct site hop — the merged-union case the rows
// view can't show.
const incident = ref("Incident", "inc-gd", "Guangdong disruption");
const supplier = ref("Supplier", "s-ldo", "LDO Motors");
const compA = ref("Component", "c-motor-a", "A motor");
const compB = ref("Component", "c-motor-b", "B motor");
const site = ref("FacilitySite", "site-dg", "Dongguan plant");

const ITEMS: PathItem[] = [
  {
    entry: incident,
    result: compA,
    entities: [incident, supplier, compA],
    path: [
      seg("incident_affects_supplier", incident, supplier),
      seg("supplier_supplies_component", supplier, compA, "unreviewed"),
    ],
  },
  {
    entry: incident,
    result: compB,
    entities: [incident, supplier, compB],
    path: [
      seg("incident_affects_supplier", incident, supplier),
      seg("supplier_supplies_component", supplier, compB),
    ],
  },
  {
    entry: incident,
    result: site,
    entities: [incident, site],
    path: [seg("incident_affects_site", incident, site)],
  },
] as PathItem[];

describe("buildPathGraph", () => {
  it("merges shared entities and edges across items", () => {
    const { nodes, edges } = buildPathGraph(ITEMS);
    expect(nodes.map((n) => n.id).sort()).toEqual([
      "Component:c-motor-a",
      "Component:c-motor-b",
      "FacilitySite:site-dg",
      "Incident:inc-gd",
      "Supplier:s-ldo",
    ]);
    // The duplicated incident→supplier hop collapses to one edge.
    expect(edges).toHaveLength(4);
  });

  it("column-ranks by hop distance from the entry", () => {
    const { nodes } = buildPathGraph(ITEMS);
    const x = Object.fromEntries(nodes.map((n) => [n.id, n.position.x]));
    expect(x["Incident:inc-gd"]).toBe(0);
    expect(x["Supplier:s-ldo"]).toBeGreaterThan(x["Incident:inc-gd"] ?? 0);
    expect(x["FacilitySite:site-dg"]).toBe(x["Supplier:s-ldo"]);
    expect(x["Component:c-motor-a"]).toBeGreaterThan(x["Supplier:s-ldo"] ?? 0);
  });

  it("assigns roles with entry precedence and hop fallback", () => {
    const { nodes } = buildPathGraph(ITEMS);
    const role = Object.fromEntries(nodes.map((n) => [n.id, n.data.role]));
    expect(role["Incident:inc-gd"]).toBe("entry");
    expect(role["Supplier:s-ldo"]).toBe("hop");
    expect(role["Component:c-motor-a"]).toBe("result");
    expect(role["FacilitySite:site-dg"]).toBe("result");
  });

  it("colors unreviewed segments grey and reviewed/live green", () => {
    const { edges } = buildPathGraph(ITEMS);
    const byId = Object.fromEntries(edges.map((e) => [e.id, e]));
    expect(byId["supplier_supplies_component|Supplier:s-ldo|Component:c-motor-a"]?.style?.stroke).toBe(
      "#3f3f46",
    );
    expect(byId["incident_affects_supplier|Incident:inc-gd|Supplier:s-ldo"]?.style?.stroke).toBe(
      "#10b981",
    );
  });

  it("returns empty graph for items without path segments", () => {
    const bare = [{ entry: incident, result: site, entities: [incident, site], path: [] }] as PathItem[];
    const { edges, nodes } = buildPathGraph(bare);
    expect(edges).toHaveLength(0);
    // Entities still render as single-column nodes so the view degrades visibly.
    expect(nodes).toHaveLength(2);
  });
});
