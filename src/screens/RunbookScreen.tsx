import { useMemo, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { useCard, useHead, useInstanceId, usePin, useRunbookPreview } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { Fact, Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel, SubSection } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShortId } from "@/components/ShortId";
import { useAtLink } from "@/lib/at";
import { lineName } from "@/lib/lines";
import { authorityRows, runbookName, targetOf, type AuthorityRow, type RunbookTarget } from "@/lib/runbooks";
import { formatWhen } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

type Card = Schemas["GetRunbookCard"];
type Step = Card["steps"][number];
type Run = Schemas["RunbookRunResult"];
type Preview = Schemas["RunbookPreview"];
type PreviewStep = Preview["steps"][number];

/**
 * One Runbook (D-R36): its steps with each target and whether it can run,
 * the Triggers aimed at it, its recent runs with every step's outcome (read
 * live), then its static preview: per step what it reads, writes and creates,
 * the provider slots it calls and the builds its Line binds, what its Mandate
 * settles and what goes to proposal, the Triggers its writes can set off, and
 * the reads the order cannot serve. Reads: `get Runbook:<name>` at the page
 * coordinate and `runbook preview` (definitions at the head; nothing runs).
 */
export function RunbookScreen() {
  const { name = "" } = useParams();
  const read = useCard(`Runbook:${name}`);
  const card = cardOf(read.data, "runbook");
  const preview = useRunbookPreview(name === "" ? null : name);
  usePageTitle(`Runbook ${name}`);
  const last = card?.recent_runs?.[0];

  return (
    <Page>
      <PageHeader
        kind="Runbook"
        title={name}
        mono
        summary={card?.description ?? undefined}
        facts={
          card && (
            <>
              <Fact label="State">
                <Chip concept="lifecycle" value={card.lifecycle} />
              </Fact>
              <Fact label="Steps">
                <span className="font-mono">{card.steps.length}</span>
              </Fact>
              <Fact label="Triggers">
                <span className="font-mono">{card.triggers_total ?? card.triggers?.length ?? 0}</span>
              </Fact>
              <Fact label="Last run" {...(last ? { title: last.finished_at } : {})}>
                {last ? (
                  <span className="inline-flex items-baseline gap-2">
                    <Chip concept="runbookRun" value={last.status} />
                    <span>{formatWhen(last.finished_at)}</span>
                  </span>
                ) : (
                  <span className="text-zinc-500">Never run</span>
                )}
              </Fact>
              <Fact label="Generation">
                <span className="font-mono">{read.data!.coordinate.generation}</span>
              </Fact>
            </>
          )
        }
      />
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {card && (
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
          <Panel title="Steps" meta={<span>{card.steps.length}</span>}>
            <DataTable rows={card.steps} columns={STEP_COLUMNS} rowKey={(s) => String(s.step)} label="Steps" toolbar={false} maxHeight="none" />
          </Panel>
          <Panel title="Triggers" meta={(card.triggers_total ?? 0) > (card.triggers?.length ?? 0) ? <span>first {card.triggers?.length} of {card.triggers_total}</span> : undefined}>
            {(card.triggers ?? []).length === 0 ? (
              <EmptyState>None: it runs only when started by hand</EmptyState>
            ) : (
              <DataTable rows={card.triggers ?? []} columns={TRIGGER_COLUMNS} rowKey={(t) => t.trigger} label="Triggers" toolbar={false} maxHeight="none" />
            )}
          </Panel>
        </div>
      )}
      {card && <RecentRuns card={card} />}
      <PreviewPanel preview={preview.data} isPending={preview.isPending} error={preview.error} />
    </Page>
  );
}

const STEP_COLUMNS: Column<Step>[] = [
  { id: "step", header: "#", numeric: true, className: "font-mono text-zinc-500", cell: (s) => s.step },
  { id: "target", header: "Target", className: "break-all", cell: (s) => <TargetLink target={s.target} /> },
  { id: "availability", header: "Can run", className: "whitespace-nowrap", cell: (s) => <Chip concept="runbookStep" value={s.availability} /> },
];

const TRIGGER_COLUMNS: Column<Schemas["GetLineTrigger"]>[] = [
  {
    id: "trigger",
    header: "Trigger",
    className: "whitespace-nowrap",
    cell: (t) => (
      <span title={`version ${t.version}`}>
        <RefLink value={t.trigger} />
      </span>
    ),
  },
  { id: "fires", header: "Fires", className: "font-mono text-[12px] text-zinc-300", cell: (t) => t.fires },
];

