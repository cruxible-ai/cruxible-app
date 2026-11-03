import { useMemo } from "react";
import { useCards } from "@/api/hooks";
import { Panel, LoadState } from "@/components/Panel";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { Chip } from "@/components/Chip";
import { claimValueText } from "@/lib/claim-value";

interface CitingClaim {
  claim: string;
  subject: string;
  predicate: string;
  value: unknown;
  status: string;
}

/**
 * The Claims that cite a Capture, from its card's sample (`citing`, the card's
 * first few) read as summary cards: what each says, about what. The card's
 * total says how many cite it in all; the page shows the sample, not the list.
 */
export function CitedBy({ citing, total }: { citing: readonly string[]; total: number }) {
  const refs = useMemo(() => citing.map((id) => `Claim:${id}`), [citing]);
  const cards = useCards(refs);
  const rows = useMemo(
    () =>
      cards.flatMap((result): CitingClaim[] => {
        const card = result?.card as Record<string, unknown> | undefined;
        if (!card || typeof card.claim !== "string" || typeof card.subject !== "string") return [];
        return [
          {
            claim: card.claim,
            subject: card.subject,
            predicate: typeof card.predicate_full === "string" ? card.predicate_full : String(card.predicate ?? ""),
            value: card.value,
            status: typeof card.status === "string" ? card.status : "",
          },
        ];
      }),
    [cards],
  );
  const columns = useMemo<Column<CitingClaim>[]>(
    () => [
      {
        id: "predicate",
        header: "ClaimType",
        sortValue: (c) => c.predicate,
        filter: { kind: "enum", values: (c) => [c.predicate] },
        cell: (c) => <span className="font-mono text-zinc-300">{c.predicate}</span>,
      },
      {
        id: "subject",
        header: "Subject",
        hideable: false,
        sortValue: (c) => c.subject,
        filter: { kind: "text", text: (c) => c.subject },
        cell: (c) => <RefLink value={c.subject} />,
      },
      {
        id: "value",
        header: "Value",
        sortValue: (c) => claimValueText(c.value),
        cell: (c) => <ShownValue value={c.value} />,
      },
      {
        id: "status",
        header: "Status",
        sortValue: (c) => c.status,
        cell: (c) => <Chip concept="claim" value={c.status} />,
      },
      {
        id: "claim",
        header: "Claim",
        sortValue: (c) => c.claim,
        cell: (c) => <RefLink value={c.claim} short />,
      },
    ],
    [],
  );
  if (citing.length === 0) return null;
  const pending = cards.some((card) => card === undefined) && rows.length === 0;
  return (
    <Panel title="Cited by">
      {pending ? (
        <LoadState />
      ) : (
        <DataTable
          rows={rows}
          columns={columns}
          rowKey={(c) => c.claim}
          urlKey="cited"
          label="Claims citing this Capture"
          maxHeight="none"
          count={
            total > rows.length
              ? `A sample of ${rows.length} of the ${total.toLocaleString()} Claims that cite it`
              : `${rows.length} ${rows.length === 1 ? "Claim cites" : "Claims cite"} it`
          }
        />
      )}
    </Panel>
  );
}
