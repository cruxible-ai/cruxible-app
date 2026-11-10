import { useMemo } from "react";
import { useGetBatch, useRunbooks } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { lineName } from "./lines.ts";
import { runbookName, targetOf } from "./runbooks.ts";

/** A Runbook Trigger that runs a Line: the Runbook, the Line's step in it, and the Trigger's `fires` phrase. */
export interface RunbookWake {
  /** Bare Runbook name. */
  runbook: string;
  step: number;
  trigger: string;
  fires: string;
}

/**
 * Which Lines a live Runbook's Triggers run, from served definitions: the
 * orient runbooks section, then the cards of the live Runbooks with a Trigger
 * (their steps and the Triggers aimed at them) in one get-batch. A fired Runbook runs each Line
 * step under that Line's own enablement, so a Line it names wakes on the
 * Runbook's schedule. Reads are Runbook-sized. `byLine` is keyed by bare Line
 * name; `pending` while the section or a card is still loading.
 */
export function useRunbookWakes(): { byLine: Map<string, RunbookWake[]>; pending: boolean } {
  const runbooks = useRunbooks();
  const triggered = (runbooks.data?.rows ?? []).filter((r) => r.lifecycle === "live" && (r.triggers_total ?? 0) > 0);
  const cards = useGetBatch(triggered.map((r) => `Runbook:${runbookName(r.runbook)}`));
  const results = cards.results;
  const key = JSON.stringify(results.map((r) => r.ref));
  const byLine = useMemo(() => {
    const out = new Map<string, RunbookWake[]>();
    for (const result of results) {
      const card = cardOf(result, "runbook");
      if (!card) continue;
      const runbook = runbookName(card.runbook);
      for (const step of card.steps) {
        const target = targetOf(step.target);
        if (target.kind !== "line" || step.availability !== "available") continue;
        const line = lineName(target.name);
        for (const trigger of card.triggers ?? []) {
          out.set(line, [...(out.get(line) ?? []), { runbook, step: step.step, trigger: trigger.trigger, fires: trigger.fires }]);
        }
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by the cards returned
  }, [key]);
  return { byLine, pending: runbooks.isPending || cards.isPending };
}
