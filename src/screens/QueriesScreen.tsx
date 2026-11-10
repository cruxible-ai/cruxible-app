import { useMemo } from "react";
import { QUERIES_PAGE, useGetBatch, useQueryList } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { DataTable, type Column } from "@/components/DataTable";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { Pager } from "@/screens/ProposalsScreen";
import { readQueryView } from "@/lib/query-view";
import { usePageTitle } from "@/lib/usePageTitle";
import { useCursorStack } from "@/lib/usePaging";

type OrientQuery = Schemas["OrientQuery"];

interface QueryRow {
  query: OrientQuery;
  /** The row Contract (`name@N`) from the Query's card; null when it names none, undefined while the card loads. */
  row: string | null | undefined;
}

const COLUMNS: Column<QueryRow>[] = [
  {
    id: "name",
    header: "Name",
    hideable: false,
    sortValue: (row) => row.query.name,
    filter: { kind: "text", text: (row) => row.query.name },
    className: "whitespace-nowrap",
    cell: (row) => (
      <RefLink value={`query:${row.query.name}`}>
        <span className="font-mono text-[13px]">{row.query.name}</span>
      </RefLink>
    ),
  },
  {
    id: "description",
    header: "Description",
    filter: { kind: "text", text: (row) => row.query.description ?? "" },
    className: "min-w-[20rem] max-w-[44rem] text-zinc-300",
    cell: (row) => row.query.description ?? <span className="text-zinc-600">—</span>,
  },
  {
    id: "params",
    header: "Params",
    title: "What the Query takes (? marks an optional one)",
    sortValue: (row) => row.query.params?.length ?? 0,
    filter: { kind: "text", text: (row) => (row.query.params ?? []).join(" ") },
    className: "whitespace-nowrap",
    cell: (row) =>
      (row.query.params ?? []).length === 0 ? (
        <span className="text-zinc-600">—</span>
      ) : (
        <span className="flex flex-col font-mono text-[12px] text-zinc-300">
          {(row.query.params ?? []).map((param) => (
            <span key={param}>{param}</span>
          ))}
        </span>
      ),
  },
  {
    id: "row",
    header: "Row Contract",
    title: "The Contract every result row satisfies",
    sortValue: (row) => row.row ?? "",
    filter: { kind: "text", text: (row) => row.row ?? "" },
    className: "whitespace-nowrap",
    cell: (row) =>
      row.row === undefined ? (
        <span className="animate-pulse text-zinc-600">…</span>
      ) : row.row === null ? (
        <span className="text-zinc-600">—</span>
      ) : (
        <RefLink value={`Contract:${row.row}`}>
          <span className="font-mono text-[12px]" title={`Contract:${row.row}`}>
            {row.row}
          </span>
        </RefLink>
      ),
  },
];

/**
 * The instance's named Queries, a daemon page at a time (orient
 * section=queries): name, authored description, params and row Contract.
 * Each opens on its Query page, which shows its results. The row Contracts
 * come from the page's Query cards, one get-batch per 64.
 */
export function QueriesScreen() {
  usePageTitle("Queries");
  const [cursors, setCursors] = useCursorStack("queries");
  const list = useQueryList(cursors[cursors.length - 1]);
  const queries = useMemo(() => list.data?.queries ?? [], [list.data]);
  const cards = useGetBatch(queries.map((query) => `query:${query.name}`));
  const rows = useMemo<QueryRow[]>(() => {
    const rowOf = new Map<string, string | null>();
    for (const result of cards.results) {
      const card = cardOf(result, "query");
      if (card) rowOf.set(card.query.replace(/^(?:query|QueryDefinition):/, ""), readQueryView(card)?.row ?? null);
    }
    return queries.map((query) => ({ query, row: rowOf.has(query.name) ? rowOf.get(query.name)! : cards.isPending ? undefined : null }));
  }, [queries, cards.results, cards.isPending]);
  const index = cursors.length;
  const next = list.data?.next_cursor ?? null;
  const paged = index > 0 || next !== null;
  return (
    <Page>
      <PageHeader
        title="Queries"
        description="The instance's named Queries at this generation. Open one for its results."
        actions={
          paged ? (
            <Pager
              index={index}
              newer={index > 0 ? () => setCursors((stack) => stack.slice(0, -1)) : null}
              older={next ? () => setCursors((stack) => [...stack, next]) : null}
            />
          ) : undefined
        }
      />
      {list.isPending && <LoadState />}
      {list.error && <LoadState error={list.error} />}
      {list.data && (
        <Panel
          title="Named Queries"
          meta={list.data.queries_truncated ? <span className="text-amber-300/90">List truncated by the daemon</span> : undefined}
        >
          {queries.length === 0 ? (
            <EmptyState>None</EmptyState>
          ) : (
            <DataTable
              rows={rows}
              columns={COLUMNS}
              rowKey={(row) => row.query.name}
              urlKey="queries"
              label="Named Queries"
              maxHeight="none"
              count={paged ? `${queries.length} on this page` : queries.length === 1 ? "1 Query" : `${queries.length} Queries`}
              partial={paged ? `${index === 0 ? "the first" : "this page of"} ${queries.length} Queries (pages of ${QUERIES_PAGE})` : null}
            />
          )}
          {cards.error && <LoadState error={cards.error} />}
        </Panel>
      )}
    </Page>
  );
}
