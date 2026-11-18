/**
 * A larger instance for the Overview (tests and a fixture-backed render):
 * ten kinds, nine sources (fresh, a week old, stale, never landed), eight
 * Lines (settle, propose, one observe) and 240 generations with Line runs and
 * kit changes in the newest fifty. Served over the authored world (same
 * coordinate; later fixtures win), so the shell's reads still answer. Only
 * the reads the Overview makes are defined here.
 */
import { defineFixture, type RecordedFixture } from "./fixture";
import {
  getBatchBody,
  headQuery,
  LANDING_TRIGGERS_QUERY,
  LEDGER_PAGE,
  orientQuery,
  queryBody,
} from "@/api/requests";
import type { AcceptedCoordinate, GetResult, OrientPredicate, Schemas } from "@/api/schemas";
import { AUTHORED } from "./handlers";
import { COORDINATE } from "./authored/world";
import { growthSequences, GROWTH_WINDOW } from "@/lib/overview";

type Spec = Schemas["ProcedureSpec"];

const INSTANCE = "inst_fixture";
export const LARGE_HEAD = 240;
const HEAD_AT = "2026-10-19T09:30:00Z";
const ORIENT_PAGE = 500;

// -- the ontology ---------------------------------------------------------------------

interface ClaimTypeSpec {
  name: string;
  /** subject<kind> for a link, else a literal type. */
  type: string;
  evidence: "captured" | "none" | "self";
  many?: boolean;
  /** Share of the kind's Subjects holding a value. */
  share: number;
}

/** Each kind's Subjects at the head, its key and ClaimTypes. */
const KINDS: { kind: string; subjects: number; key: string; claimTypes: ClaimTypeSpec[] }[] = [
  {
    kind: "ops.service",
    subjects: 120,
    key: "name",
    claimTypes: [
      { name: "owner", type: "subject<ops.team>", evidence: "self", share: 0.95 },
      { name: "repo", type: "subject<ops.repo>", evidence: "captured", share: 0.9 },
      { name: "tier", type: 'enum["0", "1", "2"]', evidence: "self", share: 0.8 },
      { name: "slo_target", type: "decimal{0..1}", evidence: "none", share: 0.5 },
    ],
  },
  { kind: "ops.team", subjects: 14, key: "slug", claimTypes: [{ name: "oncall", type: "string", evidence: "captured", share: 1 }] },
  {
    kind: "ops.repo",
    subjects: 210,
    key: "full_name",
    claimTypes: [
      { name: "default_branch", type: "string", evidence: "captured", share: 1 },
      { name: "packages", type: "subject<ops.package>", evidence: "captured", many: true, share: 0.7 },
      { name: "archived", type: "boolean", evidence: "captured", share: 1 },
    ],
  },
  {
    kind: "ops.deployment",
    subjects: 480,
    key: "id",
    claimTypes: [
      { name: "service", type: "subject<ops.service>", evidence: "captured", share: 1 },
      { name: "host", type: "subject<ops.host>", evidence: "captured", share: 1 },
      { name: "version", type: "string", evidence: "captured", share: 1 },
    ],
  },
  {
    kind: "ops.incident",
    subjects: 36,
    key: "id",
    claimTypes: [
      { name: "service", type: "subject<ops.service>", evidence: "captured", share: 1 },
      { name: "severity", type: 'enum["sev1", "sev2", "sev3"]', evidence: "captured", share: 1 },
      { name: "root_cause", type: "string", evidence: "self", share: 0.4 },
    ],
  },
  {
    kind: "ops.alert",
    subjects: 260,
    key: "id",
    claimTypes: [
      { name: "service", type: "subject<ops.service>", evidence: "captured", share: 0.9 },
      { name: "incident", type: "subject<ops.incident>", evidence: "self", share: 0.2 },
    ],
  },
  { kind: "ops.host", subjects: 90, key: "instance_id", claimTypes: [{ name: "region", type: "string", evidence: "captured", share: 1 }] },
  {
    kind: "ops.package",
    subjects: 640,
    key: "purl",
    claimTypes: [
      { name: "license", type: "string", evidence: "captured", share: 0.85 },
      { name: "vulnerabilities", type: "subject<ops.vulnerability>", evidence: "captured", many: true, share: 0.12 },
    ],
  },
  {
    kind: "ops.vulnerability",
    subjects: 85,
    key: "cve_id",
    claimTypes: [
      { name: "severity", type: "decimal{0..10}", evidence: "captured", share: 1 },
      { name: "exploited", type: "boolean", evidence: "captured", share: 0.3 },
    ],
  },
  {
    kind: "ops.runbook",
    subjects: 22,
    key: "slug",
    claimTypes: [
      { name: "service", type: "subject<ops.service>", evidence: "none", share: 1 },
      { name: "reviewed_on", type: "date", evidence: "self", share: 0.6 },
    ],
  },
];

