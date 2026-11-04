import { useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCard,
  useGet,
  useGetBatch,
  useInbox,
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
import { Chip, HealthDot, SignalDot } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Fact, Page, PageHeader } from "@/components/Page";
import { LongText } from "@/components/LongText";
import { CopyButton, ShortId } from "@/components/ShortId";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { NextTable } from "@/components/next/NextTable";
import { LineDefinitionPanel } from "@/components/ontology/Definitions";
import { Parts } from "@/components/Parts";
import { InfoButton } from "@/components/InfoButton";
import { ProcedureGraph, type GraphTrigger } from "@/components/graph/ProcedureGraph";
import { readLineEnvelope, retentions, sourceSteps, type LandingTrigger, type ProcedureSpec } from "@/lib/definitions";
import { buildProcedureGraph, INPUT_NODE } from "@/lib/procedure-graph";
import { runMarks } from "@/lib/run-marks";
import { mandateContext, mandateTable, type MandateContext, type MandateRow } from "@/lib/mandate-words";
import { runChangedWords } from "@/lib/step-words";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, runId, shortRunId } from "@/lib/lines";
import { formatDateTime, formatWhen, sentence } from "@/lib/text";
import { LineStateDot } from "@/components/LineStateDot";
import { usePageTitle } from "@/lib/usePageTitle";
import { localCronWords, wakeOf } from "@/lib/schedule";
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
  // What the Line does, in its Procedure's own words (authored prose: shown as written).
  const described = cardOf(useCard(lineCard ? lineCard.procedure : null).data, "procedure")?.description ?? null;
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
        summary={described ? <LongText text={described} lines={3} className="t-lede" /> : undefined}
        facts={
          <>
            <Fact label="State">
              <span className="inline-flex items-center gap-3">
                {lineCard.lifecycle !== "live" && <Chip concept="line" value={lineCard.lifecycle} />}
                <span className="inline-flex items-center gap-1.5">
                  <LineStateDot state={enablement?.state ?? null} running={lineCard.recent_runs?.[0]?.status === "running"} />
                  <Chip concept="line" value={enablement ? enablement.state : "not_enabled"} />
                </span>
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
            <Fact label={(lineCard.triggers_total ?? lineCard.triggers?.length ?? 0) === 1 ? "Trigger" : "Triggers"}>
              <a href="#triggers" className="font-mono hover:underline">
                {lineCard.triggers_total ?? lineCard.triggers?.length ?? 0}
              </a>
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

      {!enablement && <NotEnabledBanner line={line} />}
      {/* What it is (steps, definition) and what it has posted come first; how it runs and what it ran follow. */}
      <DefinitionPanels
        line={line}
        card={lineCard}
        procedure={procedure}
        triggersPanel={<TriggersPanel card={lineCard} />}
        inbox={<InboxPanel line={line} />}
        runs={<RunsPanel line={line} total={lineCard.runs_total ?? 0} />}
      />
      <LineNextPanel line={line} />
      {/* A lone panel (no track record to show) takes the whole row. */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:[&>:only-child]:col-span-2">
        <MandatesPanel line={line} procedure={procedure} />
        <ProcedurePanel procedure={procedure} />
      </div>
    </Page>
  );
}

/**
 * The Line and its Procedure as authored: the Line's envelope (get
 * detail=proof: the typed Line card carries no parameters, trigger input or
 * bindings), the Procedure's authored form, and its Triggers' cards for the
 * logical sources a landing Trigger selects.
 */
/**
 * The page's body, top to bottom: what the Line is (its definition) beside
 * what starts it (Triggers); its steps; what it has posted (Inbox); its
 * Procedure as authored beside what it ran (Runs). Side-by-side panels share
 * a row height.
 */
