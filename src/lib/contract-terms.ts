import { publicName } from "./evidence.ts";

/**
 * What a CaptureContract IS, in plain words: its terms as the stored contract
 * states them (`get CaptureContract:<name> --detail proof`, the envelope).
 *
 * The pinned contract types `GetResult.proof` as an open object, and its
 * typed `CaptureContract` schema is the v2 artifact (components as digests),
 * while the daemon stores v3 (components as named pins). So, as with the Line
 * envelope (lib/definitions.ts), each term is read here against the values
 * core writes, with runtime checks: a term whose value is not one of them is
 * left out rather than guessed. A typed terms read on the contract card
 * would let this go (reported as a core follow-up).
 */

export type ContractShape = "http_response" | "procedure_output" | "foreign_span" | "database_snapshot" | "coordinator_self_source";
export type ContractReplay = "exact" | "attested";
export type BodyRetention = "never_materialize" | "optional" | "required_for_duration";
export type Erasure = "prohibited" | "authorized_by_rule";
export type SelectorPrivacy = "direct_allowed" | "pseudonymous_required";
export type Grade = "observed" | "derived" | "predicted";

export interface ContractTerms {
  format: string | null;
  shape: ContractShape | null;
  replay: ContractReplay | null;
  provenanceRule: string | null;
  replayPolicy: string | null;
  selectors: string[];
  maxBytes: number | null;
  maxRows: number | null;
  maxItems: number | null;
  bodyRetention: BodyRetention | null;
  /** Minimum retention in microseconds; null when the contract sets none. */
  minimumRetentionUs: number | null;
  erasure: Erasure | null;
  erasureRule: string | null;
  selectorPrivacy: SelectorPrivacy | null;
  grade: Grade | null;
  /** How a Capture's bytes are read: format, compression and the decoder's limits. */
  decoding: ContractDecoding | null;
}

export interface ContractDecoding {
  format: string;
  encoding: string | null;
  decodedBytes: number | null;
  depth: number | null;
  records: number | null;
}

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const oneOf = <T extends string>(value: unknown, allowed: readonly T[]): T | null =>
  typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : null;
const count = (value: unknown): number | null => (typeof value === "number" && Number.isInteger(value) && value > 0 ? value : null);
/** A named pin `{target: {kind, name}}` -> its name. */
const pinName = (value: unknown): string | null => {
  const name = record(record(value)?.target)?.name;
  return typeof name === "string" ? name : null;
};

export function readContractTerms(proof: unknown): ContractTerms | null {
  const envelope = record(record(proof)?.envelope);
  if (!envelope || record(envelope.identity)?.kind !== "CaptureContract") return null;
  const components = record(envelope.components);
  const budget = record(envelope.selection_budget);
  const retention = record(envelope.retention_erasure_policy);
  const minimum = record(retention?.minimum_retention);
  return {
    format: typeof envelope.artifact_format === "string" ? envelope.artifact_format : null,
    shape: oneOf(envelope.shape, ["http_response", "procedure_output", "foreign_span", "database_snapshot", "coordinator_self_source"] as const),
    replay: oneOf(envelope.replay, ["exact", "attested"] as const),
    provenanceRule: pinName(components?.provenance_rule),
    replayPolicy: pinName(components?.replay_policy),
    selectors: Array.isArray(components?.selector_schemas)
      ? components.selector_schemas.map(pinName).filter((name): name is string => name !== null)
      : [],
    maxBytes: count(budget?.max_bytes),
    maxRows: count(budget?.max_rows),
    maxItems: count(budget?.max_items),
    bodyRetention: oneOf(retention?.body_retention, ["never_materialize", "optional", "required_for_duration"] as const),
    minimumRetentionUs: minimum?.tag === "playbill-duration-v1" ? count(minimum.microseconds) : null,
    erasure: oneOf(retention?.erasure, ["prohibited", "authorized_by_rule"] as const),
    erasureRule: pinName(retention?.erasure_rule),
    selectorPrivacy: oneOf(retention?.selector_privacy, ["direct_allowed", "pseudonymous_required"] as const),
    grade: oneOf(envelope.epistemic_grade, ["observed", "derived", "predicted"] as const),
    decoding: readDecoding(envelope.decoding),
  };
}

function readDecoding(value: unknown): ContractDecoding | null {
  const decoding = record(value);
  if (!decoding || typeof decoding.format !== "string") return null;
  const limits = record(decoding.limits);
  return {
    format: decoding.format,
    encoding: typeof decoding.encoding === "string" ? decoding.encoding : null,
    decodedBytes: count(limits?.decoded_bytes),
    depth: count(limits?.depth),
    records: count(limits?.records),
  };
}

const FORMAT: Record<string, string> = { json: "JSON", csv: "CSV", text: "Text", bytes: "Raw bytes" };

/** "JSON, as received, gzip-compressed · read up to 16 MiB, 100,000 records". */
export function decodingWords(decoding: ContractDecoding): string {
  const what = FORMAT[decoding.format] ?? decoding.format;
  const packed = decoding.encoding && decoding.encoding !== "identity" ? `, ${decoding.encoding}-compressed` : "";
  const limits = [
    decoding.decodedBytes !== null ? `up to ${formatBytes(decoding.decodedBytes)}` : null,
    decoding.records !== null ? `${decoding.records.toLocaleString()} records` : null,
  ].filter(Boolean);
  return `${what}, exactly as received${packed}${limits.length ? ` · read ${limits.join(", ")}` : ""}`;
}

