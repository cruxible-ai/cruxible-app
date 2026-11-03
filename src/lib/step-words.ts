// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { Schemas } from "../api/schemas.ts";
import { hostOf, stepAlias, stepId, templateRef, type ProcedureSpec, type ProcedureStep } from "./definitions.ts";

/**
 * What each step of a Procedure does, and what a run's node did, in plain
 * words for someone who does not read Procedures: derived from the step as
 * authored (and the Line's parameters, and a Query's row Contract when the
 * page has read it) and from the run card's per-node `summary`. Nothing is
 * invented: a step whose spec says too little reads as its kind's short
 * phrase, and a node with no summary has no run words.
 *
 * Words come as parts so a page can link the named things (a part's `ref` is
 * a typed cruxible ref) and set names a reader may copy as code; `title` is
 * the whole phrase with the internal names, for hover.
 */

export interface Part {
  text: string;
  /** A typed ref the part links to (`ClaimType:…`, `CaptureContract:…`, `QueryDefinition:…`). */
  ref?: string | undefined;
  /** A name from the payload or the definition, set as code (`cveID`, `/vulnerabilities/*`). */
  code?: boolean | undefined;
  /** Hover text for this part alone (a full URL, a full name). */
  title?: string | undefined;
}

export interface Phrase {
  parts: Part[];
  /** The whole phrase in words, with the internal names a hover may show. */
  title: string;
}

export type RunSummary = NonNullable<Schemas["GetRunNode"]["summary"]>;

/** A phrase's text, its parts joined. */
export const phraseText = (phrase: Phrase) => phrase.parts.map((p) => p.text).join("");

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);

/** A dotted name in words: its namespace dropped, separators as spaces (`security.watched_vulnerabilities` -> `watched vulnerabilities`). */
export function nameWords(name: string): string {
  const bare = name.replace(/@\d+$/, "");
  const dot = bare.indexOf(".");
  const tail = dot >= 0 && dot < bare.length - 1 ? bare.slice(dot + 1) : bare;
  return tail.replace(/[._-]+/g, " ").trim();
}

/** A ClaimType's short name: its last segment (`security.vulnerability.kev_date_added` -> `kev_date_added`). */
export const claimTypeShort = (predicate: string) => predicate.replace(/^ClaimType:/, "").split(".").at(-1)!;

