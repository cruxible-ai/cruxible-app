import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { useAtLink } from "@/lib/at";
import { ChangeMark } from "@/components/Chip";
import { RefLink } from "@/components/RefLink";
import { shortId } from "@/components/ShortId";
import { captureHandle } from "@/lib/next-reasons";
import { definitionIdentity, readDefinition, type DefinitionChange } from "@/lib/proposal-diff";
import { changeMark, roleWord } from "@/lib/vocabulary";

type Review = Schemas["ProposalReview"];
type Member = Review["members"][number];
type Summary = Schemas["ProposalReviewSummary"];
type SummaryGroup = Summary["groups"][number];
type SummaryRow = SummaryGroup["rows"][number];

/**
 * A proposal's changes read as facts: Claims grouped under their Subject, one
 * line each ("component → pkg:pypi/rich@14.3.2"), the Captures they cite once
 * per group; definitions (Contracts, providers, ClaimTypes, Procedures, …)
 * one line each under their kind. Reads only the review's candidate (or base)
 * artifacts; ids stay behind links.
 */

interface ClaimLine {
  field: string;
  value: { text: string; ref: string | null };
  role: string | null;
  disposition: string;
  captures: string[];
}

interface SubjectGroup {
  subject: string;
  created: boolean;
  claims: ClaimLine[];
}

const obj = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" ? value : null);

/** "subjects/security.release/cruxible--0.3.2.json" -> "security.release/cruxible--0.3.2" */
function subjectFromPath(path: string | null): string | null {
  if (!path) return null;
  const match = /^subjects\/(.+)\.json$/.exec(path);
  return match?.[1] ?? null;
}

function addressSubject(address: unknown): string | null {
  return subjectFromPath(str(obj(address)?.artifact_path));
}

function objectValue(object: unknown): { text: string; ref: string | null } {
  const o = obj(object);
  if (!o) return { text: "—", ref: null };
  if (o.kind === "literal") {
    const v = o.value;
    return { text: typeof v === "string" ? v : JSON.stringify(v), ref: null };
  }
  if (o.kind === "subject") {
    const name = addressSubject(o.address);
    return name ? { text: name, ref: name } : { text: "a Subject", ref: null };
  }
  // An inverse: "none of" the Subject (or value) it names.
  if (o.kind === "none") {
    const of = objectValue(o.of);
    return { text: `none of ${of.text}`, ref: null };
  }
  return { text: JSON.stringify(o), ref: null };
}

/** A Claim artifact's object as display text (and the Subject it names, when it names one). */
export function claimObject(artifact: unknown): { text: string; ref: string | null } | null {
  const object = obj(obj(obj(artifact)?.statement)?.object);
  return object ? objectValue(object) : null;
}

/** A Claim artifact's cited Capture digests. */
export function claimCaptures(artifact: unknown): string[] {
  const digests = obj(obj(artifact)?.backing)?.capture_digests;
  return Array.isArray(digests) ? digests.filter((d): d is string => typeof d === "string") : [];
}

/**
 * Members this read can't name, listed by path: their artifact isn't carried
 * (withheld or not served), or a definition's artifact has no identity name.
 */
export function unreadableChanges(members: Member[]): { path: string; disposition: string }[] {
  return members
    .filter((m) => {
      if (!obj(m.candidate_semantic_artifact) && !obj(m.base_semantic_artifact)) return true;
      return m.artifact_kind !== "subject" && m.artifact_kind !== "claim" && readDefinition(m).name === null;
    })
    .map((m) => ({ path: m.path, disposition: m.disposition }));
}

export interface DefinitionGroup {
  /** The definitions' kind (`identity.kind`: "Contract", "Provider", …). */
  type: string;
  definitions: (DefinitionChange & { name: string })[];
}

/**
 * The members that are not Subjects or Claims (Contracts, providers,
 * ClaimTypes, Procedures, …) grouped by kind, read from each artifact's typed
 * identity; by kind, then name. Members without a served, named artifact are
 * left to `unreadableChanges`.
 */
export function definitionGroups(members: Member[]): DefinitionGroup[] {
  const groups = new Map<string, DefinitionGroup>();
  for (const member of members) {
    if (member.artifact_kind === "subject" || member.artifact_kind === "claim") continue;
    const definition = readDefinition(member);
    if (definition.name === null) continue;
    let g = groups.get(definition.type);
    if (!g) {
      g = { type: definition.type, definitions: [] };
      groups.set(definition.type, g);
    }
    g.definitions.push({ ...definition, name: definition.name });
  }
  const out = [...groups.values()].sort((a, b) => a.type.localeCompare(b.type));
  for (const g of out) g.definitions.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return out;
}