function DefinitionPanels({
  line,
  card,
  procedure,
  triggersPanel,
  inbox,
  runs,
}: {
  line: string;
  card: LineCard;
  procedure: string;
  triggersPanel: ReactNode;
  inbox: ReactNode;
  runs: ReactNode;
}) {
  const triggers = (card.triggers ?? []).map((t) => t.trigger);
  const proof = useGet(`Line:${line}`, "proof");
  const procedureRead = useCard(`Procedure:${procedure}`);
  const triggerCards = useGetBatch(triggers);
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
    return { name, words: cron ? localCronWords(cron) : t.fires, landing: false };
  });
  const retains = definition && spec ? retentions(sourceSteps(procedure, spec), [definition]).filter((r) => r.line === line) : [];
  if (!definition && !spec && proof.error) return <LoadState error={proof.error} />;
  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {definition ? (
          <LineDefinitionPanel line={definition} retains={retains} triggers={landing} />
        ) : (
          <Panel title="Line definition">{proof.isPending ? <LoadState /> : null}</Panel>
        )}
        {triggersPanel}
      </div>
      {spec && (
        <LineGraphPanel
          line={line}
          spec={spec}
          context={{ definition, triggers: graphTriggers }}
          runsTotal={card.runs_total ?? 0}
        />
      )}
      {/* The Procedure as authored lives on the steps graph: click a step for what it names, binds and produces. */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {inbox}
        {runs}
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
}: {
  line: string;
  spec: ProcedureSpec;
  context: Parameters<typeof ProcedureGraph>[0]["line"];
  runsTotal: number;
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
    // A pending input names the call that reads it (its name or id).
    const inputStep = (name: string) => model.nodes.find((n) => n.view?.kind === "call" && (n.view.name === name || n.id === name))?.id ?? null;
    return runMarks(ids, runCard, runState.data ?? null, inputStep);
  }, [picked, runCard, runState.data, model]);
  return (
    <Panel
      title="Steps"
      meta={
        <span className="flex flex-wrap items-baseline gap-x-3">
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
      <ProcedureGraph spec={spec} line={context} run={marks} />
      {picked && (
        <div className="mt-2 space-y-0.5 text-[12px] text-zinc-500">
          {runCard ? (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span>Marked with run</span>
              <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(picked)}`)} className="font-mono text-zinc-300 hover:underline" title={picked}>
                {shortRunId(picked)}
              </Link>
              <Chip concept="run" value={runCard.status} />
              <span title="Where the marks come from">{runState.data?.receipt_digest ? "card · journal · receipt" : "card · journal (no receipt)"}</span>
            </div>
          ) : (
            <LoadState />
          )}
          {marks?.partial && (
            <div title="The run card lists only the latest finished nodes; the journal marks the rest">
              card: latest {runCard?.nodes?.length ?? 0} of {runCard?.nodes_done} nodes · rest from journal
            </div>
          )}
          {(marks?.others.length ?? 0) > 0 && (
            <div>
              <span title="Nodes this run reports that have no step here">Other nodes:</span>{" "}
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

/** Shown while a Line was never enabled: the state, the command that enables it, and why it matters behind an ⓘ. */
function NotEnabledBanner({ line }: { line: string }) {
  const command = `cruxible line enable ${line}`;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-[13px] text-zinc-300">
      <span className="inline-flex items-center gap-1.5">
        <HealthDot tone="off" title="Not enabled" />
        <Chip concept="line" value="not_enabled" />
      </span>
      <code className="font-mono text-[12px] text-zinc-400">{command}</code>
      <CopyButton value={command} label="Copy" />
      <InfoButton label="What enabling does">Until the Line is enabled, none of its Triggers start runs; it runs only when started by hand.</InfoButton>
    </div>
  );
}

type LineTrigger = NonNullable<LineCard["triggers"]>[number];
type LineEnablement = NonNullable<LineCard["enablements"]>[number];

/** The Triggers table's columns: each Trigger, when it fires, whether the current enablement armed it, its next fire. */
function triggerColumns(current: LineEnablement | undefined, armed: ReadonlySet<string>, now: Date): Column<LineTrigger>[] {
  const view = (trigger: LineTrigger) => {
    const name = trigger.trigger.replace(/^Trigger:/, "");
    const on = current?.state === "running" && armed.has(name);
    const state = !current ? "not enabled" : on ? "armed" : current.state === "running" ? "not armed by this enablement" : term("line", current.state).word.toLowerCase();
    return { name, wake: wakeOf(trigger.fires, now), on, state };
  };
  return [
    {
      id: "trigger",
      header: "Trigger",
      className: "max-w-[14rem]",
      cell: (trigger) => (
        <span className="flex min-w-0 items-baseline gap-1.5" title={`${trigger.trigger} v${trigger.version}`}>
          <RefLink value={trigger.trigger}>
            <span className="block truncate font-mono text-[12px]">{view(trigger).name.replace(/^security\./, "")}</span>
          </RefLink>
          <span className="shrink-0 text-[11px] text-zinc-600">v{trigger.version}</span>
        </span>
      ),
    },
    { id: "fires", header: "Fires", className: "whitespace-nowrap text-[12px] text-zinc-300", cell: (trigger) => sentence(view(trigger).wake.words) },
    {
      id: "armed",
      header: "Armed",
      title: "Whether the Line's current enablement armed this Trigger",
      className: "whitespace-nowrap text-[12px]",
      cell: (trigger) => {
        const { on, state } = view(trigger);
        return (
          <span className="inline-flex items-center gap-1.5 text-zinc-300">
            <HealthDot tone={on ? "ok" : "off"} title={state} />
            {sentence(state)}
          </span>
        );
      },
    },
    {
      id: "next",
      header: "Next fire",
      className: "whitespace-nowrap text-[12px] text-zinc-400",
      cell: (trigger) => {
        const { wake, on } = view(trigger);
        // Only an armed Trigger fires: one that is not shows a dash, and when it would fire on hover.
        if (!on) {
          const would = wake.landing ? "on a landing" : wake.next ? `at ${formatWhen(wake.next.toISOString())}` : null;
          return <span title={would ? `Would fire ${would} if armed` : "Not armed"}>—</span>;
        }
        return wake.landing ? "On landing" : wake.next ? <span title={wake.next.toISOString()}>{formatWhen(wake.next.toISOString())}</span> : "—";
      },
    },
  ];
}

/**
 * The Triggers aimed at the Line, one row each: when it fires, whether the
 * current enablement armed it (the enablement lists the Triggers it armed),
 * and the next scheduled fire; the enablement history under the table.
 */
function TriggersPanel({ card }: { card: LineCard }) {
  const current = (card.enablements ?? [])[0];
  const armed = new Set((current?.triggers ?? []).map((t) => t.trigger.replace(/^Trigger:/, "")));
  const now = new Date();
  return (
      <Panel title="Triggers" meta={<span id="triggers">{card.due ?? 0} due · {card.waiting ?? 0} scheduled</span>}>
        {(card.triggers ?? []).length === 0 ? (
          <div className="flex items-center gap-1.5 text-[13px] text-zinc-600">
            None
            <span className="t-meta">No Trigger is aimed at this Line: it runs only when started by hand.</span>
          </div>
        ) : (
          <DataTable
            rows={card.triggers ?? []}
            columns={triggerColumns(current, armed, now)}
            rowKey={(trigger) => trigger.trigger}
            label="Triggers"
            toolbar={false}
            maxHeight="none"
          />
        )}
        {(card.enablements ?? []).length > 0 && (
          <div className="mt-3 space-y-1 text-[12px]">
            <div className="t-meta">Enablements</div>
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
          </div>
        )}
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
  // Each run's card, for what it changed (its nodes' summaries).
  const runCards = useGetBatch(runs.map((run) => `ProcedureRun:${runId(run.run)}`));
  const changedKey = JSON.stringify(runCards.results.map((r) => [r.ref, cardOf(r, "procedure_run")?.nodes?.map((n) => n.summary ?? null) ?? null]));
  const changed = useMemo(() => {
    const out = new Map<string, string | null>();
    for (const result of runCards.results) {
      const card = cardOf(result, "procedure_run");
      if (card) out.set(runId(card.run), runChangedWords(card.nodes));
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by what the cards returned
  }, [changedKey]);
  const runColumns = useMemo<Column<RunRow>[]>(
    () => [
      {
        id: "run",
        header: "Run",
        hideable: false,
        sortValue: (run) => runId(run.run),
        filter: { kind: "text", text: (run) => runId(run.run) },
        cell: (run) => (
          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="whitespace-nowrap font-mono text-zinc-200 hover:underline" title={runId(run.run)}>
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
        id: "changed",
        header: "Changed",
        title: "What the run changed, from its steps' counts (blank: the run kept none)",
        sortValue: (run) => changed.get(runId(run.run)) ?? null,
        className: "whitespace-nowrap text-[12px] text-zinc-300",
        cell: (run) => changed.get(runId(run.run)) ?? "",
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
    [instanceId, link, changed],
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
          empty="None"
        />
      )}
    </Panel>
  );
}

function LineNextPanel({ line }: { line: string }) {
  const next = useNext({ limit: NEXT_PAGE });
  // "Not enabled" is the banner under the header; the panel is for anything else.
  const rows = (nextRowsByLine(next.data?.items ?? []).get(line) ?? []).filter((item) => item.reason !== "line_not_enabled");
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

/** The Procedure's track record, measurement reviews and readings; nothing at all when it has none of them. */
function ProcedurePanel({ procedure }: { procedure: string }) {
  const read = useCard(`Procedure:${procedure}`);
  const card = cardOf(read.data, "procedure");
  const readings = useReadings(procedure, READINGS_PAGE);
  const empty =
    card != null &&
    readings.data !== undefined &&
    (card.track_record ?? []).length === 0 &&
    (card.measurement_reviews ?? []).length === 0 &&
    readings.data.contracts.length === 0 &&
    readings.data.readings.length === 0 &&
    !readings.data.cursor;
  if (empty || (read.isPending && !read.error)) return null;
  return (
    <Panel title="Track record and measurements">
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {card && (
        <div className="space-y-3 text-[13px]">
          <div>
            <h3 className="mb-0.5 text-[12px] font-semibold text-zinc-300">Track record</h3>
            {(card.track_record ?? []).length === 0 && <div className="text-zinc-500">None</div>}
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
            {(card.measurement_reviews ?? []).length === 0 && <div className="text-zinc-500">None declared</div>}
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

/**
 * The Line's Mandates as a table per settle Mandate: each ClaimType, what it
 * settles without review, what it does when a Subject leaves the source, and
 * the bases (on hover); a closing "everything else → review" row when a
 * propose Mandate covers the rest; a propose Mandate as one note line.
 */
function MandatesPanel({ line, procedure }: { line: string; procedure: string }) {
  const mandates = useMandates();
  const spec = cardOf(useCard(`Procedure:${procedure}`).data, "procedure")?.authored ?? null;
  const ctx = useMemo(() => mandateContext(spec), [spec]);
  const rows = (mandates.data?.rows ?? [])
    .filter((m) => lineName(m.line) === line)
    .sort((a, b) => (a.grants === b.grants ? (a.mandate < b.mandate ? -1 : 1) : a.grants === "settle" ? -1 : 1));
  const restToReview = rows.some((m) => m.grants === "propose" && (m.scope ?? []).length === 0 && !m.suspended);
  return (
    <Panel
      title={
        <span className="inline-flex items-center gap-1.5">
          Mandates <InfoButton label="What a Mandate is">{CONCEPT.mandate}</InfoButton>
        </span>
      }
      meta={<span>{rows.length}</span>}
    >
      {mandates.isPending && <LoadState />}
      {mandates.data && rows.length === 0 && (
        <EmptyState>
          <span className="inline-flex items-center gap-1.5">
            None
            <span className="t-meta">Without a Mandate, its runs at most propose.</span>
          </span>
        </EmptyState>
      )}
      <div className="space-y-3">
        {rows.map((mandate) => (
          <MandateDetail key={mandate.mandate} mandate={mandate} ctx={ctx} restToReview={restToReview} />
        ))}
      </div>
    </Panel>
  );
}

/** Plain explanations of Cruxible concepts, behind the ⓘ beside a label. */
const CONCEPT = {
  mandate: "A Mandate is a standing permission for this Line: which kinds of facts (ClaimTypes) its runs may write, and whether they settle on their own or go to a person for review.",
  settles: "Settles: the run's value becomes the accepted fact without review. Anything not settled is proposed and waits for a reviewer.",
  removal: "When a watched item no longer appears in a complete read of the source: retires ends the fact; records absent writes that it is no longer there.",
  basis: "Basis: what the value rests on. extracted: read from the source; absence: missing from a complete read; derived: computed from other facts; measured: a measurement.",
};

type ScopeRow = MandateRow & { rest?: boolean };

function MandateDetail({ mandate, ctx, restToReview }: { mandate: Schemas["OrientMandate"]; ctx: MandateContext; restToReview: boolean }) {
  const name = mandate.mandate.replace(/^(Procedure)?Mandate:/, "");
  const read = useCard(`Mandate:${name}`);
  const card = cardOf(read.data, "mandate");
  const table = card ? mandateTable(card, ctx) : null;
  const columns = useMemo<Column<ScopeRow>[]>(
    () => [
      {
        id: "claim_type",
        header: "ClaimType",
        cell: (row) =>
          row.rest ? (
            <span className="text-zinc-400">everything else</span>
          ) : (
            <span title={`ClaimType:${row.claimType}`}>
              <RefLink value={`ClaimType:${row.claimType}`}>
                <span className="font-mono text-[12px]">{row.claimType.split(".").at(-1)}</span>
              </RefLink>
            </span>
          ),
      },
      {
        id: "settles",
        header: (
          <span className="inline-flex items-center gap-1">
            Settles <InfoButton label="What settles means">{CONCEPT.settles}</InfoButton>
          </span>
        ),
        label: "Settles",
        cell: (row) => <span className={row.settles === "review" ? "text-zinc-500" : "text-zinc-200"}>{row.settles}</span>,
      },
      {
        id: "removal",
        header: (
          <span className="inline-flex items-center gap-1">
            On removal <InfoButton label="What on removal means">{CONCEPT.removal}</InfoButton>
          </span>
        ),
        label: "On removal",
        cell: (row) => <span className={row.onRemoval === "—" ? "text-zinc-600" : "text-zinc-200"}>{row.onRemoval}</span>,
      },
      {
        id: "basis",
        header: (
          <span className="inline-flex items-center gap-1">
            Basis <InfoButton label="What basis means">{CONCEPT.basis}</InfoButton>
          </span>
        ),
        label: "Basis",
        className: "text-[12px] text-zinc-500",
        cell: (row) => row.basis.join(", ") || "—",
      },
    ],
    [],
  );
  const head = (
    <div className="flex flex-wrap items-baseline gap-x-3 text-[12px]">
      <span title={`ProcedureMandate:${name}`}>
        <RefLink value={`Mandate:${name}`}>
          <span className="font-mono text-zinc-100">{name.replace(/^security\./, "")}</span>
        </RefLink>
      </span>
      <span className="text-zinc-400">{mandate.grants === "settle" ? "settles" : "proposes"}</span>
      <Chip concept="mandate" value={mandate.suspended ? "suspended" : mandate.state} />
      <span className="text-zinc-500" title={mandate.expires_at}>
        until {formatDateTime(mandate.expires_at)}
      </span>
    </div>
  );
  if (read.error) return <div className="text-[12px] text-red-400/80">{read.error.message}</div>;
  if (!table) return head;
  // A Mandate with no scope covers anything the Line writes.
  if (table.rows.length === 0) {
    return (
      <div className="flex flex-wrap items-baseline gap-x-3 text-[12px]">
        {head}
        <span className="text-zinc-300">{mandate.grants === "settle" ? "settles: all" : "proposes: all"}</span>
      </div>
    );
  }
  const rows: ScopeRow[] = [...table.rows, ...(mandate.grants === "settle" && restToReview ? [{ claimType: "", settles: "review", onRemoval: "—", basis: [], rest: true }] : [])];
  return (
    <div className="space-y-1">
      {head}
      <dl className="flex flex-wrap gap-x-5 text-[12px]">
        {table.subjects && (
          <div className="flex gap-1.5">
            <dt className="text-zinc-500">Subjects</dt>
            <dd className="text-zinc-300">
              <Parts parts={table.subjects} />
            </dd>
          </div>
        )}
        {table.condition && (
          <div className="flex gap-1.5">
            <dt className="text-zinc-500">Condition</dt>
            <dd className="text-zinc-300">
              <Parts parts={table.condition} />
            </dd>
          </div>
        )}
        {table.creates.length > 0 && (
          <div className="flex gap-1.5">
            <dt className="text-zinc-500">Creates</dt>
            <dd className="text-zinc-300">
              <Parts parts={table.creates} />
            </dd>
          </div>
        )}
      </dl>
      <DataTable rows={rows} columns={columns} rowKey={(row) => row.claimType || "rest"} label={`Mandate ${name}`} toolbar={false} maxHeight="none" />
    </div>
  );
}

type Reading = NonNullable<ReturnType<typeof useReadings>["data"]>["readings"][number];

/** The readings table's columns: when observed, the measurement, verdict, grade, Subject, value and run. */
function readingColumns(instanceId: string, link: (path: string) => string): Column<Reading>[] {
  return [
    {
      id: "observed",
      header: "Observed",
      className: "whitespace-nowrap text-zinc-500",
      cell: (reading) => <span title={reading.observed_at ?? undefined}>{reading.observed_at ? formatWhen(reading.observed_at) : "—"}</span>,
    },
    { id: "measurement", header: "Measurement", className: "font-mono text-[12px] text-zinc-300", cell: (reading) => reading.measurement_name ?? "—" },
    { id: "verdict", header: "Verdict", cell: (reading) => <Chip concept="reading" value={reading.verdict} /> },
    { id: "grade", header: "Grade", className: "text-zinc-500", cell: (reading) => reading.grade },
    { id: "subject", header: "Subject", className: "break-all", cell: (reading) => <RefLink value={reading.subject.artifact_path} /> },
    { id: "value", header: "Value", className: "text-zinc-300", cell: (reading) => reading.value !== undefined && <ShownValue value={reading.value} /> },
    {
      id: "run",
      header: "Run",
      className: "whitespace-nowrap",
      cell: (reading) =>
        reading.run_id && (
          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(reading.run_id)}`)} className="font-mono text-zinc-300 hover:underline" title={reading.run_id}>
            {shortRunId(reading.run_id)}
          </Link>
        ),
    },
  ];
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
          {data.readings.length === 0 && <div className="text-zinc-500">None on this page</div>}
          {data.readings.length > 0 && (
            <DataTable
              rows={data.readings}
              columns={readingColumns(instanceId, link)}
              rowKey={(reading) => reading.reading_id}
              label="Readings"
              toolbar={false}
              maxHeight="none"
            />
          )}
          {(data.unavailable_reading_count ?? 0) > 0 && (
            <div className="text-zinc-500">{data.unavailable_reading_count} payloads unavailable</div>
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
          empty="None"
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
