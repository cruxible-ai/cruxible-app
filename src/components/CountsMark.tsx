import { Check, Minus } from "lucide-react";

/**
 * Whether an attestation counts toward its Claim's verdict, and why: a check
 * and "counts", or a dash and "doesn't count", then the reason in words. The
 * Subject page's attestation list and the `next` rows that resurface a
 * recorded attestation share it.
 */
export function CountsMark({ counts, reason }: { counts: boolean; reason: string }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      {counts ? (
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-zinc-200">
          <Check className="h-3 w-3" aria-hidden />
          Counts
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-zinc-400">
          <Minus className="h-3 w-3" aria-hidden />
          Doesn't count
        </span>
      )}
      <span className="text-zinc-500">{reason}</span>
    </span>
  );
}