const keyOf = (kind: string) => `${kind}.${KINDS.find((k) => k.kind === kind)!.key}`;

/** The kind's ClaimType rows (key first) with live counts scaled to `subjects`. */
function predicates(kind: string, subjects: number, counts: boolean): OrientPredicate[] {
  const spec = KINDS.find((k) => k.kind === kind)!;
  const rows: (ClaimTypeSpec & { key?: boolean })[] = [{ name: spec.key, type: "string", evidence: "self", share: 1, key: true }, ...spec.claimTypes];
  return rows.map((c) => {
    const withValue = Math.round(subjects * c.share);
    return {
      name: c.name,
      predicate: `${kind}.${c.name}`,
      cardinality: c.many ? "many" : "one",
      type: c.type,
      subject_kinds: [kind],
      ...(c.evidence === "self" ? {} : { evidence_requirement: c.evidence }),
      kit: "platform",
      ...(counts ? { live_claims: withValue * (c.many ? 3 : 1), subjects_with_value: withValue } : {}),
    };
  });
}

// -- definitions: Procedures, Lines, sources ------------------------------------------

const FETCH = { capability: { name: "web.fetch", version: 1 } };
const item = (...path: string[]) => ({ $ref: "item" as const, path });
const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });

interface LineSpec {
  line: string;
  authority: "settle" | "propose" | "observe";
  sources: string[];
  /** kind -> ClaimType names it writes; `create` marks the kinds whose Subjects it creates. */
  writes: { kind: string; claimTypes: string[]; create?: boolean }[];
}

const LINES: LineSpec[] = [
  { line: "catalog-sync", authority: "settle", sources: ["backstage.catalog"], writes: [{ kind: "ops.service", claimTypes: ["owner", "tier"], create: true }, { kind: "ops.team", claimTypes: ["oncall"], create: true }] },
  { line: "repo-sync", authority: "settle", sources: ["github.api"], writes: [{ kind: "ops.repo", claimTypes: ["default_branch", "archived"], create: true }, { kind: "ops.service", claimTypes: ["repo"] }] },
  { line: "sbom-import", authority: "propose", sources: ["sbom.uploads", "github.api"], writes: [{ kind: "ops.repo", claimTypes: ["packages"] }, { kind: "ops.package", claimTypes: ["license"], create: true }] },
  { line: "vuln-scan", authority: "propose", sources: ["osv.query", "nvd.feed"], writes: [{ kind: "ops.package", claimTypes: ["vulnerabilities"] }, { kind: "ops.vulnerability", claimTypes: ["severity", "exploited"], create: true }] },
  { line: "deploy-watch", authority: "settle", sources: ["k8s.deployments"], writes: [{ kind: "ops.deployment", claimTypes: ["service", "host", "version"], create: true }] },
  { line: "host-inventory", authority: "settle", sources: ["aws.ec2"], writes: [{ kind: "ops.host", claimTypes: ["region"], create: true }] },
  { line: "incident-sync", authority: "propose", sources: ["pagerduty.events"], writes: [{ kind: "ops.incident", claimTypes: ["service", "severity"], create: true }, { kind: "ops.alert", claimTypes: ["service"], create: true }] },
  { line: "alert-triage", authority: "observe", sources: ["datadog.monitors"], writes: [{ kind: "ops.alert", claimTypes: ["incident"] }] },
];

const procedureOf = (line: string) => `ops.${line}`;

function spec(line: LineSpec): Spec {
  return {
    procedure: procedureOf(line.line),
    description: `Keep ${line.writes.map((w) => w.kind).join(" and ")} current.`,
    slots: { fetch: FETCH },
    steps: [
      ...line.sources.map((source, i) => ({
        call: `read${i}`,
        slot: "fetch",
        input: { logical_source: source },
        captures: { capture: `ops.${source}-v1` },
      })),
      ...line.writes.map((w, i) => ({
        id: `write${i}`,
        claims: w.claimTypes.map((name) => ({ type: `${w.kind}.${name}`, value: item("fields", name) })),
        for_each: step("read0", "records"),
        subject: { kind: w.kind, key: { [KINDS.find((k) => k.kind === w.kind)!.key]: item("key") }, ...(w.create ? { create: "if_absent" as const } : {}) },
      })),
    ],
  } as Spec;
}

const SPECS = LINES.map(spec);

const result = (ref: string, kind: GetResult["kind"], extra: Partial<GetResult>): GetResult => ({
  tag: "playbill-get-result-v1",
  ref,
  kind,
  detail: "summary",
  coordinate: { git_oid: COORDINATE.git_oid.slice(0, 12), generation: LARGE_HEAD },
  accepted_coordinate: COORDINATE,
  evaluation_time: HEAD_AT,
  ...extra,
});

