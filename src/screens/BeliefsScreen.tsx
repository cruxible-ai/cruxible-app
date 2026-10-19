import { useSearchParams } from "react-router-dom";
import { toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { NextItemRow } from "@/components/next/NextItemRow";
import { PageNav } from "@/components/next/PageNav";
import { useNextPage } from "@/components/next/useNextPage";
import { BELIEF_TABS, FAMILY_LABEL, familyOf, REASONS, type BeliefTab } from "@/lib/next-reasons";
import { usePageTitle } from "@/lib/usePageTitle";

const TAB_NOTE: Record<BeliefTab, string> = {
  contested: "Slots whose Claims conflict, and Claims with new or contradicting attested evidence.",
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
    const updated = new URLSearchParams(params);
    updated.set("tab", next);
    setParams(updated);
  }

  return (
    <div className="max-w-6xl space-y-3">
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Beliefs</h1>
        <span className="flex gap-1.5">
          {BELIEF_TABS.map((name) => (
            <button key={name} onClick={() => setTab(name)} className={toggleChipClass(name === tab)}>
              {FAMILY_LABEL[name]} ({items.filter((item) => familyOf(item.reason) === name).length})
            </button>
          ))}
        </span>
        <span className="ml-auto">
          <PageNav index={index} total={page.data?.total_items} newer={newer} older={older} />
        </span>
      </header>
      <p className="max-w-3xl text-[12px] text-zinc-500">
        {TAB_NOTE[tab]} <span className="text-zinc-600">Reasons: {reasons.join(", ")}.</span>
      </p>
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && (
        <Panel title={FAMILY_LABEL[tab]} meta={<span>{rows.length} on this page of {items.length}</span>}>
          {rows.length === 0 && <EmptyState>None on this page.</EmptyState>}
          <div className="divide-y divide-zinc-800/60">
            {rows.map((item) => (
              <NextItemRow key={item.item_id} item={item} />
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
