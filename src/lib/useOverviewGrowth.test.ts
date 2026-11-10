import { describe, expect, it } from "vitest";
import type { OrientPredicate } from "@/api/schemas";
import { claimsByKind } from "./useOverviewGrowth";

const row = (predicate: string, kinds: string[], admitted: number, own_word = 0, unmet = 0) =>
  ({ name: predicate.split(".").pop()!, predicate, subject_kinds: kinds, evidence_counts: { admitted, own_word, unmet } }) as unknown as OrientPredicate;

describe("growth: live Claims per kind from a generation's claim_types section", () => {
  it("adds each ClaimType's live Claims (its evidence counts) to its kind, leaving core identity out", () => {
    const byKind = claimsByKind([
      row("security.vulnerability.epss_score", ["security.vulnerability"], 179),
      row("security.vulnerability.kev_listed", ["security.vulnerability"], 170, 5, 4),
      row("security.component.purl", ["security.component"], 32),
      row("semantic.label", ["security.component"], 99),
    ]);
    expect(byKind.get("security.vulnerability")).toBe(358);
    expect(byKind.get("security.component")).toBe(32);
  });

  it("skips a row that serves no evidence counts", () => {
    const bare = { name: "x", predicate: "a.b.x", subject_kinds: ["a.b"] } as unknown as OrientPredicate;
    expect(claimsByKind([bare]).size).toBe(0);
  });
});
