import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCard, useClaimViewsAt, useInstanceId, useRetainedAt, useReview, useRunState } from "@/api/hooks";
import { cardOf, type AcceptedCoordinate, type Schemas } from "@/api/schemas";
import { Chip, SignalDot } from "@/components/Chip";
import { Disclosure, LoadState, Panel, SubSection } from "@/components/Panel";
import { Fact, Page, PageHeader } from "@/components/Page";
import { CopyButton, ShortId, shortId } from "@/components/ShortId";
import { RefLink } from "@/components/RefLink";
import { ChangeMark } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { ShownValue } from "@/components/ShownValue";
import { changeCounts, changedItems, changeRows, unreviewedClaimsAt, type ChangeRow, type ItemChange } from "@/lib/run-changes";
import { RETAINED_GENERATIONS, useAtLink, withAt } from "@/lib/at";
import { captureHandle } from "@/lib/next-reasons";
import { formatDateTime, sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

type Terminal = NonNullable<Schemas["GetProcedureRunCard"]["terminal"]>;
type Egress = Schemas["ProcedureTerminalEgress"];

/**
 * One Procedure run: its card (status, nodes, current node, trigger,
 * outcomes, terminal, egress with the proposal it produced) and its state
 * (the Captures it read, receipt, attribution). Two reads, both this run's
 * own (the journal's run_id index).
 */
export function RunScreen() {
  const { run = "" } = useParams();
  const card = useCard(`ProcedureRun:${run}`);
  const state = useRunState(run === "" ? null : run);
  const runCard = cardOf(card.data, "procedure_run");
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle(`Run ${run}`);

  return (
    <Page>
      <PageHeader
        kind="Procedure run"
        title={<span title={run}>{shortId(run, 16)}</span>}
        mono
        id={shortId(run, 16) !== run ? <CopyButton value={run} label="Copy run id" /> : undefined}
        summary={runCard ? <RunSummary card={runCard} /> : undefined}
        facts={
          runCard && (
            <>
              <Fact label="Status">
                <Chip concept="run" value={runCard.status} />
              </Fact>
              <Fact label="Procedure">
                <RefLink value={runCard.procedure.startsWith("Procedure:") ? runCard.procedure : `Procedure:${runCard.procedure}`} />
              </Fact>
              {runCard.triggered_by && (
                <Fact label="Line">
                  <Link
                    to={link(`/i/${instanceId}/lines/${encodeURIComponent(runCard.triggered_by.line.replace(/^Line:/, ""))}`)}
                    className="font-mono hover:underline"
                  >
                    {runCard.triggered_by.line.replace(/^Line:/, "")}
                  </Link>
                </Fact>
              )}
              {runCard.triggered_by?.occurrence && (
                <Fact label="Occurrence">
                  <ShortId value={runCard.triggered_by.occurrence} className="text-zinc-200" />
                </Fact>
              )}
              {runCard.triggered_by && (
                <Fact label="Enabled by">
                  {runCard.triggered_by.enabled_by_withheld ? <span className="text-zinc-500">Withheld</span> : (runCard.triggered_by.enabled_by ?? "—")}
                </Fact>
              )}
              <Fact label="Started" title={runCard.started_at}>
                {formatDateTime(runCard.started_at)}
              </Fact>
              {runCard.elapsed_us != null && <Fact label="Elapsed">{(runCard.elapsed_us / 1e6).toFixed(1)} s</Fact>}
              {runCard.actor && (
                <Fact label="Actor">
                  <span className="font-mono">{runCard.actor}</span>
                </Fact>
              )}
            </>
          )
        }
      />
      {card.isPending && <LoadState />}
      {card.error && <LoadState error={card.error} />}

      {runCard && (
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
          <Panel title="Nodes" meta={<span>{runCard.nodes_done} of {runCard.nodes_total} done</span>}>
            <div className="space-y-1 text-[13px]">
              {(runCard.nodes ?? []).map((node) => (
                <div key={`${node.sequence}\n${node.node}`} className="grid grid-cols-[2rem_minmax(8rem,max-content)_minmax(7rem,max-content)_minmax(0,1fr)_auto] items-baseline gap-x-4">
                  <span className="text-right font-mono text-[12px] text-zinc-500">{node.sequence}</span>
                  <span className="font-mono text-zinc-100">{node.node}</span>
                  <span className="text-[12px] text-zinc-500">{node.kind ? sentence(node.kind) : ""}</span>
                  <span>{node.verdict && <Chip concept="run" value={node.verdict} />}</span>
                  <span className="text-right font-mono text-[12px] text-zinc-500">
                    {node.duration_us != null ? `${(node.duration_us / 1000).toFixed(0)} ms` : ""}
                  </span>
                </div>
              ))}
              {runCard.current_node && (
                <div className="flex gap-3 text-zinc-300">
                  Running <span className="font-mono">{runCard.current_node.node}</span> since {formatDateTime(runCard.current_node.started_at)}
                </div>
              )}
              {(runCard.nodes?.length ?? 0) < runCard.nodes_done && (
                <div className="text-zinc-600">
                  Latest {runCard.nodes?.length ?? 0} nodes only (gap G6)
                </div>
              )}
              {(runCard.pending_inputs ?? []).map((input) => (
                <div key={input.name} className="flex items-baseline gap-1.5 text-zinc-300">
                  <SignalDot signal="waiting" title="Waiting on an input: the run continues once it arrives" />
                  Waiting on input {input.name} since {formatDateTime(input.waiting_since)}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Outcome">
            {runCard.terminal ? <TerminalView terminal={runCard.terminal} /> : <div className="text-[13px] text-zinc-500">No refusal or failure</div>}
            {(runCard.terminal_egress ?? []).length > 0 && (
              <div className="mt-2 space-y-1.5">
                {runCard.terminal_egress!.map((egress, i) => (
                  <EgressView key={`${egress.node_id}\n${i}`} egress={egress} />
                ))}
              </div>
            )}
            {runCard.result !== undefined && runCard.result !== null && (
              <SubSection title="Result">
                <ResultView value={runCard.result} />
              </SubSection>
            )}
          </Panel>
        </div>
      )}

      {runCard && <ChangesPanel egress={runCard.terminal_egress ?? []} bound={state.data?.bound_coordinate} boundUnread={state.error !== null} />}

      <Panel title="Captures read and receipt" meta={state.data ? <span>{state.data.source_observations?.length ?? 0} Captures</span> : undefined}>
        {state.isPending && <LoadState />}
        {state.error && <LoadState error={state.error} />}
        {state.data && (
          <div className="space-y-1 text-[13px]">
            {(state.data.source_observations ?? []).length === 0 && <div className="text-zinc-500">None</div>}
            {(state.data.source_observations ?? []).map((observation) => (
              <div key={observation.occurrence_path} className="flex flex-wrap items-baseline gap-x-3">
                {observation.capture_digest ? (
                  <RefLink value={captureHandle(observation.capture_digest)} />
                ) : (
                  <span className="font-mono text-zinc-500">{observation.occurrence_path}</span>
                )}
                {observation.node_id && <span className="text-zinc-500">node {observation.node_id}</span>}
                {observation.input_name && <span className="text-zinc-500">input {observation.input_name}</span>}
              </div>
            ))}
            <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 border-t border-zinc-800/70 pt-2.5">
              <Fact label="Lane">{sentence(state.data.lane)}</Fact>
              <Fact label="Bound at">
                <Link to={withAt(`/i/${instanceId}`, state.data.bound_coordinate.git_oid.slice(0, 12))} className="font-mono hover:underline">
                  {state.data.bound_coordinate.git_oid.slice(0, 12)}
                </Link>
              </Fact>
              <Fact label="Receipt">
                {state.data.receipt_digest ? (
                  <ShortId value={state.data.receipt_digest} className="text-zinc-200" />
                ) : (
                  <span className="text-zinc-500">Withheld or not yet written</span>
                )}
              </Fact>
              {state.data.attribution && (
                <Fact label="Attribution">
                  {"actor_id" in state.data.attribution ? (
                    <span className="font-mono">{state.data.attribution.actor_id}</span>
                  ) : (
                    <span className="text-zinc-500" title="It names the enabling credential">Withheld</span>
                  )}
                </Fact>
              )}
            </dl>
          </div>
        )}
      </Panel>
    </Page>
  );
}

function TerminalView({ terminal }: { terminal: Terminal }) {
  const code = "code" in terminal ? terminal.code : null;
  const message = "message" in terminal ? terminal.message : "reason" in terminal ? terminal.reason : null;
  const node = "node_id" in terminal ? terminal.node_id : "last_node_id" in terminal ? terminal.last_node_id : null;
  return (
    <div className="text-[12px]">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <Chip concept="run" value={terminal.classification ?? "failed"} />
        {code && <span className="font-mono text-zinc-300">{code}</span>}
        {node && <span className="text-zinc-500">at node {node}</span>}
      </div>
      {message && <div className="text-zinc-300">{message}</div>}
      {"repair" in terminal && terminal.repair && "operation" in terminal.repair && (
        <div className="text-zinc-500">Repair: {terminal.repair.operation}</div>
      )}
    </div>
  );
}

function EgressView({ egress }: { egress: Egress }) {
  const instanceId = useInstanceId();
  return (
    <div className="border-t border-zinc-800/70 pt-2 text-[13px]">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="text-zinc-300">{sentence(egress.kind.replaceAll("_", " "))}</span>
        <Chip concept="egress" value={egress.verdict} />
        <span className="text-zinc-500">
          needs {egress.required_authority}
          {egress.effective_authority && `, had ${egress.effective_authority}`}
          {egress.limiting_term && ` (limited by ${egress.limiting_term.replaceAll("_", " ")})`}
        </span>
        {egress.settle_outcome && <span className="text-zinc-500">{egress.settle_outcome.replaceAll("_", " ")}</span>}
      </div>
      {egress.proposal_id && (
        <div className="break-all">
          Proposal <RefLink value={egress.proposal_id} short />
          {egress.accepted_git_oid && (
            <>
              {" "}accepted at{" "}
              <Link to={withAt(`/i/${instanceId}`, egress.accepted_git_oid.slice(0, 12))} className="font-mono text-zinc-300 hover:underline">
                {egress.accepted_git_oid.slice(0, 12)}
              </Link>
            </>
          )}
        </div>
      )}
      {egress.refusal_code && <div className="font-mono text-[12px] text-zinc-300">{egress.refusal_code}</div>}
      {egress.fallback_reason && <div className="text-zinc-400">{egress.fallback_reason}</div>}
      {(egress.target_paths ?? []).length > 0 && (
        <Disclosure className="mt-1" label={`${egress.target_paths!.length} target ${egress.target_paths!.length === 1 ? "path" : "paths"}`} defaultOpen={egress.target_paths!.length <= 4}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-4 gap-y-0.5">
            {egress.target_paths!.map((path) => (
              <span key={path} className="min-w-0 break-all">
                <RefLink value={path} short />
              </span>
            ))}
          </div>
        </Disclosure>
      )}
    </div>
  );
}

/** A run's result: a flat record as labelled facts, anything else as wrapped JSON. */
function ResultView({ value }: { value: unknown }) {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.every(([, v]) => v === null || ["string", "number", "boolean"].includes(typeof v))) {
      return (
        <dl className="flex flex-wrap gap-x-6 gap-y-2">
          {entries.map(([key, v]) => (
            <Fact key={key} label={sentence(key.replaceAll("_", " "))}>
              <span className={typeof v === "number" ? "font-mono" : undefined}>{String(v)}</span>
            </Fact>
          ))}
        </dl>
      );
    }
  }
  return (
    <code className="block max-h-48 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] text-zinc-400">
      {JSON.stringify(value, null, 2)}
    </code>
  );
}

/** "Succeeded in 0.8 s, 8 of 9 nodes. Started Oct 19, 17:31." */
function RunSummary({ card }: { card: Schemas["GetProcedureRunCard"] }) {
  const status = term("run", card.status).word;
  return (
    <>
      <span className="text-zinc-100">{status}</span>
      {card.elapsed_us != null && <> in {(card.elapsed_us / 1e6).toFixed(1)} s</>}, {card.nodes_done} of {card.nodes_total} nodes
      {(card.terminal_egress ?? []).some((e) => e.proposal_id) && <>, produced a proposal</>}
      .
    </>
  );
}

const CHANGE_WORD: Record<ItemChange, string> = { claim: "claim", subject: "new Subject", reobservation: "re-observed", retirement: "retired" };
const COUNT_WORD: Record<ItemChange, [string, string]> = {
  claim: ["claim", "claims"],
  subject: ["new Subject", "new Subjects"],
  reobservation: ["re-observed", "re-observed"],
  retirement: ["retired", "retired"],
};
const DISPOSITION_MARK = { new: "create", revised: "revise", retired: "retire" } as const;

/** Why a re-observed Claim's value is not read: its coordinate is past the retained window, or the run's coordinate is unread. */
type Unread = "window" | "coordinate";
const UNREAD_WHY: Record<Unread, string> = {
  window: `Its generation is older than the ${RETAINED_GENERATIONS} the daemon retains: reading it would rebuild that projection. Open the run's generation to read it.`,
  coordinate: "The run's coordinate is unread.",
};

/**
 * What the run changed, item by item (D-R37 g, CD3): each claims item with a
 * recorded change, its kind, Subject, ClaimType and value, each linked. Reads:
 * the review of the proposal each claims terminal delivered, and one
 * claims/read-batch for re-observed Claims (no member carries them); never one
 * per item. A re-observed Claim is read at the run's own coordinate (where its
 * terminal's items were accepted, else the coordinate the run was bound to;
 * GET /head?at=<oid> resolves an accepted oid and its generation), never the
 * page's or the head: a later revision is not this run's value. A coordinate
 * past the daemon's retained window is not read (the read would rebuild its
 * projection): its values read "not read". Runs from before item changes were
 * recorded show no panel.
 */
function ChangesPanel({ egress, bound, boundUnread }: { egress: Egress[]; bound: AcceptedCoordinate | undefined; boundUnread: boolean }) {
  const items = useMemo(() => changedItems(egress), [egress]);
  const proposal = items.find(({ egress: e }) => e.proposal_id)?.egress.proposal_id ?? null;
  const review = useReview(items.length > 0 ? proposal : null);
  const members = review.data?.members ?? null;
  const missing = useMemo(() => (proposal && review.isPending ? [] : unreviewedClaimsAt(items, members)), [items, members, proposal, review.isPending]);
  const placed = useMemo(
    () => missing.map((g) => ({ ...g, oid: g.accepted ?? bound?.git_oid ?? null })),
    [missing, bound],
  );
  const window = useRetainedAt(useMemo(() => placed.flatMap((g) => (g.oid ? [g.oid] : [])), [placed]));
  // Each group's read: at its coordinate when the daemon retains it; past the window a read would rebuild that projection on a routine visit, so it is not read
  const { groups, unread } = useMemo(() => {
    const groups: { coordinate: AcceptedCoordinate | undefined; ids: string[] }[] = [];
    const unread = new Map<string, Unread>();
    for (const g of placed) {
      if (!g.oid) {
        if (boundUnread) for (const id of g.ids) unread.set(id, "coordinate");
        continue;
      }
      if (window.isPending) continue;
      if (!window.retained.has(g.oid)) {
        for (const id of g.ids) unread.set(id, "window");
        continue;
      }
      groups.push({ coordinate: g.accepted === null || g.accepted === bound?.git_oid ? bound : window.coordinates.get(g.accepted), ids: g.ids });
    }
    return { groups, unread };
  }, [placed, bound, boundUnread, window.isPending, window.retained, window.coordinates]);
  const states = useClaimViewsAt(groups);
  const rows = useMemo(() => changeRows(items, members, states.statements), [items, members, states.statements]);
  if (items.length === 0) return null;
  const counts = changeCounts(rows);
  return (
    <Panel
      title="Changes"
      meta={
        <span className="flex flex-wrap gap-x-3">
          {(Object.keys(CHANGE_WORD) as ItemChange[]).map((k) =>
            counts[k] > 0 ? (
              <span key={k}>
                {counts[k]} {COUNT_WORD[k][counts[k] === 1 ? 0 : 1]}
              </span>
            ) : null,
          )}
        </span>
      }
    >
      {(review.isPending && proposal) || window.isPending || states.isPending ? <LoadState /> : null}
      {review.error && <LoadState error={review.error} />}
      {states.error && <LoadState error={states.error} />}
      <ChangesTable rows={rows} unread={unread} />
    </Panel>
  );
}

function ChangesTable({ rows, unread }: { rows: ChangeRow[]; unread: ReadonlyMap<string, Unread> }) {
  const columns = useMemo<Column<ChangeRow>[]>(
    () => [
      {
        id: "change",
        header: "Change",
        sortValue: (r) => r.change,
        filter: { kind: "enum", values: (r) => [r.change] },
        optionLabel: (v) => CHANGE_WORD[v as ItemChange] ?? v,
        className: "whitespace-nowrap",
        cell: (r) => (
          <span className="inline-flex items-baseline gap-1.5" title={[r.identity && `identity ${r.identity}`, r.digest && `change ${r.digest}`, `${r.node} #${r.index}`].filter(Boolean).join("\n")}>
            {r.disposition ? <ChangeMark change={DISPOSITION_MARK[r.disposition]} /> : r.change === "subject" ? <ChangeMark change="create" /> : <span className="w-[1ch]" />}
            <span className="text-zinc-300">{r.change === "claim" && r.disposition ? r.disposition : CHANGE_WORD[r.change]}</span>
          </span>
        ),
      },
      {
        id: "subject",
        header: "Subject",
        sortValue: (r) => r.subject,
        filter: { kind: "text", text: (r) => r.subject ?? "" },
        className: "break-all",
        cell: (r) => (r.subject ? <RefLink value={r.subject} /> : <span className="text-zinc-600">—</span>),
      },
      {
        id: "claim_type",
        header: "ClaimType",
        sortValue: (r) => r.claimType,
        filter: { kind: "enum", values: (r) => (r.claimType ? [r.claimType] : []) },
        className: "font-mono text-[12px]",
        cell: (r) => (r.claimType ? <RefLink value={`ClaimType:${r.claimType}`}>{r.claimType}</RefLink> : <span className="text-zinc-600">—</span>),
      },
      {
        id: "value",
        header: "Value",
        className: "text-zinc-200",
        cell: (r) =>
          r.value === undefined && r.claim && unread.has(r.claim) ? (
            <span className="text-zinc-500" title={UNREAD_WHY[unread.get(r.claim)!]}>
              not read
            </span>
          ) : r.value === undefined ? (
            <span className="text-zinc-600">—</span>
          ) : (
            <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 ${r.change === "retirement" || r.disposition === "retired" ? "line-through decoration-zinc-500" : ""}`}>
              {r.before !== undefined && (
                <>
                  <span className="text-zinc-500 line-through">
                    <ShownValue value={r.before} />
                  </span>
                  <span className="text-zinc-600">→</span>
                </>
              )}
              <ShownValue value={r.value} />
            </span>
          ),
      },
      {
        id: "item",
        header: "Item",
        className: "whitespace-nowrap",
        cell: (r) => (r.claim ? <RefLink value={r.claim} short /> : r.path ? <RefLink value={r.path} short /> : <span className="text-zinc-600">—</span>),
      },
    ],
    [unread],
  );
  return <DataTable rows={rows} columns={columns} rowKey={(r) => r.key} urlKey="changes" label="Changes" toolbar={rows.length > 10} maxHeight="32rem" />;
}