const KIND_DISPOSITION = { new: "create", revised: "revise", retired: "retire" } as const;

export function groupChanges(members: Member[]): SubjectGroup[] {
  const groups = new Map<string, SubjectGroup>();
  const group = (subject: string) => {
    let g = groups.get(subject);
    if (!g) {
      g = { subject, created: false, claims: [] };
      groups.set(subject, g);
    }
    return g;
  };
  for (const member of members) {
    const artifact = obj(member.candidate_semantic_artifact) ?? obj(member.base_semantic_artifact);
    if (!artifact) continue;
    if (member.artifact_kind === "subject") {
      const name = str(obj(artifact.identity)?.name);
      if (name) group(name).created ||= changeMark(member.disposition).mark === "+";
      continue;
    }
    if (member.artifact_kind !== "claim") continue;
    const statement = obj(artifact.statement);
    if (!statement) continue;
    const subject = addressSubject(statement.subject) ?? "(unknown subject)";
    const kind = subject.split("/")[0] ?? "";
    const predicate = str(statement.predicate) ?? "?";
    const field = predicate.startsWith(`${kind}.`) ? predicate.slice(kind.length + 1) : predicate;
    const backing = obj(artifact.backing);
    const captures = Array.isArray(backing?.capture_digests)
      ? (backing!.capture_digests as unknown[]).filter((d): d is string => typeof d === "string")
      : [];
    group(subject).claims.push({
      field,
      value: objectValue(statement.object),
      role: str(statement.role),
      disposition: member.disposition,
      captures,
    });
  }
  // Created Subjects first, then by name; within a Subject, by field then value.
  const out = [...groups.values()];
  for (const g of out) g.claims.sort((a, b) => a.field.localeCompare(b.field) || a.value.text.localeCompare(b.value.text));
  return out.sort((a, b) => Number(b.created) - Number(a.created) || a.subject.localeCompare(b.subject));
}

/** "claims/04/CLM-….json" -> "CLM-…"; "subjects/k/id.json" -> "k/id"; else the path. */
function refFromPath(path: string): string {
  const claim = /(CLM-[0-9a-f]+)\.json$/.exec(path);
  if (claim?.[1]) return claim[1];
  return subjectFromPath(path) ?? path;
}

function Value({ value }: { value: { text: string; ref: string | null } }) {
  return value.ref ? <RefLink value={value.ref} /> : <span className="font-mono text-[12.5px] text-zinc-100">{value.text}</span>;
}

/** A definition's name (a digest tail shortened, whole on hover), linked where the console opens its kind. */
function DefinitionName({ definition }: { definition: { name: string; ref: string | null } }) {
  const text = shortId(definition.name);
  const title = text === definition.name ? undefined : definition.name;
  const name = (
    <span className="font-mono text-[12.5px]" title={title}>
      {text}
    </span>
  );
  return definition.ref ? <RefLink value={definition.ref}>{name}</RefLink> : <span className="text-zinc-300">{name}</span>;
}

/** Consecutive Claims of one field, role and disposition read as one line with many values. */
function runsOf(claims: ClaimLine[]) {
  const runs: { field: string; role: string | null; disposition: string; values: ClaimLine["value"][] }[] = [];
  for (const c of claims) {
    const last = runs[runs.length - 1];
    if (last && last.field === c.field && last.role === c.role && last.disposition === c.disposition) last.values.push(c.value);
    else runs.push({ field: c.field, role: c.role, disposition: c.disposition, values: [c.value] });
  }
  return runs;
}

