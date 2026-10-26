import type { Schemas } from "@/api/schemas";
import { RefLink } from "@/components/RefLink";
import { captureHandle } from "@/lib/next-reasons";

type Review = Schemas["ProposalReview"];
type Member = Review["members"][number];

/**
 * A proposal's changes read as facts: Claims grouped under their Subject, one
 * line each ("component → pkg:pypi/rich@14.3.2"), the Captures they cite once
 * per group. Reads only the review's candidate (or base) artifacts; ids stay
 * behind links.
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
  return { text: JSON.stringify(o), ref: null };
}

const ROLE_WORDS: Record<string, string> = { observation: "observed", normative: "stated" };

/** Members whose artifact this read doesn't carry (withheld or not served): listed by path. */
export function unreadableChanges(members: Member[]): { path: string; disposition: string }[] {
  return members
    .filter((m) => !obj(m.candidate_semantic_artifact) && !obj(m.base_semantic_artifact))
    .map((m) => ({ path: m.path, disposition: m.disposition }));
}

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
      if (name) group(name).created ||= member.disposition === "create";
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

const DISPOSITION_MARK: Record<string, string> = { create: "+", retire: "−", revise: "~" };

export function ProposalChanges({ review, limit }: { review: Review; limit?: number }) {
  const groups = groupChanges(review.members);
  const unreadable = unreadableChanges(review.members);
  let shown = 0;
  let hidden = 0;
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
            <div className="flex flex-wrap items-baseline gap-x-2">
              <RefLink value={g.subject} />
              {g.created && <span className="text-[11px] uppercase tracking-wide text-emerald-400/80">new</span>}
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
            </div>
            <div className="ml-4 mt-0.5 space-y-0.5">
              {runsOf(claims).map((run, i) => (
                <div key={`${run.field}-${i}`} className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
                  <span className="text-zinc-500" title={run.disposition}>
                    {DISPOSITION_MARK[run.disposition] ?? "·"}
                  </span>
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
                    {run.role && <span className="ml-2 text-[11px] text-zinc-500">{ROLE_WORDS[run.role] ?? run.role}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {unreadable.slice(0, limit ?? unreadable.length).map((u) => (
        <div key={u.path} className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline">
          <span className="text-zinc-500" title={u.disposition}>
            {DISPOSITION_MARK[u.disposition] ?? "·"}
          </span>
          <span className="min-w-0 break-all">
            <RefLink value={refFromPath(u.path)} />
          </span>
        </div>
      ))}
      {hidden > 0 && <div className="text-[12px] text-zinc-500">+{hidden} more on the proposal page</div>}
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
