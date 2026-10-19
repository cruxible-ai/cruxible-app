import { describe, expect, it } from "vitest";
import { kitOwnership, layerColoring, namespaceOf, ownerOf } from "./kit-layer";

describe("owner layers", () => {
  it("falls back to the namespace while GET /kits carries no ownership (gap G1)", () => {
    expect(kitOwnership([{ kit_id: "security", version: "0.3.0", content_digest: "sha256:x" }])).toBeNull();
    expect(ownerOf("SubjectKind", "security.vulnerability", null)).toEqual({
      layer: "security",
      source: "namespace",
    });
    expect(namespaceOf("undotted")).toBe("undotted");
  });

  it("prefers a served owning kit over the namespace", () => {
    const ownership = new Map([["SubjectKind:security.vulnerability", "kev-reference"]]);
    expect(ownerOf("SubjectKind", "security.vulnerability", ownership)).toEqual({
      layer: "kev-reference",
      source: "kit",
    });
    expect(ownerOf("SubjectKind", "security.release", ownership).source).toBe("namespace");
  });

  it("colors only when the shown kinds span more than one layer", () => {
    expect(layerColoring(["security.a", "security.b"], null, true).enabled).toBe(false);
    const split = layerColoring(["security.a", "ops.work"], null, true);
    expect(split.enabled).toBe(true);
    expect(split.layers.map((l) => l.layer)).toEqual(["ops", "security"]);
    expect(split.colorOf("ops")).not.toBe(split.colorOf("security"));
    expect(layerColoring(["security.a", "ops.work"], null, false).enabled).toBe(false);
  });
});
