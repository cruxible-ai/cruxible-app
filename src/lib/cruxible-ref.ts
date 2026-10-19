import type { GetRefKind } from "../api/schemas.ts";

/**
 * The reference grammar the daemon's `get` resolves, plus the inbox item id,
 * parsed into typed coordinates. A ref is DATA: an address into accepted
 * state, never behavior. Anything the grammar doesn't recognize parses to
 * null and renders as inert code text.
 *
 *   security.vulnerability/cve-2024-3094   a Subject (kind/id)
 *   Subject:security.vulnerability/cve-…   the same, typed
 *   subjects/<kind>/<id>.json              the same, as its artifact path
 *   claims/<xx>/CLM-….json                 a Claim, as its artifact path
 *   CLM-…  CAP-…  RUN-…  INB-…             a Claim, Capture, run, inbox item
 *   ClaimType:<predicate>  Line:<name>  Procedure:<name>  Mandate:<name> …
 *   Proposal:<id>  sha256:…  refs/…        a proposal
 *
 * In agent prose the same refs are written with the cruxible:// scheme:
 * cruxible://security.vulnerability/cve-2024-3094, cruxible://CLM-…,
 * cruxible://Line:kev-triage.
 */

type IdRefKind = "claim" | "capture" | "procedure_run" | "proposal";
/** Every get kind addressed by a typed `Prefix:name` ref. */
export type NamedRefKind = Exclude<GetRefKind, IdRefKind | "subject">;

export type ParsedRef =
  | { kind: "subject"; subjectKind: string; subjectId: string }
  | { kind: IdRefKind; id: string }
  | { kind: "inbox"; id: string }
  | { kind: NamedRefKind; name: string };

/** Typed prefixes get accepts (core service/discovery/get.py _TYPED_PREFIXES). */
const TYPED_PREFIXES: Readonly<Record<string, GetRefKind>> = {
  Claim: "claim",
  Subject: "subject",
  ClaimType: "claim_type",
  Document: "document",
  document: "document",
  Procedure: "procedure",
  Blueprint: "blueprint",
  QueryDefinition: "query",
  query: "query",
  CaptureContract: "capture_contract",
  Trigger: "trigger",
  SubjectKind: "subject_kind",
  Proposal: "proposal",
  Line: "line",
  Capture: "capture",
  ResolutionContract: "resolution_contract",
  Mandate: "mandate",
  ProcedureMandate: "mandate",
  ProcedureRun: "procedure_run",
  Principal: "principal",
  ApprovalPolicy: "approval_policy",
  ProcedureRuntimePolicy: "procedure_runtime_policy",
  SourceAcquisitionPolicy: "source_acquisition_policy",
  ProviderInterface: "provider_interface",
  Provider: "provider",
};

/** The prefix get prints for each named kind (core _DISPLAY_PREFIX). */
export const DISPLAY_PREFIX: Readonly<Record<NamedRefKind, string>> = {
  claim_type: "ClaimType",
  document: "Document",
  procedure: "Procedure",
  blueprint: "Blueprint",
  query: "query",
  capture_contract: "CaptureContract",
  trigger: "Trigger",
  subject_kind: "SubjectKind",
  line: "Line",
  resolution_contract: "ResolutionContract",
  mandate: "Mandate",
  principal: "Principal",
  approval_policy: "ApprovalPolicy",
  procedure_runtime_policy: "ProcedureRuntimePolicy",
  source_acquisition_policy: "SourceAcquisitionPolicy",
  provider_interface: "ProviderInterface",
  provider: "Provider",
};

// Subject kind and id grammar (cruxible_client contracts/subjects.py).
const SUBJECT_KIND_RE = /^[a-z][a-z0-9_]{0,63}(?:\.[a-z][a-z0-9_]{0,63})*$/;
const SUBJECT_ID_RE = /^[a-z][a-z0-9_.-]{0,255}$/;

function subjectRef(value: string): ParsedRef | null {
  const slash = value.indexOf("/");
  if (slash < 0) return null;
  const subjectKind = value.slice(0, slash);
  const subjectId = value.slice(slash + 1);
  if (!SUBJECT_KIND_RE.test(subjectKind) || !SUBJECT_ID_RE.test(subjectId)) return null;
  return { kind: "subject", subjectKind, subjectId };
}

function typedRef(kind: GetRefKind, rest: string): ParsedRef | null {
  if (rest === "") return null;
  switch (kind) {
    case "subject":
      return subjectRef(rest);
    case "claim":
    case "capture":
    case "procedure_run":
    case "proposal":
      return { kind, id: rest };
    default:
      return { kind, name: rest };
  }
}

