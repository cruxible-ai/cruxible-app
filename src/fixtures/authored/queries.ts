/**
 * Hand-authored Query pages: `security.kev_exposure` walks from a KEV-listed
 * vulnerability back to the assessments that judge it affected and on to
 * their releases (the query kev-triage reads), with its row Contract and a
 * live answer in two pages; `security.release_exposure` starts at the one
 * release its parameter names, so it has no rows without one, and with one
 * its answer hits a server cap.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, queryBody } from "@/api/requests";
import { QUERY_PAGE } from "@/lib/query-params";
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
    fields: [{ status: "a.security.assessment.status" }, { score: "a.security.assessment.score" }],
  },
};

/**
 * `security.urgent_exposures` as the walkthrough daemon serves it (security kit
 * 1.3.0, six of its ten fields): pair hops (`KIND{part: binding, ...}`, one `with` a fact) bind the
 * occurrence, exposure and app_exposure boxes, and its `where` nests
 * `not`/`and`/`or` over two of them.
 */
export const URGENT_EXPOSURES = "security.urgent_exposures";
export const URGENT_EXPOSURES_CARD: Schemas["GetQueryCard"] = {
  query: URGENT_EXPOSURES,
  description:
    "Every occurrence (an inventory's component) a vulnerability affects that nobody has judged, KEV-listed first, then by EPSS score; a package-level or app-level not_affected judgment or an affected verdict removes it.",
  params: [],
  definition: {
    query: URGENT_EXPOSURES,
    params: {},
    params_contract: null,
    row: "security.exposure-row@1",
    from: { v: "security.vulnerability" },
    where:
      '(not (e.security.exposure.justification in ("vulnerable_code_not_present")) and not ((not exists ae.security.app_exposure.justification and ae.security.app_exposure.verdict == "affected")) and not (((not exists ae.security.app_exposure.verdict or ae.security.app_exposure.verdict == "not_affected") and ae.security.app_exposure.justification in ("component_not_present", "inline_mitigations_already_exist", "vulnerable_code_cannot_be_controlled_by_adversary", "vulnerable_code_not_in_execute_path"))))',
    hops: [
      { c: "<v.security.component.affected_by!: security.component" },
      { o: "security.occurrence{security.occurrence.component: c}! with security.occurrence.scope" },
      { i: "o.security.occurrence.inventory!: security.inventory" },
      { e: "security.exposure{security.exposure.component: c, security.exposure.vulnerability: v}" },
      { ae: "security.app_exposure{security.app_exposure.occurrence: o, security.app_exposure.vulnerability: v}" },
    ],
    fields: [
      { component: "c.security.component.purl" },
      { cve_id: "v.security.vulnerability.cve_id" },
      { epss_score: "v.security.vulnerability.epss_score" },
      { inventory: "i.security.inventory.inventory_id" },
      { occurrence: "o" },
      { scope: "o.security.occurrence.scope" },
    ],
    order: [
      { field: "-v.security.vulnerability.kev_date_added", type: "string" },
      { field: "-v.security.vulnerability.epss_score", type: "decimal" },
    ],
    include: {},
    visible: "current",
    limit: 200,
    paths_per_result: 100,
    max: { results: 2000, paths_per_result: 1000 },
  },
};

/** The release the release_exposure fixture answers for. */
export const RELEASE = "security.release/acme-2.4.0";

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
  cardBatch(`query:${URGENT_EXPOSURES}`, "query", URGENT_EXPOSURES_CARD),
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
    body: queryBody({ name: KEV_EXPOSURE, limit: QUERY_PAGE }, COORDINATE),
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
  // the answer's second page, from the first page's cursor
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody({ name: KEV_EXPOSURE, limit: QUERY_PAGE, cursor: "q2.next" }, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "security.vulnerability",
      columns: [
        { name: "cve_id", predicate: "security.vulnerability.cve_id", type: "string", cardinality: "one" },
        { name: "release", predicate: null, type: "subject:security.release", cardinality: "one" },
        { name: "status", predicate: "security.assessment.status", type: "string", cardinality: "one" },
      ],
      rows: [
        { cve_id: "CVE-2023-4863", release: subject("acme-2.3.0"), status: "affected", flags: [] },
        { cve_id: "CVE-2023-44487", release: subject("acme-2.2.0"), status: null, flags: [] },
        { cve_id: "CVE-2022-22965", release: subject("acme-2.1.0"), status: "affected", flags: [] },
      ],
      truncated: false,
      next_cursor: null,
      remaining: 0,
      capped: [],
      notes: [],
      receipt: { mode: "named", spec_digest: "sha256:" + "e".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
    },
  }),
  // given its release, the answer stops at a server cap: the daemon says so
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody({ name: RELEASE_EXPOSURE, limit: QUERY_PAGE, params: { release: RELEASE } }, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "security.release",
      columns: [
        { name: "score", predicate: "security.assessment.score", type: "decimal", cardinality: "one" },
        { name: "status", predicate: "security.assessment.status", type: "string", cardinality: "one" },
      ],
      rows: [
        { subject: RELEASE, subject_id: "acme-2.4.0", score: "0.5", status: "affected", flags: ["contested"] },
        { subject: RELEASE, subject_id: "acme-2.4.0", score: "0.125", status: "fixed", flags: [] },
      ],
      truncated: true,
      next_cursor: null,
      remaining: 0,
      capped: ["max_results=2"],
      notes: ["the answer hit the server cap max_results=2; rows past it are not listed"],
      receipt: { mode: "named", spec_digest: "sha256:" + "f".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
    },
  }),
];
