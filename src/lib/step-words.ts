// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { Schemas } from "../api/schemas.ts";
import { hostOf, stepAlias, templateRef, type ProcedureSpec, type ProcedureStep } from "./definitions.ts";

/**
 * A Procedure's steps as terse labels: each step's key fields for its graph
 * node (`cisa.gov · JSON`, `/vulnerabilities/* · key cveID · 4 fields`,
 * `4 ClaimTypes → vulnerability`), its row in the steps table (what it
 * reads, returns and which fields), every field for its side panel, and a
 * run node's counts (`1,766 records · complete`). Derived from the step as
 * authored, the Line's parameters, a Query's row Contract and the run card's
 * node summaries; nothing invented. Things are named directly (`kev-catalog`,
 * `cve_id`); full ids are on hover; named things link.
 */

export interface Part {
  text: string;
  /** A typed ref the part links to (`ClaimType:…`, `CaptureContract:…`, `QueryDefinition:…`). */
  ref?: string | undefined;
  /** An outside address the part links to (a fetched URL). */
  href?: string | undefined;
  /** A name from the payload or the definition, set as code (`cveID`, `/vulnerabilities/*`). */
  code?: boolean | undefined;
  /** Hover text (a full id, a full URL). */
  title?: string | undefined;
}

export type RunSummary = NonNullable<Schemas["GetRunNode"]["summary"]>;

/** Parts as plain text. */
export const partsText = (parts: readonly Part[]) => parts.map((p) => p.text).join("");

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);

/** A name without its namespace or version (`security.kev-catalog@1` -> `kev-catalog`, `security.vulnerability` -> `vulnerability`). */
export function shortName(name: string): string {
  const bare = name.replace(/^[A-Za-z]+:/, "").replace(/@\d+$/, "");
  const dot = bare.indexOf(".");
  return dot >= 0 && dot < bare.length - 1 ? bare.slice(dot + 1) : bare;
}

/** A ClaimType's or kind's last segment (`security.vulnerability.kev_date_added` -> `kev_date_added`). */
export const lastSegment = (name: string) => name.replace(/^[A-Za-z]+:/, "").split(".").at(-1)!;

/** A JSON pointer short enough for a node: long ones keep their last two segments. */
export function pointerText(pointer: string, max = 24): string {
  if (pointer.length <= max) return pointer;
  return `…/${pointer.split("/").filter(Boolean).slice(-2).join("/")}`;
}

/** 1766 -> "1,766". */
export const count = (n: number) => n.toLocaleString("en-US");
const plural = (n: number, one: string, many: string) => `${count(n)} ${n === 1 ? one : many}`;

/** 4194304 -> "4 MB", 1536 -> "1.5 KB". */
export function bytesWords(bytes: number): string {
  if (bytes < 1024) return plural(bytes, "byte", "bytes");
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const shown = Number.isInteger(value) ? String(value) : value < 10 ? value.toFixed(1) : String(Math.round(value));
  return `${shown} ${units[unit]}`;
}

/** A template value as a Line gives it: a literal as itself, `{$ref: param}` from the parameters; unknown otherwise. */
export function resolveValue(value: unknown, parameters: Record<string, unknown> | undefined): unknown {
  const ref = templateRef(value);
  if (!ref) return value;
  if (ref.$ref === "param" && ref.path?.[0]) return parameters?.[ref.path[0]];
  return undefined;
}

/** A Query's rows: the kind they are one per, the fields a reader cares about, the row Contract. */
export interface QueryShape {
  kind: string | null;
  /** Row fields, the Subject's own id and kind columns left out. */
  fields: string[];
  /** A field's type, from the row Contract when read. */
  types: Record<string, string>;
  description: string | null;
  row: string | null;
}

const SUBJECT_COLUMNS = new Set(["subject_id", "subject_kind", "subject"]);

/** A Query's shape from its card and its row Contract's card (the definition's own field names when the Contract is not read). */
export function queryShape(
  query: Schemas["GetQueryCard"] | null | undefined,
  rowContract: Schemas["GetContractCard"] | null | undefined,
): QueryShape | null {
  if (!query) return null;
  const definition = record(query.definition);
  const kinds = Object.values(record(definition?.from) ?? {}).filter((v): v is string => typeof v === "string");
  const declared = Array.isArray(definition?.fields)
    ? definition.fields.flatMap((f) => Object.keys(record(f) ?? {}))
    : Object.keys(record(definition?.fields) ?? {});
  const names = rowContract?.fields?.map((f) => f.name) ?? declared;
  return {
    kind: kinds.length === 1 ? kinds[0]! : null,
    fields: names.filter((name) => !SUBJECT_COLUMNS.has(name)),
    types: Object.fromEntries((rowContract?.fields ?? []).map((f) => [f.name, f.type])),
    description: str(query.description) ?? str(definition?.description),
    row: str(definition?.row),
  };
}

