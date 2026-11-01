import { useMemo, useState } from "react";
import { useGetBatch, useIncoming, useOntologyKinds, useSubjectKinds } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { RefLink } from "@/components/RefLink";
import { parseRef } from "@/lib/cruxible-ref";
import { predicateIndex } from "@/lib/neighborhood";
import { keyPredicates, literalSummary } from "@/lib/subject";

type IncomingClaim = Schemas["GetIncomingClaim"];

/**
 * The Subject-valued Claims pointing at one Subject, a page at a time
 * (`get detail=incoming`, keyset over the indexed object-subject column).
 * With `summaries`, each pointing Subject reads as its id and a few of its
 * literal fields (one get-batch per page), the pointing ClaimType and Claim
 * beneath it.
 */
export function IncomingList({
  subject,
  total,
  summaries = false,
}: {
  subject: string;
  total: number | null;
  summaries?: boolean;
}) {
  const [cursors, setCursors] = useState<string[]>([]);
  const read = useIncoming(subject, cursors[cursors.length - 1]);
  const claims = read.data?.incoming?.claims ?? [];
  return (
    <div className="text-[12px]">
      {read.isPending && <div className="animate-pulse text-zinc-600">Reading…</div>}
      {read.error && <div className="text-red-400/80">{read.error.message}</div>}
      {read.data && claims.length === 0 && <div className="text-zinc-600">Nothing points here.</div>}
      {summaries ? (
        <SummarizedClaims claims={claims} />
      ) : (
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
      )}
      {(cursors.length > 0 || read.data?.next_cursor) && (
        <div className="mt-1 flex gap-3 text-zinc-500">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Previous
            </button>
          )}
          <span>
            Page {cursors.length + 1}
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

/** Each pointing Subject as its id and literal fields; the pointing ClaimType and Claim, quieter, beneath. */
function SummarizedClaims({ claims }: { claims: IncomingClaim[] }) {
  const refs = useMemo(() => [...new Set(claims.map((claim) => claim.subject))], [claims]);
  const cards = useGetBatch(refs);
  const kinds = useOntologyKinds();
  const subjectKinds = useSubjectKinds();
  const predicates = useMemo(() => predicateIndex(kinds.data?.kinds ?? []), [kinds.data]);
  const keys = useMemo(() => keyPredicates(subjectKinds.data?.rows), [subjectKinds.data]);
  const byRef = useMemo(() => {
    const out = new Map<string, Schemas["GetSubjectCard"]>();
    for (const result of cards.results) {
      const card = cardOf(result, "subject");
      if (card) out.set(card.subject, card);
    }
    return out;
  }, [cards.results]);
  return (
    <div className="space-y-1.5">
      {claims.map((claim) => {
        const card = byRef.get(claim.subject);
        const parsed = parseRef(claim.subject);
        const id = parsed?.kind === "subject" ? claim.subject.slice(claim.subject.indexOf("/") + 1) : claim.subject;
        const fields = card && kinds.data ? literalSummary(card, predicates, keys.get(card.kind)) : [];
        return (
          <div key={claim.claim}>
            <div className="flex flex-wrap items-baseline gap-x-2 text-[13px]">
              <RefLink value={claim.subject}>
                <span className="font-mono text-[13px]" title={claim.subject}>
                  {id}
                </span>
              </RefLink>
              {fields.map((field) => (
                <span key={field.field} className="text-zinc-500">
                  · {field.field} <span className="text-zinc-300">{field.value}</span>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 text-[11px] text-zinc-600">
              <span className="font-mono" title="The ClaimType pointing here">
                {claim.predicate}
                {claim.qualifier && <span>[{claim.qualifier}]</span>}
              </span>
              <RefLink value={claim.claim}>
                <span className="font-mono text-[11px] text-zinc-600">{claim.claim.slice(0, 12)}…</span>
              </RefLink>
            </div>
          </div>
        );
      })}
    </div>
  );
}
