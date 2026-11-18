/**
 * Hand-authored reads for the Queries and Inbox pages: the queries section
 * (both Queries of queries.ts, their cards in one batch), and the inbox
 * across Lines: an unread kev-triage item whose payload is an object of
 * fields under its item Contract (`release` typed `subject<security.release>`;
 * `cve_id` untyped but copied from the kev_exposure Query's
 * `v.security.vulnerability.cve_id`, the vulnerability's key, so the page
 * looks its Subject up), and a dismissed cve-applicability item with the
 * agent's reason, each filter the page offers, and a second page.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, inboxQuery, orientQuery, queryBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { QUERIES_PAGE } from "@/api/hooks";
import { INBOX_LIST_PAGE } from "@/lib/inbox";
import { WORKLIST_LIMIT } from "@/lib/worklist";
import { AT, COORDINATE, NOW } from "./world";
import { KEV_EXPOSURE, KEV_EXPOSURE_CARD, RELEASE_EXPOSURE, RELEASE_EXPOSURE_CARD } from "./queries";

const BASE_ORIENT = {
  tag: "playbill-orient-v1" as const,
  instance: "inst_fixture",
  coordinate: COORDINATE,
  generation: AT.generation,
  proposed_at: "2026-10-19T09:30:00Z",
  evaluation_time: NOW,
};

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

const batch = (refs: string[], results: GetResult[]) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(refs, COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results },
  });

// -- the inbox -------------------------------------------------------------------

export const NOTIFY_PROCEDURE = "Procedure:security.kev-notify";
const NOTIFY_CONTRACT = "security.kev-attention@1";
export const UNREAD_ITEM = "INB-" + "a1".repeat(32);
export const DISMISSED_ITEM = "INB-" + "b2".repeat(32);
export const OLDER_ITEM = "INB-" + "c3".repeat(32);

const NOTIFY_SPEC: Schemas["ProcedureSpec"] = {
  procedure: "security.kev-notify",
  description: "Post one inbox item per KEV-listed CVE no release assessment covers.",
  steps: [
    { read: "uncovered", query: KEV_EXPOSURE },
    {
      id: "post",
      inbox: NOTIFY_CONTRACT,
      fields: { cve_id: { $ref: "item", path: ["cve_id"] }, release: { $ref: "item", path: ["release"] }, note: "sboms/app.cdx.json" },
      for_each: { $ref: "step", step: "uncovered", path: ["rows"] },
    },
  ],
} as unknown as Schemas["ProcedureSpec"];

const envelope = (
  itemId: string,
  line: string,
  procedure: string,
  status: Schemas["InboxItemEnvelope"]["status"],
  postedAt: string,
  disposition: Schemas["InboxItemEnvelope"]["disposition"] = null,
): Schemas["InboxItemEnvelope"] => ({
  item_id: itemId,
  status,
  line: `Line:${line}`,
  procedure,
  procedure_artifact_digest: "sha256:" + "6".repeat(64),
  node_id: "post",
  occurrences: 2,
  first_sighting: { run_id: "run-6", posted_at: "2026-10-17T06:00:09Z" },
  recent_sightings: [{ run_id: "run-8", posted_at: postedAt }],
  dedupe_key: `${line}/${itemId.slice(4, 12)}`,
  payload_digest: "sha256:" + "d1".repeat(32),
  payload_bytes: 120,
  disposition,
  disposition_count: disposition ? 1 : 0,
});

const UNREAD: Schemas["InboxListEntry"] = {
  item: envelope(UNREAD_ITEM, "kev-triage", NOTIFY_PROCEDURE, "unread", "2026-10-19T06:00:09Z"),
  payload_preview: { object: { cve_id: "CVE-2024-6387", release: "security.release/acme-2.4.0", note: "sboms/app.cdx.json" } },
};

const DISMISSED: Schemas["InboxListEntry"] = {
  item: envelope(DISMISSED_ITEM, "cve-applicability", "Procedure:security.cve-applicability", "dismissed", "2026-10-18T06:00:09Z", {
    disposition: "dismissed",
    actor_id: "security-lead",
    decided_at: "2026-10-18T09:00:00Z",
    reason: "Not shipped in any supported release.",
  }),
  payload_preview: "OSV answer for acme-2.2.0 carried no new vulnerability.",
};

const OLDER: Schemas["InboxListEntry"] = {
  item: envelope(OLDER_ITEM, "kev-triage", NOTIFY_PROCEDURE, "unread", "2026-10-16T06:00:09Z"),
  payload_preview: { object: { cve_id: "CVE-2021-44228", release: "security.release/acme-2.3.1", note: "" } },
};

const list = (entries: Schemas["InboxListEntry"][], extra: Partial<Schemas["InboxList"]> = {}): Schemas["InboxList"] => ({
  tag: "cruxible-inbox-list-v1",
  entries,
  truncated: false,
  next_cursor: null,
  ...extra,
});

/** The page's lookup of the vulnerabilities its cve_id values name (one query for the kind, by its key). */
const vulnerabilities = (cves: string[]) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody({ kind: "security.vulnerability", where: [{ field: "security.vulnerability.cve_id", in: cves }], select: ["security.vulnerability.cve_id"], limit: cves.length }, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "security.vulnerability",
      columns: [{ name: "cve_id", predicate: "security.vulnerability.cve_id", type: "string", cardinality: "one" }],
      // CVE-2021-44228 has no live Subject here: its value stays text
      rows: cves
        .filter((cve) => cve !== "CVE-2021-44228")
        .map((cve) => ({ subject: `security.vulnerability/${cve.toLowerCase()}`, subject_id: cve.toLowerCase(), cve_id: cve, flags: [] })),
      truncated: false,
      next_cursor: null,
      remaining: 0,
      capped: [],
      notes: [],
      receipt: { mode: "inline", spec_digest: "sha256:" + "f".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
    },
  });

