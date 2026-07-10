import { Link } from "react-router-dom";
import { useGroups, useInstanceId, useInstanceSchema } from "@/api/hooks";
import { Chip, defChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import {
  proposedRelationshipOf,
  providersOf,
  stepDetail,
  workflowsOf,
  type WireWorkflow,
} from "@/lib/workflow-info";

type WorkflowSectionKey = "proposal" | "canonical" | "utility";
type WorkflowEntry = [string, WireWorkflow];

interface PendingGroupSummary {
  relationship_type?: string | null;
}

const WORKFLOW_SECTIONS: Array<{ key: WorkflowSectionKey; label: string }> = [
  { key: "proposal", label: "Decision proposals" },
  { key: "canonical", label: "State builders" },
  { key: "utility", label: "Utilities" },
];

function workflowSection(workflow: WireWorkflow): WorkflowSectionKey {
  if (workflow.type === "proposal" || workflow.type === "utility") return workflow.type;
  return "canonical";
}

function pendingGroupCounts(data: unknown): Map<string, number> {
  const items = ((data as { items?: PendingGroupSummary[] } | undefined)?.items ?? []);
  const counts = new Map<string, number>();
  for (const group of items) {
    const relationshipType = group.relationship_type;
    if (typeof relationshipType !== "string") continue;
    counts.set(relationshipType, (counts.get(relationshipType) ?? 0) + 1);
  }
  return counts;
}

function workflowMeta(instanceId: string, mode: string | null | undefined, pendingCount: number) {
  if (!mode && pendingCount <= 0) return undefined;
  return (
    <span className="inline-flex items-center gap-2">
      {pendingCount > 0 && (
        <Link
          to={"/i/" + instanceId + "/groups"}
          title={pendingCount + " awaiting review"}
          className="font-mono text-[12px] text-amber-400/90 hover:text-amber-300"
        >
          {pendingCount}
        </Link>
      )}
      {mode && <Chip value={mode} />}
    </span>
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
  const instanceId = useInstanceId();
  const pendingGroups = useGroups("pending_review", 200);
  usePageTitle("Workflows");
  if (schema.isPending) return <LoadState />;
  if (schema.error) return <LoadState error={schema.error} />;

  const workflows = Object.entries(workflowsOf(schema.data));
  const providers = providersOf(schema.data);
  const pendingByRelationship = pendingGroupCounts(pendingGroups.data);
  const workflowGroups: Record<WorkflowSectionKey, WorkflowEntry[]> = {
    proposal: [],
    canonical: [],
    utility: [],
  };
  for (const entry of workflows) {
    workflowGroups[workflowSection(entry[1])].push(entry);
  }

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Workflows</h1>
        <p className="mt-1 text-[13px] text-zinc-500">
          The machinery declared by this instance's config. Runs happen through the CLI or MCP
          surfaces; every apply leaves a receipt.
        </p>
      </header>
      {workflows.length === 0 && (
        <EmptyState>
          No workflows declared — this instance's state is built through direct governed
          writes.
        </EmptyState>
      )}
      <div className="space-y-4">
        {WORKFLOW_SECTIONS.map((section) => {
          const items = workflowGroups[section.key];
          if (items.length === 0) return null;
          return (
            <section key={section.key}>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                {section.label}
              </div>
              <div className="space-y-3">
                {items.map(([name, wf]) => {
                  const proposedRelationship = proposedRelationshipOf(wf);
                  const pendingCount =
                    wf.type === "proposal" && proposedRelationship
                      ? (pendingByRelationship.get(proposedRelationship) ?? 0)
                      : 0;
                  return (
                    <Panel
                      key={name}
                      title={
                        <Link
                          to={"/i/" + instanceId + "/workflows/" + name}
                          className="hover:underline"
                        >
                          {humanize(name)}
                        </Link>
                      }
                      meta={workflowMeta(instanceId, wf.mode, pendingCount)}
                    >
                      {wf.description && (
                        <p className="mb-2 text-[13px] leading-4 text-zinc-500">
                          {wf.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px]">
                        {(wf.steps ?? []).map((step, i) => {
                          const kind = step.kind ?? "step";
                          const detail = stepDetail(step.config);
                          const provider =
                            kind === "provider" && typeof step.config === "string"
                              ? providers[step.config]
                              : undefined;
                          return (
                            <span key={step.id ?? i} className="inline-flex items-center gap-1.5">
                              {i > 0 && <span className="font-mono text-zinc-700">→</span>}
                              <span className={defChipClass}>
                                <span className="text-zinc-400">{kind.replaceAll("_", " ")}</span>
                                {detail && (
                                  <span className="font-mono text-[11px] text-zinc-500">
                                    {detail}
                                  </span>
                                )}
                                {provider && (
                                  <span
                                    title={
                                      provider.deterministic
                                        ? "deterministic"
                                        : "non-deterministic"
                                    }
                                    className={
                                      "h-1.5 w-1.5 rounded-full " +
                                      (provider.deterministic ? "bg-emerald-500" : "bg-amber-400")
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </Panel>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      {workflows.length > 0 && (
        <div className="mt-3 text-[12px] text-zinc-600">
          dot on a provider step: green = deterministic, amber = non-deterministic
        </div>
      )}
    </div>
  );
}
