import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { NextItem, NextSeverity } from "@/api/schemas";
import { toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { NextItemRow } from "@/components/next/NextItemRow";
import { PageNav } from "@/components/next/PageNav";
import { useNextPage } from "@/components/next/useNextPage";
import { FAMILY_LABEL, familyOf, type NextFamily } from "@/lib/next-reasons";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

const SEVERITIES: NextSeverity[] = ["blocking", "repair", "warning"];

/**
 * The `next` queue at the pinned generation, evaluated now: one page at a
 * time, grouped by severity, filterable by family on the page in hand, each
 * row rendered by its reason. Repairs show as text; nothing here acts.
 */
export function NextScreen() {
  const { page, index, newer, older } = useNextPage();
  const [params, setParams] = useSearchParams();
  const family = params.get("family") as NextFamily | null;
  usePageTitle("Next");

  const items = page.data?.items ?? [];
  const families = useMemo(() => {
    const counts = new Map<NextFamily, number>();
    for (const item of items) counts.set(familyOf(item.reason), (counts.get(familyOf(item.reason)) ?? 0) + 1);
    return [...counts.entries()];
  }, [items]);
  const shown = family ? items.filter((item) => familyOf(item.reason) === family) : items;
  const bySeverity = new Map<NextSeverity, NextItem[]>(SEVERITIES.map((s) => [s, []]));
  for (const item of shown) bySeverity.get(item.severity)!.push(item);

  function setFamily(next: NextFamily | null) {
    const updated = new URLSearchParams(params);
    if (next) updated.set("family", next);
    else updated.delete("family");
    setParams(updated);
  }

  return (
    <div className="max-w-6xl space-y-3">
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Next</h1>
        {page.data && (
          <span className="text-[13px] text-zinc-500">
            <span className="font-mono text-zinc-300">{page.data.total_items}</span> items
            {page.data.status.blocking && <span className="ml-2 text-red-400">blocking</span>}
          </span>
        )}
        <span className="ml-auto">
          <PageNav index={index} total={page.data?.total_items} newer={newer} older={older} />
        </span>
      </header>
      {page.data && (
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setFamily(null)} className={toggleChipClass(family === null)}>
            all on this page ({items.length})
          </button>
          {families.map(([name, count]) => (
            <button key={name} onClick={() => setFamily(name)} className={toggleChipClass(family === name)}>
              {FAMILY_LABEL[name]} ({count})
            </button>
          ))}
        </div>
      )}
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && shown.length === 0 && <EmptyState>Nothing on this page{family ? " in this family" : ""}.</EmptyState>}
      {SEVERITIES.map((severity) => {
        const rows = bySeverity.get(severity)!;
        if (rows.length === 0) return null;
        return (
          <Panel key={severity} title={humanize(severity)} meta={<span>{rows.length}</span>}>
            <div className="divide-y divide-zinc-800/60">
              {rows.map((item) => (
                <NextItemRow key={item.item_id} item={item} />
              ))}
            </div>
          </Panel>
        );
      })}
      {page.data && page.data.unobserved_domains.length > 0 && (
        <div className="text-[12px] text-zinc-600">
          Not observed from the console: {page.data.unobserved_domains.map(humanize).join(", ")}. Rows that
          need a workspace observation (drifted citations, edited projections) appear only for callers that send
          one.
        </div>
      )}
    </div>
  );
}
