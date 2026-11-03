/**
 * Hand-authored Query pages: `security.kev_exposure` walks from a KEV-listed
 * vulnerability back to the assessments that judge it affected and on to
 * their releases (the query kev-triage reads), with its row Contract and a
 * live page of its rows; `security.release_exposure` starts at the one
 * release its parameter names, so it has no preview without one.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, queryBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

export const KEV_EXPOSURE = "security.kev_exposure";
export const RELEASE_EXPOSURE = "security.release_exposure";
const KEV_EXPOSURE_ROW = "security.kev-exposure@1";

const result = (ref: string, kind: GetResult["kind"], card: NonNullable<GetResult["card"]>): GetResult => ({
  tag: "playbill-get-result-v1",
  ref,
  kind,
  detail: "summary",
  coordinate: AT,
  accepted_coordinate: COORDINATE,
  evaluation_time: NOW,
  card,
});

export const KEV_EXPOSURE_CARD: Schemas["GetQueryCard"] = {
  query: KEV_EXPOSURE,
  description: "KEV-listed vulnerabilities and the releases assessed as affected by them.",
  params: [],
  definition: {
    query: KEV_EXPOSURE,
    description: "KEV-listed vulnerabilities and the releases assessed as affected by them.",
    params: {},
    params_contract: null,
    row: KEV_EXPOSURE_ROW,
    from: { v: "security.vulnerability" },
    where: "v.security.vulnerability.kev_listed = true",
    hops: [
      { a: '<v.security.assessment.vulnerability: security.assessment where a.security.assessment.status = "affected"' },
      { r: "a.security.assessment.release: security.release" },
    ],
    fields: [{ cve_id: "v.security.vulnerability.cve_id" }, { release: "r" }, { status: "a.security.assessment.status" }],
    order: [],
    include: {},
    visible: "current",
    limit: 200,
    paths_per_result: 100,
    max: { results: 2000, paths_per_result: 1000 },
  },
};

export const RELEASE_EXPOSURE_CARD: Schemas["GetQueryCard"] = {
  query: RELEASE_EXPOSURE,
  description: "What one release is assessed as exposed to.",
  params: [{ name: "release", type: "subject_reference", required: true }],
  definition: {
    query: RELEASE_EXPOSURE,
    description: "What one release is assessed as exposed to.",
    params: { release: "subject" },
    row: null,
    from: { r: "security.release = $release" },
    hops: [{ a: "<r.security.assessment.release: security.assessment" }],
    fields: [{ status: "a.security.assessment.status" }],
  },
};

const cardBatch = (ref: string, kind: GetResult["kind"], card: NonNullable<GetResult["card"]>) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([ref], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [result(ref, kind, card)] },
  });

const subject = (id: string) => `security.release/${id}`;

export default [
  cardBatch(`query:${KEV_EXPOSURE}`, "query", KEV_EXPOSURE_CARD),
  cardBatch(`query:${RELEASE_EXPOSURE}`, "query", RELEASE_EXPOSURE_CARD),
  cardBatch(`Contract:${KEV_EXPOSURE_ROW}`, "contract", {
    contract: `Contract:${KEV_EXPOSURE_ROW}`,
    version: 1,
    description: "One KEV-listed vulnerability a release is affected by.",
    fields: [
      { name: "cve_id", type: "string" },
      { name: "release", type: "subject" },
      { name: "status", type: "string", optional: true },
    ],
    pins: [],
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody({ name: KEV_EXPOSURE, limit: 10 }, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "security.vulnerability",
      columns: [
        { name: "cve_id", predicate: "security.vulnerability.cve_id", type: "string", cardinality: "one" },
        { name: "release", predicate: null, type: "subject:security.release", cardinality: "one" },
        { name: "status", predicate: "security.assessment.status", type: "string", cardinality: "one" },
      ],
      rows: [
        { cve_id: "CVE-2024-3094", release: subject("acme-2.4.0"), status: "affected", flags: [] },
        { cve_id: "CVE-2021-44228", release: subject("acme-2.3.1"), status: "affected", flags: [] },
      ],
      truncated: true,
      next_cursor: "q2.next",
      remaining: 3,
      capped: [],
      notes: [],
      receipt: { mode: "named", spec_digest: "sha256:" + "e".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
    },
  }),
];
