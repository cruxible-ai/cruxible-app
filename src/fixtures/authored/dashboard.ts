/**
 * Hand-authored reads the Dashboard makes beyond the rest of the world: the
 * since read for a viewer who last looked at g41 (the head is g42), with a
 * Claim created, one revised and one retired.
 */
import { defineFixture } from "../fixture";
import { sinceBody } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { AT, COORDINATE } from "./world";

const claim = (n: number) => `CLM-${n.toString(16).padStart(32, "0")}`;
const claimPath = (id: string) => `claims/${id.slice(4, 6)}/${id}.json`;

const row = (member_path: string, disposition: Schemas["SinceRow"]["disposition"], statement?: Schemas["ClaimLine"], artifact_kind = "claim"): Schemas["SinceRow"] => ({
  tag: "playbill-since-row-v1",
  generation: 42,
  changeset_digest: "sha256:" + "c".repeat(64),
  candidate_digest: "sha256:" + "d".repeat(64),
  member_path,
  artifact_kind,
  disposition,
  artifact_digest: "sha256:" + "a".repeat(64),
  predecessor_artifact_digest: disposition === "create" ? null : "sha256:" + "b".repeat(64),
  ...(statement ? { statement } : {}),
});

const ASSESSMENT = "security.assessment/rel-1-cve-2024-3094";

export default [
  // since(41): g42's members.
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/since",
    body: sinceBody(41, COORDINATE),
    response: {
      tag: "playbill-since-result-v1",
      coordinate: COORDINATE,
      generation: AT.generation,
      rows: [
        row(claimPath(claim(0xa3)), "replace", { claim: claim(0xa3), subject: ASSESSMENT, field: "status", value: "not_affected" }),
        row(claimPath(claim(0xc1)), "create", { claim: claim(0xc1), subject: "security.vulnerability/cve-2024-6387", field: "kev_listed", value: true }),
        row(claimPath(claim(0xc2)), "retire", { claim: claim(0xc2), subject: "security.vulnerability/cve-2023-4863", field: "kev_listed", value: false }),
        row("subjects/security.vulnerability/cve-2024-6387.json", "create", undefined, "subject"),
      ],
      truncated: false,
      result_digest: "sha256:" + "f".repeat(64),
    },
  }),
];