/** A step's target: a Line (linked) or an internal action (by name). */
function TargetLink({ target }: { target: RunbookTarget | string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const { kind, name } = targetOf(target);
  if (kind === "action") {
    return (
      <span className="font-mono text-[12px] text-zinc-300" title="An internal action">
        {name}
      </span>
    );
  }
  return (
    <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(name))}`)} className="font-mono text-[12px] text-zinc-100 hover:underline" title={`Line:${name}`}>
      {name}
    </Link>
  );
}

/**
 * The retained runs, newest first: one row per run (how it started, when, how
 * it ended and why it stopped), one column per step with its outcome, linked
 * to the Line run it made.
 */
function RecentRuns({ card }: { card: Card }) {
  const runs = card.recent_runs ?? [];
  const columns = useMemo<Column<Run>[]>(
    () => [
      {
        id: "run",
        header: "Run",
        className: "whitespace-nowrap",
        cell: (r) => (
          <span title={[r.run_id, `definition ${r.runbook_artifact_digest}`].join("\n")} className="text-[12px] text-zinc-300">
            {formatWhen(r.started_at)}
          </span>
        ),
      },
      {
        id: "mode",
        header: "Started by",
        className: "whitespace-nowrap text-zinc-400",
        cell: (r) => (r.mode === "trigger" && r.trigger ? <RefLink value={r.trigger} /> : "Hand"),
      },
      {
        id: "status",
        header: "Ended",
        className: "whitespace-nowrap",
        cell: (r) => (
          <span className="inline-flex items-baseline gap-1.5">
            <Chip concept="runbookRun" value={r.status} />
            {r.stop_reason && (
              <span className="text-[12px] text-zinc-500">
                {term("runbookRun", r.stop_reason).word.toLowerCase()}
                {r.stopped_at_step != null && ` at step ${r.stopped_at_step}`}
              </span>
            )}
          </span>
        ),
      },
      ...card.steps.map(
        (step): Column<Run> => ({
          id: `step-${step.step}`,
          header: (
            <span title={step.target}>
              {step.step} · {shortTarget(step.target)}
            </span>
          ),
          label: `Step ${step.step}`,
          className: "whitespace-nowrap",
          cell: (r) => <StepOutcome outcome={r.steps.find((o) => o.step === step.step)} />,
        }),
      ),
    ],
    [card.steps],
  );
  return (
    <Panel title="Recent runs" meta={<span>{card.runs_more ? `newest ${runs.length}` : runs.length}</span>}>
      {runs.length === 0 ? (
        <EmptyState>Never run</EmptyState>
      ) : (
        <DataTable rows={runs} columns={columns} rowKey={(r) => r.run_id} label="Recent runs" toolbar={false} maxHeight="none" />
      )}
    </Panel>
  );
}

const shortTarget = (target: string) => {
  const name = targetOf(target).name;
  return name.slice(name.lastIndexOf(".") + 1);
};

/** One step's outcome in a run: its word, linked to the Line run; a failure's code and message on hover. */
function StepOutcome({ outcome }: { outcome: Run["steps"][number] | undefined }) {
  if (!outcome) return <span className="text-zinc-600">—</span>;
  const chip = (
    <span title={[outcome.run_status && `run ${outcome.run_status}`, outcome.code, outcome.message].filter(Boolean).join("\n") || undefined}>
      <Chip concept="runbookRun" value={outcome.status} />
    </span>
  );
  return (
    <span className="inline-flex items-baseline gap-2">
      {outcome.run_id ? <RefLink value={outcome.run_id}>{chip}</RefLink> : chip}
      {(outcome.proposal_ids ?? []).map((id) => (
        <RefLink key={id} value={id} short />
      ))}
    </span>
  );
}

/** The static preview: what each step can do, from accepted definitions at the head. */
function PreviewPanel({ preview, isPending, error }: { preview: Preview | undefined; isPending: boolean; error: Error | null }) {
  const { generation: page } = usePin();
  const head = useHead(null).data;
  const elsewhere = head !== undefined && page !== undefined && head.generation !== page;
  return (
    <Panel
      title="Preview"
      description="What each step can do, from the accepted definitions: nothing runs, no Claim or Capture is read, and no outcome is predicted."
      meta={
        preview ? (
          <span className="inline-flex items-baseline gap-2">
            {elsewhere ? `At the head, g${head!.generation}` : "At the head"}
            <ShortId value={preview.runbook_artifact_digest} className="text-zinc-500" />
          </span>
        ) : undefined
      }
    >
      {isPending && <LoadState />}
      {error && <LoadState error={error} />}
      {preview && <PreviewTables preview={preview} />}
    </Panel>
  );
}

function PreviewTables({ preview }: { preview: Preview }) {
  const reads = preview.steps.flatMap((s) => (s.reads ?? []).map((r) => ({ step: s.step, ...r })));
  const writes = preview.steps.flatMap((s) => (s.writes ?? []).map((w) => ({ step: s.step, ...w })));
  const calls = preview.steps.flatMap((s) => (s.calls ?? []).map((c) => ({ step: s.step, ...c })));
  const authority = preview.steps.flatMap((s) => authorityRows(s.step, s.authority));
  const cascades = preview.steps.flatMap((s) => (s.cascades ?? []).map((c) => ({ step: s.step, ...c })));
  const problems = preview.order_problems ?? [];
  return (
    <div className="space-y-4">
      <SubSection title="Order problems" meta={problems.length}>
        {problems.length === 0 ? (
          <EmptyState>None: every step reads only what an earlier step, or something outside the Runbook, writes</EmptyState>
        ) : (
          <DataTable rows={problems} columns={PROBLEM_COLUMNS} rowKey={(p) => `${p.step}\n${p.claim_type}\n${p.kind}`} label="Order problems" toolbar={false} maxHeight="none" />
        )}
      </SubSection>
      <SubSection title="Steps" meta={preview.steps.length}>
        <DataTable rows={preview.steps} columns={PREVIEW_STEP_COLUMNS} rowKey={(s) => String(s.step)} label="Preview steps" toolbar={false} maxHeight="none" />
      </SubSection>
      <SubSection title="Reads" meta={reads.length}>
        <Rows rows={reads} columns={READ_COLUMNS} label="Reads" />
      </SubSection>
      <SubSection title="Writes" meta={writes.length}>
        <Rows rows={writes} columns={WRITE_COLUMNS} label="Writes" />
      </SubSection>
      <SubSection title="Calls" meta={calls.length}>
        <Rows rows={calls} columns={CALL_COLUMNS} label="Calls" />
      </SubSection>
      <SubSection title="Settles or proposes" meta={authority.length}>
        <Rows rows={authority} columns={AUTHORITY_COLUMNS} label="Settles or proposes" />
      </SubSection>
      <SubSection title="Cascades" meta={cascades.length}>
        <Rows rows={cascades} columns={CASCADE_COLUMNS} label="Cascades" />
      </SubSection>
    </div>
  );
}

function Rows<T extends { step: number }>({ rows, columns, label }: { rows: T[]; columns: Column<T>[]; label: string }) {
  if (rows.length === 0) return <EmptyState>None</EmptyState>;
  return <DataTable rows={rows} columns={columns} rowKey={(r) => `${r.step}\n${rows.indexOf(r)}`} label={label} toolbar={false} maxHeight="none" />;
}

const stepColumn = <T extends { step: number }>(): Column<T> => ({ id: "step", header: "#", numeric: true, className: "font-mono text-zinc-500", cell: (r) => r.step });

/** Names under one ClaimType, each linked to its row on the kind page. */
function ClaimTypes({ names }: { names: readonly string[] }) {
  if (names.length === 0) return <span className="text-zinc-600">—</span>;
  return (
    <span className="flex flex-wrap gap-x-2">
      {names.map((name) => (
        <RefLink key={name} value={`ClaimType:${name}`}>
          <span className="font-mono text-[12px]">{name}</span>
        </RefLink>
      ))}
    </span>
  );
}

function Kinds({ names }: { names: readonly string[] }) {
  if (names.length === 0) return <span className="text-zinc-600">—</span>;
  return (
    <span className="flex flex-wrap gap-x-2">
      {names.map((name) => (
        <RefLink key={name} value={`SubjectKind:${name}`}>
          <span className="font-mono text-[12px]">{name}</span>
        </RefLink>
      ))}
    </span>
  );
}

const PROBLEM_WORD: Record<Schemas["RunbookOrderProblem"]["kind"], string> = {
  reads_later_write: "Reads what a later step writes",
  reads_unwritten: "Reads what nothing writes",
};

const PROBLEM_COLUMNS: Column<Schemas["RunbookOrderProblem"]>[] = [
  stepColumn(),
  { id: "problem", header: "Problem", className: "text-zinc-300", cell: (p) => PROBLEM_WORD[p.kind] ?? p.kind },
  { id: "claim_type", header: "ClaimType", cell: (p) => <ClaimTypes names={[p.claim_type]} /> },
  {
    id: "writers",
    header: "Written by",
    className: "text-[12px] text-zinc-300",
    cell: (p) => {
      const parts: ReactNode[] = [...(p.written_by_steps ?? []).map((s) => `step ${s}`), ...(p.outside_writers ?? []).map((w) => <RefLink key={w} value={w} />)];
      return parts.length ? <span className="flex flex-wrap gap-x-2">{parts.map((part, i) => <span key={i}>{part}</span>)}</span> : <span className="text-zinc-600">Nothing</span>;
    },
  },
];

const PREVIEW_STEP_COLUMNS: Column<PreviewStep>[] = [
  stepColumn(),
  { id: "target", header: "Target", className: "break-all", cell: (s) => <TargetLink target={s.target} /> },
  { id: "procedure", header: "Procedure", className: "break-all", cell: (s) => (s.procedure ? <RefLink value={s.procedure} /> : s.action_effect ? <span className="text-zinc-400">{s.action_effect}</span> : <span className="text-zinc-600">—</span>) },
  {
    id: "authority",
    header: "At most",
    className: "whitespace-nowrap",
    cell: (s) => (s.unavailable ? <Chip concept="runbookRun" value="unavailable" /> : s.authority ? <Chip concept="authority" value={s.authority.max_authority} /> : <span className="text-zinc-600">—</span>),
  },
  {
    id: "mandates",
    header: "Mandates",
    className: "text-[12px]",
    cell: (s) =>
      (s.authority?.mandates ?? []).length ? (
        <span className="flex flex-col">
          {s.authority!.mandates!.map((m) => (
            <RefLink key={m} value={m} />
          ))}
        </span>
      ) : (
        <span className="text-zinc-600">—</span>
      ),
  },
  {
    id: "condition",
    header: "Condition",
    className: "text-[12px] text-zinc-300",
    cell: (s) =>
      s.authority?.conditional ? (
        <span>
          {s.authority.condition_query ? <RefLink value={s.authority.condition_query} /> : "Conditional"}
          {s.authority.condition_fallback && <span className="text-zinc-500"> · else {s.authority.condition_fallback}</span>}
        </span>
      ) : (
        <span className="text-zinc-600">—</span>
      ),
  },
  { id: "stops", header: "May stop the run", className: "text-[12px] text-zinc-300", cell: (s) => (s.authority?.may_stop_run ? "Yes" : <span className="text-zinc-600">No</span>) },
];

type ReadRow = Schemas["RunbookPreviewRead"] & { step: number };
const READ_COLUMNS: Column<ReadRow>[] = [
  stepColumn(),
  { id: "node", header: "Node", className: "font-mono text-[12px] text-zinc-300", cell: (r) => r.node_id },
  { id: "query", header: "Query", className: "break-all", cell: (r) => (r.query ? <RefLink value={`QueryDefinition:${r.query}`}><span className="font-mono text-[12px]">{r.query}</span></RefLink> : <span className="text-zinc-600">—</span>) },
  { id: "claim_types", header: "ClaimTypes", cell: (r) => <ClaimTypes names={r.claim_types} /> },
  { id: "kinds", header: "Kinds", cell: (r) => <Kinds names={r.subject_kinds ?? []} /> },
  { id: "late", header: "Late", title: "Read after the step's own writes", className: "text-[12px] text-zinc-300", cell: (r) => (r.late ? "Yes" : <span className="text-zinc-600">No</span>) },
];

type WriteRow = Schemas["RunbookPreviewWrite"] & { step: number };
const WRITE_COLUMNS: Column<WriteRow>[] = [
  stepColumn(),
  { id: "node", header: "Node", className: "font-mono text-[12px] text-zinc-300", cell: (w) => w.node_id },
  { id: "kind", header: "On", cell: (w) => <Kinds names={[w.subject_kind]} /> },
  { id: "claim_types", header: "ClaimTypes", cell: (w) => <ClaimTypes names={w.claim_types} /> },
  {
    id: "creates",
    header: "Creates",
    className: "text-[12px]",
    cell: (w) => {
      const kinds = [...(w.creates_subjects ? [w.subject_kind] : []), ...(w.creates_object_kinds ?? [])];
      return <Kinds names={[...new Set(kinds)]} />;
    },
  },
  { id: "absence", header: "Judges absence", className: "text-[12px] text-zinc-300", cell: (w) => (w.judges_absence ? "Yes" : <span className="text-zinc-600">No</span>) },
];

type CallRow = Schemas["RunbookPreviewCall"] & { step: number };
const CALL_COLUMNS: Column<CallRow>[] = [
  stepColumn(),
  { id: "node", header: "Node", className: "font-mono text-[12px] text-zinc-300", cell: (c) => c.node_id },
  { id: "slot", header: "Slot", className: "font-mono text-[12px] text-zinc-300", cell: (c) => <span title={[c.signature_in, c.signature_out].filter(Boolean).join(" → ")}>{c.slot}</span> },
  { id: "binding", header: "Bound to", className: "break-all", cell: (c) => (c.build ? <RefLink value={c.build} /> : <span className="text-zinc-600">Unbound</span>) },
  { id: "operation", header: "Operation", className: "font-mono text-[12px] text-zinc-300", cell: (c) => c.operation ?? <span className="text-zinc-600">—</span> },
  { id: "effect", header: "Effect", className: "text-[12px] text-zinc-400", cell: (c) => c.effect ?? "" },
  {
    id: "captures",
    header: "Captures",
    className: "text-[12px]",
    cell: (c) =>
      (c.captures ?? []).length ? (
        <span className="flex flex-wrap gap-x-2">
          {c.captures!.map((kind) => (
            <RefLink key={kind} value={`CaptureContract:${kind}`}>
              <span className="font-mono text-[12px]">{kind}</span>
            </RefLink>
          ))}
        </span>
      ) : (
        <span className="text-zinc-600">—</span>
      ),
  },
];

const BASIS_WORD: Record<string, string> = { extracted: "extracted", measured: "measured", derived: "derived", absence: "absence" };
const CHANGE_WORD: Record<string, string> = { create: "Create", revise: "Revise", retire: "Retire" };

const AUTHORITY_COLUMNS: Column<AuthorityRow>[] = [
  stepColumn(),
  {
    id: "what",
    header: "What",
    cell: (r) => (r.whatKind === "creates" ? <span className="inline-flex items-baseline gap-1.5"><span className="text-[12px] text-zinc-500">new</span><Kinds names={[r.what]} /></span> : <ClaimTypes names={[r.what]} />),
  },
  { id: "goes", header: "Goes", className: "whitespace-nowrap", cell: (r) => <Chip concept="authority" value={r.goes === "settles" ? "settle" : "propose"} /> },
  {
    id: "changes",
    header: "Changes",
    className: "text-[12px] text-zinc-300",
    cell: (r) =>
      r.changes.length ? (
        <span className="flex flex-wrap gap-x-3">
          {r.changes.map((c) => (
            <span key={c.change}>
              {CHANGE_WORD[c.change] ?? c.change}
              <span className="text-zinc-500"> on {c.basis.map((b) => BASIS_WORD[b] ?? b).join(", ")}</span>
            </span>
          ))}
        </span>
      ) : r.gaps.length ? (
        <span className="flex flex-wrap gap-x-3">
          {r.gaps.map((g, i) => (
            <span key={i} title="The term of the settle grant that does not cover this change">
              {CHANGE_WORD[g.change] ?? g.change}
              <span className="text-zinc-500">
                {g.basis ? ` on ${BASIS_WORD[g.basis] ?? g.basis}` : ""}, outside the grant's {g.term.replaceAll("_", " ")}
              </span>
            </span>
          ))}
        </span>
      ) : (
        <span className="text-zinc-600">—</span>
      ),
  },
];

type CascadeRow = Schemas["RunbookPreviewCascade"] & { step: number };
const CASCADE_COLUMNS: Column<CascadeRow>[] = [
  stepColumn(),
  { id: "trigger", header: "Trigger", className: "whitespace-nowrap", cell: (c) => <RefLink value={c.trigger} /> },
  { id: "on", header: "On", className: "text-[12px] text-zinc-300", cell: (c) => (c.schedule === "capture_landing" ? <span>Landing{c.capture_contract ? <> of <RefLink value={c.capture_contract} /></> : null}</span> : "Accepted generation") },
  {
    id: "target",
    header: "Starts",
    className: "break-all",
    cell: (c) => (c.target_kind === "line" ? <RefLink value={`Line:${c.target}`} /> : c.target_kind === "runbook" ? <RefLink value={`Runbook:${runbookName(c.target)}`} /> : <span className="font-mono text-[12px] text-zinc-300">{c.target}</span>),
  },
  { id: "in", header: "In this Runbook", className: "text-[12px] text-zinc-300", cell: (c) => (c.in_runbook ? "Yes" : <span className="text-zinc-600">No</span>) },
];
