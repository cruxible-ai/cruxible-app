import type { NextSeverity } from "@/api/schemas";
import { useSearchParams } from "react-router-dom";
import { InfoButton } from "@/components/InfoButton";
import { SignalDot, toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { NextTable, SEVERITIES } from "@/components/next/NextTable";
import { Page, PageHeader } from "@/components/Page";
import { PageNav } from "@/components/next/PageNav";
import { Stat, StatsRow } from "@/components/StatsRow";
import { useNextPage } from "@/components/next/useNextPage";
import { BELIEF_FAMILIES, familyOf } from "@/lib/next-reasons";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

/**
 * The `next` queue at the pinned generation, evaluated now: one page at a
 * time in the shared table, ordered by item type and filterable by any column
 * (family among them) or the Beliefs preset on the page in hand,
 * each row rendered by its reason. Repairs show as text; nothing here acts.
 */
export function NextScreen() {
  const [params, setParams] = useSearchParams();
  const beliefs = params.get("preset") === "beliefs";
  const { page, index, newer, older } = useNextPage();
  usePageTitle("Next");

  const items = page.data?.items ?? [];
  const rows = beliefs ? items.filter((item) => BELIEF_FAMILIES.includes(familyOf(item.reason))) : items;
  function setPreset(value: boolean) {
    const updated = new URLSearchParams(params);
    if (value) updated.set("preset", "beliefs");
    else updated.delete("preset");
    setParams(updated);
  }
  const counts = SEVERITIES.map((severity) => [severity, items.filter((item) => item.severity === severity).length] as const).filter(
    ([, n]) => n > 0,
  );
  const more = page.data ? page.data.total_items > items.length : false;
  // Drift needs the workspace's files: the daemon checks it only when a client that sees them asks.
  const driftUnobserved = page.data ? page.data.unobserved_domains.includes("workspace_sources") : false;
  return (
    <Page>
      <PageHeader
        title="Next"
        summary={
          page.data ? (
            page.data.total_items === 0 ? (
              driftUnobserved ? (
                <StatsRow>
                  <DriftUnobserved domains={page.data.unobserved_domains} />
                </StatsRow>
              ) : undefined
            ) : (
              <>
                <StatsRow>
                  <span title="Items in the queue, evaluated now at the pinned generation">
                    <Stat n={page.data.total_items} label={page.data.total_items === 1 ? "item" : "items"} />
                  </span>
                  {counts.map(([severity, n]) => (
                    <SeverityCount key={severity} severity={severity} count={n} />
                  ))}
                  {more && <span>counts for this page</span>}
                  {driftUnobserved && <DriftUnobserved domains={page.data.unobserved_domains} />}
                </StatsRow>
              </>
            )
          ) : undefined
        }
        description="What needs a person, worst first: problems with the repair to run, then setup choices that are yours to make. Repairs are shown as text; run them from the CLI or MCP."
        actions={<PageNav index={index} total={page.data?.total_items} newer={newer} older={older} />}
      >
        <div className="mt-3 flex items-center gap-1.5" role="group" aria-label="Preset">
          <button className={toggleChipClass(!beliefs)} aria-pressed={!beliefs} onClick={() => setPreset(false)}>
            All
          </button>
          <button className={toggleChipClass(beliefs)} aria-pressed={beliefs} onClick={() => setPreset(true)}>
            Beliefs
          </button>
          {beliefs && (
            <InfoButton label="Beliefs preset">
              Contested, stale and drifted reasons on this page.{driftUnobserved && " Drifted citations are not observed here: run cruxible next in the workspace."}
            </InfoButton>
          )}
        </div>
      </PageHeader>
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && items.length > 0 && (
        <Panel
          title="Items"
          meta={
            <span className="inline-flex items-center gap-2">
              {beliefs ? `${rows.length} of ${items.length}` : items.length} on this page
              {/* the summary's "Drift not observed" carries this when drift is among them */}
              {page.data.unobserved_domains.length > 0 && !driftUnobserved && (
                <InfoButton label="What the console does not check">
                  <UnobservedDomains domains={page.data.unobserved_domains} />
                </InfoButton>
              )}
            </span>
          }
        >
          <NextTable
            items={rows}
            empty="None on this page"
            partial={more ? `${index === 0 ? "the first" : "this page of"} ${items.length} of ${page.data.total_items}` : null}
          />
        </Panel>
      )}
      {page.data && items.length === 0 && page.data.total_items > 0 && <EmptyState>None on this page</EmptyState>}
      {/* an empty queue is the good case: nothing to repair or decide */}
      {page.data && page.data.total_items === 0 && (
        <Panel title="Items">
          <EmptyState>Nothing needs attention</EmptyState>
        </Panel>
      )}
    </Page>
  );
}

/** What each observation domain of `next` covers (NextResult.unobserved_domains). */
const DOMAIN_MEANING: Record<string, string> = {
  accepted_state: "the instance's accepted state",
  workspace_floor: "the workspace's installed floor",
  workspace_sources: "the workspace files Claims cite: drifted citations",
  workspace_projections: "the projected blocks in workspace files: edited projections",
};

/** The domains the queue did not observe, each with what it covers. */
function UnobservedDomains({ domains }: { domains: readonly string[] }) {
  return (
    <span className="flex flex-col gap-1">
      <span>Not observed here, so their items are not listed:</span>
      {domains.map((domain) => (
        <span key={domain}>
          {humanize(domain)}: {DOMAIN_MEANING[domain] ?? humanize(domain).toLowerCase()}.
        </span>
      ))}
      <span>Run cruxible next (or the MCP cruxible_next) in the workspace to check them.</span>
    </span>
  );
}

/** Drift was not checked: no workspace observation reached the queue. */
function DriftUnobserved({ domains }: { domains: readonly string[] }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 text-zinc-500">
      Drift not observed
      <InfoButton label="What drift not observed means">
        <UnobservedDomains domains={domains} />
      </InfoButton>
    </span>
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
