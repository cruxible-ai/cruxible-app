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

/**
 * The pointing Subjects as tables: one per (kind, pointing ClaimType), a row
 * per Subject, a column per literal field shown (in first-seen order), so the
 * same field lines up from row to row. The pointing Claim is the row's last,
 * quiet cell.
 */
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

  const groups = useMemo(() => {
    const out = new Map<string, { kind: string; via: string; rows: { claim: IncomingClaim; id: string; fields: Map<string, string> }[]; columns: string[] }>();
    for (const claim of claims) {
      const parsed = parseRef(claim.subject);
      const kind = parsed?.kind === "subject" ? claim.subject.slice(0, claim.subject.indexOf("/")) : "";
      const id = kind ? claim.subject.slice(kind.length + 1) : claim.subject;
      const via = `${claim.predicate}${claim.qualifier ? `[${claim.qualifier}]` : ""}`;
      const key = `${kind} ${via}`;
      let group = out.get(key);
      if (!group) out.set(key, (group = { kind, via, rows: [], columns: [] }));
      const card = byRef.get(claim.subject);
      const fields = new Map<string, string>();
      for (const field of card && kinds.data ? literalSummary(card, predicates, keys.get(card.kind)) : []) {
        fields.set(field.field, field.value);
        if (!group.columns.includes(field.field)) group.columns.push(field.field);
      }
      group.rows.push({ claim, id, fields });
    }
    return [...out.values()];
  }, [claims, byRef, kinds.data, predicates, keys]);

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={`${group.kind} ${group.via}`}>
          <div className="mb-1 text-[12px] text-zinc-500">
            <span className="font-mono text-zinc-400">{group.kind}</span> · via{" "}
            <span className="font-mono">{group.via.slice(group.via.lastIndexOf(".") + 1)}</span>
            <span className="text-zinc-600"> · {group.rows.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead className="text-[11px] uppercase tracking-wide text-zinc-500">
                <tr className="border-b border-zinc-800">
                  <th className="py-1.5 pr-6 font-medium">Subject</th>
                  {group.columns.map((column) => (
                    <th key={column} className="py-1.5 pr-6 font-medium">
                      {column}
                    </th>
                  ))}
                  <th className="py-1.5 font-medium">Claim</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={row.claim.claim} className="border-b border-zinc-800/60 align-top">
                    <td className="py-1.5 pr-6">
                      <RefLink value={row.claim.subject}>
                        <span className="font-mono text-[12.5px]" title={row.claim.subject}>
                          {row.id}
                        </span>
                      </RefLink>
                    </td>
                    {group.columns.map((column) => (
                      <td key={column} className="py-1.5 pr-6 text-zinc-200">
                        {row.fields.get(column) ?? <span className="text-zinc-700">—</span>}
                      </td>
                    ))}
                    <td className="py-1.5">
                      <RefLink value={row.claim.claim}>
                        <span className="font-mono text-[11px] text-zinc-600">{row.claim.claim.slice(4, 12)}…</span>
                      </RefLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