/** Parse one ref as get accepts it; null for anything else. */
export function parseRef(raw: string): ParsedRef | null {
  const value = raw.trim();
  if (value === "") return null;
  if (value.startsWith("sha256:") || value.startsWith("refs/")) {
    return { kind: "proposal", id: value };
  }
  if (value.startsWith("CLM-")) return { kind: "claim", id: value };
  if (value.startsWith("CAP-")) return { kind: "capture", id: value };
  if (value.startsWith("RUN-")) return { kind: "procedure_run", id: value };
  if (value.startsWith("INB-")) return { kind: "inbox", id: value };
  const colon = value.indexOf(":");
  if (colon > 0) {
    const kind = TYPED_PREFIXES[value.slice(0, colon)];
    return kind ? typedRef(kind, value.slice(colon + 1)) : null;
  }
  const claimPath = /^claims\/[0-9a-f]{2}\/(CLM-[0-9a-f]+)\.json$/.exec(value);
  if (claimPath) return { kind: "claim", id: claimPath[1]! };
  if (value.startsWith("subjects/") && value.endsWith(".json")) {
    return subjectRef(value.slice("subjects/".length, -".json".length));
  }
  return subjectRef(value);
}

/** The canonical string for a parsed ref (what get takes, and what the UI shows). */
export function formatRef(ref: ParsedRef): string {
  switch (ref.kind) {
    case "subject":
      return `${ref.subjectKind}/${ref.subjectId}`;
    case "claim":
    case "inbox":
      return ref.id;
    case "capture":
      return ref.id.startsWith("CAP-") ? ref.id : `Capture:${ref.id}`;
    case "procedure_run":
      return ref.id.startsWith("RUN-") ? ref.id : `ProcedureRun:${ref.id}`;
    case "proposal":
      return ref.id.startsWith("sha256:") || ref.id.startsWith("refs/")
        ? ref.id
        : `Proposal:${ref.id}`;
    default:
      return `${DISPLAY_PREFIX[ref.kind]}:${ref.name}`;
  }
}

/** The ref to pass to get, or null for an inbox item (read through GET /inbox/{id}). */
export function getRefOf(ref: ParsedRef): string | null {
  return ref.kind === "inbox" ? null : formatRef(ref);
}

/** Short human label for a ref's kind ("Subject", "Claim", "Line", ...). */
export function refKindLabel(ref: ParsedRef): string {
  switch (ref.kind) {
    case "subject":
      return ref.subjectKind;
    case "claim":
      return "Claim";
    case "capture":
      return "Capture";
    case "procedure_run":
      return "Run";
    case "proposal":
      return "Proposal";
    case "inbox":
      return "Inbox";
    default:
      return DISPLAY_PREFIX[ref.kind];
  }
}

/** The name part a chip shows for a ref (the Subject id, the Line name, ...). */
export function refName(ref: ParsedRef): string {
  if (ref.kind === "subject") return ref.subjectId;
  return "id" in ref ? ref.id : ref.name;
}

/**
 * The in-app route a ref opens, or null when the console has no screen for
 * it. ClaimTypes and SubjectKinds open on the type map, Subjects on their
 * Subject page, proposals on their review page; every other ref get resolves
 * opens the reference card.
 */
export function refRoute(instanceId: string, ref: ParsedRef): string | null {
  const base = `/i/${encodeURIComponent(instanceId)}`;
  if (ref.kind === "claim_type") return `${base}/map?claim_type=${encodeURIComponent(ref.name)}`;
  if (ref.kind === "subject_kind") return `${base}/map?kind=${encodeURIComponent(ref.name)}`;
  if (ref.kind === "subject") return `${base}/s/${encodeURIComponent(formatRef(ref))}`;
  if (ref.kind === "proposal") return `${base}/p/${encodeURIComponent(ref.id)}`;
  const getRef = getRefOf(ref);
  return getRef === null ? null : `${base}/ref/${encodeURIComponent(getRef)}`;
}

// -- the cruxible:// scheme in prose ------------------------------------------

export const CRUXIBLE_SCHEME = "cruxible://";

/** Parse a cruxible:// URL's ref; null for other URLs and unknown refs. */
export function parseCruxibleUrl(url: string): ParsedRef | null {
  if (!url.startsWith(CRUXIBLE_SCHEME)) return null;
  let value: string;
  try {
    value = decodeURIComponent(url.slice(CRUXIBLE_SCHEME.length));
  } catch {
    return null; // malformed percent-encoding
  }
  return parseRef(value);
}

/**
 * Bare-ref matcher for prose text nodes. Excludes whitespace, quote/bracket
 * delimiters, and angle brackets; sentence punctuation the match swallows is
 * trimmed by trimTrailingPunctuation so "…cruxible://CLM-1." refs work.
 */
export const CRUXIBLE_REF_RE = /cruxible:\/\/[^\s<>"'()[\]]+/g;

export function trimTrailingPunctuation(match: string): string {
  return match.replace(/[.,;:!?]+$/, "");
}
