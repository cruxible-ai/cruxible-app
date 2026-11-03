import { describe, expect, it } from "vitest";
import { claimObjectValue, claimValueText, isClaimObject, noneOf, slotParts, subjectOfObject } from "./claim-value";

// An inverse Claim's object as a Claim card and a Subject's history serve it (security kit, listed_in).
const KEV_OBJECT = {
  kind: "subject",
  address: {
    tag: "playbill-semantic-address-v1",
    artifact_path: "subjects/security.catalog/cisa-kev.json",
    selector: { scheme: "artifact-v1", value: "" },
  },
};
const SERVED_NONE = { object: { kind: "none", of: KEV_OBJECT } };

describe("claim values", () => {
  it("reads a Subject object by its artifact address", () => {
    expect(subjectOfObject(KEV_OBJECT)).toBe("security.catalog/cisa-kev");
    expect(claimObjectValue(KEV_OBJECT)).toBe("security.catalog/cisa-kev");
    expect(claimObjectValue({ kind: "literal", value: "Known" })).toBe("Known");
    expect(subjectOfObject({ kind: "literal", value: "x" })).toBeNull();
    expect(isClaimObject(SERVED_NONE)).toBe(true);
    expect(isClaimObject({ object: KEV_OBJECT })).toBe(true);
    expect(isClaimObject({ object: { severity: "high" } })).toBe(false);
  });

  it("reads a none wrapped or bare, of a Subject, a literal, or the whole slot", () => {
    expect(noneOf(SERVED_NONE)).toEqual({ of: "security.catalog/cisa-kev" });
    expect(noneOf({ kind: "none", of: { kind: "literal", value: "high" } })).toEqual({ of: "high" });
    expect(noneOf({ object: { kind: "none" } })).toEqual({ of: null });
    expect(noneOf("security.catalog/cisa-kev")).toBeNull();
    expect(noneOf({ object: { severity: "none" } })).toBeNull();
  });

  it("splits a Subject card slot into its values, then its nones", () => {
    // a many-valued Subject-valued Claim held
    expect(slotParts(["security.catalog/cisa-kev"])).toEqual([{ kind: "value", value: "security.catalog/cisa-kev" }]);
    // its inverse: no values, one none (the Subject card serves `of` as a ref)
    expect(slotParts([], [{ of: "security.catalog/cisa-kev" }])).toEqual([{ kind: "none", of: "security.catalog/cisa-kev" }]);
    // a one-valued slot held absent whole
    expect(slotParts(null, [{}])).toEqual([{ kind: "none", of: null }]);
    expect(slotParts([])).toEqual([]);
  });

  it("says a none in words, never as JSON", () => {
    expect(claimValueText(SERVED_NONE)).toBe("none of security.catalog/cisa-kev");
    expect(claimValueText({ object: { kind: "none" } })).toBe("none");
    expect(claimValueText(["a", "b"])).toBe("a, b");
  });
});