export function ProposalChanges({ review, limit }: { review: Review; limit?: number }) {
  const groups = groupChanges(review.members);
  const definitions = definitionGroups(review.members);
  const unreadable = unreadableChanges(review.members);
  let shown = 0;
  let hidden = 0;
  // Definitions are capped apart from Claims, so a proposal with both shows both.
  let shownDefinitions = 0;
  const definitionRows = definitions.map((g) => {
    const room = limit === undefined ? g.definitions.length : Math.max(0, limit - shownDefinitions);
    const rows = g.definitions.slice(0, room);
    shownDefinitions += rows.length;
    hidden += g.definitions.length - rows.length;
    return { type: g.type, total: g.definitions.length, rows };
  });
  const unreadableShown = unreadable.slice(0, limit ?? unreadable.length);
  hidden += unreadable.length - unreadableShown.length;
  return (
    <div className="space-y-3 text-[13px]">
      {groups.map((g) => {
        const captures = [...new Set(g.claims.flatMap((c) => c.captures))];
        const room = limit === undefined ? g.claims.length : Math.max(0, limit - shown);
        const claims = g.claims.slice(0, room);
        shown += claims.length;
        hidden += g.claims.length - claims.length;
        if (claims.length === 0 && !g.created) return null;
        return (
          <div key={g.subject}>
            <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
              {/* A new Subject is marked once, here; its Claims are new with it. */}
              {g.created ? <ChangeMark change="create" /> : <span />}
              <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
              <RefLink value={g.subject} />
              {captures.length > 0 && (
                <span className="text-[12px] text-zinc-500">
                  from{" "}
                  {captures.map((d, i) => (
                    <span key={d}>
                      {i > 0 && ", "}
                      <RefLink value={captureHandle(d)} />
                    </span>
                  ))}
                </span>
              )}
              </span>
            </div>
            <div className="ml-4 mt-0.5 space-y-0.5">
              {runsOf(claims).map((run, i) => (
                <div key={`${run.field}-${i}`} className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
                  {g.created && changeMark(run.disposition).mark === "+" ? <span /> : <ChangeMark change={run.disposition} />}
                  <span className="min-w-0 break-words">
                    <span className="text-zinc-400">{run.field}</span>
                    {run.values.length > 1 && <span className="ml-1 text-[11px] text-zinc-500">({run.values.length})</span>}
                    <span className="px-1.5 text-zinc-600">→</span>
                    {run.values.length === 1 ? (
                      <Value value={run.values[0]!} />
                    ) : (
                      <span className="inline-flex flex-wrap gap-x-3 gap-y-0.5 align-baseline">
                        {run.values.map((v, j) => (
                          <Value key={`${v.text}-${j}`} value={v} />
                        ))}
                      </span>
                    )}
                    {run.role && <span className="ml-2 text-[11px] text-zinc-500">{roleWord(run.role)}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {definitionRows.map(
        (g) =>
          g.rows.length > 0 && (
            <div key={`kind:${g.type}`} role="group" aria-label={g.type}>
              <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
                <span />
                <span className="text-zinc-400">
                  {g.type}
                  {g.total > 1 && <span className="ml-1 text-[11px] text-zinc-500">({g.total})</span>}
                </span>
              </div>
              <div className="ml-4 mt-0.5 space-y-0.5">
                {g.rows.map((d) => (
                  <div key={d.member.path} className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
                    <ChangeMark change={KIND_DISPOSITION[d.kind]} />
                    <span className="min-w-0 break-all">
                      <DefinitionName definition={d} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}
      {unreadableShown.map((u) => (
        <div key={u.path} className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
          <ChangeMark change={u.disposition} />
          <span className="min-w-0 break-all">
            <RefLink value={refFromPath(u.path)} />
          </span>
        </div>
      ))}
      {hidden > 0 && <MoreLink proposal={review.proposal_id} hidden={hidden} />}
    </div>
  );
}

/** The changes past a peek's cap, counted, linking the proposal page. */
function MoreLink({ proposal, hidden }: { proposal: string; hidden: number }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return (
    <Link
      to={link(`/i/${instanceId}/p/${encodeURIComponent(proposal)}`)}
      className="block text-[12px] text-zinc-400 hover:text-zinc-200 hover:underline"
    >
      +{hidden} more on the proposal page →
    </Link>
  );
}

/** A summary group of Subject or Claim changes: the summary form cannot render those as Claim lines. */
export function summaryHasBeliefs(summary: Summary): boolean {
  return summary.groups.some((g) => g.artifact_kind === "claim" || g.artifact_kind === "subject");
}

const SUMMARY_CHANGE = { create: "create", replace: "revise", retire: "retire", delete: "retire" } as const;

/**
 * A summary row's stored fields on one side: the group's shared fields
 * (`after.<field>`, said once for the group) under the row's own.
 */
function summaryFields(group: SummaryGroup, row: SummaryRow): Record<string, unknown> | null {
  const side = row.after !== null || Object.keys(group.shared_fields).some((k) => k.startsWith("after.")) ? "after" : "before";
  const out: Record<string, unknown> = {};
  for (const [key, field] of Object.entries(group.shared_fields)) {
    if (key.startsWith(`${side}.`)) out[key.slice(side.length + 1)] = field.value;
  }
  for (const [key, field] of Object.entries(row[side] ?? {})) out[key] = field.value;
  return Object.keys(out).length > 0 ? out : null;
}

export interface SummaryKind {
  type: string;
  /** Members of this kind in the proposal (every row, shown or not). */
  total: number;
  rows: { path: string; change: string; name: string | null; ref: string | null }[];
}

/**
 * The summary's definition groups by kind (a kind's create and revise groups
 * read together), each row named from its stored fields as the detailed read
 * names them (`definitionIdentity`). Subject and Claim groups are left out.
 */
export function summaryKinds(summary: Summary): SummaryKind[] {
  const kinds = new Map<string, SummaryKind>();
  for (const group of summary.groups) {
    if (group.artifact_kind === "claim" || group.artifact_kind === "subject") continue;
    const rows = group.rows.map((row) => ({
      path: row.path,
      change: SUMMARY_CHANGE[group.disposition],
      ...definitionIdentity(summaryFields(group, row), group.artifact_kind),
    }));
    const type = rows.find((r) => r.name !== null)?.type ?? definitionIdentity(null, group.artifact_kind).type;
    let k = kinds.get(type);
    if (!k) {
      k = { type, total: 0, rows: [] };
      kinds.set(type, k);
    }
    k.total += (group.counts.created ?? 0) + (group.counts.revised ?? 0) + (group.counts.retired ?? 0);
    k.rows.push(...rows.map(({ path, change, name, ref }) => ({ path, change, name, ref })));
  }
  const out = [...kinds.values()].sort((a, b) => a.type.localeCompare(b.type));
  for (const k of out) k.rows.sort((a, b) => (a.name ?? a.path).localeCompare(b.name ?? b.path, undefined, { numeric: true }));
  return out;
}

/**
 * A definition-only change set from the review's summary form: each kind with
 * its count, its first rows named and marked, the rest counted into "more".
 * A row no stored field names reads by its path.
 */
export function SummaryChanges({ summary, limit = 12 }: { summary: Summary; limit?: number }) {
  const kinds = summaryKinds(summary);
  const total = (summary.counts.created ?? 0) + (summary.counts.revised ?? 0) + (summary.counts.retired ?? 0);
  let shown = 0;
  const blocks = kinds.map((k) => {
    const rows = k.rows.slice(0, Math.max(0, limit - shown));
    shown += rows.length;
    return { ...k, rows };
  });
  const hidden = total - shown;
  return (
    <div className="space-y-3 text-[13px]">
      {blocks.map(
        (k) =>
          k.rows.length > 0 && (
            <div key={`kind:${k.type}`} role="group" aria-label={k.type}>
              <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
                <span />
                <span className="text-zinc-400">
                  {k.type}
                  {k.total > 1 && <span className="ml-1 text-[11px] text-zinc-500">({k.total})</span>}
                </span>
              </div>
              <div className="ml-4 mt-0.5 space-y-0.5">
                {k.rows.map((row) => (
                  <div key={row.path} className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
                    <ChangeMark change={row.change} />
                    <span className="min-w-0 break-all">
                      {row.name !== null ? <DefinitionName definition={{ name: row.name, ref: row.ref }} /> : <RefLink value={refFromPath(row.path)} />}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}
      {hidden > 0 && <MoreLink proposal={summary.proposal_id} hidden={hidden} />}
    </div>
  );
}

/**
 * "Proposed by Procedure security.sbom-import run RUN-… terminal propose\n\n37 items; …"
 * -> who proposed it and the run, without the boilerplate.
 */
export function readProposalOrigin(words: string | null | undefined): { procedure: string; run: string } | null {
  if (!words) return null;
  const match = /^Proposed by Procedure (\S+) run (RUN-[0-9a-f]+)/.exec(words);
  return match?.[1] && match[2] ? { procedure: match[1], run: match[2] } : null;
}

/**
 * What a proposal is, in words, for links and titles: a Procedure's proposal by
 * its Procedure, a kit install by its kit, otherwise the first line of its own
 * words. Never the digest.
 */
export function proposalTitle(words: string | null | undefined, targetRef: string | null | undefined): string {
  const origin = readProposalOrigin(words);
  if (origin) return `${origin.procedure} proposal`;
  const kit = /\/kit-([^/]+?)-[0-9a-f]+$/.exec(targetRef ?? "");
  if (kit?.[1]) return `Install or upgrade of kit ${kit[1]}`;
  const first = (words ?? "").split("\n").find((line) => line.trim() !== "")?.trim();
  if (first) return first.length > 90 ? `${first.slice(0, 89)}…` : first;
  return "Proposal";
}
