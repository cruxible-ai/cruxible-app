import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useInstanceId, useInstanceSchema } from "@/api/hooks";
import { defChipClass } from "@/components/Chip";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import {
  describeStep,
  providersOf,
  signalWiring,
  stepPhase,
  stepReadIds,
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
        <div className="flex items-center gap-3 text-[13px]">
          <Link to={`/i/${instanceId}/workflows`} className="text-zinc-500 hover:text-zinc-300">
            Workflows
          </Link>
          <span className="text-zinc-700">/</span>
          <MonoId id={workflowName} />
        </div>
        <h1 className="mt-1 text-[17px] font-semibold text-zinc-100">{humanize(workflowName)}</h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[12px] text-zinc-500">
          {workflow.mode && <span className={defChipClass}>{workflow.mode}</span>}
          {workflow.input_contract && (
            <span>
              Input contract <span className="font-mono">{workflow.input_contract}</span>
            </span>
          )}
          <span>
            <span className="font-mono">{steps.length}</span> steps
          </span>
        </div>
        {workflow.description && (
          <p className="mt-2 text-[13px] leading-4 text-zinc-400">{workflow.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-3">
          <Panel title="Pipeline">
            <ol className="space-y-1">
              {steps.map((step, i) => {
                const description = describeStep(step);
                const phase = stepPhase(step);
                const previousPhase = i > 0 ? stepPhase(steps[i - 1] ?? {}) : null;
                const reads = stepReadIds(step);
                const continuesPhase = phase === previousPhase;
                const provider =
                  step.kind === "provider" && typeof step.config === "string"
                    ? providers[step.config]
                    : undefined;
                return (
                  <Fragment key={step.id ?? i}>
                    {phase !== previousPhase && (
                      <li
                        className={`${i === 0 ? "pt-0" : "border-t border-zinc-800/50 pt-2"} pb-0.5`}
                      >
                        <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                          {phase}
                        </div>
                      </li>
                    )}
                    <li
                      className={`grid grid-cols-[1.5rem_10rem_1fr] items-start gap-x-2 py-1.5 text-[13px] ${
                        continuesPhase ? "border-t border-zinc-800/50" : ""
                      }`}
                    >
                      <span className="pt-0.5 font-mono text-[10px] text-zinc-600">{i + 1}</span>
                      <span className="inline-flex items-center gap-1.5 pt-px text-zinc-300">
                        {humanize(step.kind ?? "step")}
                        {provider && (
                          <span
                            title={provider.deterministic ? "Deterministic" : "Non-deterministic"}
                            className={`h-1.5 w-1.5 rounded-full ${
                              provider.deterministic ? "bg-emerald-500" : "bg-amber-400"
                            }`}
                          />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                          {step.id && (
                            <span className="font-mono text-[12px] text-zinc-500">{step.id}</span>
                          )}
                          <span className="min-w-0 text-zinc-300">
                            {description.queryName ? (
                              <>
                                Runs named query{" "}
                                <Link
                                  to={`/i/${instanceId}/views/${description.queryName}`}
                                  className="break-all font-mono text-[12px] text-sky-400 hover:underline"
                                >
                                  {description.queryName}
                                </Link>
                              </>
                            ) : (
                              description.summary
                            )}
                          </span>
                          {reads.length > 0 && (
                            <span className="inline-flex flex-wrap items-center gap-1 text-[10px] text-zinc-600">
                              Reads:
                              {reads.map((id) => (
                                <span
                                  key={id}
                                  className={`${defChipClass} font-mono text-[10px] text-zinc-400`}
                                >
                                  {id}
                                </span>
                              ))}
                            </span>
                          )}
                        </div>
                        {description.rows.length > 0 && (
                          <dl className="mt-1 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-2 gap-y-0.5 text-[12px]">
                            {description.rows.map((row, rowIndex) => (
                              <div key={`${row.label}-${rowIndex}`} className="contents">
                                <dt className="text-zinc-600">{row.label}</dt>
                                <dd className="break-words font-mono text-[10px] text-zinc-500">
                                  {row.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ol>
          </Panel>

          {signals.length > 0 && (
            <Panel title="Signal wiring">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[12px] text-zinc-500">
                      <th className="py-1 pr-3 font-medium">Signal source</th>
                      <th className="py-1 pr-3 font-medium">Produced by</th>
                      <th className="py-1 pr-3 font-medium">Verdict from</th>
                      <th className="py-1 pr-3 font-medium">Evidence from</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signals.map((s) => (
                      <tr key={s.source} className="border-t border-zinc-800/60 align-top">
                        <td className="py-1.5 pr-3 font-mono text-[12px] text-zinc-300">
                          {s.source}
                        </td>
                        <td className="py-1.5 pr-3 font-mono text-[12px] text-zinc-400">
                          {s.providerName ?? s.fromStepId ?? "—"}
                        </td>
                        <td className="py-1.5 pr-3 font-mono text-[12px] text-zinc-400">
                          {s.verdictPath ?? "—"}
                          {s.verdictRule && (
                            <div className="text-[10px] text-zinc-600">{s.verdictRule}</div>
                          )}
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
                title={<span className="font-mono text-[13px]">{name}</span>}
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
                    {p.deterministic ? "Deterministic" : "Non-deterministic"}
                  </span>
                }
              >
                {p.description && (
                  <p className="mb-2 text-[13px] leading-4 text-zinc-400">{p.description}</p>
                )}
                <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 text-[12px]">
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
