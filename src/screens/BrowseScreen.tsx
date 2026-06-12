import { useParams, useSearchParams } from "react-router-dom";
import { useEntityList } from "@/api/hooks";
import { EntityTable } from "@/components/EntityTable";
import { Panel, LoadState } from "@/components/Panel";
import { isEntityRef } from "@/api/items";

const PAGE_SIZE = 100;

/** Raw entity listing per type — the database-console view of the state. */
export function BrowseScreen() {
  const { entityType = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = Number(searchParams.get("offset") ?? 0);
  const list = useEntityList(entityType, PAGE_SIZE, offset);

  const items = ((list.data as { items?: unknown[] } | undefined)?.items ?? []).filter(isEntityRef);
  const total = (list.data as { total?: number } | undefined)?.total ?? 0;

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">{entityType}</h1>
      </header>
      <Panel title="Entities" meta={<span className="font-mono">{total} total</span>}>
        {list.isPending && <LoadState />}
        {list.error && <LoadState error={list.error} />}
        {list.data && (
          <>
            <EntityTable entities={items} />
            {total > PAGE_SIZE && (
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
                  disabled={offset + PAGE_SIZE >= total}
                  onClick={() => {
                    searchParams.set("offset", String(offset + PAGE_SIZE));
                    setSearchParams(searchParams);
                  }}
                  className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 enabled:hover:bg-zinc-900 disabled:opacity-40"
                >
                  next
                </button>
                <span className="text-zinc-600">
                  {offset}–{Math.min(offset + PAGE_SIZE, total)} of {total}
                </span>
              </div>
            )}
          </>
        )}
      </Panel>
    </div>
  );
}
