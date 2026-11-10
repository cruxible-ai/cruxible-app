/**
 * Hand-authored Docs: the orient documents section, the Documents' cards
 * (revision, size) through get-batch, and each body through get
 * detail="body" by range. One of each format the reader shows (markdown,
 * HTML carrying a script, JSON, plain text, binary), a log larger than one
 * range whose boundary splits a character (so both ranges come back as
 * base64), and a body the token is refused (below governed_write).
 */
import { defineErrorFixture, defineFixture } from "../fixture";
import { errorEnvelope } from "../envelopes";
import { DOCUMENT_RANGE_BYTES, documentBodyRange, getBatchBody, orientQuery } from "@/api/requests";
import type { GetResult } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

interface Doc {
  name: string;
  title: string;
  kind: string;
  media: string;
  revision: number;
  bytes: Uint8Array;
}

const utf8 = (text: string) => new TextEncoder().encode(text);

export const ARCHITECTURE_MD = `# Triage architecture

Findings land as **Captures**, then a Line settles them.

- KEV listings
- Vendor advisories

| Stage | Owner |
|---|---|
| Land | Lines |

See cruxible://Line:kev-triage for the settle loop.
`;

export const ADVISORY_HTML =
  '<!doctype html><html><head><title>VSA-1</title><script>parent.alert(1)</script></head><body onload="alert(2)"><h1>Advisory VSA-1</h1><p>Fixed in 2.4.1.</p></body></html>';

/** A log one byte past one range plus a split "é": both ranges are invalid UTF-8 alone. */
export const RELEASE_LOG = "a".repeat(DOCUMENT_RANGE_BYTES - 1) + "é" + "tail\n";

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0x00]);

/** A kit install's receipt (core KitReceipt), listed first as a kit's is: the Docs page opens past it. */
export const KIT_RECEIPT = {
  tag: "playbill-kit-receipt-v1",
  kit_id: "security",
  version: "1.3.0",
  content_digest: "sha256:" + "f1".repeat(32),
  owns: ["security."],
  artifacts: [
    { path: "claim-types/security.vulnerability/cve_id.json", release_digest: "sha256:" + "a1".repeat(32), installed_digest: "sha256:" + "a1".repeat(32), content_digest: "sha256:" + "c1".repeat(32) },
    { path: "queries/security.kev_exposure.json", release_digest: "sha256:" + "a2".repeat(32), installed_digest: "sha256:" + "b2".repeat(32) },
  ],
  carried: [{ path: "capture-contracts/playbill.self-source-v1.json", release_digest: "sha256:" + "a3".repeat(32), installed_digest: "sha256:" + "a3".repeat(32) }],
  kept: [],
  source: "security",
};

export const DOCS: Doc[] = [
  { name: "kit-security", title: "Kit security 1.3.0", kind: "kit_receipt", media: "application/json", revision: 1, bytes: utf8(JSON.stringify(KIT_RECEIPT)) },
  { name: "architecture", title: "Triage architecture", kind: "design", media: "text/markdown", revision: 3, bytes: utf8(ARCHITECTURE_MD) },
  { name: "kev-thresholds", title: "KEV thresholds", kind: "reference", media: "application/json", revision: 1, bytes: utf8('{"max_age_days":30,"severity":["high","critical"]}') },
  { name: "network-diagram", title: "Network diagram", kind: "reference", media: "image/png", revision: 1, bytes: PNG },
  { name: "release-log", title: "Release log", kind: "log", media: "text/plain", revision: 12, bytes: utf8(RELEASE_LOG) },
  { name: "security-board-minutes", title: "Security board minutes", kind: "minutes", media: "text/markdown", revision: 2, bytes: utf8("# Private\n") },
  { name: "vendor-advisory", title: "Vendor advisory VSA-1", kind: "advisory", media: "text/html", revision: 1, bytes: utf8(ADVISORY_HTML) },
];

/** The Document whose body this token may not read. */
export const PRIVATE_DOC = "security-board-minutes";

function base64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function text(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

const result = (doc: Doc, extra: Partial<GetResult>): GetResult => ({
  tag: "playbill-get-result-v1",
  ref: `Document:${doc.name}`,
  kind: "document",
  detail: "summary",
  coordinate: AT,
  accepted_coordinate: COORDINATE,
  evaluation_time: NOW,
  ...extra,
});

/** One range of a body, as get detail="body" answers it: text when the range decodes, base64 otherwise. */
function range(doc: Doc, start: number) {
  const end = Math.min(start + DOCUMENT_RANGE_BYTES, doc.bytes.length);
  const chunk = doc.bytes.slice(start, end);
  const decoded = text(chunk);
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: documentBodyRange(doc.name, COORDINATE, start),
    response: result(doc, {
      detail: "body",
      body: {
        document: doc.name,
        media_type: doc.media,
        size: doc.bytes.length,
        body_digest: "sha256:" + "d".repeat(64),
        ...(doc.bytes.length > 0 ? { range: { start, end } } : {}),
        ...(decoded !== null ? { text: decoded } : { content_base64: base64(chunk) }),
      },
    }),
  });
}

function ranges(doc: Doc) {
  const out = [];
  for (let start = 0; start === 0 || start < doc.bytes.length; start += DOCUMENT_RANGE_BYTES) out.push(range(doc, start));
  return out;
}

export default [
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "documents", limit: 500 }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "documents",
      documents: DOCS.map((doc) => ({ name: doc.name, title: doc.title, document_kind: doc.kind, media_type: doc.media })),
    },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(DOCS.map((doc) => `Document:${doc.name}`), COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: DOCS.map((doc) =>
        result(doc, {
          card: {
            document: doc.name,
            title: doc.title,
            document_kind: doc.kind,
            media_type: doc.media,
            size: doc.bytes.length,
            revision: doc.revision,
            next: [`client.get(instance_id, GetRequest(ref="Document:${doc.name}", detail="body"))`],
          },
        }),
      ),
    },
  }),
  ...DOCS.filter((doc) => doc.name !== PRIVATE_DOC).flatMap(ranges),
  defineErrorFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: documentBodyRange(PRIVATE_DOC, COORDINATE, 0),
    status: 403,
    response: errorEnvelope("PermissionDeniedError", "cruxible_body_read requires governed_write; this token is read_only", "cruxible.permission.denied"),
  }),
];
