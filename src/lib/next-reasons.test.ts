import { describe, expect, it } from "vitest";
import { driftedClaims, nextCount, splitDetail } from "./next-reasons.ts";

describe("next counts and drift", () => {
  it("counts setup choices into the Next badge, as the page lists them", () => {
    expect(nextCount({ next_items: 2, setup_items: 4 })).toBe(6);
    expect(nextCount({ next_items: 3 })).toBe(3);
    expect(nextCount(undefined)).toBe(0);
  });

  it("collects drifted Claims from rows and findings and says whether drift was observed", () => {
    expect(driftedClaims(undefined)).toEqual({ claims: new Set(), observed: null, complete: false, read: 0, total: 0 });
    const page = {
      unobserved_domains: [],
      items: [
        { reason: "citation_drifted" as const, subject_identity: "Claim:CLM-a" },
        { reason: "claim_conflicted" as const, subject_identity: "Claim:CLM-x", findings: [{ reason: "citation_drifted" as const, subject_identity: "CLM-b" }] },
      ],
    };
    expect(driftedClaims(page)).toEqual({ claims: new Set(["CLM-a", "CLM-b"]), observed: true, complete: true, read: 2, total: 2 });
    // a continuation: only the page in hand is covered
    expect(driftedClaims({ ...page, total_items: 101, next_cursor: "c" })).toMatchObject({ complete: false, read: 2, total: 101 });
    expect(driftedClaims({ items: [], unobserved_domains: ["workspace_sources"] }).observed).toBe(false);
  });
});

describe("core's sentence", () => {
  it("is dropped when the typed keys it is built from are all present, kept when it carries more", () => {
    const keys = (reason: Parameters<typeof splitDetail>[0], detail: unknown) => splitDetail(reason, detail).fields.map((f) => f.spec.key);
    expect(keys("line_inbox_unread", { unread: 7, detail: "7 new inbox items from Line:a." })).toEqual(["unread"]);
    expect(keys("line_inbox_unread", { availability: "unavailable", detail: "Inbox volume is unknown because its journal is incomplete." })).toEqual(["availability", "detail"]);
    // a constant restating the reason
    expect(keys("line_not_enabled", { detail: "accepted but never enabled; enable it to run on its Triggers" })).toEqual([]);
    // dropped prose never falls back to the raw JSON either
    expect(splitDetail("line_not_enabled", { detail: "accepted but never enabled" }).rest).toBeNull();
    // a refusal carried nowhere else
    expect(keys("kit_resume_blocked", { kit_id: "k", detail: "refused" })).toEqual(["kit_id", "detail"]);
  });
});