/**
 * The notify Line's Query as it reads now, for the inbox's current-row join
 * (one read per posting step on the page): CVE-2024-6387 on acme-2.4.0 still
 * qualifies; CVE-2021-44228 on acme-2.3.1 no longer does.
 */
export const worklistRead = (rows: Record<string, unknown>[], extra: Partial<Schemas["QueryResultRecord"]> = {}) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody({ name: KEV_EXPOSURE, limit: WORKLIST_LIMIT }, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "security.vulnerability",
      columns: [
        { name: "cve_id", predicate: "security.vulnerability.cve_id", type: "string", cardinality: "one" },
        { name: "release", predicate: null, type: "subject:security.release", cardinality: "one" },
        { name: "status", predicate: "security.assessment.status", type: "string", cardinality: "one" },
      ],
      rows: rows as Schemas["QueryResultRecord"]["rows"],
      truncated: false,
      next_cursor: null,
      remaining: 0,
      capped: [],
      notes: [],
      receipt: { mode: "named", spec_digest: "sha256:" + "e".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
      ...extra,
    },
  });

export const WORKLIST_ROWS = [
  { subject: "security.vulnerability/cve-2023-4863", cve_id: "CVE-2023-4863", release: "security.release/acme-2.3.0", status: "affected", flags: [] },
  { subject: "security.vulnerability/cve-2024-6387", cve_id: "CVE-2024-6387", release: "security.release/acme-2.4.0", status: "under_investigation", flags: [] },
];

const inbox = (line: string | undefined, status: Schemas["InboxItemEnvelope"]["status"] | undefined, response: Schemas["InboxList"], cursor?: string) =>
  defineFixture({ method: "get", path: "/api/v1/{instance_id}/inbox", query: inboxQuery(line, status, INBOX_LIST_PAGE, cursor), response });