/** What a step's labels may draw on beyond its own spec. */
export interface StepWordsContext {
  parameters?: Record<string, unknown> | undefined;
  /** The call a Line's landing feeds (its name). */
  triggerInput?: string | null | undefined;
  /** Query name -> its shape, for the Queries the page has read. */
  queries?: ReadonlyMap<string, QueryShape> | undefined;
  /** Slot -> the Provider build the Line binds. */
  bindings?: Record<string, string> | undefined;
}

const SEP: Part = { text: " · " };
const list = (items: Part[], sep = ", "): Part[] => items.flatMap((item, i) => (i === 0 ? [item] : [{ text: sep }, item]));
const joined = (groups: Part[][]): Part[] => groups.filter((g) => g.length > 0).flatMap((g, i) => (i === 0 ? g : [SEP, ...g]));

const contractPart = (name: string): Part => ({ text: shortName(name), ref: `CaptureContract:${name}`, title: `CaptureKind ${name}` });
const claimTypePart = (name: string): Part => ({ text: lastSegment(name), ref: `ClaimType:${name}`, title: `ClaimType ${name}` });
const kindPart = (name: string): Part => ({ text: lastSegment(name), ref: `SubjectKind:${name}`, title: `Subject kind ${name}` });
const queryPart = (name: string): Part => ({ text: shortName(name), ref: `QueryDefinition:${name}`, title: `Query ${name}` });
const code = (text: string, title?: string): Part => ({ text, code: true, title });

/** A call's fetch: its URL and host (through the Line's parameters), format and byte cap. */
function callInput(step: Extract<ProcedureStep, { call: string }>, ctx: StepWordsContext) {
  const input = record(step.input);
  const url = str(resolveValue(input?.url, ctx.parameters));
  const format = str(resolveValue(input?.expected_format, ctx.parameters));
  const maxBytes = resolveValue(input?.max_bytes, ctx.parameters);
  return { url, host: hostOf(url), format: format?.toUpperCase() ?? null, maxBytes: typeof maxBytes === "number" ? maxBytes : null };
}

type ExtractStep = Extract<ProcedureStep, { extract: string }>;
type ExtractField = { at: string; presence?: string | null };
/** An extract's payload paths: distinct `at`s, in declared order. */
const ats = (fields: Record<string, ExtractField> | undefined) => [...new Set(Object.values(fields ?? {}).map((f) => f.at))];

function extractShape(step: ExtractStep) {
  const keys = ats(step.key);
  return { keys, fields: ats(step.fields).filter((at) => !keys.includes(at)), countAt: step.complete_when?.count_at ?? null };
}

/** The steps a step reads from (by output name), in authored order: its `$ref: step` references. */
function stepRefs(value: unknown, out = new Set<string>()): Set<string> {
  const ref = templateRef(value);
  if (ref) {
    if (ref.$ref === "step" && ref.step) out.add(ref.step);
    return out;
  }
  if (Array.isArray(value)) for (const v of value) stepRefs(v, out);
  else if (record(value)) for (const v of Object.values(record(value)!)) stepRefs(v, out);
  return out;
}

