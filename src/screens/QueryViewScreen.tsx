import { useParams, useSearchParams } from "react-router-dom";
import { useQueryCatalog, useView, type ViewParams } from "@/api/hooks";
import { Panel, LoadState } from "@/components/Panel";
import { QueryItems } from "@/components/QueryItems";
import { ReceiptBar } from "@/components/ReceiptBar";

const PAGE_SIZE = 50;

/**
 * Full named-query view. URL is state: /views/:queryName?offset=…&work_item_id=…
 * — non-reserved search params are forwarded to the query, so any
 * parameterized context view is shareable as a link.
 */
export function QueryViewScreen() {
  const { queryName = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const catalog = useQueryCatalog();

  const offset = Number(searchParams.get("offset") ?? 0);
  const params: ViewParams = { limit: PAGE_SIZE, offset };
  for (const [k, v] of searchParams.entries()) {
    if (k !== "offset" && k !== "limit") params[k] = v;
  }

  const view = useView(queryName, params);
  const info = catalog.data?.items?.find((q) => q.name === queryName);

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">
          {queryName.replaceAll("_", " ")}
        </h1>
        {info?.description && <p className="mt-1 text-[12px] text-zinc-500">{info.description}</p>}
        {info && (info.required_params ?? []).length > 0 && (
          <p className="mt-1 text-[12px] text-zinc-500">
            requires{" "}
            {(info.required_params ?? []).map((p) => (
              <code key={p} className="mr-1 font-mono text-zinc-400">
                {p}={String(params[p] ?? "?")}
              </code>
            ))}
          </p>
        )}
      </header>

      <Panel title="Results" meta={view.data && <span className="font-mono">{view.data.total} total</span>}>
        {view.isPending && <LoadState />}
        {view.error && <LoadState error={view.error} />}
        {view.data && (
          <>
            <QueryItems result={view.data} linkType={info?.returns ?? undefined} />
            <div className="mt-2 flex items-center gap-2 text-[12px]">
              <button
                disabled={offset <= 0}
                onClick={() => {
                  searchParams.set("offset", String(Math.max(0, offset - PAGE_SIZE)));
                  setSearchParams(searchParams);
                }}
                className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 enabled:hover:bg-zinc-900 disabled:opacity-40"
              >
                prev
              </button>
              <button
                disabled={offset + PAGE_SIZE >= view.data.total}
                onClick={() => {
                  searchParams.set("offset", String(offset + PAGE_SIZE));
                  setSearchParams(searchParams);
                }}
                className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 enabled:hover:bg-zinc-900 disabled:opacity-40"
              >
                next
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
