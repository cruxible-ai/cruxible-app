import { describe, expect, it } from "vitest";
import { hasLayerSplit, hasRealLayerData, typeLayer } from "./kit-layer";

/** Live composed payload shape: merged entity_types, no provenance fields. */
const COMPOSED_NO_PROVENANCE = {
  extends: null,
  entity_types: {
    Actor: { properties: {} },
    WorkItem: { properties: {} },
    Decision: { properties: {} },
    RoadmapItem: { properties: {} },
    Milestone: { properties: {} },
  },
};

/** Proposed future payload: composed_from + per-type source_kit. */
const COMPOSED_WITH_PROVENANCE = {
  composed_from: [
    { name: "agent-operation", role: "base" },
    { name: "case-law-monitoring", role: "overlay" },
  ],
  entity_types: {
    WorkItem: { source_kit: "agent-operation" },
    Opinion: { source_kit: "case-law-monitoring" },
    // Trap: a base-named type owned by the overlay. Provenance must win
    // over the name heuristic.
    Decision: { source_kit: "case-law-monitoring" },
    // Trap: an unfamiliar name owned by the base kit.
    Ledger: { source_kit: "agent-operation" },
  },
};

describe("typeLayer heuristic (no provenance in payload)", () => {
  it.each([
    "Actor",
    "SubjectRef",
    "WorkItem",
    "ReviewRequest",
    "Decision",
    "Risk",
    "OpenQuestion",
    "StateNote",
  ])("classifies agent-operation type %s as base", (t) => {
    expect(typeLayer(COMPOSED_NO_PROVENANCE, t)).toBe("base");
  });

  it.each(["RoadmapItem", "Opinion", "Supplier", "Incident"])(
    "classifies non-base type %s as domain",
    (t) => {
      expect(typeLayer(COMPOSED_NO_PROVENANCE, t)).toBe("domain");
    },
  );

  it("works without any schema at all", () => {
    expect(typeLayer(undefined, "WorkItem")).toBe("base");
    expect(typeLayer(undefined, "Opinion")).toBe("domain");
  });
});

describe("typeLayer with real provenance fields (future API)", () => {
  it("uses source_kit against the base kit name", () => {
    expect(typeLayer(COMPOSED_WITH_PROVENANCE, "WorkItem")).toBe("base");
    expect(typeLayer(COMPOSED_WITH_PROVENANCE, "Opinion")).toBe("domain");
  });

  it("lets provenance override the name heuristic in both directions", () => {
    expect(typeLayer(COMPOSED_WITH_PROVENANCE, "Decision")).toBe("domain");
    expect(typeLayer(COMPOSED_WITH_PROVENANCE, "Ledger")).toBe("base");
  });

  it("falls back to the heuristic for a type the payload does not annotate", () => {
    expect(typeLayer(COMPOSED_WITH_PROVENANCE, "Risk")).toBe("base");
    expect(typeLayer(COMPOSED_WITH_PROVENANCE, "Statute")).toBe("domain");
  });

  it("treats the first composed_from entry as base when roles are absent", () => {
    const schema = {
      composed_from: [{ name: "agent-operation" }, { name: "project-domain" }],
      entity_types: { Custom: { source_kit: "project-domain" } },
    };
    expect(typeLayer(schema, "Custom")).toBe("domain");
  });
});

describe("hasRealLayerData", () => {
  it("is false for today's composed payload", () => {
    expect(hasRealLayerData(COMPOSED_NO_PROVENANCE)).toBe(false);
    expect(hasRealLayerData(undefined)).toBe(false);
  });

  it("is true once composed_from and source_kit both appear", () => {
    expect(hasRealLayerData(COMPOSED_WITH_PROVENANCE)).toBe(true);
  });

  it("requires per-type annotations, not just composed_from", () => {
    expect(
      hasRealLayerData({
        composed_from: [{ name: "agent-operation", role: "base" }],
        entity_types: { WorkItem: {} },
      }),
    ).toBe(false);
  });
});

describe("hasLayerSplit", () => {
  it("is true when the ontology spans base and domain types", () => {
    expect(hasLayerSplit(COMPOSED_NO_PROVENANCE)).toBe(true);
  });

  it("is false for a base-only instance", () => {
    expect(
      hasLayerSplit({ entity_types: { Actor: {}, WorkItem: {}, Risk: {} } }),
    ).toBe(false);
  });

  it("is false for a domain-only instance (e.g. kev-reference standalone)", () => {
    expect(
      hasLayerSplit({ entity_types: { Vulnerability: {}, Vendor: {} } }),
    ).toBe(false);
  });

  it("is false for empty or missing schema", () => {
    expect(hasLayerSplit({ entity_types: {} })).toBe(false);
    expect(hasLayerSplit(undefined)).toBe(false);
  });
});
