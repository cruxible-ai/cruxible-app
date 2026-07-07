import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQueryCatalog, useView, type ViewParams } from "@/api/hooks";
import { isEntityRef, isPathItem, isValuesItem } from "@/api/items";
import { QueryDefinition } from "@/components/QueryDefinition";
import { Panel, LoadState } from "@/components/Panel";
import { PathGraph } from "@/components/PathGraph";
import { QueryItems } from "@/components/QueryItems";
import { ReceiptBar } from "@/components/ReceiptBar";
import { humanize, matchesText } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/** The scalar surface of one query item, whatever its shape. */
function itemFields(item: unknown): unknown[] {
  if (isEntityRef(item)) return [item.entity_id, ...Object.values(item.properties ?? {})];
  if (isValuesItem(item)) return Object.values(item.values);
  if (isPathItem(item))
    return [item.result.entity_id, ...Object.values(item.result.properties ?? {})];
  return [];
}

const PAGE_SIZE = 50;

/**
 * Full named-query view. URL is state: /views/:queryName?offset=…&work_item_id=…
 * — non-reserved search params are forwarded to the query, so any
 * parameterized context view is shareable as a link.
 */
export function QueryViewScreen() {
  const { queryName = "" } = useParams();
  usePageTitle(humanize(queryName));
  const [searchParams, setSearchParams] = useSearchParams();
  const catalog = useQueryCatalog();

  const offset = Number(searchParams.get("offset") ?? 0);
  const params: ViewParams = { limit: PAGE_SIZE, offset };
  for (const [k, v] of searchParams.entries()) {
    if (k !== "offset" && k !== "limit" && k !== "view") params[k] = v;
  }

  const view = useView(queryName, params);
  const info = catalog.data?.items?.find((q) => q.name === queryName);

  // Page-level text filter over the receipted result: display-layer only —
  // the receipt still covers the full result set, so the meta count is
  // shown as filtered/total when the filter is active.
  const [filter, setFilter] = useState("");
  const filteredItems = filter
    ? (view.data?.items ?? []).filter((item) => matchesText(itemFields(item), filter))
    : (view.data?.items ?? []);
  const filteredResult = view.data ? { ...view.data, items: filteredItems } : undefined;

  // ?view=graph renders path-shaped results as one merged subgraph. URL is
  // state, so the graph rendering of a blast radius is a shareable link.
  // Select-projected queries return flat values rows even under a path
  // shape, so the toggle keys off actual hop data in the items.
  const hasPaths = (view.data?.items ?? []).some(isPathItem);
  const asGraph = hasPaths && searchParams.get("view") === "graph";
  function setViewMode(mode: "rows" | "graph") {
    const sp = new URLSearchParams(searchParams);
    if (mode === "graph") sp.set("view", "graph");
    else sp.delete("view");
    setSearchParams(sp);
  }

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">{humanize(queryName)}</h1>
        {info?.description && <p className="mt-1 text-[12px] text-zinc-500">{info.description}</p>}
        <QueryDefinition queryName={queryName} params={params} />
      </header>

      <Panel
        title="Results"
        meta={
          view.data && (
            <span className="inline-flex items-center gap-2">
              {hasPaths && (
                <span className="inline-flex overflow-hidden rounded border border-zinc-800 text-[11px]">
                  {(["rows", "graph"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-2 py-px ${
                        (mode === "graph") === asGraph
                          ? "bg-zinc-800 text-zinc-100"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {mode === "rows" ? "Rows" : "Graph"}
                    </button>
                  ))}
                </span>
              )}
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter this page…"
                className="w-40 rounded border border-zinc-800 bg-transparent px-2 py-px text-[11px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
              />
              <span className="font-mono">
                {filter ? `${filteredItems.length} of ${view.data.total}` : `${view.data.total} total`}
              </span>
            </span>
          )
        }
      >
        {view.isPending && <LoadState />}
        {view.error && <LoadState error={view.error} />}
        {view.data && (
          <>
            {asGraph ? (
              <PathGraph items={filteredItems.filter(isPathItem)} />
            ) : (
              <QueryItems
                result={filteredResult ?? view.data}
                linkType={info?.returns ?? undefined}
              />
            )}
            <div className="mt-2 flex items-center gap-2 text-[12px]">
              <button
                disabled={offset <= 0}
                onClick={() => {
                  searchParams.set("offset", String(Math.max(0, offset - PAGE_SIZE)));
                  setSearchParams(searchParams);
                }}
                className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 enabled:hover:bg-zinc-900 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={offset + PAGE_SIZE >= view.data.total}
                onClick={() => {
                  searchParams.set("offset", String(offset + PAGE_SIZE));
                  setSearchParams(searchParams);
                }}
                className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 enabled:hover:bg-zinc-900 disabled:opacity-40"
              >
                Next
              </button>
              <span className="text-zinc-600">
                {offset}–{Math.min(offset + PAGE_SIZE, view.data.total)} of {view.data.total}
              </span>
            </div>
            <ReceiptBar result={view.data} />
          </>
        )}
      </Panel>
    </div>
  );
}
