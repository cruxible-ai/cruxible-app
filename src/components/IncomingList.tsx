import { useState } from "react";
import { useIncoming } from "@/api/hooks";
import { RefLink } from "@/components/RefLink";

/**
 * The Subject-valued Claims pointing at one Subject, a page at a time
 * (`get detail=incoming`, keyset over the indexed object-subject column).
 */
export function IncomingList({ subject, total }: { subject: string; total: number | null }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const read = useIncoming(subject, cursors[cursors.length - 1]);
  const claims = read.data?.incoming?.claims ?? [];
  return (
    <div className="text-[12px]">
      {read.isPending && <div className="animate-pulse text-zinc-600">Reading…</div>}
      {read.error && <div className="text-red-400/80">{read.error.message}</div>}
      {read.data && claims.length === 0 && <div className="text-zinc-600">Nothing points here.</div>}
      <div className="space-y-0.5">
        {claims.map((claim) => (
          <div key={claim.claim} className="flex flex-wrap items-baseline gap-x-2">
            <RefLink value={claim.subject} />
            <span className="font-mono text-zinc-500">{claim.predicate}</span>
            {claim.qualifier && <span className="text-zinc-600">[{claim.qualifier}]</span>}
            <RefLink value={claim.claim}>
              <span className="font-mono text-[11px] text-zinc-500">{claim.claim.slice(0, 12)}…</span>
            </RefLink>
          </div>
        ))}
      </div>
      {(cursors.length > 0 || read.data?.next_cursor) && (
        <div className="mt-1 flex gap-3 text-zinc-500">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Previous
            </button>
          )}
          <span>
            page {cursors.length + 1}
            {total !== null && ` · ${total} in all`}
          </span>
          {read.data?.next_cursor && (
            <button onClick={() => setCursors((c) => [...c, read.data!.next_cursor!])} className="hover:text-zinc-200">
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