/** The key fields of a step, for its graph node: `cisa.gov · JSON`, `watched_vulnerabilities`, `4 ClaimTypes → vulnerability`. */
export function stepBrief(spec: ProcedureSpec, index: number, ctx: StepWordsContext = {}): Part[] {
  const step = spec.steps[index];
  if (!step) return [];
  if ("call" in step) {
    const { url, host, format } = callInput(step, ctx);
    const landing = ctx.triggerInput === stepAlias(step, index);
    const source: Part = landing
      ? { text: "landing", title: "The Capture whose landing started the run" }
      : host
        ? { text: host, title: url ?? undefined }
        : { text: step.slot, title: `slot ${step.slot}` };
    return joined([[source], format ? [{ text: format }] : []]);
  }
  if ("read" in step) {
    if (step.query) return [queryPart(step.query)];
    if (step.claim_type) return [claimTypePart(step.claim_type)];
    return [];
  }
  if ("extract" in step) {
    const { keys } = extractShape(step);
    const n = Object.keys(step.fields ?? {}).length;
    return joined([
      [code(pointerText(step.records), step.records)],
      keys.length ? [{ text: "key " }, ...list(keys.map((k) => code(k)))] : [],
      n ? [{ text: plural(n, "field", "fields") }] : [],
    ]);
  }
  if ("claims" in step) {
    const types = [...new Set(step.claims.map((c) => c.type))];
    const what: Part[] = types.length === 1 ? [claimTypePart(types[0]!)] : [{ text: `${types.length} ClaimTypes`, title: types.join("\n") }];
    return [...what, { text: " → " }, kindPart(step.subject.kind)];
  }
  if ("transform" in step) {
    const fields = step.kind === "shape" ? Object.keys(record(record(step.spec)?.fields) ?? {}) : [];
    return joined([[{ text: step.kind }], fields.length ? list(fields.map((f) => code(f))) : []]);
  }
  if ("guard" in step) {
    const otherwise = step.else && "halt" in step.else ? "halt" : step.else && "goto" in step.else ? `→ ${step.else.goto}` : "refuse";
    return [{ text: `else ${otherwise}` }];
  }
  if ("halt" in step) return step.halt ? [code(step.halt)] : [];
  if ("emit" in step) return [contractPart(step.emit)];
  if ("inbox" in step) return [code(step.inbox)];
  if ("invoke" in step) return [{ text: shortName(step.invoke), ref: `Procedure:${step.invoke}`, title: `Procedure ${step.invoke}` }];
  if ("select" in step) return list(step.sources.map((s) => code(s)), " | ");
  return [];
}


/** One row of a step's side panel: a label (a word, or a name set as code and maybe linked) and its value. */
export interface DetailRow {
  label: string;
  /** The label is a name (a field, a ClaimType), set as code; `ref` links it. */
  name?: boolean | undefined;
  ref?: string | undefined;
  title?: string | undefined;
  value: Part[];
}

/** A titled group of a step's side panel (`Fetches`, `Records`, `Fields`, `ClaimTypes`). */
export interface DetailSection {
  title: string;
  rows: DetailRow[];
}

const WHEN_ABSENT: Record<string, string> = { keep: "keep", surface: "flag", mirror: "retire", inverse: "record absent" };