/** A decoding, terse: "JSON · ≤ 16 MiB · ≤ 100,000 records". */
export function formatTerse(decoding: ContractDecoding): string {
  return [
    FORMAT[decoding.format] ?? decoding.format,
    decoding.encoding && decoding.encoding !== "identity" ? decoding.encoding : null,
    decoding.decodedBytes !== null ? `≤ ${formatBytes(decoding.decodedBytes)}` : null,
    decoding.records !== null ? `≤ ${decoding.records.toLocaleString()} records` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** 16777216 -> "16 MiB". */
export function formatBytes(bytes: number): string {
  const units = ["bytes", "KiB", "MiB", "GiB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1 && value % 1024 === 0) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toLocaleString()} ${units[unit]}`;
}

/** 2592000000000 µs -> "30 days". */
export function formatDuration(microseconds: number): string {
  const seconds = microseconds / 1e6;
  const steps: [number, string][] = [
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];
  for (const [size, word] of steps) {
    if (seconds >= size && seconds % size === 0) {
      const n = seconds / size;
      return `${n} ${word}${n === 1 ? "" : "s"}`;
    }
  }
  return `${seconds} seconds`;
}

const SHAPE: Record<ContractShape, string> = {
  http_response: "A web response body",
  procedure_output: "A Procedure's output",
  foreign_span: "A span of an outside document",
  database_snapshot: "A database snapshot",
  coordinator_self_source: "A proposer's own words",
};

/** Who obtained the bytes, terse (the Obtained term). */
const OBTAINED: Record<string, string> = {
  "playbill.external.daemon-fetched-v1": "fetched by Cruxible",
  "playbill.coordinator-proposer-observed-v1": "as the proposer wrote them",
};

const SELECTOR: Record<string, string> = {
  "whole-response-v1": "kept whole",
};

export interface TermRow {
  label: string;
  words: string;
  /** The stored value the words read (hover). */
  raw: string;
  /** What the term means, for a reader new to it (an ⓘ). */
  info?: string;
}

export function termRows(terms: ContractTerms): TermRow[] {
  const rows: TermRow[] = [];
  if (terms.shape)
    rows.push({
      label: "Holds",
      words: terms.shape === "http_response" ? "web response body + URL, status, content type" : SHAPE[terms.shape],
      raw: `shape ${terms.shape}`,
    });
  if (terms.decoding) {
    const d = terms.decoding;
    rows.push({ label: "Format", words: formatTerse(d), raw: `${decodingWords(d)}\ndecoding ${d.format} · ${d.encoding ?? "identity"}${d.depth !== null ? ` · depth ${d.depth}` : ""}` });
  }
  if (terms.provenanceRule) {
    const words = OBTAINED[terms.provenanceRule];
    rows.push({
      label: "Obtained",
      words: words ?? publicName(terms.provenanceRule),
      raw: `provenance rule ${terms.provenanceRule}`,
    });
  }
  if (terms.replay) {
    rows.push({
      label: "Replay",
      words: terms.replay,
      info:
        terms.replay === "exact"
          ? "Exact: what a Claim cites can be re-derived byte for byte from what is kept."
          : "Attested: what a Claim cites rests on the recorded fetch.",
      raw: `replay ${terms.replay}${terms.replayPolicy ? ` · ${terms.replayPolicy}` : ""}`,
    });
  }
  const selection = [
    ...terms.selectors.map((s) => SELECTOR[s] ?? s),
    terms.maxBytes !== null ? `≤ ${formatBytes(terms.maxBytes)}` : null,
    terms.maxItems !== null && terms.maxItems > 1 ? `≤ ${terms.maxItems.toLocaleString()} items` : null,
    terms.maxRows !== null && terms.maxRows > 1 ? `≤ ${terms.maxRows.toLocaleString()} rows` : null,
  ].filter((part): part is string => part !== null);
  if (selection.length > 0) {
    rows.push({
      label: "Size",
      words: selection.join(" · "),
      raw: `selection budget: max_bytes ${terms.maxBytes ?? "—"}, max_rows ${terms.maxRows ?? "—"}, max_items ${terms.maxItems ?? "—"}${terms.selectors.length ? ` · selectors ${terms.selectors.join(", ")}` : ""}`,
    });
  }
  if (terms.bodyRetention) {
    rows.push({
      label: "Kept",
      words:
        terms.bodyRetention === "never_materialize"
          ? "The body is never stored"
          : terms.bodyRetention === "optional"
            ? "The body may be kept"
            : terms.minimumRetentionUs !== null
              ? `≥ ${formatDuration(terms.minimumRetentionUs)}`
              : "The body is kept",
      raw: `body retention ${terms.bodyRetention}${terms.minimumRetentionUs !== null ? ` · minimum ${terms.minimumRetentionUs} µs` : ""}`,
    });
  }
  if (terms.erasure) {
    rows.push({
      label: "Erasure",
      words: terms.erasure === "prohibited" ? "never" : `Erasable under ${terms.erasureRule ? publicName(terms.erasureRule) : "its erasure rule"}`,
      raw: `erasure ${terms.erasure}${terms.erasureRule ? ` · ${terms.erasureRule}` : ""}`,
    });
  }
  if (terms.selectorPrivacy) {
    rows.push({
      label: "Selectors",
      words: terms.selectorPrivacy === "direct_allowed" ? "direct" : "pseudonymous",
      info: terms.selectorPrivacy === "direct_allowed" ? "A selector may name what was read directly." : "A selector must be pseudonymous.",
      raw: `selector privacy ${terms.selectorPrivacy}`,
    });
  }
  if (terms.grade) rows.push({ label: "Grade", words: terms.grade[0]!.toUpperCase() + terms.grade.slice(1), raw: `epistemic grade ${terms.grade}` });
  return rows;
}
