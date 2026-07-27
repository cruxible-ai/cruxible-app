import { describe, expect, it } from "vitest";
import { deriveInternalModel, focusInternalModel } from "./internal-model";

/**
 * The shape of a composed security instance, transcribed from a live
 * kev_triage schema: a public feed (Vendor/Product/Vulnerability) built by a
 * workflow that pins its source artifact, a local layer (Asset and friends)
 * built from a seed bundle that pins nothing, an operation base kit, and
 * proposal-only relationship types bridging local to feed.
 *
 * Type NAMES carry no weight anywhere in the module under test — the traps
 * below rename them to prove it.
 */
const COMPOSED = {
  entity_types: {
    Actor: {},
    WorkItem: {},
    Asset: {},
    Owner: {},
    CompensatingControl: {},
    VulnerabilityClass: {},
    TriageDecision: {},
    Vendor: {},
    Product: {},
    Vulnerability: {},
  },
  relationships: [
    { name: "work_item_owned_by_actor", from_entity: "WorkItem", to_entity: "Actor" },
    { name: "asset_owned_by", from_entity: "Asset", to_entity: "Owner" },
    { name: "asset_has_control", from_entity: "Asset", to_entity: "CompensatingControl" },
    {
      name: "control_mitigates_class",
      from_entity: "CompensatingControl",
      to_entity: "VulnerabilityClass",
    },
    { name: "product_from_vendor", from_entity: "Product", to_entity: "Vendor" },
    {
      name: "vulnerability_affects_product",
      from_entity: "Vulnerability",
      to_entity: "Product",
    },
    {
      name: "asset_runs_product",
      from_entity: "Asset",
      to_entity: "Product",
      write_policy: "proposal_only",
    },
    {
      name: "asset_vulnerability_posture",
      from_entity: "Asset",
      to_entity: "Vulnerability",
      write_policy: "proposal_only",
    },
    {
      // Seam pointing the other way: the derivation must not read direction
      // as layer, or this one alone would flip the answer.
      name: "vulnerability_classified_as",
      from_entity: "Vulnerability",
      to_entity: "VulnerabilityClass",
      write_policy: "proposal_only",
    },
    {
      name: "work_item_depends_on_work_item",
      from_entity: "WorkItem",
      to_entity: "WorkItem",
      write_policy: "proposal_only",
    },
  ],
  workflows: {
    build_public_reference: {
      steps: [
        { kind: "provider", config: "parse_bundle" },
        { kind: "register_source_artifacts", config: { retention: "archive" } },
        { kind: "make_entities", config: { entity_type: "Vendor" } },
        { kind: "make_entities", config: { entity_type: "Product" } },
        { kind: "make_entities", config: { entity_type: "Vulnerability" } },
        { kind: "make_relationships", config: { relationship_type: "product_from_vendor" } },
      ],
    },
    build_local_state: {
      steps: [
        { kind: "provider", config: "parse_seed_bundle" },
        { kind: "make_entities", config: { entity_type: "Asset" } },
        { kind: "make_entities", config: { entity_type: "Owner" } },
        { kind: "make_entities", config: { entity_type: "CompensatingControl" } },
        { kind: "make_entities", config: { entity_type: "VulnerabilityClass" } },
        { kind: "make_relationships", config: { relationship_type: "asset_owned_by" } },
      ],
    },
    propose_asset_products: {
      steps: [{ kind: "make_candidates", config: {} }, { kind: "propose_relationship_group" }],
    },
  },
};

describe("deriveInternalModel — governance shape", () => {
  const model = deriveInternalModel(COMPOSED, null);

  it("reports which signal it used", () => {
    expect(model.source).toBe("governance_shape");
    expect(model.available).toBe(true);
  });

  it("puts the pinned feed and everything deterministically bound to it on the reference side", () => {
    expect([...model.referenceEntityTypes].sort()).toEqual([
      "Product",
      "Vendor",
      "Vulnerability",
    ]);
  });

  it("keeps every locally built and agent-authored type internal", () => {
    for (const type of [
      "Asset",
      "Owner",
      "CompensatingControl",
      "VulnerabilityClass",
      "TriageDecision",
      "WorkItem",
      "Actor",
    ]) {
      expect(model.sideFor(type)).toBe("internal");
    }
  });

  it("treats proposal-only relationship types as the judgment seams", () => {
    expect(model.judgmentRelationshipTypes.has("asset_runs_product")).toBe(true);
    expect(model.judgmentRelationshipTypes.has("vulnerability_affects_product")).toBe(false);
  });
});

