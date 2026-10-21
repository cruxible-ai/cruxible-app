import { useState } from "react";
import { Check, Copy } from "lucide-react";

const HEX_TAIL = /^(.*?)([0-9a-f]{20,})$/;

/**
 * A long machine id shortened for display: the readable prefix plus the
 * first `keep` hex characters ("sha256:d4f81305020c…", "RUN-8748d49f00f1…",
 * "CLM-5958666f8557…"). Ids that are short or not hex-tailed stay whole.
 */
export function shortId(value: string, keep = 12): string {
  const match = HEX_TAIL.exec(value);
  if (!match) return value;
  const [, prefix, hex] = match;
  return hex!.length > keep ? `${prefix}${hex!.slice(0, keep)}…` : value;
}

/** Copy-to-clipboard for an id; the console only ever copies, never acts. */
export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          window.setTimeout(() => setDone(false), 1200);
        });
      }}
      aria-label={`${label} ${value}`}
      title={done ? "Copied" : `${label} ${value}`}
      className="inline-flex shrink-0 items-center text-zinc-600 hover:text-zinc-200 focus-visible:text-zinc-200"
    >
      {done ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

/** A shortened id with the full value on hover and a copy button. */
export function ShortId({
  value,
  keep = 12,
  className = "text-zinc-400",
}: {
  value: string;
  keep?: number;
  className?: string;
}) {
  return (
    <span className="inline-flex max-w-full items-baseline gap-1.5">
      <span className={`truncate font-mono text-[12px] ${className}`} title={value}>
        {shortId(value, keep)}
      </span>
      <CopyButton value={value} />
    </span>
  );
}
