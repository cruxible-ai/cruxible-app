import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { NextItem, NextSeverity } from "@/api/schemas";
import { toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { NextGroups } from "@/components/next/NextItemRow";
import { Page, PageHeader } from "@/components/Page";
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

  const counts = SEVERITIES.map((severity) => [severity, items.filter((item) => item.severity === severity).length] as const).filter(
    ([, n]) => n > 0,
  );
  return (
    <Page>
      <PageHeader
        title="Next"
        summary={
          page.data ? (
            page.data.total_items === 0 ? (
              "Nothing needs attention."
            ) : (
              <>
                <span className="font-mono text-zinc-100">{page.data.total_items}</span> {page.data.total_items === 1 ? "item needs" : "items need"} attention
                {counts.length > 0 && (
                  <>
                    {" "}
                    on this page:{" "}
                    {counts.map(([severity, n], i) => (
                      <span key={severity}>
                        {i > 0 && ", "}
                        <span className={severity === "blocking" ? "text-red-400" : undefined}>
                          {n} {severity === "repair" ? (n === 1 ? "repair" : "repairs") : severity}
                        </span>
                      </span>
                    ))}
                  </>
                )}
                . Repairs are shown as text; run them from the CLI or MCP.
              </>
            )
          ) : undefined
        }
        actions={<PageNav index={index} total={page.data?.total_items} newer={newer} older={older} />}
      >
        {page.data && (
          <div className="mt-3 flex flex-wrap gap-1.5">
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
      </PageHeader>
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && shown.length === 0 && <EmptyState>Nothing on this page{family ? " in this family" : ""}.</EmptyState>}
      {SEVERITIES.map((severity) => {
        const rows = bySeverity.get(severity)!;
        if (rows.length === 0) return null;
        return (
          <Panel key={severity} title={humanize(severity)} meta={<span>{rows.length}</span>}>
            <NextGroups items={rows} />
          </Panel>
        );
      })}
      {page.data && page.data.unobserved_domains.length > 0 && (
        <div className="t-meta measure">
          Not observed from the console: {page.data.unobserved_domains.map(humanize).join(", ")}. Rows that
          need a workspace observation (drifted citations, edited projections) appear only for callers that send
          one.
        </div>
      )}
    </Page>
  );
}
