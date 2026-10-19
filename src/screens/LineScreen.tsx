import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCard,
  useGet,
  useInbox,
  useInboxItem,
  useInstanceId,
  useLineRuns,
  useMandates,
  useNext,
  useReadings,
} from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { NextItemRow } from "@/components/next/NextItemRow";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, readMandateProof, runId, shortRunId } from "@/lib/lines";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

const READINGS_PAGE = 50;
const INBOX_PAGE = 50;

const RUN_TONE = (status: string) => (status === "succeeded" ? "green" : status === "running" ? "blue" : "red");

/**
 * One Line: its card (triggers, enablements, due and waiting occurrences),
 * its runs paged newest first (get detail=runs), its Procedure's track record and measurement reviews with
 * their resolution dispositions, readings (paged), the mandates that bind
 * the Procedure with their scope and condition query, the Line's inbox
 * (paged), and its `next` rows. Every read is this Line's or its
 * Procedure's own, a page at a time.
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
  return (
    <div className="max-w-6xl space-y-3">
      <header>
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">Line</div>
        <h1 className="font-mono text-[17px] font-semibold text-zinc-100">{line}</h1>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          <Chip value={lineCard.lifecycle} />
          <span>
            max authority <Chip value={lineCard.authority} tone={lineCard.authority === "settle" ? "violet" : "blue"} />
          </span>
          <span>
            Procedure{" "}
            <RefLink value={`Procedure:${procedure}`}>
              <span className="font-mono text-[12px]">{procedure}</span>
            </RefLink>
          </span>
          <span>trigger {lineCard.trigger}</span>
          {lineCard.triggers_inactive && <span className="text-amber-400/90">triggers {lineCard.triggers_inactive}</span>}
          <span className="font-mono text-[11px]" title={lineCard.identity_digest}>
            {lineCard.identity_digest.slice(0, 19)}…
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-2">
        <OperationsPanel card={lineCard} />
        <RunsPanel line={line} total={lineCard.runs_total ?? 0} />
      </div>
      <LineNextPanel line={line} />
      <ProcedurePanel procedure={procedure} />
      <MandatesPanel procedure={procedure} />
      <ReadingsPanel procedure={procedure} />
      <InboxPanel line={line} />
    </div>
  );
}

type LineCard = Schemas["GetLineCard"];

function OperationsPanel({ card }: { card: LineCard }) {
  return (
    <Panel title="Triggers and enablement" meta={<span>{card.due ?? 0} due · {card.waiting ?? 0} waiting</span>}>
      <div className="space-y-0.5 text-[12px]">
        {(card.triggers ?? []).map((trigger) => (
          <div key={trigger.trigger} className="flex flex-wrap gap-x-3">
            <RefLink value={trigger.trigger} />
            <span className="text-zinc-500">v{trigger.version}</span>
            <span className="text-zinc-400">{trigger.fires}</span>
          </div>
        ))}
        {(card.triggers ?? []).length === 0 && <div className="text-zinc-600">No triggers aimed at this Line.</div>}
      </div>
      <div className="mt-2 space-y-1 text-[12px]">
        {(card.enablements ?? []).map((arm) => (
          <div key={arm.enablement} className="border-t border-zinc-900 pt-1">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <Chip value={arm.state} tone={arm.state === "running" ? "green" : arm.state === "stalled" ? "red" : "zinc"} />
              <span className="text-zinc-400">
                by{" "}
                {arm.enabled_by_withheld ? (
                  <span className="text-zinc-600" title="Withheld from this credential">withheld</span>
                ) : (
                  <span className="font-mono">{arm.enabled_by ?? arm.principal_kind}</span>
                )}
              </span>
              <span className="text-zinc-500" title={arm.enabled_at}>
                since {formatDateTime(arm.enabled_at)}
              </span>
              <span className="text-zinc-500" title={arm.evaluated_until}>
                evaluated until {formatDateTime(arm.evaluated_until)}
              </span>
              {(arm.pending_automatic ?? 0) + (arm.pending_explicit ?? 0) > 0 && (
                <span className="text-zinc-500">
                  pending {arm.pending_automatic ?? 0} automatic · {arm.pending_explicit ?? 0} explicit
                </span>
              )}
            </div>
            {(arm.stop_reason || arm.detail) && <div className="text-amber-400/90">{arm.stop_reason ?? arm.detail}</div>}
          </div>
        ))}
        {(card.enablements ?? []).length === 0 && <div className="text-zinc-600">Not enabled.</div>}
      </div>
      {(card.occurrences ?? []).length > 0 && (
        <div className="mt-2 space-y-0.5 text-[12px]">
          {card.occurrences!.map((occurrence) => (
            <div key={occurrence.occurrence} className="flex gap-3">
              <Chip value={occurrence.state} tone={occurrence.state === "due" ? "amber" : "zinc"} />
              <span className="font-mono text-zinc-400">{occurrence.occurrence}</span>
              <span className="text-zinc-500">eligible {formatDateTime(occurrence.eligible_at)}</span>
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
            page {cursors.length + 1} · {total} in all
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
      {read.data && runs.length === 0 && <EmptyState>No runs yet.</EmptyState>}
      <div className="space-y-0.5 text-[12px]">
        {runs.map((run) => (
          <div key={run.run} className="flex flex-wrap items-baseline gap-x-3">
            <Link
              to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)}
              className="font-mono text-zinc-200 hover:underline"
              title={runId(run.run)}
            >
              {shortRunId(run.run)}
            </Link>
            <Chip value={run.status} tone={RUN_TONE(run.status)} />
            <span className="text-zinc-500" title={run.started_at}>
              {formatDateTime(run.started_at)}
            </span>
            <span className="text-zinc-500">{run.nodes_done} nodes</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function LineNextPanel({ line }: { line: string }) {
  const next = useNext({ limit: NEXT_PAGE });
  const rows = nextRowsByLine(next.data?.items ?? []).get(line) ?? [];
  if (!next.data || rows.length === 0) return null;
  return (
    <Panel title="Next" meta={<span>{rows.length} on the first page</span>}>
      <div className="divide-y divide-zinc-800/60">
        {rows.map((item) => (
          <NextItemRow key={item.item_id} item={item} />
        ))}
      </div>
    </Panel>
  );
}

function ProcedurePanel({ procedure }: { procedure: string }) {
  const read = useCard(`Procedure:${procedure}`);
  const card = cardOf(read.data, "procedure");
  return (
    <Panel title="Procedure track record and measurement reviews">
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {card && (
        <div className="space-y-2 text-[12px]">
          {card.description && <div className="text-zinc-400">{card.description}</div>}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Track record</div>
            {(card.track_record ?? []).length === 0 && <div className="text-zinc-600">No promoted record yet.</div>}
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
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Measurement reviews</div>
            {(card.measurement_reviews ?? []).length === 0 && <div className="text-zinc-600">No measurements declared.</div>}
            {(card.measurement_reviews ?? []).map((review) => (
              <div key={review.measurement_name} className="border-t border-zinc-900 py-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-zinc-300">{review.measurement_name}</span>
                  <span className="text-zinc-500">{review.contract_id}</span>
                  {review.standing_resolution_id && <span className="text-zinc-500">standing {review.standing_resolution_id}</span>}
                  {review.unavailable && <span className="text-amber-400/90">unavailable</span>}
                </div>
                {(review.history ?? []).map((disposition) => (
                  <div key={disposition.disposition_id} className="flex flex-wrap items-baseline gap-x-3 pl-3">
                    <Chip value={disposition.verdict} tone={disposition.verdict === "upheld" ? "green" : "red"} />
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
  const proofRead = useGet(`Mandate:${name}`, "proof");
  const proof = readMandateProof(proofRead.data?.proof);
  const query = useCard(proof?.condition?.query ?? null);
  const queryCard = cardOf(query.data, "query");
  return (
    <div className="text-[12px]">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-mono text-zinc-200">{name}</span>
        <Chip value={mandate.grants} tone={mandate.grants === "settle" ? "violet" : "blue"} />
        <Chip value={mandate.state} tone={mandate.state === "active" ? "green" : mandate.state === "expiring" ? "amber" : "zinc"} />
        <span className="text-zinc-500">expires {formatDateTime(mandate.expires_at)}</span>
        {proof?.suspended && <span className="text-red-400">suspended</span>}
      </div>
      {proofRead.error && <div className="text-red-400/80">{proofRead.error.message}</div>}
      {proof && (
        <dl className="mt-0.5 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 pl-2">
          <dt className="text-zinc-600">namespace</dt>
          <dd className="font-mono text-zinc-400">{proof.namespace.join(", ") || "—"}</dd>
          <dt className="text-zinc-600">scope</dt>
          <dd>
            {proof.scope.length === 0 && <span className="text-zinc-600">—</span>}
            {proof.scope.map((scope) => (
              <div key={scope.claimType}>
                <RefLink value={scope.claimType} /> <span className="text-zinc-500">{scope.changeKinds.join(", ")} · binds {scope.bindingSubjectRole}</span>
              </div>
            ))}
          </dd>
          <dt className="text-zinc-600">Subjects</dt>
          <dd className="text-zinc-400">
            {proof.subjectScope === null ? "any in scope" : proof.subjectScope.map((path) => <RefLink key={path} value={path} />)}
          </dd>
          <dt className="text-zinc-600">condition</dt>
          <dd className="text-zinc-400">
            {proof.condition ? (
              <>
                <RefLink value={proof.condition.query} /> binds <span className="font-mono">{proof.condition.bindingParameter}</span>, requires{" "}
                <span className="font-mono">{proof.condition.requiredFields.join(", ")}</span>, otherwise {proof.condition.fallback}
                {Object.keys(proof.condition.fixedParameters).length > 0 && (
                  <code className="ml-1 font-mono text-zinc-500">{JSON.stringify(proof.condition.fixedParameters)}</code>
                )}
                {queryCard?.description && <div className="text-zinc-500">{queryCard.description}</div>}
                {(queryCard?.params ?? []).length > 0 && (
                  <div className="text-zinc-600">
                    params: {queryCard!.params!.map((p) => `${p.name}: ${p.type}${p.required ? "" : "?"}`).join(", ")}
                  </div>
                )}
              </>
            ) : (
              "none (unconditional)"
            )}
          </dd>
          {proof.subjectCreation.length > 0 && (
            <>
              <dt className="text-zinc-600">may create</dt>
              <dd className="font-mono text-zinc-400">{proof.subjectCreation.join(", ")}</dd>
            </>
          )}
        </dl>
      )}
    </div>
  );
}

function ReadingsPanel({ procedure }: { procedure: string }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const read = useReadings(procedure, READINGS_PAGE, cursors[cursors.length - 1]);
  const instanceId = useInstanceId();
  const link = useAtLink();
  const data = read.data;
  return (
    <Panel
      title="Measurements and readings"
      meta={
        <span className="flex gap-2">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
          )}
          <span>page {cursors.length + 1}</span>
          {data?.cursor && (
            <button onClick={() => setCursors((c) => [...c, data.cursor!])} className="hover:text-zinc-200">
              Older →
            </button>
          )}
        </span>
      }
    >
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {data && (
        <div className="space-y-2 text-[12px]">
          {data.contracts.map((contract) => (
            <div key={contract.contract_id} className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-zinc-300">{contract.measurement_name}</span>
              <span className="text-zinc-500">{contract.measurement_kind.replaceAll("_", " ")}</span>
              <Chip value={contract.status} tone={contract.status === "resolved" ? "green" : contract.status === "open" ? "amber" : "zinc"} />
              <span className="text-zinc-500">{contract.reading_count} readings</span>
            </div>
          ))}
          {data.readings.length === 0 && <div className="text-zinc-600">No readings on this page.</div>}
          {data.readings.length > 0 && (
            <table className="w-full text-left">
              <thead className="text-zinc-600">
                <tr>
                  {["Observed", "Measurement", "Verdict", "Grade", "Subject", "Value", "Run"].map((h) => (
                    <th key={h} className="pr-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.readings.map((reading) => (
                  <tr key={reading.reading_id} className="border-t border-zinc-900 align-top">
                    <td className="pr-3 text-zinc-500">{reading.observed_at ? formatDateTime(reading.observed_at) : "—"}</td>
                    <td className="pr-3 font-mono text-zinc-300">{reading.measurement_name ?? "—"}</td>
                    <td className="pr-3">
                      <Chip value={reading.verdict} tone={reading.verdict === "satisfied" ? "green" : reading.verdict === "contradicted" ? "red" : "zinc"} />
                    </td>
                    <td className="pr-3 text-zinc-500">{reading.grade}</td>
                    <td className="pr-3">
                      <RefLink value={reading.subject.artifact_path} />
                    </td>
                    <td className="pr-3 text-zinc-300">{reading.value !== undefined && <ShownValue value={reading.value} />}</td>
                    <td>
                      {reading.run_id && (
                        <Link
                          to={link(`/i/${instanceId}/runs/${encodeURIComponent(reading.run_id)}`)}
                          className="font-mono text-zinc-300 hover:underline"
                          title={reading.run_id}
                        >
                          {shortRunId(reading.run_id)}
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {(data.unavailable_reading_count ?? 0) > 0 && (
            <div className="text-amber-400/90">{data.unavailable_reading_count} readings' payloads are unavailable.</div>
          )}
        </div>
      )}
    </Panel>
  );
}

function InboxPanel({ line }: { line: string }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const inbox = useInbox(line, undefined, INBOX_PAGE, cursors[cursors.length - 1]);
  const item = useInboxItem(open);
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
          <span>page {cursors.length + 1}</span>
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
      {inbox.data && inbox.data.entries.length === 0 && <EmptyState>Inbox is empty.</EmptyState>}
      <div className="divide-y divide-zinc-800/60 text-[12px]">
        {(inbox.data?.entries ?? []).map((entry) => {
          const envelope = entry.item;
          const last = envelope.recent_sightings[0];
          return (
            <div key={envelope.item_id} className="py-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <Chip value={envelope.status} tone={envelope.status === "unread" ? "amber" : "zinc"} />
                <button
                  onClick={() => setOpen(open === envelope.item_id ? null : envelope.item_id)}
                  className="font-mono text-zinc-200 hover:underline"
                  title={envelope.item_id}
                >
                  {envelope.item_id.slice(0, 16)}…
                </button>
                <span className="text-zinc-500">node {envelope.node_id}</span>
                <span className="text-zinc-500">×{envelope.occurrences}</span>
                {last && (
                  <span className="text-zinc-500">
                    last {formatDateTime(last.posted_at)} by{" "}
                    <RefLink value={`ProcedureRun:${last.run_id}`}>
                      <span className="font-mono" title={last.run_id}>
                        {shortRunId(last.run_id)}
                      </span>
                    </RefLink>
                  </span>
                )}
              </div>
              <div className="text-zinc-300">
                <ShownValue value={entry.payload_preview} />
              </div>
              {open === envelope.item_id && (
                <div className="mt-1 border border-zinc-800 bg-zinc-900/40 p-1.5">
                  {item.isPending && <div className="animate-pulse text-zinc-600">Reading…</div>}
                  {item.error && <div className="text-red-400/80">{item.error.message}</div>}
                  {item.data && (
                    <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-[11px] text-zinc-400">
                      {JSON.stringify(item.data.payload, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
