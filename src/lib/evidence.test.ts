import { describe, expect, it } from "vitest";
import { admissionTally, citationLabel, countsReasonText, publicName } from "./evidence";

describe("evidence display", () => {
  it("maps stored playbill names to their public Cruxible names, at render time only", () => {
    expect(publicName("playbill.coordinator-authoring")).toBe("cruxible.coordinator-authoring");
    expect(publicName("CaptureContract:playbill.coordinator-self-source-v1")).toBe(
      "CaptureContract:cruxible.coordinator-self-source-v1",
    );
    expect(publicName("pypi.release")).toBe("pypi.release");
  });

  it("labels a citation as own words, a passage of its source, or its role", () => {
    expect(citationLabel({ origin: "self_source", role: "copy", source: "playbill.coordinator-authoring" })).toBe("Own words");
    expect(citationLabel({ origin: "independent", role: "copy", source: "playbill.page" })).toBe("Passage of cruxible.page");
    expect(citationLabel({ origin: "independent", role: "evidence", source: "cve.record" })).toBe("Evidence");
  });

  it("tallies admitted of offered evidence and keeps copies that are not evidence apart", () => {
    expect(admissionTally([{ status: "admitted" }, { status: "not_admitted" }, { status: "not_evidence" }])).toEqual({
      admitted: 1,
      offered: 2,
      notEvidence: 1,
    });
  });

  it("says why an attestation counts or not, naming the consequence-policy rule", () => {
    expect(countsReasonText({ counts_reason: "consequence_policy", rule: "owner-confirms" })).toBe(
      "consequence policy rule owner-confirms",
    );
    expect(countsReasonText({ counts_reason: "cites_no_capture" })).toBe("cites no Capture");
  });
});
