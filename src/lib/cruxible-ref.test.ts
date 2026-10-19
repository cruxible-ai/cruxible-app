import { describe, expect, it } from "vitest";
import { formatRef, parseCruxibleUrl, parseRef, refRoute } from "./cruxible-ref";

describe("ref grammar", () => {
  it("parses Subjects in every spelling get accepts", () => {
    const expected = { kind: "subject", subjectKind: "security.vulnerability", subjectId: "cve-2024-3094" };
    expect(parseRef("security.vulnerability/cve-2024-3094")).toEqual(expected);
    expect(parseRef("Subject:security.vulnerability/cve-2024-3094")).toEqual(expected);
    expect(parseRef("subjects/security.vulnerability/cve-2024-3094.json")).toEqual(expected);
  });

  it("parses id-prefixed and typed refs", () => {
    expect(parseRef("CLM-0123456789ab")).toEqual({ kind: "claim", id: "CLM-0123456789ab" });
    expect(parseRef("CAP-0123456789ab")).toEqual({ kind: "capture", id: "CAP-0123456789ab" });
    expect(parseRef("INB-abc")).toEqual({ kind: "inbox", id: "INB-abc" });
    expect(parseRef("ProcedureRun:run-1")).toEqual({ kind: "procedure_run", id: "run-1" });
    expect(parseRef("Line:kev-triage")).toEqual({ kind: "line", name: "kev-triage" });
    expect(parseRef("Procedure:security.kev-triage")).toEqual({
      kind: "procedure",
      name: "security.kev-triage",
    });
    expect(parseRef("ClaimType:security.vulnerability.kev_listed")).toEqual({
      kind: "claim_type",
      name: "security.vulnerability.kev_listed",
    });
    expect(parseRef("ProcedureMandate:m1")).toEqual({ kind: "mandate", name: "m1" });
    expect(parseRef("sha256:" + "a".repeat(64))).toEqual({
      kind: "proposal",
      id: "sha256:" + "a".repeat(64),
    });
  });

  it("refuses what get would not resolve", () => {
    expect(parseRef("")).toBeNull();
    expect(parseRef("Frobnicate:x")).toBeNull();
    expect(parseRef("Line:")).toBeNull();
    expect(parseRef("WorkItem/wi-1")).toBeNull(); // kinds are lowercase, dotted
    expect(parseRef("plainword")).toBeNull();
  });

  it("formats back to the canonical get ref", () => {
    for (const raw of [
      "security.vulnerability/cve-2024-3094",
      "CLM-0123456789ab",
      "CAP-0123456789ab",
      "ProcedureRun:run-1",
      "Line:kev-triage",
      "ClaimType:security.vulnerability.kev_listed",
      "query:security.kev_exposure",
    ]) {
      expect(formatRef(parseRef(raw)!)).toBe(raw);
    }
    expect(formatRef(parseRef("Subject:a.b/c")!)).toBe("a.b/c");
    expect(formatRef(parseRef("QueryDefinition:q")!)).toBe("query:q");
  });

  it("routes ClaimTypes and SubjectKinds to the type map, everything get-able to its card", () => {
    expect(refRoute("inst", parseRef("ClaimType:a.b.c")!)).toBe("/i/inst/map?claim_type=a.b.c");
    expect(refRoute("inst", parseRef("SubjectKind:a.b")!)).toBe("/i/inst/map?kind=a.b");
    expect(refRoute("inst", parseRef("a.b/c")!)).toBe("/i/inst/ref/a.b%2Fc");
    expect(refRoute("inst", parseRef("INB-1")!)).toBeNull();
  });

  it("reads refs out of cruxible:// URLs", () => {
    expect(parseCruxibleUrl("cruxible://Line:kev-triage")).toEqual({ kind: "line", name: "kev-triage" });
    expect(parseCruxibleUrl("cruxible://a.b%2Fc")).toEqual({
      kind: "subject",
      subjectKind: "a.b",
      subjectId: "c",
    });
    expect(parseCruxibleUrl("cruxible://%E0%A4%A")).toBeNull();
    expect(parseCruxibleUrl("https://example.com")).toBeNull();
  });
});
