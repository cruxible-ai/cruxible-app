import { useInstanceSchema } from "@/api/hooks";
import { Chip } from "@/components/Chip";
import { LoadState, Panel } from "@/components/Panel";
import { humanize } from "@/lib/text";

interface WorkflowStep {
  id?: string;
  kind?: string;
  provider?: string;
  query?: string;
  relationship_type?: string;
  entity_type?: string;
  workflow?: string;
}

interface WorkflowDef {
  mode?: string;
  description?: string | null;
  steps?: WorkflowStep[];
  input_contract?: string | null;
}

interface ProviderDef {
  kind?: string;
  deterministic?: boolean;
  description?: string | null;
}

export interface SchemaWithWorkflows {
  workflows?: Record<string, WorkflowDef>;
  providers?: Record<string, ProviderDef>;
}

/** One step chip: the kind, plus the most identifying reference it carries. */
function stepDetail(step: WorkflowStep): string | null {
  return (
    step.provider ?? step.query ?? step.relationship_type ?? step.entity_type ?? step.workflow ?? null
  );
}

/**
 * Read-only workflow catalog straight from the composed config: every
 * declared workflow with its mode, step pipeline, and the providers it calls
 * (deterministic or not). Execution stays on the CLI/MCP surfaces — this
 * screen answers "what machinery does this instance run" without leaving the
 * UI.
 */
export function WorkflowsScreen() {
  const schema = useInstanceSchema();
  if (schema.isPending) return <LoadState />;
  if (schema.error) return <LoadState error={schema.error} />;

  const s = schema.data as SchemaWithWorkflows | undefined;
  const workflows = Object.entries(s?.workflows ?? {});
  const providers = s?.providers ?? {};

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Workflows</h1>
        <p className="mt-1 text-[12px] text-zinc-500">
          The machinery declared by this instance's config. Runs happen through the CLI or MCP
          surfaces; every apply leaves a receipt.
        </p>
      </header>
      {workflows.length === 0 && (
        <div className="text-[13px] text-zinc-600">
          This instance's config declares no workflows — its state is built through direct
          governed writes.
        </div>
      )}
      <div className="space-y-3">
        {workflows.map(([name, wf]) => (
          <Panel
            key={name}
            title={humanize(name)}
            meta={wf.mode ? <Chip value={wf.mode} /> : undefined}
          >
            {wf.description && (
              <p className="mb-2 text-[12px] leading-4 text-zinc-500">{wf.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px]">
              {(wf.steps ?? []).map((step, i) => {
                const detail = stepDetail(step);
                const provider = step.provider ? providers[step.provider] : undefined;
                return (
                  <span key={step.id ?? i} className="inline-flex items-center gap-1.5">
                    {i > 0 && <span className="font-mono text-zinc-700">→</span>}
                    <span className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-px">
                      <span className="text-zinc-400">
                        {(step.kind ?? "step").replaceAll("_", " ")}
                      </span>
                      {detail && (
                        <span className="font-mono text-[10px] text-zinc-500">{detail}</span>
                      )}
                      {provider && (
                        <span
                          title={provider.deterministic ? "deterministic" : "non-deterministic"}
                          className={`h-1.5 w-1.5 rounded-full ${
                            provider.deterministic ? "bg-emerald-500" : "bg-amber-400"
                          }`}
                        />
                      )}
                    </span>
                  </span>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>
      {workflows.length > 0 && (
        <div className="mt-3 text-[11px] text-zinc-600">
          dot on a provider step: green = deterministic, amber = non-deterministic
        </div>
      )}
    </div>
  );
}
