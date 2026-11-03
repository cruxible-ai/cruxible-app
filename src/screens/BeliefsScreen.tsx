import { useSearchParams } from "react-router-dom";
import { toggleChipClass } from "@/components/Chip";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { NextTable } from "@/components/next/NextTable";
import { PageNav } from "@/components/next/PageNav";
import { useNextPage } from "@/components/next/useNextPage";
import { BELIEF_TABS, FAMILY_LABEL, familyOf, REASONS, type BeliefTab } from "@/lib/next-reasons";
import { usePageTitle } from "@/lib/usePageTitle";

const TAB_NOTE: Record<BeliefTab, string> = {
  contested:
    "Slots whose Claims conflict, and Claims with new or contradicting attested evidence. A recorded attestation counts toward the verdict only once accepted citing a Capture the Claim admits, or through the ClaimType's consequence policy.",
  stale: "Claims whose evidence expired or is expiring, derived from stale inputs, or not covered by admitted evidence.",
  drifted:
    "Citations whose source changed. Drift is observed from a workspace: next reports it only to a caller that sends a workspace observation, and the console sends none, so this tab shows what accepted state alone can tell.",
};

/**
 * Beliefs that need a look, as tabs over the `next` page in hand (no server
 * filter exists, gap G7): contested, stale, drifted. Each row links to its
 * Subject or Claim.
 */
export function BeliefsScreen() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab");
  const tab: BeliefTab = (BELIEF_TABS as readonly string[]).includes(raw ?? "") ? (raw as BeliefTab) : "contested";
  const { page, index, newer, older } = useNextPage();
  usePageTitle("Beliefs");
  const items = page.data?.items ?? [];
  const rows = items.filter((item) => familyOf(item.reason) === tab);
  const reasons = Object.entries(REASONS)
    .filter(([, meta]) => meta.family === tab)
    .map(([, meta]) => meta.label);

  function setTab(next: BeliefTab) {
    // a tab is another list: its table starts unsorted and unfiltered
    const updated = new URLSearchParams();
    const at = params.get("at");
    if (at !== null) updated.set("at", at);
    updated.set("tab", next);
    setParams(updated);
  }

  return (
    <Page>
      <PageHeader
        title="Beliefs"
        info={TAB_NOTE[tab]}
        infoLabel={`About ${FAMILY_LABEL[tab].toLowerCase()}`}
        actions={<PageNav index={index} total={page.data?.total_items} newer={newer} older={older} />}
      >
        <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
          {BELIEF_TABS.map((name) => (
            <button key={name} onClick={() => setTab(name)} className={toggleChipClass(name === tab)}>
              {FAMILY_LABEL[name]} ({items.filter((item) => familyOf(item.reason) === name).length})
            </button>
          ))}
          <span className="t-meta ml-2">Reasons: {reasons.join(", ")}</span>
        </div>
      </PageHeader>
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && (
        <Panel title={FAMILY_LABEL[tab]} meta={<span>{rows.length} on this page of {items.length}</span>}>
          {rows.length === 0 ? (
            <EmptyState>None on this page</EmptyState>
          ) : (
            <NextTable
              items={rows}
              family={false}
              label={FAMILY_LABEL[tab]}
              partial={page.data.total_items > items.length ? `${index === 0 ? "the first" : "this page of"} ${items.length} next rows` : null}
            />
          )}
        </Panel>
      )}
    </Page>
  );
}
