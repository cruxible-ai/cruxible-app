import { CircleAlert, CircleCheck, CircleDot, CircleSlash, Clock } from "lucide-react";
import type { ContractListItem, OutcomeState } from "@/api/governance-types";
import { outcomeState } from "@/api/governance-types";
import { formatDateTime } from "@/lib/text";

/**
 * Outcome-contract presentation.
 *
 * The kit's mutation guard refuses to accept a decision that declares
 * `outcome_tracking: required` until a contract commits, in advance, to what
 * would count as success. So "no contract" is not a blank cell — for a tracked
 * decision it is the reason the decision cannot settle, and it reads that way.
 */

const STATE_META: Record<
  OutcomeState,
  { label: string; className: string; Icon: typeof CircleDot }
> = {
  none: {
    label: "No contract",
    className: "border-zinc-800 text-zinc-500",
    Icon: CircleSlash,
  },
  prepared: {
    label: "Prepared",
    className: "border-sky-900 bg-sky-950/50 text-sky-400",
    Icon: CircleDot,
  },
  open: {
    label: "Open",
    className: "border-amber-900 bg-amber-950/60 text-amber-400",
    Icon: Clock,
  },
  satisfied: {
    label: "Satisfied",
    className: "border-emerald-900 bg-emerald-950/60 text-emerald-400",
    Icon: CircleCheck,
  },
  contradicted: {
    label: "Contradicted",
    className: "border-red-900 bg-red-950/60 text-red-400",
    Icon: CircleAlert,
  },
  expired: {
    label: "Expired",
    className: "border-red-900 bg-red-950/60 text-red-400",
    Icon: CircleAlert,
  },
};

/** Blocked = the decision promises a measurable result and nothing has been
 *  promised yet, so acceptance would be refused. */
export function isAcceptanceBlocked(
  outcomeTracking: unknown,
  contract: ContractListItem | undefined,
): boolean {
  return outcomeTracking === "required" && contract === undefined;
}

export function OutcomeBadge({
  contract,
  outcomeTracking,
}: {
  contract: ContractListItem | undefined;
  outcomeTracking?: unknown;
}) {
  const state = outcomeState(contract);
  // A tracked decision with nothing promised is the loud case; an untracked
  // one with no contract is a legitimate, reviewed choice.
  if (state === "none") {
    if (outcomeTracking === "required") {
      return (
        <span className="inline-flex items-center gap-1 border border-red-900 bg-red-950/60 px-1.5 py-px text-[12px] leading-4 whitespace-nowrap text-red-400">
          <CircleSlash className="h-3 w-3" />
          No contract — cannot accept
        </span>
      );
    }
    if (outcomeTracking === "not_applicable") {
      return (
        <span className="inline-flex items-center gap-1 text-[12px] leading-4 whitespace-nowrap text-zinc-500">
          <CircleSlash className="h-3 w-3 text-zinc-600" />
          Not tracked
        </span>
      );
    }
  }
  const meta = STATE_META[state];
  const checkAt = contract?.contract.declaration.check_at;
  return (
    <span
      title={checkAt ? `Check at ${formatDateTime(checkAt)}` : undefined}
      className={`inline-flex items-center gap-1 border px-1.5 py-px text-[12px] leading-4 whitespace-nowrap ${meta.className}`}
    >
      <meta.Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

/** "in 14 days" / "3 days overdue" against the contract's check-at clock. */
export function checkClock(checkAt: string | undefined, now = Date.now()): string | null {
  if (!checkAt) return null;
  const t = new Date(checkAt).getTime();
  if (Number.isNaN(t)) return null;
  const days = Math.round((t - now) / 86_400_000);
  if (days === 0) return "due today";
  if (days > 0) return `in ${days} day${days === 1 ? "" : "s"}`;
  return `${-days} day${days === -1 ? "" : "s"} overdue`;
}

/** Human-readable form of the measurement the contract committed to. */
export function measurementSummary(item: ContractListItem): string {
  const m = item.contract.declaration.measurement;
  if (m.kind === "attestation") {
    return `attestation on ${m.relationship_type} ${m.from_type}/${m.from_id} → ${m.to_type}/${m.to_id}`;
  }
  const bits: string[] = [`query ${m.query_name}`];
  const params = Object.entries(m.params ?? {});
  if (params.length > 0) bits.push(params.map(([k, v]) => `${k}=${String(v)}`).join(", "));
  const expect = m.expect ?? {};
  if (expect.max_count != null) bits.push(`at most ${expect.max_count} rows`);
  if (expect.min_count != null) bits.push(`at least ${expect.min_count} rows`);
  if (expect.condition) bits.push(`${expect.condition} (${expect.condition_scope ?? "any"})`);
  return bits.join(" · ");
}
