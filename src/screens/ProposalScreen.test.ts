import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import { changeRows } from "./ProposalScreen";

type Member = Schemas["ReviewedMember"];

const member = (path: string, artifact_kind: string, artifact: Record<string, unknown>): Member =>
  ({
    path,
    artifact_kind,
    disposition: "create",
    closure_role: "authored",
    candidate_semantic_artifact: artifact,
    base_semantic_artifact: null,
    semantic_delta: [],
    prior_refusals: [],
  }) as unknown as Member;

const subject = (name: string) => member(`subjects/${name}.json`, "subject", { identity: { kind: "Subject", name } });
const claim = (id: string, name: string, predicate: string, value: string) =>
  member(`claims/${id}.json`, "claim", {
    identity: { kind: "Claim", name: id },
    statement: { predicate, subject: { artifact_path: `subjects/${name}.json` }, object: { kind: "literal", value } },
  });

describe("changeRows", () => {
  it("folds a created Subject into its Claim rows, marked new once", () => {
    const rows = changeRows([
      subject("security.vulnerability/cve-1"),
      claim("CLM-a", "security.vulnerability/cve-1", "security.vulnerability.cve_id", "CVE-1"),
      claim("CLM-b", "security.vulnerability/cve-1", "security.vulnerability.listed_in", "x"),
    ]);
    expect(rows.map((r) => r.what)).toEqual(["cve_id", "listed_in"]);
    expect(rows.filter((r) => r.newSubject !== null)).toHaveLength(1);
  });

  it("keeps a created Subject's own row when no Claim of it is in the proposal", () => {
    const rows = changeRows([subject("security.catalog/cisa-kev")]);
    expect(rows.map((r) => r.what)).toEqual(["Subject"]);
  });
});