const lineProof = (line: LineSpec): GetResult =>
  result(`Line:${line.line}`, "line", {
    detail: "proof",
    proof: {
      coordinate: COORDINATE,
      path: `lines/${line.line}.json`,
      artifact_digest: "sha256:" + "9".repeat(64),
      envelope: {
        artifact_format: "cruxible-line-v8",
        identity: { kind: "Line", name: line.line },
        occurrence_epoch: 1,
        procedure: { target: { kind: "Procedure", name: procedureOf(line.line) } },
        parameters: {},
        lifecycle: { state: "live", predecessor_digest: null },
        max_authority: line.authority,
      },
    },
  });

/** When each source last landed, relative to now: fresh, within a week, stale, never. */
const HOURS: Record<string, number | null> = {
  "backstage.catalog": 3,
  "github.api": 1,
  "sbom.uploads": 60,
  "osv.query": 20,
  "nvd.feed": 400,
  "k8s.deployments": 0.2,
  "aws.ec2": 30,
  "pagerduty.events": 2,
  "datadog.monitors": null,
};
const SOURCES = Object.keys(HOURS).sort();
const ago = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();

// -- generations and growth -------------------------------------------------------------

const oid = (sequence: number) => sequence.toString(16).padStart(8, "0").repeat(5);
const coordinateAt = (sequence: number): AcceptedCoordinate =>
  sequence === LARGE_HEAD ? COORDINATE : { ...COORDINATE, git_oid: oid(sequence), generation_root: "sha256:" + oid(sequence).slice(0, 8).repeat(8) };
const acceptedAt = (sequence: number) => new Date(Date.parse(HEAD_AT) - (LARGE_HEAD - sequence) * 6 * 3_600_000).toISOString();

/** The share of today's Subjects a kind held at `sequence`: kinds arrive over time and grow. */
function grown(kind: string, sequence: number): number {
  const index = KINDS.findIndex((k) => k.kind === kind);
  const arrives = LARGE_HEAD - GROWTH_WINDOW + 4 + index * 3;
  if (sequence < arrives) return 0;
  return Math.min(1, 0.35 + (0.65 * (sequence - arrives)) / (LARGE_HEAD - arrives));
}

const BASE = (sequence: number) => ({
  tag: "playbill-orient-v1" as const,
  instance: INSTANCE,
  coordinate: coordinateAt(sequence),
  generation: sequence,
  proposed_at: acceptedAt(sequence),
  evaluation_time: HEAD_AT,
});

function orientAt(sequence: number): RecordedFixture[] {
  const coordinate = coordinateAt(sequence);
  const kinds = KINDS.map((k) => ({ kind: k.kind, subjects: Math.round(k.subjects * grown(k.kind, sequence)), identity: `keys: ${k.key}` }));
  const totalClaims = kinds.reduce((sum, k) => sum + predicates(k.kind, k.subjects, true).reduce((t, p) => t + (p.live_claims ?? 0), 0), 0);
  return [
    defineFixture({
      method: "get",
      path: "/api/v1/{instance_id}/orient",
      query: orientQuery({ coordinate, limit: ORIENT_PAGE }),
      response: {
        ...BASE(sequence),
        kinds,
        artifacts: {
          claim_types: KINDS.reduce((n, k) => n + k.claimTypes.length + 1, 0),
          procedures: SPECS.length,
          documents: 0,
          queries: 3,
          operations: 4,
          lines: LINES.length,
          captures: 1200,
          claims: { accepted: totalClaims, conflicted: 7, overturned: 3, ineligible: 2, retired: 41 },
        },
        attention: { next_items: 12, open_proposals: 4 },
      },
    }),
    ...kinds
      .filter((k) => k.subjects > 0)
      .map((k) =>
        defineFixture({
          method: "get",
          path: "/api/v1/{instance_id}/orient",
          query: orientQuery({ coordinate, kind: k.kind }),
          response: { ...BASE(sequence), kind_detail: { kind: k.kind, subjects: k.subjects, identity: k.identity, predicates: predicates(k.kind, k.subjects, true) } },
        }),
      ),
  ];
}

function because(sequence: number): string {
  if (sequence === LARGE_HEAD - 44) return "Install kit platform 1.2.0.";
  if (sequence === LARGE_HEAD - 12) return "Upgrade kit platform from 1.2.0 to 1.3.0.";
  if (sequence % 4 === 0) {
    const line = LINES[(sequence / 4) % LINES.length]!;
    return `Proposed by Procedure ${procedureOf(line.line)} run RUN-${sequence.toString(16).padStart(64, "a")} terminal settle\n12 items; each item's reason is recorded with the Claim or Subject it explains.`;
  }
  return "Reviewed by hand.";
}

