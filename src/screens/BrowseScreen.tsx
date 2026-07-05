import { humanize } from "@/lib/text";
import { useParams, useSearchParams } from "react-router-dom";
import { useEntityList, useInstanceSchema } from "@/api/hooks";
import { statusEnumValues } from "@/api/schema-info";
import { EntityTable } from "@/components/EntityTable";
import { Panel, LoadState } from "@/components/Panel";
import { isEntityRef } from "@/api/items";
import { isColdEntity } from "@/lib/cold";
import { useSettings } from "@/lib/settings";

const PAGE_SIZE = 100;

/**
 * Raw entity listing per type — the database-console view of the state.
 * Status filtering is schema-driven (the type's own enum vocabulary) and
 * lives in the URL. List reads carry no receipt today; the footer says so
 * rather than implying parity with receipted query surfaces.
 */
export function BrowseScreen() {
  const { entityType = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const schema = useInstanceSchema();
  const offset = Number(searchParams.get("offset") ?? 0);
  const status = searchParams.get("status") ?? undefined;
  const list = useEntityList(
    entityType,
    PAGE_SIZE,
    offset,
    status ? { status } : undefined,
  );

  const statuses = statusEnumValues(schema.data, entityType) ?? [];
  const allItems = ((list.data as { items?: unknown[] } | undefined)?.items ?? []).filter(isEntityRef);
  const total = (list.data as { total?: number } | undefined)?.total ?? 0;

  // Hide-cold is a display preference and yields to explicit intent: picking
  // a status chip (even a cold one) always shows exactly that status.
  const { settings } = useSettings();
  const hideCold = settings.hideCold && !status;
  const items = hideCold ? allItems.filter((e) => !isColdEntity(e)) : allItems;
  const hiddenCount = allItems.length - items.length;

  function setStatus(next: string | undefined) {
    const sp = new URLSearchParams(searchParams);
    if (next) sp.set("status", next);
    else sp.delete("status");
    sp.delete("offset");
    setSearchParams(sp);
  }

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">{humanize(entityType)}</h1>
        {statuses.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setStatus(undefined)}
              className={`rounded border px-1.5 py-px text-[11px] ${
                !status
                  ? "border-zinc-600 bg-zinc-800 text-zinc-200"
                  : "border-zinc-800 text-zinc-500 hover:bg-zinc-900"
              }`}
            >
              all
            </button>
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s === status ? undefined : s)}
                className={`rounded border px-1.5 py-px text-[11px] ${
                  s === status
                    ? "border-zinc-600 bg-zinc-800 text-zinc-200"
                    : "border-zinc-800 text-zinc-500 hover:bg-zinc-900"
                }`}
              >
                {humanize(s)}
              </button>
            ))}
          </div>
        )}
      </header>
      <Panel
        title="Entities"
        meta={
          <span>
            <span className="font-mono">{total}</span> total · unreceipted list read
            {hiddenCount > 0 && <> · {hiddenCount} cold hidden on this page</>}
          </span>
        }
      >
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
                    const sp = new URLSearchParams(searchParams);
                    sp.set("offset", String(Math.max(0, offset - PAGE_SIZE)));
                    setSearchParams(sp);
                  }}
                  className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 enabled:hover:bg-zinc-900 disabled:opacity-40"
                >
                  prev
                </button>
                <button
                  disabled={offset + PAGE_SIZE >= total}
                  onClick={() => {
                    const sp = new URLSearchParams(searchParams);
                    sp.set("offset", String(offset + PAGE_SIZE));
                    setSearchParams(sp);
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
