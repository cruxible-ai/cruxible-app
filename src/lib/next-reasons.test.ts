import { describe, expect, it } from "vitest";
import { driftedClaims, nextCount } from "./next-reasons.ts";

describe("next counts and drift", () => {
  it("counts setup choices into the Next badge, as the page lists them", () => {
    expect(nextCount({ next_items: 2, setup_items: 4 })).toBe(6);
    expect(nextCount({ next_items: 3 })).toBe(3);
    expect(nextCount(undefined)).toBe(0);
  });

  it("collects drifted Claims from rows and findings and says whether drift was observed", () => {
    expect(driftedClaims(undefined)).toEqual({ claims: new Set(), observed: null });
    const page = {
      unobserved_domains: [],
      items: [
        { reason: "citation_drifted" as const, subject_identity: "Claim:CLM-a" },
        { reason: "claim_conflicted" as const, subject_identity: "Claim:CLM-x", findings: [{ reason: "citation_drifted" as const, subject_identity: "CLM-b" }] },
      ],
    };
    expect(driftedClaims(page)).toEqual({ claims: new Set(["CLM-a", "CLM-b"]), observed: true });
    expect(driftedClaims({ items: [], unobserved_domains: ["workspace_sources"] }).observed).toBe(false);
  });
});