const LOWER = LARGE_HEAD - GROWTH_WINDOW + 1;

const fixtures: RecordedFixture[] = [
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/head",
    query: headQuery(null),
    response: { tag: "playbill-head-v1", instance: INSTANCE, coordinate: COORDINATE, generation: LARGE_HEAD },
  }),
  ...orientAt(LARGE_HEAD),
  // The growth chart's earlier generations: each resolved by number, then read at its coordinate.
  ...growthSequences(LOWER, LARGE_HEAD)
    .filter((s) => s !== LARGE_HEAD)
    .flatMap((sequence) => [
      defineFixture({
        method: "get",
        path: "/api/v1/{instance_id}/head",
        query: headQuery(String(sequence)),
        response: { tag: "playbill-head-v1", instance: INSTANCE, coordinate: coordinateAt(sequence), generation: sequence },
      }),
      ...orientAt(sequence),
    ]),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "claim_types", limit: ORIENT_PAGE }),
    response: { ...BASE(LARGE_HEAD), section: "claim_types", claim_types: KINDS.flatMap((k) => predicates(k.kind, k.subjects, false)) },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "subject_kinds", limit: ORIENT_PAGE }),
    response: {
      ...BASE(LARGE_HEAD),
      section: "subject_kinds",
      subject_kinds: KINDS.map((k) => ({ kind: k.kind, rule: "keys" as const, keys: [keyOf(k.kind)], uniqueness: "unique" as const, kit: "platform" })),
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "procedures", limit: ORIENT_PAGE }),
    response: { ...BASE(LARGE_HEAD), section: "procedures", procedures: SPECS.map((s) => ({ name: s.procedure, lifecycle: "live" as const, runnable: "line" as const })) },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(SPECS.map((s) => `Procedure:${s.procedure}`), COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: SPECS.map((s) =>
        result(`Procedure:${s.procedure}`, "procedure", {
          card: { authored: s, procedure: s.procedure, description: s.description ?? null, lifecycle: "live", inputs: {}, runnable: "line" },
        }),
      ),
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "lines", limit: ORIENT_PAGE }),
    response: {
      ...BASE(LARGE_HEAD),
      section: "lines",
      lines: LINES.map((l) => ({
        line: `Line:${l.line}`,
        lifecycle: "live" as const,
        procedure: `Procedure:${procedureOf(l.line)}`,
        authority: l.authority,
        trigger: "capture_landing",
        enablement: "running" as const,
      })),
    },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(LINES.map((l) => `Line:${l.line}`), COORDINATE, "proof"),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: LINES.map(lineProof) },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody(LANDING_TRIGGERS_QUERY, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "Trigger",
      columns: [
        { name: "name", type: "string" },
        { name: "schedule", type: "enum" },
        { name: "target", type: "string" },
        { name: "capture_contract", type: "string" },
        { name: "logical_sources", type: "string", cardinality: "many" },
      ],
      rows: [],
      receipt: { mode: "inline", spec_digest: "sha256:" + "e".repeat(64), coordinate: COORDINATE, evaluation_time: HEAD_AT },
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "sources", limit: ORIENT_PAGE }),
    response: {
      ...BASE(LARGE_HEAD),
      section: "sources",
      sources: SOURCES.filter((s) => HOURS[s] !== null).map((s, i) => ({
        logical_source: s,
        landings: 20 + i * 7,
        latest: { landed_at: ago(HOURS[s]!), run: "RUN-" + "7".repeat(64), line: `Line:${LINES.find((l) => l.sources.includes(s))!.line}`, status: "available" as const },
        contracts: [{ contract: `CaptureContract:ops.${s}-v1`, version: 1, landings: 20 + i * 7 }],
      })),
      sources_unattributed: 0,
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "generations", limit: LEDGER_PAGE }),
    response: {
      ...BASE(LARGE_HEAD),
      section: "generations",
      generations: Array.from({ length: LEDGER_PAGE }, (_, i) => {
        const sequence = LARGE_HEAD - i;
        return { sequence, git_oid: coordinateAt(sequence).git_oid, proposed_at: acceptedAt(sequence), proposer: "platform-owner", because: because(sequence), members: 12 + (sequence % 9) * 5 };
      }),
      next_cursor: "g-large-2",
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/kits",
    response: {
      tag: "playbill-kit-status-v1",
      kits: [{ kit_id: "platform", version: "1.3.0", content_digest: "sha256:" + "5".repeat(64), source: "cruxible-kits/platform" }],
    },
  }),
];

/** The authored world with the larger instance's Overview reads on top. */
export const OVERVIEW_LARGE: RecordedFixture[] = [...AUTHORED, ...fixtures];