/** Every field of a step, in titled groups for its side panel: paths, ClaimTypes, row Contract, provider, limits. */
export function stepSections(spec: ProcedureSpec, index: number, ctx: StepWordsContext = {}): DetailSection[] {
  const step = spec.steps[index];
  if (!step) return [];
  const sections: DetailSection[] = [];
  let current: DetailSection | null = null;
  const section = (title: string) => {
    current = { title, rows: [] };
    sections.push(current);
  };
  const add = (label: string, value: Part[] | null | false | undefined, extra: Partial<DetailRow> = {}) => {
    if (value && value.length) current!.rows.push({ label, value, ...extra });
  };
  const refText = (value: unknown): Part[] | null => {
    const ref = templateRef(value);
    return ref?.$ref === "step" && ref.step ? [code([ref.step, ...(ref.path ?? [])].join("."))] : null;
  };
  if ("call" in step) {
    const { url, host, format, maxBytes } = callInput(step, ctx);
    section("Fetches");
    add("Source", ctx.triggerInput === stepAlias(step, index) ? [{ text: "landing" }] : host && url ? [{ text: host, href: url, title: url }] : null);
    add("URL", url ? [code(url)] : null);
    add("Format", format ? [{ text: format }] : null);
    add("Limit", maxBytes !== null ? [{ text: bytesWords(maxBytes), title: `${count(maxBytes)} bytes` }] : null);
    const source = str(resolveValue(record(step.input)?.logical_source, ctx.parameters));
    add("Logical source", source ? [code(source)] : null);
    section("Returns");
    add("CaptureKind", list(Object.values(step.captures ?? {}).map(contractPart)));
    section("Provider");
    add("Slot", [code(step.slot)]);
    const provider = ctx.bindings?.[step.slot];
    add("Build", provider ? [{ text: provider.split("/")[0]!, ref: `Provider:${provider}`, title: provider }] : null);
  } else if ("read" in step) {
    section("Reads");
    if (step.query) {
      const shape = ctx.queries?.get(step.query);
      add("Query", [queryPart(step.query)]);
      add("Per", shape?.kind ? [kindPart(shape.kind)] : null);
      add("Row", shape?.row ? [{ text: shortName(shape.row), ref: `Contract:${shape.row}`, title: `Contract ${shape.row}` }] : null);
      if (shape?.fields.length) {
        section("Fields");
        for (const f of shape.fields) add(f, [{ text: shape.types[f] ?? "—" }], { name: true });
      }
    }
    if (step.claim_type) add("ClaimType", [claimTypePart(step.claim_type)]);
    if (step.all) add("At most", [{ text: count(step.all) }]);
  } else if ("extract" in step) {
    const { keys, countAt } = extractShape(step);
    section("Records");
    add("From", refText(step.capture));
    add("Per", [code(step.records)]);
    add("Key", list(keys.map((k) => code(k))));
    add("Count", countAt ? [code(countAt)] : null);
    add("Header", list(ats(step.header).map((h) => code(h))));
    add("Row", [{ text: shortName(step.row), ref: `Contract:${step.row}`, title: `Contract ${step.row}` }]);
    section("Fields");
    for (const [name, field] of Object.entries(step.fields ?? {}) as [string, ExtractField][]) {
      add(name, [code(field.at), ...(field.presence === "optional" ? [{ text: " · optional" }] : [])], { name: true });
    }
  } else if ("claims" in step) {
    section("Writes on");
    add("Subject", [kindPart(step.subject.kind)]);
    add("For each", refText(step.for_each));
    add("Within", refText(step.subject.within));
    add("Expect", refText(step.expect));
    section("ClaimTypes");
    for (const claim of step.claims) {
      const absent = step.expect ? WHEN_ABSENT[claim.when_absent ?? "surface"] ?? claim.when_absent ?? "flag" : null;
      add(lastSegment(claim.type), absent ? [{ text: `absent: ${absent}`, title: `when_absent ${claim.when_absent ?? "surface"}` }] : [{ text: "—" }], {
        name: true,
        ref: `ClaimType:${claim.type}`,
        title: claim.type,
      });
    }
  } else if ("transform" in step) {
    section("Transform");
    add("Kind", [{ text: step.kind }]);
    add("Reads", list([...stepRefs(step)].map((s) => code(s))));
  } else if ("emit" in step) {
    section("Keeps");
    add("CaptureKind", [contractPart(step.emit)]);
  } else if ("invoke" in step) {
    section("Runs");
    add("Procedure", stepBrief(spec, index, ctx));
  } else if ("halt" in step) {
    section("Halts");
    add("Code", step.halt ? [code(step.halt)] : null);
  } else if ("inbox" in step) {
    section("Posts");
    add("Inbox", [code(step.inbox)]);
    add("At most", step.max_items ? [{ text: count(step.max_items) }] : null);
  } else if ("guard" in step) {
    section("Guard");
    add("Else", stepBrief(spec, index, ctx));
  }
  return sections.filter((s) => s.rows.length > 0);
}

// -- what a run's node did ----------------------------------------------------

