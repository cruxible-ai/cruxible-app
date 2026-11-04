import type { NextSeverity } from "@/api/schemas";
import { InfoButton } from "@/components/InfoButton";
import { SignalDot } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { NextTable } from "@/components/next/NextTable";
import { Page, PageHeader } from "@/components/Page";
import { PageNav } from "@/components/next/PageNav";
import { Stat, StatsRow } from "@/components/StatsRow";
import { useNextPage } from "@/components/next/useNextPage";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

const SEVERITIES: NextSeverity[] = ["blocking", "repair", "warning", "setup"];

/**
 * The `next` queue at the pinned generation, evaluated now: one page at a
 * time in the shared table, grouped by severity and reason until a column
 * sorts, filterable by any column (family among them) on the page in hand,
 * each row rendered by its reason. Repairs show as text; nothing here acts.
 */
export function NextScreen() {
  const { page, index, newer, older } = useNextPage();
  usePageTitle("Next");

  const items = page.data?.items ?? [];
  const counts = SEVERITIES.map((severity) => [severity, items.filter((item) => item.severity === severity).length] as const).filter(
    ([, n]) => n > 0,
  );
  const more = page.data ? page.data.total_items > items.length : false;
  return (
    <Page>
      <PageHeader
        title="Next"
        summary={
          page.data ? (
            page.data.total_items === 0 ? (
              "None"
            ) : (
              <>
                <StatsRow>
                  <Stat n={page.data.total_items} label={page.data.total_items === 1 ? "item" : "items"} />
                  {counts.map(([severity, n]) => (
                    <SeverityCount key={severity} severity={severity} count={n} />
                  ))}
                  {more && <span>counts for this page</span>}
                </StatsRow>
              </>
            )
          ) : undefined
        }
        description="What needs a person, worst first: problems with the repair to run, then setup choices that are yours to make. Repairs are shown as text; run them from the CLI or MCP."
        actions={<PageNav index={index} total={page.data?.total_items} newer={newer} older={older} />}
      />
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && items.length > 0 && (
        <Panel
          title="Items"
          meta={
            <span className="inline-flex items-center gap-2">
              {items.length} on this page
              {page.data.unobserved_domains.length > 0 && (
                <InfoButton label="What the console does not check">
                  Not checked from the console: {page.data.unobserved_domains.map(humanize).join(", ")}. Items that need the workspace (drifted citations, edited projections) appear only from the CLI or MCP.
                </InfoButton>
              )}
            </span>
          }
        >
          <NextTable
            items={items}
            partial={more ? `${index === 0 ? "the first" : "this page of"} ${items.length} of ${page.data.total_items}` : null}
          />
        </Panel>
      )}
      {page.data && items.length === 0 && page.data.total_items > 0 && <EmptyState>None on this page</EmptyState>}
    </Page>
  );
}

/** A severity's count in the counts row, with its signal dot (blocking: red, repair: amber). */
function SeverityCount({ severity, count }: { severity: NextSeverity; count: number }) {
  const t = term("severity", severity);
  return (
    <span className="inline-flex items-baseline gap-1.5" title={t.meaning}>
      {t.signal && <SignalDot signal={t.signal} title={t.meaning} />}
      <Stat n={count} label={`${t.word.toLowerCase()}${count === 1 || severity === "blocking" || severity === "setup" ? "" : "s"}`} />
    </span>
  );
}
