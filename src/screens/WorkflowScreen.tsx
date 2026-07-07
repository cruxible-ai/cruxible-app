import { Link, useParams } from "react-router-dom";
import { useInstanceId, useInstanceSchema } from "@/api/hooks";
import { defChipClass } from "@/components/Chip";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import {
  providersOf,
  signalWiring,
  stepDetail,
  workflowProviders,
  workflowsOf,
} from "@/lib/workflow-info";

/**
 * One workflow, first class: the declared pipeline step by step, the
 * providers it calls with their full identity (ref, version, determinism,
 * pinned artifact), and the signal wiring — which provider output field
 * drives each governance signal. Everything here is the composed config
 * verbatim; execution stays on the CLI/MCP surfaces.
 */
export function WorkflowScreen() {
  const { workflowName = "" } = useParams();
  usePageTitle(humanize(workflowName));
  const instanceId = useInstanceId();
  const schema = useInstanceSchema();

  if (schema.isPending) return <LoadState />;
  if (schema.error) return <LoadState error={schema.error} />;

  const workflow = workflowsOf(schema.data)[workflowName];
  const providers = providersOf(schema.data);
  if (!workflow) return <EmptyState>No workflow named {workflowName} in this config.</EmptyState>;

  const steps = workflow.steps ?? [];
  const usedProviders = workflowProviders(workflow);
  const signals = signalWiring(workflow);

  return (
    <div className="space-y-3">
      <header>
        <div className="flex items-center gap-3 text-[12px]">
          <Link to={`/i/${instanceId}/workflows`} className="text-zinc-500 hover:text-zinc-300">
            Workflows
          </Link>
          <span className="text-zinc-700">/</span>
          <MonoId id={workflowName} />
        </div>
        <h1 className="mt-1 text-[17px] font-semibold text-zinc-100">{humanize(workflowName)}</h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
          {workflow.mode && <span className={defChipClass}>{workflow.mode}</span>}
          {workflow.input_contract && (
            <span>
              input contract <span className="font-mono">{workflow.input_contract}</span>
            </span>
          )}
          <span>
            <span className="font-mono">{steps.length}</span> steps
          </span>
        </div>
        {workflow.description && (
          <p className="mt-2 text-[12px] leading-4 text-zinc-400">{workflow.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-3">
          <Panel title="Pipeline">
            <ol className="space-y-1">
              {steps.map((step, i) => {
                const detail = stepDetail(step.config);
                const provider =
                  step.kind === "provider" && typeof step.config === "string"
                    ? providers[step.config]
                    : undefined;
                return (
                  <li
                    key={step.id ?? i}
                    className="grid grid-cols-[1.5rem_11rem_1fr] items-baseline gap-x-2 border-t border-zinc-800/50 py-1 text-[12px] first:border-t-0"
                  >
                    <span className="font-mono text-[10px] text-zinc-600">{i + 1}</span>
                    <span className="inline-flex items-center gap-1.5 text-zinc-300">
                      {(step.kind ?? "step").replaceAll("_", " ")}
                      {provider && (
                        <span
                          title={provider.deterministic ? "deterministic" : "non-deterministic"}
                          className={`h-1.5 w-1.5 rounded-full ${
                            provider.deterministic ? "bg-emerald-500" : "bg-amber-400"
                          }`}
                        />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="font-mono text-[11px] text-zinc-500">{step.id}</span>
                      {detail && (
                        <span className="ml-2 break-all font-mono text-[11px] text-zinc-400">
                          {detail}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Panel>

          {signals.length > 0 && (
            <Panel title="Signal wiring">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
                      <th className="py-1 pr-3 font-medium">Signal source</th>
                      <th className="py-1 pr-3 font-medium">Produced by</th>
                      <th className="py-1 pr-3 font-medium">Verdict from</th>
                      <th className="py-1 pr-3 font-medium">Evidence from</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signals.map((s) => (
                      <tr key={s.source} className="border-t border-zinc-800/60 align-top">
                        <td className="py-1.5 pr-3 font-mono text-[11px] text-zinc-300">
                          {s.source}
                        </td>
                        <td className="py-1.5 pr-3 font-mono text-[11px] text-zinc-400">
                          {s.providerName ?? s.fromStepId ?? "—"}
                        </td>
                        <td className="py-1.5 pr-3 font-mono text-[11px] text-zinc-400">
                          {s.verdictPath ?? "—"}
                        </td>
                        <td className="py-1.5 pr-3 font-mono text-[10px] text-zinc-500">
                          {s.evidenceExpr ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          )}
        </div>

        <div className="min-w-0 space-y-3">
          {usedProviders.map((name) => {
            const p = providers[name];
            if (!p) return null;
            return (
              <Panel
                key={name}
                title={<span className="font-mono text-[12px]">{name}</span>}
                meta={
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      p.deterministic ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        p.deterministic ? "bg-emerald-500" : "bg-amber-400"
                      }`}
                    />
                    {p.deterministic ? "deterministic" : "non-deterministic"}
                  </span>
                }
              >
                {p.description && (
                  <p className="mb-2 text-[12px] leading-4 text-zinc-400">{p.description}</p>
                )}
                <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 text-[11px]">
                  {p.ref && (
                    <div className="contents">
                      <dt className="text-zinc-500">Source</dt>
                      <dd className="break-all font-mono text-[10px] text-zinc-300">{p.ref}</dd>
                    </div>
                  )}
                  {p.version && (
                    <div className="contents">
                      <dt className="text-zinc-500">Version</dt>
                      <dd className="font-mono text-zinc-300">{p.version}</dd>
                    </div>
                  )}
                  {p.runtime && (
                    <div className="contents">
                      <dt className="text-zinc-500">Runtime</dt>
                      <dd className="text-zinc-300">{p.runtime}</dd>
                    </div>
                  )}
                  {p.artifact && (
                    <div className="contents">
                      <dt className="text-zinc-500">Pinned artifact</dt>
                      <dd className="font-mono text-[10px] text-zinc-300">{p.artifact}</dd>
                    </div>
                  )}
                  {(p.contract_in || p.contract_out) && (
                    <div className="contents">
                      <dt className="text-zinc-500">Contract</dt>
                      <dd className="break-all font-mono text-[10px] text-zinc-400">
                        {p.contract_in} → {p.contract_out}
                      </dd>
                    </div>
                  )}
                  <div className="contents">
                    <dt className="text-zinc-500">Side effects</dt>
                    <dd className="text-zinc-300">{p.side_effects ? "yes" : "none"}</dd>
                  </div>
                </dl>
              </Panel>
            );
          })}
          {usedProviders.length === 0 && (
            <Panel title="Providers">
              <EmptyState>No provider steps — pure query/build machinery.</EmptyState>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