export default [
  worklistRead(WORKLIST_ROWS),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "queries", limit: QUERIES_PAGE }),
    response: {
      ...BASE_ORIENT,
      section: "queries",
      queries: [
        { name: KEV_EXPOSURE, description: KEV_EXPOSURE_CARD.description ?? null, params: [] },
        { name: RELEASE_EXPOSURE, description: RELEASE_EXPOSURE_CARD.description ?? null, params: ["release: subject_reference"] },
      ],
      queries_truncated: false,
    },
  }),
  batch(
    [`query:${KEV_EXPOSURE}`, `query:${RELEASE_EXPOSURE}`],
    [result(`query:${KEV_EXPOSURE}`, "query", KEV_EXPOSURE_CARD), result(`query:${RELEASE_EXPOSURE}`, "query", RELEASE_EXPOSURE_CARD)],
  ),

  // every Line, any status: newest posted first, with a second page
  inbox(undefined, undefined, list([UNREAD, DISMISSED], { truncated: true, next_cursor: "inbox.p2" })),
  inbox(undefined, undefined, list([OLDER]), "inbox.p2"),
  inbox("kev-triage", undefined, list([UNREAD, OLDER], { line_filter: "Line:kev-triage" })),
  inbox(undefined, "dismissed", list([DISMISSED], { status_filter: "dismissed" })),
  inbox("kev-triage", "unread", list([UNREAD, OLDER], { line_filter: "Line:kev-triage", status_filter: "unread" })),

  // the looked-up vulnerability's card, read when its link is hovered
  batch(
    ["security.vulnerability/cve-2024-6387"],
    [
      result("security.vulnerability/cve-2024-6387", "subject", {
        subject: "security.vulnerability/cve-2024-6387",
        kind: "security.vulnerability",
        lifecycle: "live",
        incoming_count: 1,
        claims: [
          { predicate: "cve_id", claim: "CLM-" + "1".repeat(32), value: "CVE-2024-6387", flags: [] },
          { predicate: "epss_score", claim: "CLM-" + "2".repeat(32), value: "0.28271", flags: [] },
          { predicate: "listed_in", claim: [], value: [], flags: [], nones: [{ claim: "CLM-" + "3".repeat(32), of: "security.catalog/cisa-kev", verdict: "supported" }] },
        ],
      }),
    ],
  ),
  vulnerabilities(["CVE-2024-6387"]),
  vulnerabilities(["CVE-2021-44228"]),
  vulnerabilities(["CVE-2021-44228", "CVE-2024-6387"]),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/inbox/{item_id}",
    pathParams: { item_id: UNREAD_ITEM },
    response: {
      tag: "cruxible-inbox-item-v1",
      item: UNREAD.item,
      payload: { cve_id: "CVE-2024-6387", release: "security.release/acme-2.4.0", note: "sboms/app.cdx.json", message: "KEV-listed; no assessment covers acme-2.4.0." },
    },
  }),

  // the posting Procedures (their specs name each node's item Contract) and the Contract's fields
  batch(
    [NOTIFY_PROCEDURE, "Procedure:security.cve-applicability"],
    [
      result(NOTIFY_PROCEDURE, "procedure", { authored: NOTIFY_SPEC, procedure: "security.kev-notify", description: NOTIFY_SPEC.description ?? null, lifecycle: "live", inputs: {}, runnable: "line" }),
      result("Procedure:security.cve-applicability", "procedure", { authored: null, procedure: "security.cve-applicability", description: null, lifecycle: "live", inputs: {}, runnable: "line" }),
    ],
  ),
  batch(
    [NOTIFY_PROCEDURE],
    [result(NOTIFY_PROCEDURE, "procedure", { authored: NOTIFY_SPEC, procedure: "security.kev-notify", description: NOTIFY_SPEC.description ?? null, lifecycle: "live", inputs: {}, runnable: "line" })],
  ),
  // cve-applicability's card alone is definitions.ts's (its page reads it too): one fixture per key.
  batch(
    [`Contract:${NOTIFY_CONTRACT}`],
    [
      result(`Contract:${NOTIFY_CONTRACT}`, "contract", {
        contract: `Contract:${NOTIFY_CONTRACT}`,
        version: 1,
        description: "One KEV-listed CVE a release has no assessment for.",
        fields: [
          { name: "cve_id", type: "string" },
          { name: "release", type: "subject<security.release>", description: "The release the CVE is unassessed for." },
          { name: "note", type: "string", optional: true },
        ],
        pins: [],
      }),
    ],
  ),
];
