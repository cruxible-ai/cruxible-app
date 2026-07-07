import { Link, useParams } from "react-router-dom";
import { useInstanceId, useTrace } from "@/api/hooks";
import { MonoId } from "@/components/MonoId";
import { LoadState, Panel } from "@/components/Panel";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

interface TraceDetail {
  trace_id?: string;
  workflow_name?: string | null;
  step_id?: string | null;
  provider_name?: string;
  provider_version?: string;
  provider_ref?: string;
  provider_entrypoint_digest?: string;
  runtime?: string;
  deterministic?: boolean;
  side_effects?: boolean;
  artifact_name?: string | null;
  artifact_digest?: string | null;
  created_at?: string;
  duration_ms?: number;
  input_payload?: unknown;
  output_payload?: unknown;
  [key: string]: unknown;
}

function PayloadBlock({ title, payload }: { title: string; payload: unknown }) {
  if (payload === undefined || payload === null) return null;
  const text = JSON.stringify(payload, null, 2);
  return (
    <Panel title={title} meta={<span className="font-mono">{(text.length / 1024).toFixed(1)} KB</span>}>
      <details open={text.length < 4000}>
        <summary className="cursor-pointer text-[12px] text-zinc-600 hover:text-zinc-400">
          {text.length < 4000 ? "Collapse" : "Expand"}
        </summary>
        <pre className="mt-1 max-h-[32rem] overflow-auto whitespace-pre-wrap text-[10px] leading-3 text-zinc-400">
          {text}
        </pre>
      </details>
    </Panel>
  );
}

/**
 * One provider execution, fully pinned: which provider (source ref +
 * entrypoint digest), against which pinned artifact, deterministic or not,
 * and the exact input/output payloads. This is the reproducibility record
 * behind a workflow step — the "stochastic can't self-certify" receipt.
 */
export function TraceScreen() {
  const { traceId = "" } = useParams();
  usePageTitle(`Trace ${traceId}`);
  const instanceId = useInstanceId();
  const trace = useTrace(traceId);

  if (trace.isPending) return <LoadState />;
  if (trace.error) return <LoadState error={trace.error} />;
  const t = trace.data as TraceDetail;

  const rows: Array<[string, React.ReactNode]> = [
    [
      "Workflow",
      t.workflow_name ? (
        <Link
          to={`/i/${instanceId}/workflows/${t.workflow_name}`}
          className="font-mono text-[12px] hover:underline"
        >
          {t.workflow_name}
        </Link>
      ) : (
        "—"
      ),
    ],
    ["Step", <span className="font-mono text-[12px]">{t.step_id ?? "—"}</span>],
    [
      "Provider",
      <span className="font-mono text-[12px]">
        {t.provider_name}
        {t.provider_version && ` · ${t.provider_version}`}
      </span>,
    ],
    ["Source", <span className="break-all font-mono text-[10px]">{t.provider_ref ?? "—"}</span>],
    [
      "Entrypoint digest",
      <span className="break-all font-mono text-[10px]">{t.provider_entrypoint_digest ?? "—"}</span>,
    ],
    ["Runtime", t.runtime ?? "—"],
    [
      "Deterministic",
      <span className={t.deterministic ? "text-emerald-400" : "text-amber-400"}>
        {t.deterministic ? "Yes" : "No"}
      </span>,
    ],
    ["Side effects", t.side_effects ? "yes" : "none"],
    ...(t.artifact_name
      ? ([
          [
            "Pinned artifact",
            <span className="break-all font-mono text-[10px]">
              {t.artifact_name}
              {t.artifact_digest && ` · ${t.artifact_digest}`}
            </span>,
          ],
        ] as Array<[string, React.ReactNode]>)
      : []),
    ...(t.created_at
      ? ([["Executed", formatDateTime(t.created_at)]] as Array<[string, React.ReactNode]>)
      : []),
    ...(typeof t.duration_ms === "number"
      ? ([["Duration", `${Math.round(t.duration_ms)} ms`]] as Array<[string, React.ReactNode]>)
      : []),
  ];

  return (
    <div className="space-y-3">
      <header>
        <div className="text-[13px] text-zinc-400">Provider trace</div>
        <h1 className="mt-0.5">
          <MonoId id={traceId} />
        </h1>
      </header>
      <Panel title="Execution identity">
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-zinc-500">{k}</dt>
              <dd className="min-w-0 text-zinc-300">{v}</dd>
            </div>
          ))}
        </dl>
      </Panel>
      <PayloadBlock title="Input payload" payload={t.input_payload} />
      <PayloadBlock title="Output payload" payload={t.output_payload} />
    </div>
  );
}
