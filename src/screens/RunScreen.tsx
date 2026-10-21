import { Link, useParams } from "react-router-dom";
import { useCard, useInstanceId, useRunState } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { Disclosure, LoadState, Panel, SubSection } from "@/components/Panel";
import { Fact, Page, PageHeader } from "@/components/Page";
import { ShortId, shortId } from "@/components/ShortId";
import { RefLink } from "@/components/RefLink";
import { useAtLink, withAt } from "@/lib/at";
import { captureHandle } from "@/lib/next-reasons";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

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
        id={shortId(run, 16) !== run ? <ShortId value={run} keep={128} className="text-zinc-500" /> : undefined}
        summary={runCard ? <RunSummary card={runCard} /> : undefined}
        facts={
          runCard && (
            <>
              <Fact label="Status">
                <Chip value={runCard.status} tone={runCard.status === "succeeded" ? "green" : runCard.status === "running" ? "blue" : "red"} />
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
                  {runCard.triggered_by.enabled_by_withheld ? <span className="text-zinc-500">withheld</span> : (runCard.triggered_by.enabled_by ?? "—")}
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
                  <span className="text-[12px] text-zinc-500">{node.kind ?? ""}</span>
                  <span>{node.verdict && <Chip value={node.verdict} />}</span>
                  <span className="text-right font-mono text-[12px] text-zinc-500">
                    {node.duration_us != null ? `${(node.duration_us / 1000).toFixed(0)} ms` : ""}
                  </span>
                </div>
              ))}
              {runCard.current_node && (
                <div className="flex gap-3 text-sky-400">
                  running <span className="font-mono">{runCard.current_node.node}</span> since {formatDateTime(runCard.current_node.started_at)}
                </div>
              )}
              {(runCard.nodes?.length ?? 0) < runCard.nodes_done && (
                <div className="text-zinc-600">
                  The card lists the latest {runCard.nodes?.length ?? 0} nodes; the full node list is not served (gap G6).
                </div>
              )}
              {(runCard.pending_inputs ?? []).map((input) => (
                <div key={input.name} className="text-amber-400/90">
                  waiting on input {input.name} since {formatDateTime(input.waiting_since)}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Outcome">
            {runCard.terminal ? <TerminalView terminal={runCard.terminal} /> : <div className="text-[13px] text-zinc-500">No refusal or failure.</div>}
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

      <Panel title="Captures read and receipt" meta={state.data ? <span>{state.data.source_observations?.length ?? 0} Captures</span> : undefined}>
        {state.isPending && <LoadState />}
        {state.error && <LoadState error={state.error} />}
        {state.data && (
          <div className="space-y-1 text-[13px]">
            {(state.data.source_observations ?? []).length === 0 && <div className="text-zinc-500">This run read no Captures.</div>}
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
              <Fact label="Lane">{state.data.lane}</Fact>
              <Fact label="Bound at">
                <Link to={withAt(`/i/${instanceId}`, state.data.bound_coordinate.git_oid.slice(0, 12))} className="font-mono hover:underline">
                  {state.data.bound_coordinate.git_oid.slice(0, 12)}
                </Link>
              </Fact>
              <Fact label="Receipt">
                {state.data.receipt_digest ? (
                  <ShortId value={state.data.receipt_digest} className="text-zinc-200" />
                ) : (
                  <span className="text-zinc-500">withheld or not yet written</span>
                )}
              </Fact>
              {state.data.attribution && (
                <Fact label="Attribution">
                  {"actor_id" in state.data.attribution ? (
                    <span className="font-mono">{state.data.attribution.actor_id}</span>
                  ) : (
                    <span className="text-zinc-500">attribution withheld (names the enabling credential)</span>
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
        <Chip value={terminal.classification ?? "terminal"} tone="red" />
        {code && <span className="font-mono text-zinc-300">{code}</span>}
        {node && <span className="text-zinc-500">at node {node}</span>}
      </div>
      {message && <div className="text-zinc-300">{message}</div>}
      {"repair" in terminal && terminal.repair && "operation" in terminal.repair && (
        <div className="text-zinc-500">repair: {terminal.repair.operation}</div>
      )}
    </div>
  );
}

function EgressView({ egress }: { egress: Egress }) {
  const instanceId = useInstanceId();
  return (
    <div className="border-t border-zinc-800/70 pt-2 text-[13px]">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="text-zinc-300">{egress.kind.replaceAll("_", " ")}</span>
        <Chip value={egress.verdict} tone={egress.verdict === "delivered" || egress.verdict === "prepared" ? "green" : egress.verdict.startsWith("refused") || egress.verdict === "failed" ? "red" : "amber"} />
        <span className="text-zinc-500">
          needs {egress.required_authority}
          {egress.effective_authority && `, had ${egress.effective_authority}`}
          {egress.limiting_term && ` (limited by ${egress.limiting_term.replaceAll("_", " ")})`}
        </span>
        {egress.settle_outcome && <Chip value={egress.settle_outcome} />}
      </div>
      {egress.proposal_id && (
        <div className="break-all">
          proposal <RefLink value={egress.proposal_id} short />
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
      {egress.refusal_code && <div className="text-red-400/90">{egress.refusal_code}</div>}
      {egress.fallback_reason && <div className="text-amber-400/90">{egress.fallback_reason}</div>}
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
            <Fact key={key} label={key.replaceAll("_", " ")}>
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
  const status = card.status.replaceAll("_", " ").replace(/^./, (c) => c.toUpperCase());
  return (
    <>
      <span className="text-zinc-100">{status}</span>
      {card.elapsed_us != null && <> in {(card.elapsed_us / 1e6).toFixed(1)} s</>}, {card.nodes_done} of {card.nodes_total} nodes
      {(card.terminal_egress ?? []).some((e) => e.proposal_id) && <>, produced a proposal</>}
      {card.terminal && <span className="text-red-400">, stopped by {card.terminal.classification ?? "a terminal outcome"}</span>}.
    </>
  );
}
