import { describe, expect, it } from "vitest";
import { kitOwnership, layerColoring, ownerOf } from "./kit-layer";

const ownership = kitOwnership([
  { kind: "security.vulnerability", rule: "keys", kit: "security" },
  { kind: "ops.work", rule: "minted", kit: "project-state" },
  { kind: "local.note", rule: "minted", kit: null },
]);

describe("owner layers", () => {
  it("reads the owning kit from orient's subject_kinds rows", () => {
    expect(ownerOf("security.vulnerability", ownership)).toEqual({ layer: "security", source: "kit" });
    expect(ownerOf("local.note", ownership)).toEqual({ layer: "instance", source: "instance" });
  });

  it("colors only when the shown kinds span more than one layer", () => {
    expect(layerColoring(["security.vulnerability"], ownership, true).enabled).toBe(false);
    const split = layerColoring(["security.vulnerability", "ops.work", "local.note"], ownership, true);
    expect(split.enabled).toBe(true);
    expect(split.layers.map((l) => l.layer)).toEqual(["instance", "project-state", "security"]);
    expect(split.colorOf("security")).not.toBe(split.colorOf("project-state"));
    expect(layerColoring(["security.vulnerability", "ops.work"], ownership, false).enabled).toBe(false);
  });
});
