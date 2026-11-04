/**
 * Hand-authored reads the Overview makes beyond the rest of the world: the
 * product and release kind details, each logical source's landings, and the
 * since read over the generations page's newest generations (41 and 42).
 */
import { defineFixture } from "../fixture";
import { orientQuery, sinceBody } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { FETCHED } from "./captures";
import { ACCEPTED_AT, AT, COORDINATE, kindDescriptors, KIND_ROWS, NOW } from "./world";

const BASE_ORIENT = {
  tag: "playbill-orient-v1" as const,
  instance: "inst_fixture",
  coordinate: COORDINATE,
  generation: AT.generation,
  accepted_at: ACCEPTED_AT,
  evaluation_time: NOW,
};

const kindDetail = (index: number, kind: string, sample: string[]) =>
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, kind }),
    response: { ...BASE_ORIENT, kind_detail: { ...KIND_ROWS[index]!, predicates: kindDescriptors(kind), incoming: [], sample_subject_ids: sample } },
  });

const CLAIM_STATUS = `CLM-${(0xa3).toString(16).padStart(32, "0")}`;
const CLAIM_CVE = `CLM-${(0xb1).toString(16).padStart(32, "0")}`;
const CLAIM_PRODUCT = `CLM-${(0xb2).toString(16).padStart(32, "0")}`;
const ASSESSMENT = "security.assessment/rel-1-cve-2024-3094";

const row = (
  generation: number,
  member_path: string,
  artifact_kind: string,
  disposition: Schemas["SinceRow"]["disposition"],
  statement?: Schemas["ClaimLine"],
): Schemas["SinceRow"] => ({
  tag: "playbill-since-row-v1",
  generation,
  changeset_digest: "sha256:" + (generation === 42 ? "c" : "3").repeat(64),
  candidate_digest: "sha256:" + "d".repeat(64),
  member_path,
  artifact_kind,
  disposition,
  artifact_digest: "sha256:" + "a".repeat(64),
  predecessor_artifact_digest: disposition === "create" ? null : "sha256:" + "b".repeat(64),
  ...(statement ? { statement } : {}),
});

const claimPath = (id: string) => `claims/${id.slice(4, 6)}/${id}.json`;

export default [
  kindDetail(1, "security.product", ["cruxible"]),
  kindDetail(2, "security.release", ["cruxible-0.3.1", "cruxible-0.3.2"]),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "sources", limit: 500 }),
    response: {
      ...BASE_ORIENT,
      section: "sources",
      sources: [
        {
          logical_source: "cisa.kev.catalog",
          landings: 3,
          latest: {
            landed_at: "2026-10-19T06:00:04Z",
            run: "RUN-" + "7".repeat(64),
            line: "Line:kev-triage",
            capture: `CAP-${FETCHED.slice(7, 19)}`,
            ref: `Capture:${FETCHED}`,
            observed_at: "2026-10-19T06:00:03Z",
            size: 1_826_755,
            status: "available",
          },
          contracts: [{ contract: "CaptureContract:security.kev-http-v1", version: 1, landings: 3 }],
        },
      ],
      sources_unattributed: 0,
    },
  }),

  // since(40): the ChangeSet members of g41 and g42, oldest first, as since reads them.
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/since",
    body: sinceBody(40, COORDINATE),
    response: {
      tag: "playbill-since-result-v1",
      coordinate: COORDINATE,
      generation: AT.generation,
      rows: [
        row(41, claimPath(CLAIM_STATUS), "claim", "create", { claim: CLAIM_STATUS, subject: ASSESSMENT, field: "status", value: "affected" }),
        row(41, claimPath(CLAIM_CVE), "claim", "create", {
          claim: CLAIM_CVE,
          subject: "security.vulnerability/cve-2024-3094",
          field: "cve_id",
          value: "CVE-2024-3094",
        }),
        row(41, claimPath(CLAIM_PRODUCT), "claim", "create", { claim: CLAIM_PRODUCT, subject: "security.release/cruxible-0.3.1", field: "product", value: "security.product/cruxible" }),
        row(41, "subjects/security.release/cruxible-0.3.1.json", "subject", "create"),
        row(42, claimPath(CLAIM_STATUS), "claim", "replace", { claim: CLAIM_STATUS, subject: ASSESSMENT, field: "status", value: "not_affected" }),
      ],
      truncated: false,
      result_digest: "sha256:" + "e".repeat(64),
    },
  }),
];
