import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import { useAtLink } from "@/lib/at";
import { wakeOf } from "@/lib/schedule";
import { formatDateTime, formatRelative, sentence } from "@/lib/text";
import type { RunbookWake } from "@/lib/useRunbookWakes";

/**
 * A Line's wake through a Runbook: the Runbook (linked), its Trigger's
 * schedule in words and, for a schedule the page can compute, the next fire.
 * The Trigger and the Line's step are on hover.
 */
export function RunbookWakeText({ wake, now, next = true }: { wake: RunbookWake; now: Date; next?: boolean }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const w = wakeOf(wake.fires, now);
  return (
    <span title={`${wake.trigger} · step ${wake.step}${w.definedWords !== w.words ? ` · ${w.definedWords}` : ""}`}>
      <Link to={link(`/i/${instanceId}/runbooks/${encodeURIComponent(wake.runbook)}`)} className="font-mono text-zinc-300 hover:text-zinc-100 hover:underline">
        {wake.runbook}
      </Link>
      <span className="text-zinc-600"> · </span>
      {sentence(w.words)}
      {next && w.next && (
        <span className="text-zinc-500" title={formatDateTime(w.next.toISOString())}>
          {" "}
          · next {formatRelative(w.next, now)}
        </span>
      )}
    </span>
  );
}

/** The soonest computable next fire among a Line's Runbook wakes. */
export function soonestRunbookFire(wakes: readonly RunbookWake[], now: Date): Date | null {
  const times = wakes.flatMap((wake) => {
    const next = wakeOf(wake.fires, now).next;
    return next ? [next] : [];
  });
  times.sort((a, b) => a.getTime() - b.getTime());
  return times[0] ?? null;
}
