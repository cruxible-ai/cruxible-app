import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCard,
  useGet,
  useGetBatch,
  useInbox,
  useInterfaces,
  useInboxItem,
  useInstanceId,
  useLineRuns,
  useMandates,
  useNext,
  useReadings,
  useRunState,
} from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip, SignalDot } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Fact, Page, PageHeader } from "@/components/Page";
import { LongText } from "@/components/LongText";
import { ShortId } from "@/components/ShortId";
import { Table, Td, Th, trClass } from "@/components/Table";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { NextTable } from "@/components/next/NextTable";
import { LineDefinitionPanel, ProcedureDefinition } from "@/components/ontology/Definitions";
import { ProcedureGraph, type GraphTrigger } from "@/components/graph/ProcedureGraph";
import { interfaceBase, readLineEnvelope, retentions, sourceSteps, type LandingTrigger, type ProcedureSpec } from "@/lib/definitions";
import { buildProcedureGraph, cronWords, INPUT_NODE } from "@/lib/procedure-graph";
import { runMarks } from "@/lib/run-marks";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, runId, shortRunId } from "@/lib/lines";
import { formatDateTime, formatWhen, sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

const READINGS_PAGE = 50;
const INBOX_PAGE = 50;

/**
 * One Line: its card (triggers, enablements, due and waiting occurrences),
 * its runs paged newest first (get detail=runs), its Procedure's track record and measurement reviews with
 * their resolution dispositions, readings (paged), the mandates that bind
 * the Procedure with their scope and condition query, the Line's inbox
 * (paged), and its `next` rows; its definition as authored (parameters,
 * trigger input, bindings, what it retains, the logical sources its landing
 * Triggers select) beside its Procedure's (slots and the builds they bind,
 * steps and what each names). Every read is this Line's or its Procedure's
 * own, a page at a time.
 */
export function LineScreen() {
  const { line: raw = "" } = useParams();
  const line = lineName(raw);
  const card = useCard(`Line:${line}`);
  const lineCard = cardOf(card.data, "line");
  usePageTitle(`Line ${line}`);
  if (card.isPending) return <LoadState />;
  if (card.error) return <LoadState error={card.error} />;
  if (!lineCard) return <LoadState error={new Error(`Line:${line} did not resolve to a Line`)} />;
  const procedure = lineCard.procedure.replace(/^Procedure:/, "");
  const enablement = (lineCard.enablements ?? [])[0];
  return (
    <Page>
      <PageHeader
        kind="Line"
        title={line}
        mono
        summary={<LineSummary procedure={procedure} />}
        facts={
          <>
            <Fact label="State">
              <span className="inline-flex gap-3">
                {lineCard.lifecycle !== "live" && <Chip concept="line" value={lineCard.lifecycle} />}
                <Chip concept="line" value={enablement ? enablement.state : "not_enabled"} />
              </span>
            </Fact>
            <Fact label="Max authority">
              <span title={term("authority", lineCard.authority).meaning}>{term("authority", lineCard.authority).word}</span>
            </Fact>
            <Fact label="Procedure">
              <RefLink value={`Procedure:${procedure}`}>
                <span className="font-mono text-[13px]">{procedure}</span>
              </RefLink>
            </Fact>
            <Fact label="Trigger">
              {lineCard.trigger}
              {lineCard.triggers_inactive && <span className="text-zinc-500"> ({lineCard.triggers_inactive})</span>}
            </Fact>
            <Fact label="Runs">
              <span className="font-mono">{lineCard.runs_total ?? 0}</span>
            </Fact>
            <Fact label="Due / scheduled">
              <DueCount due={lineCard.due ?? 0} scheduled={lineCard.waiting ?? 0} />
            </Fact>
            <Fact label="Identity">
              <ShortId value={lineCard.identity_digest} className="text-zinc-200" />
            </Fact>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <OperationsPanel card={lineCard} />
        <RunsPanel line={line} total={lineCard.runs_total ?? 0} />
      </div>
      <LineNextPanel line={line} />
      <DefinitionPanels line={line} card={lineCard} procedure={procedure} />
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <MandatesPanel procedure={procedure} />
        <ProcedurePanel procedure={procedure} />
      </div>
      <InboxPanel line={line} />
    </Page>
  );
}

/**
 * The Line and its Procedure as authored: the Line's envelope (get
 * detail=proof: the typed Line card carries no parameters, trigger input or
 * bindings), the Procedure's authored form, and its Triggers' cards for the
 * logical sources a landing Trigger selects.
 */
function DefinitionPanels({ line, card, procedure }: { line: string; card: LineCard; procedure: string }) {
  const triggers = (card.triggers ?? []).map((t) => t.trigger);
  const proof = useGet(`Line:${line}`, "proof");
  const procedureRead = useCard(`Procedure:${procedure}`);
  const triggerCards = useGetBatch(triggers);
  const [selected, setSelected] = useState<string | null>(null);
  const definition = readLineEnvelope(proof.data?.proof);
  const spec = cardOf(procedureRead.data, "procedure")?.authored ?? null;
  const landing: LandingTrigger[] = triggerCards.results.flatMap((result) => {
    const card = cardOf(result, "trigger");
    const schedule = card?.schedule as { kind?: unknown; event?: { capture_contract_identity?: { name?: unknown }; logical_sources?: unknown } } | undefined;
    if (!card || schedule?.kind !== "capture_landing") return [];
    const contract = schedule.event?.capture_contract_identity?.name;
    const sources = schedule.event?.logical_sources;
    return [
      {
        name: card.trigger.replace(/^Trigger:/, ""),
        contract: typeof contract === "string" ? contract : "",
        target: card.target,
        logicalSources: Array.isArray(sources) ? sources.filter((s): s is string => typeof s === "string") : [],
      },
    ];
  });
  // Each Trigger as the graph shows it: a landing ("when <source> lands") or a schedule in words.
  const graphTriggers: GraphTrigger[] = (card.triggers ?? []).map((t) => {
    const name = t.trigger.replace(/^Trigger:/, "");
    const read = triggerCards.results.find((r) => r.ref === t.trigger || r.ref === `Trigger:${name}`);
    const schedule = (cardOf(read, "trigger")?.schedule ?? {}) as { kind?: unknown; expression?: unknown; cron?: unknown };
    const hit = landing.find((l) => l.name === name);
    if (hit) {
      const what = hit.logicalSources.length ? hit.logicalSources.join(" or ") : `a Capture under ${hit.contract.replace(/^CaptureContract:/, "")}`;
      return { name, words: `when ${what} lands`, landing: true };
    }
    const cron = typeof schedule.expression === "string" ? schedule.expression : typeof schedule.cron === "string" ? schedule.cron : null;
    const utc = t.fires.includes("UTC") ? " UTC" : "";
    return { name, words: cron ? `${cronWords(cron)}${utc}` : t.fires, landing: false };
  });
  const interfaces = useInterfaces();
  // A step whose Provider names its source takes the names its interface declares it produces.
  const produced = new Map((interfaces.data?.rows ?? []).map((row) => [row.name, row.produces ?? []] as const));
  const retains =
    definition && spec
      ? retentions(sourceSteps(procedure, spec), [definition], (iface) => produced.get(interfaceBase(iface)) ?? []).filter((r) => r.line === line)
      : [];
  if (!definition && !spec) return proof.error ? <LoadState error={proof.error} /> : null;
  return (
    <>
      {spec && (
        <LineGraphPanel
          line={line}
          spec={spec}
          context={{ definition, maxAuthority: definition?.maxAuthority ?? card.authority, triggers: graphTriggers }}
          runsTotal={card.runs_total ?? 0}
          onSelectStep={setSelected}
        />
      )}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        {definition ? <LineDefinitionPanel line={definition} retains={retains} triggers={landing} /> : <Panel title="Line definition">{proof.isPending ? <LoadState /> : proof.error ? <LoadState error={proof.error} /> : null}</Panel>}
        {spec && <ProcedureDefinition spec={spec} line={definition} selectedStep={selected} />}
      </div>
    </>
  );
}

/**
 * The Procedure's graph wrapped by the Line (its Triggers and parameters on
 * the left, its max authority on the terminals) and, when the Line has runs,
 * a run picker: a picked run marks each step with what happened there, from
 * the run's card, journal and receipt.
 */
function LineGraphPanel({
  line,
  spec,
  context,
  runsTotal,
  onSelectStep,
}: {
  line: string;
  spec: ProcedureSpec;
  context: Parameters<typeof ProcedureGraph>[0]["line"];
  runsTotal: number;
  onSelectStep: (step: string | null) => void;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const runs = useLineRuns(runsTotal > 0 ? line : null);
  const runRows = runs.data?.runs?.runs ?? [];
  const [picked, setPicked] = useState<string | null>(null);
  const runCard = cardOf(useCard(picked ? `ProcedureRun:${picked}` : null).data, "procedure_run");
  const runState = useRunState(picked);
  const model = useMemo(() => buildProcedureGraph(spec), [spec]);
  const marks = useMemo(() => {
    if (!picked || !runCard) return null;
    const ids = model.nodes.filter((n) => n.id !== INPUT_NODE).map((n) => n.id);
    // A pending input names the source step that reads it (its alias or id).
    const inputStep = (name: string) => model.nodes.find((n) => n.view?.kind === "source" && (n.view.name === name || n.id === name))?.id ?? null;
    return runMarks(ids, runCard, runState.data ?? null, inputStep);
  }, [picked, runCard, runState.data, model]);
  return (
    <Panel
      title="Steps"
      meta={
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span>Arrows: what each step reads · dashed: where a guard goes otherwise · click a step to follow it</span>
          {runsTotal > 0 && (
            <label className="inline-flex items-baseline gap-1.5">
              <span>Run</span>
              <select
                value={picked ?? ""}
                onChange={(e) => setPicked(e.target.value || null)}
                className="w-80 max-w-full border border-zinc-800 bg-zinc-950 px-1 py-px font-mono text-[12px] text-zinc-200"
                aria-label="Mark the steps with a run"
              >
                <option value="">None</option>
                {runRows.map((run) => (
                  <option key={run.run} value={runId(run.run)}>
                    {shortRunId(run.run)} · {term("run", run.status).word} · {formatWhen(run.started_at)}
                  </option>
                ))}
              </select>
            </label>
          )}
        </span>
      }
    >
      <ProcedureGraph spec={spec} line={context} run={marks} onSelectStep={onSelectStep} />
      {picked && (
        <div className="mt-2 space-y-0.5 text-[12px] text-zinc-500">
          {runCard ? (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span>Each step marked with what happened in run</span>
              <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(picked)}`)} className="font-mono text-zinc-300 hover:underline" title={picked}>
                {shortRunId(picked)}
              </Link>
              <Chip concept="run" value={runCard.status} />
              {runState.data?.receipt_digest ? <span>(its card, journal and receipt)</span> : <span>(its card and journal; the receipt is withheld or not written yet)</span>}
            </div>
          ) : (
            <LoadState />
          )}
          {marks?.partial && <div>The run card lists only the latest {runCard?.nodes?.length ?? 0} of {runCard?.nodes_done} finished nodes; the run's journal marks the rest as ran.</div>}
          {(marks?.others.length ?? 0) > 0 && (
            <div>
              Also in this run, with no step of their own here:{" "}
              {marks!.others.map((o, i) => (
                <span key={o.node}>
                  {i > 0 && ", "}
                  <span className="font-mono text-zinc-400">{o.node}</span> {o.term.word.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}

/** What the Line does, in its Procedure's own words. */
function LineSummary({ procedure }: { procedure: string }) {
  const read = useCard(`Procedure:${procedure}`);
  const card = cardOf(read.data, "procedure");
  if (!card?.description) return null;
  return <LongText text={card.description} lines={3} className="t-lede" />;
}

type LineCard = Schemas["GetLineCard"];
type RunRow = Schemas["RunRow"];
type InboxEntry = Schemas["InboxListEntry"];

/** Occurrences due (waiting for dispatch: amber) and scheduled. */
export function DueCount({ due, scheduled }: { due: number; scheduled: number }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 font-mono">
      {due > 0 && <SignalDot signal="waiting" title={term("occurrence", "due").meaning} />}
      {due} / {scheduled}
    </span>
  );
}

function OperationsPanel({ card }: { card: LineCard }) {
  return (
    <Panel title="Triggers and enablement" meta={<span>{card.due ?? 0} due · {card.waiting ?? 0} scheduled</span>}>
      <div className="space-y-0.5 text-[13px]">
        {(card.triggers ?? []).map((trigger) => (
          <div key={trigger.trigger} className="flex flex-wrap gap-x-3">
            <RefLink value={trigger.trigger} />
            <span className="text-zinc-500">v{trigger.version}</span>
            <span className="text-zinc-400">{sentence(trigger.fires)}</span>
          </div>
        ))}
        {(card.triggers ?? []).length === 0 && <div className="text-zinc-600">No triggers aimed at this Line.</div>}
      </div>
      <div className="mt-2 space-y-1 text-[12px]">
        {(card.enablements ?? []).map((arm) => (
          <div key={arm.enablement} className="border-t border-zinc-800/70 pt-1.5">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <Chip concept="line" value={arm.state} />
              <span className="text-zinc-400">
                by{" "}
                {arm.enabled_by_withheld ? (
                  <span className="text-zinc-600" title="Withheld from this credential">withheld</span>
                ) : (
                  <span className="font-mono">{arm.enabled_by ?? arm.principal_kind}</span>
                )}
              </span>
              <span className="text-zinc-500" title={arm.enabled_at}>
                since {formatWhen(arm.enabled_at)}
              </span>
              <span className="text-zinc-500" title={arm.evaluated_until}>
                evaluated until {formatWhen(arm.evaluated_until)}
              </span>
              {(arm.pending_automatic ?? 0) + (arm.pending_explicit ?? 0) > 0 && (
                <span className="text-zinc-500">
                  pending {arm.pending_automatic ?? 0} automatic · {arm.pending_explicit ?? 0} explicit
                </span>
              )}
            </div>
            {(arm.stop_reason || arm.detail) && (
              <div className="text-zinc-300">
                <span className="text-zinc-500">{arm.stop_reason ? "stopped because " : ""}</span>
                {arm.stop_reason ?? arm.detail}
              </div>
            )}
          </div>
        ))}
        {(card.enablements ?? []).length === 0 && <div className="text-zinc-500">{term("line", "not_enabled").meaning}.</div>}
      </div>
      {(card.occurrences ?? []).length > 0 && (
        <div className="mt-2 space-y-0.5 text-[12px]">
          {card.occurrences!.map((occurrence) => (
            <div key={occurrence.occurrence} className="flex flex-wrap items-baseline gap-x-3">
              <Chip concept="occurrence" value={occurrence.state} />
              <ShortId value={occurrence.occurrence} />
              <span className="text-zinc-500" title={occurrence.eligible_at}>
                eligible {formatWhen(occurrence.eligible_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function RunsPanel({ line, total }: { line: string; total: number }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const [cursors, setCursors] = useState<string[]>([]);
  const read = useLineRuns(line, cursors[cursors.length - 1]);
  const runs = read.data?.runs?.runs ?? [];
  const runColumns = useMemo<Column<RunRow>[]>(
    () => [
      {
        id: "run",
        header: "Run",
        hideable: false,
        sortValue: (run) => runId(run.run),
        filter: { kind: "text", text: (run) => runId(run.run) },
        cell: (run) => (
          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="font-mono text-zinc-200 hover:underline" title={runId(run.run)}>
            {shortRunId(run.run)}
          </Link>
        ),
      },
      {
        id: "status",
        header: "Outcome",
        sortValue: (run) => term("run", run.status).word,
        filter: { kind: "enum", values: (run) => [term("run", run.status).word] },
        className: "whitespace-nowrap",
        cell: (run) => <Chip concept="run" value={run.status} />,
      },
      {
        id: "started",
        header: "Started",
        sortValue: (run) => run.started_at,
        className: "whitespace-nowrap text-zinc-500",
        cell: (run) => <span title={run.started_at}>{formatWhen(run.started_at)}</span>,
      },
      {
        id: "nodes",
        header: "Nodes done",
        numeric: true,
        sortValue: (run) => run.nodes_done,
        className: "text-[12px] text-zinc-500",
        cell: (run) => run.nodes_done,
      },
    ],
    [instanceId, link],
  );
  return (
    <Panel
      title="Runs"
      meta={
        <span className="flex gap-2">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
          )}
          <span>
            Page {cursors.length + 1} · {total} in all
          </span>
          {read.data?.next_cursor && (
            <button onClick={() => setCursors((c) => [...c, read.data!.next_cursor!])} className="hover:text-zinc-200">
              Older →
            </button>
          )}
        </span>
      }
    >
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {read.data && (
        <DataTable
          rows={runs}
          columns={runColumns}
          rowKey={(run) => run.run}
          urlKey="runs"
          label="Runs"
          partial={total > runs.length ? `${cursors.length === 0 ? "the newest" : "this page of"} ${runs.length} of ${total} runs` : null}
          empty="No runs yet."
        />
      )}
    </Panel>
  );
}

function LineNextPanel({ line }: { line: string }) {
  const next = useNext({ limit: NEXT_PAGE });
  const rows = nextRowsByLine(next.data?.items ?? []).get(line) ?? [];
  if (!next.data || rows.length === 0) return null;
  return (
    <Panel title="Next" meta={<span>{rows.length} on the first page</span>}>
      <NextTable
        items={rows}
        urlKey="next"
        label={`Next for ${line}`}
        partial={next.data.next_cursor ? `the ${rows.length} on the first page of next` : null}
      />
    </Panel>
  );
}

function ProcedurePanel({ procedure }: { procedure: string }) {
  const read = useCard(`Procedure:${procedure}`);
  const card = cardOf(read.data, "procedure");
  return (
    <Panel title="Track record and measurements">
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {card && (
        <div className="space-y-3 text-[13px]">
          <div>
            <h3 className="mb-0.5 text-[12px] font-semibold text-zinc-300">Track record</h3>
            {(card.track_record ?? []).length === 0 && <div className="text-zinc-500">No promoted record yet.</div>}
            {(card.track_record ?? []).map((record) => (
              <div key={record.promotion_digest} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-zinc-300">{record.promotion}</span>
                <span className="text-zinc-500">
                  runs {record.first_sequence}–{record.last_sequence}
                </span>
                <span className="text-zinc-300">
                  <ShownValue value={record.output} />
                </span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-0.5 text-[12px] font-semibold text-zinc-300">Measurement reviews</h3>
            {(card.measurement_reviews ?? []).length === 0 && <div className="text-zinc-500">No measurements declared.</div>}
            {(card.measurement_reviews ?? []).map((review) => (
              <div key={review.measurement_name} className="border-t border-zinc-800/70 py-1 first:border-t-0">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-zinc-300">{review.measurement_name}</span>
                  <span className="text-zinc-500">{review.contract_id}</span>
                  {review.standing_resolution_id && <span className="text-zinc-500">standing {review.standing_resolution_id}</span>}
                  {review.unavailable && <span className="text-zinc-500">Unavailable</span>}
                </div>
                {(review.history ?? []).map((disposition) => (
                  <div key={disposition.disposition_id} className="flex flex-wrap items-baseline gap-x-3 pl-3">
                    <Chip concept="reading" value={disposition.verdict} />
                    <span className="font-mono text-zinc-400">{disposition.reviewer_id}</span>
                    <span className="text-zinc-500">{formatDateTime(disposition.recorded_at)}</span>
                    {disposition.reason && <span className="text-zinc-400">{disposition.reason}</span>}
                  </div>
                ))}
                {review.history_truncated && (
                  <div className="pl-3 text-zinc-600">{review.history_total} dispositions in all</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-0.5 text-[12px] font-semibold text-zinc-300">Readings</h3>
            <Readings procedure={procedure} />
          </div>
        </div>
      )}
    </Panel>
  );
}

function MandatesPanel({ procedure }: { procedure: string }) {
  const mandates = useMandates();
  const rows = (mandates.data?.rows ?? []).filter((m) => m.procedure.replace(/^Procedure:/, "") === procedure);
  return (
    <Panel title="Mandates" meta={<span>{rows.length}</span>}>
      {mandates.isPending && <LoadState />}
      {mandates.data && rows.length === 0 && <EmptyState>No mandate binds this Procedure: its runs can at most propose.</EmptyState>}
      <div className="space-y-2">
        {rows.map((mandate) => (
          <MandateDetail key={mandate.mandate} mandate={mandate} />
        ))}
      </div>
    </Panel>
  );
}

function MandateDetail({ mandate }: { mandate: Schemas["OrientMandate"] }) {
  const name = mandate.mandate.replace(/^(Procedure)?Mandate:/, "");
  const read = useCard(`Mandate:${name}`);
  const card = cardOf(read.data, "mandate");
  const condition = card?.condition ?? null;
  const query = useCard(condition?.query ?? null);
  const queryCard = cardOf(query.data, "query");
  return (
    <div className="text-[12px]">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-mono text-zinc-200">{name}</span>
        <span className="text-zinc-400" title={term("authority", mandate.grants).meaning}>{term("authority", mandate.grants).word.toLowerCase()}</span>
        <Chip concept="mandate" value={mandate.suspended ? "suspended" : mandate.state} />
        <span className="text-zinc-500">expires {formatDateTime(mandate.expires_at)}</span>
      </div>
      {read.error && <div className="text-red-400/80">{read.error.message}</div>}
      {card && (
        <dl className="mt-0.5 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 pl-2">
          <dt className="text-zinc-600">Namespace</dt>
          <dd className="font-mono text-zinc-400">{(card.namespace ?? []).join(", ") || "—"}</dd>
          <dt className="text-zinc-600">Scope</dt>
          <dd>
            {(card.scope ?? []).length === 0 && <span className="text-zinc-600">—</span>}
            {(card.scope ?? []).map((scope) => (
              <div key={scope.claim_type}>
                <RefLink value={scope.claim_type} /> <span className="text-zinc-500">{scope.change_kinds.join(", ")} · binds {scope.binds}</span>
              </div>
            ))}
          </dd>
          <dt className="text-zinc-600">Subjects</dt>
          <dd className="text-zinc-400">
            {card.subject_scope == null ? "Any in scope" : card.subject_scope.map((path) => <RefLink key={path} value={path} />)}
          </dd>
          <dt className="text-zinc-600">Condition</dt>
          <dd className="text-zinc-400">
            {condition ? (
              <>
                <RefLink value={condition.query} /> binds <span className="font-mono">{condition.binding_parameter}</span>, requires{" "}
                <span className="font-mono">{condition.required_fields.join(", ")}</span>, otherwise {condition.fallback}
                {Object.keys(condition.fixed_parameters ?? {}).length > 0 && (
                  <code className="ml-1 font-mono text-zinc-500">{JSON.stringify(condition.fixed_parameters)}</code>
                )}
                {queryCard?.description && <div className="text-zinc-500">{queryCard.description}</div>}
                {(queryCard?.params ?? []).length > 0 && (
                  <div className="text-zinc-600">
                    Params: {queryCard!.params!.map((p) => `${p.name}: ${p.type}${p.required ? "" : "?"}`).join(", ")}
                  </div>
                )}
              </>
            ) : (
              "None (unconditional)"
            )}
          </dd>
          {(card.subject_creation ?? []).length > 0 && (
            <>
              <dt className="text-zinc-600">May create</dt>
              <dd className="font-mono text-zinc-400">{card.subject_creation!.join(", ")}</dd>
            </>
          )}
        </dl>
      )}
    </div>
  );
}

function Readings({ procedure }: { procedure: string }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const read = useReadings(procedure, READINGS_PAGE, cursors[cursors.length - 1]);
  const instanceId = useInstanceId();
  const link = useAtLink();
  const data = read.data;
  return (
    <div>
      {(cursors.length > 0 || data?.cursor) && (
      <div className="t-meta mb-1 flex gap-2">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
          )}
          <span>Page {cursors.length + 1}</span>
          {data?.cursor && (
            <button onClick={() => setCursors((c) => [...c, data.cursor!])} className="hover:text-zinc-200">
              Older →
            </button>
          )}
      </div>
      )}
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {data && (
        <div className="space-y-2 text-[12px]">
          {data.contracts.map((contract) => (
            <div key={contract.contract_id} className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-zinc-300">{contract.measurement_name}</span>
              <span className="text-zinc-500">{contract.measurement_kind.replaceAll("_", " ")}</span>
              <span className="text-zinc-500">{contract.status.replaceAll("_", " ")}</span>
              <span className="text-zinc-500">{contract.reading_count} readings</span>
            </div>
          ))}
          {data.readings.length === 0 && <div className="text-zinc-500">No readings on this page.</div>}
          {data.readings.length > 0 && (
            <Table>
              <thead>
                <tr>
                  {["Observed", "Measurement", "Verdict", "Grade", "Subject", "Value", "Run"].map((h) => (
                    <Th key={h}>{h}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.readings.map((reading) => (
                  <tr key={reading.reading_id} className={trClass}>
                    <Td className="whitespace-nowrap text-zinc-500" title={reading.observed_at ?? undefined}>
                      {reading.observed_at ? formatWhen(reading.observed_at) : "—"}
                    </Td>
                    <Td className="font-mono text-[12px] text-zinc-300">{reading.measurement_name ?? "—"}</Td>
                    <Td>
                      <Chip concept="reading" value={reading.verdict} />
                    </Td>
                    <Td className="text-zinc-500">{reading.grade}</Td>
                    <Td className="break-all">
                      <RefLink value={reading.subject.artifact_path} />
                    </Td>
                    <Td className="text-zinc-300">{reading.value !== undefined && <ShownValue value={reading.value} />}</Td>
                    <Td className="whitespace-nowrap">
                      {reading.run_id && (
                        <Link
                          to={link(`/i/${instanceId}/runs/${encodeURIComponent(reading.run_id)}`)}
                          className="font-mono text-zinc-300 hover:underline"
                          title={reading.run_id}
                        >
                          {shortRunId(reading.run_id)}
                        </Link>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {(data.unavailable_reading_count ?? 0) > 0 && (
            <div className="text-zinc-500">{data.unavailable_reading_count} readings' payloads are unavailable.</div>
          )}
        </div>
      )}
    </div>
  );
}

function InboxPanel({ line }: { line: string }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const inbox = useInbox(line, undefined, INBOX_PAGE, cursors[cursors.length - 1]);
  const item = useInboxItem(open);
  const entries = inbox.data?.entries ?? [];
  const inboxColumns = useMemo<Column<InboxEntry>[]>(
    () => [
      {
        id: "status",
        header: "State",
        sortValue: (entry) => term("inbox", entry.item.status).word,
        filter: { kind: "enum", values: (entry) => [entry.item.status] },
        options: ["unread", "acknowledged", "dismissed", "linked"],
        optionLabel: (value) => term("inbox", value).word,
        className: "whitespace-nowrap",
        cell: (entry) => <Chip concept="inbox" value={entry.item.status} />,
      },
      {
        id: "item",
        header: "Item",
        title: "Open an item to read its whole payload",
        hideable: false,
        sortValue: (entry) => entry.item.item_id,
        filter: { kind: "text", text: (entry) => entry.item.item_id },
        className: "whitespace-nowrap",
        cell: (entry) => (
          <button
            onClick={() => setOpen((current) => (current === entry.item.item_id ? null : entry.item.item_id))}
            className="font-mono text-[12px] text-zinc-200 hover:underline"
            title={entry.item.item_id}
          >
            {entry.item.item_id.slice(0, 16)}…
          </button>
        ),
      },
      {
        id: "node",
        header: "Node",
        sortValue: (entry) => entry.item.node_id,
        filter: { kind: "enum", values: (entry) => [entry.item.node_id] },
        className: "font-mono text-[12px] text-zinc-500",
        cell: (entry) => entry.item.node_id,
      },
      {
        id: "seen",
        header: "Seen",
        title: "How many times runs posted it",
        numeric: true,
        sortValue: (entry) => entry.item.occurrences,
        className: "text-[12px] text-zinc-500",
        cell: (entry) => `×${entry.item.occurrences}`,
      },
      {
        id: "last",
        header: "Last seen",
        sortValue: (entry) => entry.item.recent_sightings[0]?.posted_at ?? null,
        className: "whitespace-nowrap text-[12px] text-zinc-500",
        cell: (entry) => {
          const last = entry.item.recent_sightings[0];
          return last ? (
            <>
              {formatDateTime(last.posted_at)} by{" "}
              <RefLink value={`ProcedureRun:${last.run_id}`}>
                <span className="font-mono" title={last.run_id}>
                  {shortRunId(last.run_id)}
                </span>
              </RefLink>
            </>
          ) : (
            "—"
          );
        },
      },
      {
        id: "preview",
        header: "Payload",
        filter: { kind: "text", text: (entry) => previewText(entry.payload_preview) },
        className: "max-w-[28rem]",
        cell: (entry) => <InboxPreview value={entry.payload_preview} />,
      },
    ],
    [],
  );
  return (
    <Panel
      title="Inbox"
      meta={
        <span className="flex gap-2">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
          )}
          <span>Page {cursors.length + 1}</span>
          {inbox.data?.next_cursor && (
            <button onClick={() => setCursors((c) => [...c, inbox.data!.next_cursor!])} className="hover:text-zinc-200">
              Older →
            </button>
          )}
        </span>
      }
    >
      {inbox.isPending && <LoadState />}
      {inbox.error && <LoadState error={inbox.error} />}
      {inbox.data && (
        <DataTable
          rows={entries}
          columns={inboxColumns}
          rowKey={(entry) => entry.item.item_id}
          rowLabel={(entry) => entry.item.item_id}
          urlKey="inbox"
          label="Inbox"
          partial={inbox.data.next_cursor || cursors.length > 0 ? `${cursors.length === 0 ? "the newest" : "this page of"} ${entries.length} inbox items` : null}
          open={open}
          onToggle={(id) => setOpen(open === id ? null : id)}
          expanded={() => (
            <div className="border border-zinc-800 bg-zinc-900/40 p-1.5 text-[12px]">
              {item.isPending && <div className="animate-pulse text-zinc-600">Reading…</div>}
              {item.error && <div className="text-red-400/80">{item.error.message}</div>}
              {item.data && (
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-[11px] text-zinc-400">{JSON.stringify(item.data.payload, null, 2)}</pre>
              )}
            </div>
          )}
          empty="Inbox is empty."
        />
      )}
    </Panel>
  );
}

/**
 * An inbox item's payload preview on one line: structured previews as
 * compact JSON, truncated with the whole preview on hover; opening the item
 * reads its full payload.
 */
function previewText(value: unknown): string {
  return typeof value === "string"
    ? value
    : typeof value === "object" && value !== null && typeof (value as { preview?: unknown }).preview === "string"
      ? (value as { preview: string }).preview
      : JSON.stringify(value);
}

function InboxPreview({ value }: { value: unknown }) {
  const text = previewText(value);
  return (
    <div className="truncate font-mono text-[11px] text-zinc-400" title={text}>
      {text}
    </div>
  );
}
