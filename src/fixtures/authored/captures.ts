/**
 * Hand-authored Capture pages: a fetched KEV catalog whose body the token may
 * read (core's web.fetch wrapper around the response), an evidence file whose
 * read the token is refused (below governed_write), a markdown runbook read
 * from the workspace, and a fetched HTML advisory carrying a script.
 */
import { defineErrorFixture, defineFixture } from "../fixture";
import { errorEnvelope } from "../envelopes";
import { captureReadBody, getBatchBody } from "@/api/requests";
import type { GetResult } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

export const FETCHED = "sha256:" + "ca".repeat(32);
export const PRIVATE = "sha256:" + "cb".repeat(32);
export const RUNBOOK = "sha256:" + "cc".repeat(32);
export const ADVISORY = "sha256:" + "cd".repeat(32);

const b64 = (text: string) => btoa(text);

const RUNBOOK_BODY = JSON.stringify({
  input_bucket: "legacy=none",
  source: { logical_source: "repo.docs.triage-runbook.md", byte_length: 64 },
  content: { kind: "text", encoding: "utf-8", text: "# Triage runbook\n\nCheck the **vendor advisory** first.\n" },
});
const ADVISORY_HTML =
  '<!doctype html><html><head><title>Advisory</title></head><body><h1>VSA-1</h1><p>Fixed in 2.4.1.</p><script>alert("x")</script></body></html>';
const ADVISORY_BODY = JSON.stringify({
  retrieved: {
    url: "https://vendor.example/advisories/vsa-1",
    status_code: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
    body_base64: b64(ADVISORY_HTML),
  },
});

function read(digest: string, body: string) {
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/captures/read",
    body: captureReadBody(`CAP-${digest.slice(7, 19)}`, COORDINATE),
    response: {
      tag: "playbill-capture-read-v1",
      capture_digest: digest,
      coordinate: COORDINATE,
      status: "verified",
      material: {
        tag: "playbill-source-dereference-result-v1",
        source_handle_digest: "sha256:" + "1".repeat(64),
        status: "verified",
        commitment_verified: true,
        material_kind: "bytes",
        body_access: { tag: "playbill-body-access-result-v1", status: "available", byte_length: body.length, body_base64: b64(body) },
        coverage: { tag: "playbill-coverage-descriptor-v1", requested_facets: ["source_material"], available_facets: ["source_material"], omitted_for_access: [], truncated_facets: [], reason_codes: [] },
      },
    },
  });
}

const KEV_BODY = JSON.stringify({ title: "CISA Catalog of Known Exploited Vulnerabilities", count: 1 });
const WRAPPED = JSON.stringify({
  derived: { engine: null, kind: "none", metadata: {}, text: null },
  input_bucket: "legacy=none",
  retrieved: {
    url: "https://www.cisa.gov/kev.json",
    final_url: "https://www.cisa.gov/kev.json",
    status_code: 200,
    headers: { "content-type": "application/json" },
    byte_count: KEV_BODY.length,
    body_sha256: "sha256:" + "0".repeat(64),
    body_base64: b64(KEV_BODY),
    source: "network",
    renderer: null,
  },
});

function card(digest: string, source: string, contract: string, size: number): GetResult {
  return {
    tag: "playbill-get-result-v1",
    ref: `Capture:${digest}`,
    kind: "capture",
    detail: "summary",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    card: {
      capture: `CAP-${digest.slice(7, 19)}`,
      digest,
      contract,
      version: 1,
      source,
      observed_at: "2026-10-19T10:17:00Z",
      size,
      access: null,
      status: "available",
      status_detail: null,
      erased: null,
      subjects: [],
      citing: [],
      citing_total: 0,
      next: [`client.read_capture(instance_id, CaptureReadRequest(capture_digest="${digest}"))`],
    },
  };
}

const batch = (result: GetResult) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([result.ref], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [result] },
  });

export default [
  batch(card(FETCHED, "cisa.kev.catalog", "CaptureContract:security.fetched-v1", WRAPPED.length)),
  batch(card(PRIVATE, "security.analysis.evidence", "CaptureContract:security.file-v1", 812)),
  batch(card(RUNBOOK, "repo.docs.triage-runbook.md", "CaptureContract:security.file-v1", RUNBOOK_BODY.length)),
  batch(card(ADVISORY, "vendor.advisories", "CaptureContract:security.fetched-v1", ADVISORY_BODY.length)),
  read(FETCHED, WRAPPED),
  read(RUNBOOK, RUNBOOK_BODY),
  read(ADVISORY, ADVISORY_BODY),
  defineErrorFixture({
    method: "post",
    path: "/api/v1/{instance_id}/captures/read",
    body: captureReadBody(`CAP-${PRIVATE.slice(7, 19)}`, COORDINATE),
    status: 403,
    response: errorEnvelope("PermissionDeniedError", "cruxible_body_read requires governed_write; this token is read_only", "cruxible.permission.denied"),
  }),
];