describe("deriveInternalModel — traps", () => {
  it("classifies by shape, not by name: rename every type and the split holds", () => {
    const renamed = JSON.parse(
      JSON.stringify(COMPOSED)
        .replaceAll("Vulnerability", "Sigma")
        .replaceAll("Product", "Delta")
        .replaceAll("Vendor", "Theta")
        .replaceAll("Asset", "Omega"),
    );
    const model = deriveInternalModel(renamed, null);
    expect([...model.referenceEntityTypes].sort()).toEqual(["Delta", "Sigma", "Theta"]);
    expect(model.sideFor("Omega")).toBe("internal");
  });

  it("declines when nothing pins an external feed", () => {
    const noFeed = {
      ...COMPOSED,
      workflows: { build_local_state: COMPOSED.workflows.build_local_state },
    };
    expect(deriveInternalModel(noFeed, null).available).toBe(false);
  });

  it("declines when no judgment seam separates the feed — that is not a reference layer", () => {
    const noSeams = {
      ...COMPOSED,
      relationships: COMPOSED.relationships.map((r) => ({ ...r, write_policy: undefined })),
    };
    expect(deriveInternalModel(noSeams, null).available).toBe(false);
  });

  it("declines when the whole instance is the feed", () => {
    const allFeed = {
      ...COMPOSED,
      entity_types: { Vendor: {}, Product: {}, Vulnerability: {} },
    };
    expect(deriveInternalModel(allFeed, null).available).toBe(false);
  });

  it("declines on an empty schema rather than guessing", () => {
    expect(deriveInternalModel(undefined, null).available).toBe(false);
    expect(deriveInternalModel({}, null).available).toBe(false);
  });
});

describe("deriveInternalModel — upstream ownership wins", () => {
  it("takes the enforced answer over the derived one", () => {
    const model = deriveInternalModel(COMPOSED, {
      owned_entity_types: ["Asset", "Owner"],
      owned_relationship_types: ["asset_owned_by"],
    });
    expect(model.source).toBe("upstream_ownership");
    // Deliberately the opposite of what the shape heuristic would say.
    expect(model.sideFor("Asset")).toBe("reference");
    expect(model.sideFor("Product")).toBe("internal");
    // Anything the local instance may write is a local statement about the
    // upstream world, so it carries judgment across the seam.
    expect(model.judgmentRelationshipTypes.has("asset_has_control")).toBe(true);
    expect(model.judgmentRelationshipTypes.has("asset_owned_by")).toBe(false);
  });

  it("ignores an upstream that owns nothing this instance holds", () => {
    const model = deriveInternalModel(COMPOSED, { owned_entity_types: ["Nowhere"] });
    expect(model.source).toBe("governance_shape");
  });
});

const row = (type: string, id: string) => ({ id: `${type}:${id}`, data: { entityType: type } });
const link = (source: string, target: string, relationship_type: string) => ({
  source,
  target,
  row: { relationship_type },
});

describe("focusInternalModel", () => {
  const model = deriveInternalModel(COMPOSED, null);
  const rows = [
    row("Asset", "a1"),
    row("Asset", "a2"),
    row("Owner", "o1"),
    row("Product", "p1"),
    row("Product", "p2"),
    row("Product", "p3"),
    row("Vendor", "v1"),
    row("Vulnerability", "c1"),
  ];
  const links = [
    link("Asset:a1", "Owner:o1", "asset_owned_by"),
    link("Asset:a1", "Product:p1", "asset_runs_product"),
    link("Asset:a1", "Vulnerability:c1", "asset_vulnerability_posture"),
    link("Product:p1", "Vendor:v1", "product_from_vendor"),
    link("Product:p2", "Vendor:v1", "product_from_vendor"),
    link("Vulnerability:c1", "Product:p3", "vulnerability_affects_product"),
  ];
  const focused = focusInternalModel(rows, links, model);

  it("keeps every internal entity", () => {
    expect(focused.rows.map((r) => r.id)).toContain("Asset:a2");
    expect(focused.rows.map((r) => r.id)).toContain("Owner:o1");
  });

  it("keeps a reference entity only as the far endpoint of a judgment edge", () => {
    const ids = focused.rows.map((r) => r.id);
    expect(ids).toContain("Product:p1");
    expect(ids).toContain("Vulnerability:c1");
    expect(ids).not.toContain("Product:p2");
    expect(ids).not.toContain("Product:p3");
    expect(ids).not.toContain("Vendor:v1");
    expect(focused.keptReferenceByType.get("Product")).toBe(1);
    expect(focused.keptReferenceByType.get("Vulnerability")).toBe(1);
  });

  it("cuts every edge inside the reference layer, including between kept rows", () => {
    const types = focused.links.map((l) => l.row.relationship_type);
    expect(types).toEqual([
      "asset_owned_by",
      "asset_runs_product",
      "asset_vulnerability_posture",
    ]);
  });

  it("draws a promoted type in full", () => {
    const promoted = focusInternalModel(rows, links, model, new Set(["Product"]));
    const ids = promoted.rows.map((r) => r.id);
    expect(ids).toContain("Product:p2");
    expect(ids).toContain("Product:p3");
    // Its vendor is still reference bulk and stays out.
    expect(ids).not.toContain("Vendor:v1");
  });
});
