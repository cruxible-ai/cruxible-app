import { Link, useParams } from "react-router-dom";
import { useCard, useInstanceId, useRunState } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
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
    <div className="max-w-6xl space-y-3">
      <header>
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">Procedure run</div>
        <h1 className="font-mono text-[17px] font-semibold text-zinc-100">{run}</h1>
        {runCard && (
          <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
            <Chip value={runCard.status} tone={runCard.status === "succeeded" ? "green" : runCard.status === "running" ? "blue" : "red"} />
            <RefLink value={runCard.procedure.startsWith("Procedure:") ? runCard.procedure : `Procedure:${runCard.procedure}`} />
            {runCard.triggered_by && (
              <span>
                Line{" "}
                <Link
                  to={link(`/i/${instanceId}/lines/${encodeURIComponent(runCard.triggered_by.line.replace(/^Line:/, ""))}`)}
                  className="font-mono text-zinc-300 hover:underline"
                >
                  {runCard.triggered_by.line.replace(/^Line:/, "")}
                </Link>
                {runCard.triggered_by.occurrence && <span className="font-mono"> · {runCard.triggered_by.occurrence}</span>}
                {runCard.triggered_by.enabled_by_withheld ? (
                  <span className="text-zinc-600"> · enabled by withheld</span>
                ) : (
                  runCard.triggered_by.enabled_by && <span> · enabled by {runCard.triggered_by.enabled_by}</span>
                )}
              </span>
            )}
            <span title={runCard.started_at}>started {formatDateTime(runCard.started_at)}</span>
            {runCard.elapsed_us != null && <span>{(runCard.elapsed_us / 1e6).toFixed(1)} s</span>}
            {runCard.actor && <span className="font-mono">{runCard.actor}</span>}
          </div>
        )}
      </header>
      {card.isPending && <LoadState />}
      {card.error && <LoadState error={card.error} />}

      {runCard && (
        <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-2">
          <Panel title="Nodes" meta={<span>{runCard.nodes_done} of {runCard.nodes_total} done</span>}>
            <div className="space-y-0.5 text-[12px]">
              {(runCard.nodes ?? []).map((node) => (
                <div key={`${node.sequence}\n${node.node}`} className="flex flex-wrap items-baseline gap-x-3">
                  <span className="w-6 text-right font-mono text-zinc-600">{node.sequence}</span>
                  <span className="font-mono text-zinc-200">{node.node}</span>
                  {node.kind && <span className="text-zinc-500">{node.kind}</span>}
                  {node.verdict && <Chip value={node.verdict} />}
                  {node.duration_us != null && <span className="text-zinc-600">{(node.duration_us / 1000).toFixed(0)} ms</span>}
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
            {runCard.terminal ? <TerminalView terminal={runCard.terminal} /> : <div className="text-[12px] text-zinc-500">No refusal or failure.</div>}
            {(runCard.terminal_egress ?? []).length > 0 && (
              <div className="mt-2 space-y-1.5">
                {runCard.terminal_egress!.map((egress, i) => (
                  <EgressView key={`${egress.node_id}\n${i}`} egress={egress} />
                ))}
              </div>
            )}
            {runCard.result !== undefined && runCard.result !== null && (
              <div className="mt-2 text-[12px]">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Result</div>
                <ShownValue value={runCard.result} />
              </div>
            )}
          </Panel>
        </div>
      )}

      <Panel title="Captures read" meta={state.data ? <span>{state.data.source_observations?.length ?? 0}</span> : undefined}>
        {state.isPending && <LoadState />}
        {state.error && <LoadState error={state.error} />}
        {state.data && (
          <div className="space-y-0.5 text-[12px]">
            {(state.data.source_observations ?? []).length === 0 && <div className="text-zinc-600">This run read no Captures.</div>}
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
            <div className="mt-2 flex flex-wrap gap-x-4 text-zinc-500">
              <span>lane {state.data.lane}</span>
              <span>
                bound at{" "}
                <Link to={withAt(`/i/${instanceId}`, state.data.bound_coordinate.git_oid.slice(0, 12))} className="font-mono text-zinc-300 hover:underline">
                  {state.data.bound_coordinate.git_oid.slice(0, 12)}
                </Link>
              </span>
              {state.data.receipt_digest ? (
                <span className="font-mono" title={state.data.receipt_digest}>
                  receipt {state.data.receipt_digest.slice(0, 19)}…
                </span>
              ) : (
                <span>receipt withheld or not yet written</span>
              )}
              {state.data.attribution && "actor_id" in state.data.attribution ? (
                <span>by {state.data.attribution.actor_id}</span>
              ) : state.data.attribution ? (
                <span className="text-zinc-600">attribution withheld (names the enabling credential)</span>
              ) : null}
            </div>
          </div>
        )}
      </Panel>
    </div>
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
    <div className="border-t border-zinc-900 pt-1 text-[12px]">
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
          proposal <RefLink value={egress.proposal_id} />
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
        <div className="flex flex-wrap gap-x-2">
          {egress.target_paths!.slice(0, 12).map((path) => (
            <RefLink key={path} value={path} />
          ))}
          {egress.target_paths!.length > 12 && <span className="text-zinc-600">+{egress.target_paths!.length - 12}</span>}
        </div>
      )}
    </div>
  );
}