/** A run node's counts, terse: `1 Capture`, `10 rows`, `1,766 records · complete`, `34 re-observed · 0 written`; detail on hover. */
export function summaryWords(summary: RunSummary): { text: string; title: string } {
  switch (summary.kind) {
    case "call": {
      const text = plural(summary.captures, "Capture", "Captures");
      return { text, title: [text, ...(summary.capture_digests ?? [])].join("\n") };
    }
    case "read": {
      const text = plural(summary.rows, "row", "rows");
      return { text, title: text };
    }
    case "extract": {
      const when = summary.complete_when;
      const text = [
        plural(summary.records, "record", "records"),
        summary.complete ? "complete" : "incomplete",
        summary.invalid_records > 0 ? `${count(summary.invalid_records)} invalid` : null,
        summary.duplicates > 0 ? plural(summary.duplicates, "duplicate", "duplicates") : null,
        summary.invalid_fields > 0 ? plural(summary.invalid_fields, "bad field", "bad fields") : null,
      ]
        .filter(Boolean)
        .join(" · ");
      const check = when ? `${when.count_at}: expected ${when.expected ?? "?"}, read ${when.observed ?? "?"}` : null;
      return { text, title: [text, check].filter(Boolean).join("\n") };
    }
    case "transform": {
      const { rows_in: rowsIn, rows_out: rowsOut } = summary;
      const text =
        rowsIn != null && rowsOut != null
          ? `${count(rowsIn)} → ${count(rowsOut)} rows`
          : rowsOut != null
            ? plural(rowsOut, "row", "rows")
            : rowsIn != null
              ? `${count(rowsIn)} rows → 1 value`
              : "1 value";
      return { text, title: `${summary.transform_kind}: ${text}` };
    }
    case "guard": {
      const text = summary.branch === "then" ? "passed" : "else";
      return { text, title: [`branch ${summary.branch}`, ...(summary.operands ?? []).map((o) => JSON.stringify(o))].join("\n") };
    }
    case "claims": {
      const skipped = Object.values(summary.skipped ?? {}).reduce((a, b) => a + b, 0);
      const counts = [
        summary.re_observed > 0 ? `${count(summary.re_observed)} re-observed` : null,
        `${count(summary.written)} written`,
        summary.revised > 0 ? `${count(summary.revised)} revised` : null,
        summary.inverse_written > 0 ? `${count(summary.inverse_written)} absent` : null,
        summary.retired > 0 ? `${count(summary.retired)} retired` : null,
        summary.surfaced > 0 ? `${count(summary.surfaced)} flagged` : null,
        summary.subjects_created > 0 ? `${count(summary.subjects_created)} new Subjects` : null,
        summary.downgraded > 0 ? `${count(summary.downgraded)} unknown` : null,
        summary.no_op > 0 ? `${count(summary.no_op)} no-op` : null,
        skipped > 0 ? `${count(skipped)} skipped` : null,
      ].filter((x): x is string => x !== null);
      // Only a delivery that changed state is worth its word.
      const delivery = summary.delivery === "settled" || summary.delivery === "proposed" ? [summary.delivery] : [];
      return { text: [...counts, ...delivery].join(" · "), title: [...counts, `delivery ${summary.delivery}`].join("\n") };
    }
    case "emit_capture":
    case "post_inbox": {
      const text = [`${count(summary.emitted)} ${summary.kind === "post_inbox" ? "posted" : "kept"}`, (summary.unposted ?? 0) > 0 ? `${count(summary.unposted!)} cut` : null]
        .filter(Boolean)
        .join(" · ");
      return { text, title: text };
    }
    case "halt": {
      const text = summary.reason ? `halt ${summary.reason}` : "halt";
      return { text, title: text };
    }
    case "repeat": {
      const text = plural(summary.attempts, "attempt", "attempts");
      return { text, title: text };
    }
  }
}

/**
 * What flows along a data edge in a run, when the source's summary counts it
 * and the edge carries that output (an extract's `records`, a read's or
 * transform's `rows`, a call's Captures). Null for an edge carrying anything else.
 */
export function flowWords(summary: RunSummary | null | undefined, fields: readonly string[]): string | null {
  if (!summary) return null;
  const carries = (name: string) => fields.length === 0 || fields.some((f) => f === name || f.startsWith(`${name}.`) || f.startsWith(`${name}[`));
  if (summary.kind === "extract" && carries("records")) return plural(summary.records, "record", "records");
  if (summary.kind === "read" && carries("rows")) return plural(summary.rows, "row", "rows");
  if (summary.kind === "transform" && summary.rows_out != null && carries("rows")) return plural(summary.rows_out, "row", "rows");
  if (summary.kind === "call" && summary.captures > 0) return plural(summary.captures, "Capture", "Captures");
  return null;
}

/** What a run changed: `32 written · 2 absent`, `proposed 3`, `no change`; null when no node kept a writing summary. */
export function runChangedWords(nodes: readonly Schemas["GetRunNode"][] | null | undefined): string | null {
  const summaries = (nodes ?? []).flatMap((n) => (n.summary ? [n.summary] : []));
  const claims = summaries.filter((s): s is Extract<RunSummary, { kind: "claims" }> => s.kind === "claims");
  const posts = summaries.filter((s): s is Extract<RunSummary, { emitted: number }> => s.kind === "post_inbox");
  if (claims.length === 0 && posts.length === 0) return null;
  const sum = (pick: (s: Extract<RunSummary, { kind: "claims" }>) => number) => claims.reduce((a, s) => a + pick(s), 0);
  const changes = sum((s) => s.written + s.revised + s.inverse_written + s.retired);
  const words: string[] = [];
  if (claims.some((s) => s.delivery === "proposed")) words.push(changes > 0 ? `proposed ${count(changes)}` : "proposed");
  else {
    for (const [n, word] of [
      [sum((s) => s.written), "written"],
      [sum((s) => s.revised), "revised"],
      [sum((s) => s.inverse_written), "absent"],
      [sum((s) => s.retired), "retired"],
    ] as const)
      if (n > 0) words.push(`${count(n)} ${word}`);
  }
  const posted = posts.reduce((a, s) => a + s.emitted, 0);
  if (posted > 0) words.push(`${count(posted)} posted`);
  return words.length > 0 ? words.join(" · ") : "no change";
}
