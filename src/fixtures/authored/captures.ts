/**
 * Hand-authored Capture pages: a fetched KEV catalog whose body the token may
 * read (the response bytes as stored, its HTTP coordinate on the envelope's
 * source), an evidence file whose read the token is refused (below
 * governed_write), a markdown runbook read from the workspace, and a fetched
 * HTML advisory carrying a script.
 */
import { defineErrorFixture, defineFixture } from "../fixture";
import { errorEnvelope } from "../envelopes";
import { captureReadBody, getBatchBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

export const FETCHED = "sha256:" + "ca".repeat(32);
export const PRIVATE = "sha256:" + "cb".repeat(32);
export const RUNBOOK = "sha256:" + "cc".repeat(32);
export const ADVISORY = "sha256:" + "cd".repeat(32);

const b64 = (text: string) => btoa(text);

const RUNBOOK_BODY = "# Triage runbook\n\nCheck the **vendor advisory** first.\n";
const ADVISORY_BODY =
  '<!doctype html><html><head><title>Advisory</title></head><body><h1>VSA-1</h1><p>Fixed in 2.4.1.</p><script>alert("x")</script></body></html>';
const KEV_BODY = JSON.stringify({ title: "CISA Catalog of Known Exploited Vulnerabilities", count: 1 });

const D = (c: string) => "sha256:" + c.repeat(64);

/** A Capture's envelope: where its external source says the bytes came from (a typed coordinate). */
function envelope(source: string, coordinateType: string, coordinate: Record<string, unknown>, length: number): Schemas["CaptureEnvelope"] {
  return {
    tag: "playbill-capture-envelope-v2",
    capture_contract_digest: D("2"),
    source: {
      tag: "playbill-external-source-reference-v1",
      kind: "external",
      source_identity: source,
      producer_binding_digest: D("3"),
      coordinate_type: coordinateType,
      coordinate,
      selector_type: "whole-response-v1",
      selector: {},
      replayability: "attested_only",
    },
    commitment: { tag: "playbill-evidence-commitment-v1", digest_kind: "exact_bytes", digest: D("4"), byte_length: length, materialization: "cas" },
    run_coordinate: {
      tag: "playbill-capture-run-coordinate-v2",
      run_kind: "procedure",
      run_id: "run-8",
      bound_generation: D("5"),
      executable_identity: { kind: "Procedure", name: "security.kev-triage" },
      executable_digest: D("6"),
    },
    producer_receipt_digest: D("7"),
    producer: { kind: "Procedure", name: "security.kev-triage" },
    producer_binding_digest: D("3"),
    observed_at: "2026-10-19T10:17:00Z",
    production_evidence: { tag: "playbill-capture-procedure-egress-evidence-v1", procedure_producer_receipt_digest: D("7") },
  };
}

function read(digest: string, body: string, captured: Schemas["CaptureEnvelope"] | null) {
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/captures/read",
    body: captureReadBody(`CAP-${digest.slice(7, 19)}`, COORDINATE),
    response: {
      tag: "playbill-capture-read-v1",
      capture_digest: digest,
      coordinate: COORDINATE,
      status: "verified",
      envelope: captured,
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

/** The Claim the fetched catalog's card samples as citing it. */
export const CITING_CLAIM = "CLM-" + "c1".repeat(16);

function citingClaim(): GetResult {
  return {
    tag: "playbill-get-result-v1",
    ref: `Claim:${CITING_CLAIM}`,
    kind: "claim",
    detail: "summary",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    card: {
      claim: CITING_CLAIM,
      subject: "security.vulnerability/cve-2024-3094",
      predicate: "kev_listed",
      predicate_full: "security.vulnerability.kev_listed",
      value: true,
      verdict: "supported",
      status: "accepted",
      revision: 1,
    },
  };
}

function card(digest: string, source: string, contract: string, size: number, citing: string[] = [], citingTotal = 0): GetResult {
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
      citing,
      citing_total: citingTotal,
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
  batch(card(FETCHED, "cisa.kev.catalog", "CaptureContract:security.fetched-v1", KEV_BODY.length, [CITING_CLAIM], 12)),
  batch(citingClaim()),
  batch(card(PRIVATE, "security.analysis.evidence", "CaptureContract:security.file-v1", 812)),
  batch(card(RUNBOOK, "repo.docs.triage-runbook.md", "CaptureContract:security.file-v1", RUNBOOK_BODY.length)),
  batch(card(ADVISORY, "vendor.advisories", "CaptureContract:security.fetched-v1", ADVISORY_BODY.length)),
  read(
    FETCHED,
    KEV_BODY,
    envelope(
      "cisa.kev.catalog",
      "http-response-v1",
      { url: "https://www.cisa.gov/kev.json", final_url: "https://www.cisa.gov/kev.json", status: 200, content_type: "application/json", headers: { etag: '"kev-1"' } },
      KEV_BODY.length,
    ),
  ),
  read(RUNBOOK, RUNBOOK_BODY, envelope("repo.docs.triage-runbook.md", "workspace-file-v1", { relative_path: "docs/triage-runbook.md" }, RUNBOOK_BODY.length)),
  read(
    ADVISORY,
    ADVISORY_BODY,
    envelope("vendor.advisories", "http-response-v1", { url: "https://vendor.example/advisories/vsa-1", status: 200, content_type: "text/html; charset=utf-8" }, ADVISORY_BODY.length),
  ),
  defineErrorFixture({
    method: "post",
    path: "/api/v1/{instance_id}/captures/read",
    body: captureReadBody(`CAP-${PRIVATE.slice(7, 19)}`, COORDINATE),
    status: 403,
    response: errorEnvelope("PermissionDeniedError", "cruxible_body_read requires governed_write; this token is read_only", "cruxible.permission.denied"),
  }),
];