/** A JSON pointer short enough to read on a node: long ones keep their last two segments. */
export function pointerText(pointer: string, max = 24): string {
  if (pointer.length <= max) return pointer;
  const segments = pointer.split("/").filter(Boolean);
  return `…/${segments.slice(-2).join("/")}`;
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

/** A template value with what a Line gives it: a literal as itself, `{$ref: param}` from the parameters; anything else is unknown here. */
export function resolveValue(value: unknown, parameters: Record<string, unknown> | undefined): unknown {
  const ref = templateRef(value);
  if (!ref) return value;
  if (ref.$ref === "param" && ref.path?.[0]) return parameters?.[ref.path[0]];
  return undefined;
}

/** A Query's result rows, as a read step needs them in words. */
export interface QueryShape {
  /** The Subject kind its rows are one per (`security.vulnerability`), when it reads from one kind. */
  kind: string | null;
  /** The row fields a reader cares about (the Subject's own id and kind columns left out). */
  fields: string[];
  description: string | null;
  /** The row Contract (`security.watched-vulnerability@1`). */
  row: string | null;
}

/** Row fields that only identify the row's Subject; "one row per vulnerability" already says so. */
const SUBJECT_COLUMNS = new Set(["subject_id", "subject_kind", "subject"]);

/**
 * A Query's shape from its card (`definition.row`, `definition.from`) and its
 * row Contract's card (`fields`); the definition's own field names when the
 * Contract is not read.
 */
export function queryShape(
  query: Schemas["GetQueryCard"] | null | undefined,
  rowContract: Schemas["GetContractCard"] | null | undefined,
): QueryShape | null {
  if (!query) return null;
  const definition = record(query.definition);
  const from = record(definition?.from);
  const kinds = Object.values(from ?? {}).filter((v): v is string => typeof v === "string");
  const declared = Array.isArray(definition?.fields)
    ? definition.fields.flatMap((f) => Object.keys(record(f) ?? {}))
    : Object.keys(record(definition?.fields) ?? {});
  const names = rowContract?.fields?.map((f) => f.name) ?? declared;
  return {
    kind: kinds.length === 1 ? kinds[0]! : null,
    fields: names.filter((name) => !SUBJECT_COLUMNS.has(name)),
    description: str(query.description) ?? str(definition?.description),
    row: str(definition?.row),
  };
}

/** What a step's words may draw on beyond its own spec. */
export interface StepWordsContext {
  /** The Line's parameter values (a `{$ref: param}` URL resolves through them). */
  parameters?: Record<string, unknown> | undefined;
  /** The call a Line's landing feeds (its name). */
  triggerInput?: string | null | undefined;
  /** Query name -> its shape, for the Queries the page has read. */
  queries?: ReadonlyMap<string, QueryShape> | undefined;
  /** Node id -> a picked run's summary for it. */
  summaries?: ReadonlyMap<string, RunSummary> | undefined;
}

const joinParts = (items: Part[], sep = ", "): Part[] => items.flatMap((item, i) => (i === 0 ? [item] : [{ text: sep }, item]));

const phrase = (parts: Part[], title?: string): Phrase => ({ parts, title: title ?? parts.map((p) => p.text).join("") });

/** The read step another step references by name, for its words ("the watched vulnerabilities"). */
function stepNamed(spec: ProcedureSpec, name: string): { step: ProcedureStep; id: string } | null {
  for (const [index, step] of spec.steps.entries()) {
    const id = stepId(step, index);
    if (stepAlias(step, index) === name || id === name) return { step, id };
  }
  return null;
}

/** What a read step reads, in words: its Query's name ("the watched vulnerabilities"), or the ClaimType it reads. */
function readWords(step: ProcedureStep): string | null {
  if (!("read" in step)) return null;
  if (step.query) return `the ${nameWords(step.query)}`;
  if (step.claim_type) return `its ${claimTypeShort(step.claim_type)}`;
  return null;
}

const WHEN_ABSENT: Record<string, string> = {
  keep: "kept as it is",
  surface: "flagged for review",
  mirror: "retired",
  inverse: "recorded absent",
};

const TRANSFORM: Record<string, string> = {
  shape: "Reshapes each row",
  filter: "Keeps only the rows that match",
  join: "Joins two lists on a key",
  aggregate: "Sums a list up into one value",
  dedupe: "Drops duplicate rows",
  union: "Combines lists into one",
  derive: "Computes one value",
};

/**
 * What one step is for, in plain words, from its authored spec: a call's
 * host and what it returns, a read's Query and its rows, an extract's
 * expected payload, the ClaimTypes a claims step writes and whether it
 * watches for drop-outs, a short phrase for the rest.
 */
export function stepPurpose(spec: ProcedureSpec, index: number, ctx: StepWordsContext = {}): Phrase | null {
  const step = spec.steps[index];
  if (!step) return null;
  const alias = stepAlias(step, index);

  if ("call" in step) {
    const input = record(step.input);
    const url = str(resolveValue(input?.url, ctx.parameters));
    const host = hostOf(url);
    const format = str(resolveValue(input?.expected_format, ctx.parameters));
    const contracts = Object.values(step.captures ?? {});
    const parts: Part[] =
      ctx.triggerInput && ctx.triggerInput === alias
        ? [{ text: "Reads the Capture that landed" }]
        : host
          ? [{ text: "Fetches " }, { text: host, title: url ?? undefined }]
          : [{ text: `Asks its ${step.slot} Provider` }];
    if (contracts.length > 0) {
      const kept = joinParts(contracts.map((c) => ({ text: `the ${nameWords(c)}`, ref: `CaptureContract:${c}`, title: `CaptureKind ${c}` })), " and ");
      parts.push({ text: ", returns " }, ...(format ? [{ text: `${format.toUpperCase()} (` }, ...kept, { text: ")" }] : kept));
    }
    const title = [
      url ? `Fetches ${url}` : `Calls slot ${step.slot}`,
      contracts.length ? `kept as ${contracts.map((c) => `CaptureKind ${c}`).join(", ")}` : null,
      format ? `expects ${format.toUpperCase()}` : null,
    ]
      .filter(Boolean)
      .join("; ");
    return phrase(parts, title);
  }

  if ("read" in step) {
    if (step.query) {
      const shape = ctx.queries?.get(step.query) ?? null;
      const parts: Part[] = [{ text: "Reads " }, { text: `the ${nameWords(step.query)}`, ref: `QueryDefinition:${step.query}`, title: `Query ${step.query}` }];
      if (shape) {
        parts.push({ text: ` — one row per ${shape.kind ? nameWords(shape.kind) : "result"}` });
        if (shape.fields.length > 0) parts.push({ text: " with " }, ...joinParts(shape.fields.map((f) => ({ text: f, code: true }))));
      }
      const title = [
        `${phraseText(phrase(parts))}`,
        `Query ${step.query}${shape?.description ? `: ${shape.description}` : ""}`,
        shape?.row ? `Rows typed by ${shape.row}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      return phrase(parts, title);
    }
    if (step.claim_type) {
      const parts: Part[] = [
        { text: step.all ? `Reads up to ${count(step.all)} of its ` : "Reads its " },
        { text: claimTypeShort(step.claim_type), ref: `ClaimType:${step.claim_type}`, title: `ClaimType ${step.claim_type}` },
      ];
      return phrase(parts, `${phraseText(phrase(parts))}\nClaimType ${step.claim_type}`);
    }
    return phrase([{ text: "Reads accepted state" }]);
  }

  if ("extract" in step) {
    const ats = (fields: Record<string, { at: string; presence?: string | null }> | undefined) => [
      ...new Map(Object.values(fields ?? {}).map((f) => [f.at, f.presence === "optional"])).entries(),
    ];
    const keys = ats(step.key);
    const fields = ats(step.fields).filter(([at]) => !keys.some(([k]) => k === at));
    const header = ats(step.header);
    const countAt = step.complete_when?.count_at ?? null;
    const parts: Part[] = [{ text: "One record per " }, { text: pointerText(step.records), code: true, title: step.records }];
    if (countAt) parts.push({ text: ", as many as " }, { text: pointerText(countAt), code: true, title: countAt }, { text: " says" });
    if (keys.length > 0) parts.push({ text: ", keyed by " }, ...joinParts(keys.map(([at]) => ({ text: at, code: true }))));
    if (fields.length > 0) parts.push({ text: ", with " }, ...joinParts(fields.map(([at]) => ({ text: at, code: true }))));
    const list = (items: [string, boolean][]) => items.map(([at, optional]) => (optional ? `${at} (optional)` : at)).join(", ");
    const title = [
      `Expects one record per ${step.records}${keys.length ? `, keyed by ${list(keys)}` : ""}${fields.length ? `, with ${list(fields)}` : ""}.`,
      countAt ? `Complete only when the count at ${countAt} matches the records read.` : null,
      header.length ? `Once per payload: ${list(header)}.` : null,
      `Records typed by ${step.row}.`,
    ]
      .filter(Boolean)
      .join("\n");
    return phrase(parts, title);
  }

  if ("claims" in step) {
    const types = [...new Set(step.claims.map((c) => c.type))];
    const parts: Part[] = [
      { text: "Writes " },
      ...joinParts(types.map((t) => ({ text: claimTypeShort(t), ref: `ClaimType:${t}`, title: `ClaimType ${t}` }))),
      { text: " → " },
      { text: nameWords(step.subject.kind), ref: `SubjectKind:${step.subject.kind}`, title: `Subject kind ${step.subject.kind}` },
    ];
    const lines = [`Writes ${types.map(claimTypeShort).join(", ")} on each ${nameWords(step.subject.kind)}.`];
    const within = templateRef(step.subject.within);
    const withinStep = within?.$ref === "step" && within.step ? stepNamed(spec, within.step) : null;
    if (withinStep) lines.push(`Only for ${readWords(withinStep.step) ?? `the rows of ${within!.step}`}.`);
    const expect = templateRef(step.expect);
    const expected = expect?.$ref === "step" && expect.step ? stepNamed(spec, expect.step) : null;
    if (expect) {
      const read = expected ? ctx.summaries?.get(expected.id) : undefined;
      const n = read?.kind === "read" ? read.rows : null;
      const whom = n !== null ? count(n) : expected ? (readWords(expected.step) ?? "the expected ones") : "the expected ones";
      parts.push({ text: `; watches ${whom} for removal` });
      const absent = new Map<string, string[]>();
      for (const claim of step.claims) {
        const word = WHEN_ABSENT[claim.when_absent ?? "surface"] ?? claim.when_absent ?? "surface";
        absent.set(word, [...(absent.get(word) ?? []), claimTypeShort(claim.type)]);
      }
      const what = [...absent.entries()].map(([word, names]) => `${names.join(", ")} ${word}`).join("; ");
      lines.push(`When one of ${expected ? (readWords(expected.step) ?? "them") : "them"} drops out of the source: ${what}.`);
    }
    lines.push(...types.map((t) => `ClaimType ${t}`));
    return phrase(parts, lines.join("\n"));
  }

  if ("transform" in step) {
    const spec = record(step.spec);
    if (step.kind === "shape") {
      const fields = Object.keys(record(spec?.fields) ?? {});
      if (fields.length > 0) return phrase([{ text: "Keeps " }, ...joinParts(fields.map((f) => ({ text: f, code: true }))), { text: " of each row" }]);
    }
    return phrase([{ text: TRANSFORM[step.kind] ?? "Reshapes items" }]);
  }
  if ("guard" in step) {
    const otherwise = step.else && "halt" in step.else ? "else stops" : step.else && "goto" in step.else ? `else goes to ${step.else.goto}` : "else refuses";
    return phrase([{ text: `Goes on only if its condition holds; ${otherwise}` }]);
  }
  if ("halt" in step) return phrase([{ text: "Stops the run here" }]);
  if ("emit" in step) {
    return phrase([{ text: "Keeps the run's output as " }, { text: `the ${nameWords(step.emit)}`, ref: `CaptureContract:${step.emit}`, title: `CaptureKind ${step.emit}` }]);
  }
  if ("inbox" in step) return phrase([{ text: `Posts ${step.for_each ? "an item for each" : "an item"} to the Line's inbox` }]);
  if ("invoke" in step) return phrase([{ text: "Runs " }, { text: step.invoke, ref: `Procedure:${step.invoke}`, code: true, title: `Procedure ${step.invoke}` }]);
  if ("project" in step) return phrase([{ text: "Builds one record from earlier steps" }]);
  if ("select" in step) return phrase([{ text: "Takes the first of " }, ...joinParts(step.sources.map((s) => ({ text: s, code: true })), " or ")]);
  if ("repeat" in step) return phrase([{ text: "Repeats until its condition holds" }]);
  return null;
}

// -- what a run's node did ----------------------------------------------------

const DELIVERY: Record<string, string> = {
  settled: "settled",
  proposed: "proposed for review",
  still_current: "still current",
  unchanged: "nothing changed",
  empty: "nothing to write",
  delivered: "delivered",
};

/** The changes a claims summary made, in words, nonzero counts only (`written` always). */
function claimCounts(s: Extract<RunSummary, { kind: "claims" }>): string[] {
  const skipped = Object.values(s.skipped ?? {}).reduce((a, b) => a + b, 0);
  return [
    s.re_observed > 0 ? `${count(s.re_observed)} re-observed` : null,
    `${count(s.written)} written`,
    s.revised > 0 ? `${count(s.revised)} revised` : null,
    s.inverse_written > 0 ? `${count(s.inverse_written)} recorded absent` : null,
    s.retired > 0 ? `${count(s.retired)} retired` : null,
    s.surfaced > 0 ? `${count(s.surfaced)} flagged for review` : null,
    s.subjects_created > 0 ? `${plural(s.subjects_created, "new Subject", "new Subjects")}` : null,
    s.downgraded > 0 ? `${count(s.downgraded)} unknown` : null,
    s.no_op > 0 ? `${count(s.no_op)} restated` : null,
    skipped > 0 ? `${count(skipped)} skipped` : null,
  ].filter((x): x is string => x !== null);
}

/**
 * A run node's summary in words ("1,766 records · complete", "10 watched
 * vulnerabilities", "34 re-observed · 0 written · nothing changed"), with
 * the detail on hover. `rowsNoun` names a read's rows (its Query in words).
 */
export function summaryWords(summary: RunSummary, rowsNoun?: string | null): { text: string; title: string } {
  switch (summary.kind) {
    case "call": {
      const text = plural(summary.captures, "Capture", "Captures");
      return { text, title: [`Fetched ${text}`, ...(summary.capture_digests ?? [])].join("\n") };
    }
    case "read": {
      const text = rowsNoun && summary.rows !== 1 ? `${count(summary.rows)} ${rowsNoun}` : plural(summary.rows, "row", "rows");
      return { text, title: `Read ${plural(summary.rows, "row", "rows")}` };
    }
    case "extract": {
      const when = summary.complete_when;
      const words = [
        plural(summary.records, "record", "records"),
        summary.complete ? "complete" : "incomplete",
        summary.invalid_records > 0 ? `${count(summary.invalid_records)} invalid` : null,
        summary.duplicates > 0 ? plural(summary.duplicates, "duplicate", "duplicates") : null,
        summary.invalid_fields > 0 ? plural(summary.invalid_fields, "bad field", "bad fields") : null,
      ].filter((x): x is string => x !== null);
      const check = when
        ? `The count at ${when.count_at} said ${when.expected ?? "nothing readable"}; ${when.observed ?? "?"} read: ${when.held ? "it held" : "it did not hold"}.`
        : null;
      return { text: words.join(" · "), title: [`Read ${plural(summary.records, "record", "records")}`, check].filter(Boolean).join("\n") };
    }
    case "transform": {
      const { rows_in: rowsIn, rows_out: rowsOut } = summary;
      const text =
        rowsIn != null && rowsOut != null
          ? `${count(rowsIn)} in → ${count(rowsOut)} out`
          : rowsOut != null
            ? plural(rowsOut, "row", "rows")
            : rowsIn != null
              ? `${count(rowsIn)} in → one value`
              : "one value";
      return { text, title: `${summary.transform_kind} transform: ${text}` };
    }
    case "guard": {
      const text = summary.branch === "then" ? "condition held" : "condition did not hold";
      const operands = (summary.operands ?? []).map((o) => JSON.stringify(o));
      return { text, title: [text, ...operands].join("\n") };
    }
    case "claims": {
      const counts = claimCounts(summary);
      const delivery = DELIVERY[summary.delivery] ?? summary.delivery;
      return { text: [...counts, delivery].join(" · "), title: [...counts, `Delivery: ${delivery}`].join("\n") };
    }
    case "emit_capture":
    case "post_inbox": {
      const verb = summary.kind === "post_inbox" ? "posted" : "kept";
      const text = [`${count(summary.emitted)} ${verb}`, (summary.unposted ?? 0) > 0 ? `${count(summary.unposted!)} left out` : null].filter(Boolean).join(" · ");
      return { text, title: text };
    }
    case "halt": {
      const text = summary.reason ? `stopped: ${summary.reason}` : "stopped";
      return { text, title: text };
    }
    case "repeat": {
      const text = plural(summary.attempts, "attempt", "attempts");
      return { text, title: text };
    }
  }
}

/**
 * What flows along a data edge in a run, when the source node's summary
 * counts it and the edge carries that output (an extract's `records`, a
 * read's or transform's `rows`, a call's Captures): "1,766 records". Null
 * for an edge carrying something else (a header field).
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

/**
 * What a run changed, from its nodes' summaries: "32 written", "proposed 3",
 * "nothing changed"; null when no node has a summary (an older run) or none
 * of them writes or posts.
 */
export function runChangedWords(nodes: readonly Schemas["GetRunNode"][] | null | undefined): string | null {
  const summaries = (nodes ?? []).flatMap((n) => (n.summary ? [n.summary] : []));
  const claims = summaries.filter((s): s is Extract<RunSummary, { kind: "claims" }> => s.kind === "claims");
  const posts = summaries.filter((s): s is Extract<RunSummary, { kind: "post_inbox" | "emit_capture" }> => s.kind === "post_inbox" || s.kind === "emit_capture");
  if (claims.length === 0 && posts.length === 0) return null;
  const sum = (pick: (s: Extract<RunSummary, { kind: "claims" }>) => number) => claims.reduce((a, s) => a + pick(s), 0);
  const changes = sum((s) => s.written + s.revised + s.inverse_written + s.retired);
  const posted = posts.filter((s) => s.kind === "post_inbox").reduce((a, s) => a + s.emitted, 0);
  const words: string[] = [];
  if (claims.some((s) => s.delivery === "proposed")) words.push(changes > 0 ? `proposed ${count(changes)}` : "proposed");
  else {
    const parts = [
      [sum((s) => s.written), "written"],
      [sum((s) => s.revised), "revised"],
      [sum((s) => s.inverse_written), "recorded absent"],
      [sum((s) => s.retired), "retired"],
    ] as const;
    for (const [n, word] of parts) if (n > 0) words.push(`${count(n)} ${word}`);
  }
  if (posted > 0) words.push(`${count(posted)} posted`);
  return words.length > 0 ? words.join(" · ") : "nothing changed";
}
