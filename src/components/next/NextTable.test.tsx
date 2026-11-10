import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import type { NextItem, NextResult } from "@/api/schemas";
import { AUTHORED } from "@/fixtures/handlers";
import { NEXT_KIND_ITEMS } from "@/fixtures/authored/next-kinds";
import { renderApp } from "@/test/render";
import { REASONS } from "@/lib/next-reasons";

afterEach(cleanup);

const I = "/i/inst_fixture";

/** The fixture world with the /next answer holding `items`. */
function withItems(items: NextItem[]) {
  const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
  const response = fixture.response as NextResult;
  return [...AUTHORED, { ...fixture, response: { ...response, items, total_items: items.length, next_cursor: null } }];
}

const item = (id: string) => NEXT_KIND_ITEMS.find((i) => i.item_id === id)!;

/** The table row holding `text`. */
async function rowOf(text: string | RegExp) {
  const table = within(await screen.findByRole("table", { name: "Next" }));
  const cell = (await table.findAllByText(text))[0]!;
  return within(cell.closest("tr")!);
}

describe("Next rows: every kind", () => {
  it("renders one row per item for every reason the contract serves, each with its label, severity and ref", async () => {
    renderApp(`${I}/next`, withItems(NEXT_KIND_ITEMS));
    const table = within(await screen.findByRole("table", { name: "Next" }));
    await table.findByText(REASONS.kit_resume_blocked.label);
    const rows = table.getAllByRole("row").filter((row) => row.closest("tbody"));
    expect(rows).toHaveLength(NEXT_KIND_ITEMS.length);
    for (const reason of Object.keys(REASONS) as (keyof typeof REASONS)[]) {
      expect(table.getAllByText(REASONS[reason].label).length, reason).toBeGreaterThan(0);
    }
    // about: the kind as a quiet tag before the name, the name linked, on one line; the whole ref on hover
    const line = await rowOf(REASONS.line_work_pending.label);
    expect(line.getByText("Line")).toBeInTheDocument();
    expect(line.getByRole("link", { name: "ingest.weekly" })).toHaveAttribute("href", `${I}/lines/ingest.weekly`);
    expect(line.getByTitle("Line:ingest.weekly")).toBeInTheDocument();
    // since when, under the severity; the queue's own time is not repeated in the detail
    expect(line.getByText(/ago$/)).toBeInTheDocument();
    expect(line.queryByText("Oldest")).toBeNull();
    // what else a row names, quietly under the ref
    const conflict = await rowOf(REASONS.claim_conflicted.label);
    expect(conflict.getAllByRole("link", { name: /^CLM-1{12}…$/ }).length).toBeGreaterThan(0);
    // typed figures as label and value
    expect(within(table.getAllByText("Unread")[0]!.parentElement!).getByText("7")).toBeInTheDocument();
  });

  it("shows core's sentence only when it adds to the typed fields", async () => {
    renderApp(`${I}/next`, withItems(NEXT_KIND_ITEMS));
    await screen.findByRole("table", { name: "Next" });
    // restates the unread count and the row's Line
    expect(screen.queryByText(/new inbox items? from/)).toBeNull();
    // the unavailable inbox has no count: its sentence is the only "why"
    expect(screen.getByText("Inbox volume is unknown because its journal is incomplete.")).toBeInTheDocument();
    // constants restating the reason, and a sentence built from a typed version
    expect(screen.queryByText("accepted but never enabled; enable it to run on its Triggers")).toBeNull();
    expect(screen.queryByText("disabled by upgrade to 2; enable to resume")).toBeNull();
    expect(screen.queryByText(/Daemon restarted/)).toBeNull();
    expect(screen.queryByText(/the file catalog binds/)).toBeNull();
    expect(screen.queryByText(/A stale candidate is never approvable/)).toBeNull();
    // the only place a cause or refusal appears: shown as written
    expect(screen.getByText("actor_no_longer_authoring: owner cannot propose here: credential revoked")).toBeInTheDocument();
    expect(screen.getByText("provider ingest-http refused: credential expired")).toBeInTheDocument();
    expect(screen.getByText("the marker coordinate is not accepted by the attached instance")).toBeInTheDocument();
    expect(screen.getByText(/Or bind it to a fixed Procedure/)).toBeInTheDocument();
  });

  it("leads with the step the console can show; the CLI and MCP forms one line each, with copy", async () => {
    renderApp(`${I}/next`, withItems([item("k-line_inbox_unread"), item("k-claim_uncovered"), item("k-claim_stale_evidence")]));
    // a read repair opens here, from the repair's own arguments
    const inbox = await rowOf(REASONS.line_inbox_unread.label);
    expect(inbox.getByRole("link", { name: "Open in Inbox" })).toHaveAttribute("href", `${I}/inbox?line=ingest.daily&status=unread`);
    expect(inbox.queryByText(/^cruxible inbox list/)).toBeNull();
    fireEvent.click(inbox.getByRole("button", { name: "CLI / MCP" }));
    expect(inbox.getByText("cruxible inbox list --line ingest.daily --status unread")).toHaveAttribute("title", "cruxible inbox list --line ingest.daily --status unread");
    expect(inbox.getByText("cruxible_inbox_list")).toBeInTheDocument();
    expect(inbox.getByRole("button", { name: "Copy cruxible inbox list --line ingest.daily --status unread" })).toBeInTheDocument();
    expect(inbox.getByRole("button", { name: "Copy cruxible_inbox_list" })).toBeInTheDocument();
    // no stray separators
    expect(inbox.queryByText(/^·/)).toBeNull();
    // a get repair opens the ref it names
    const uncovered = await rowOf(REASONS.claim_uncovered.label);
    expect(uncovered.getByRole("link", { name: "Open ClaimType" })).toHaveAttribute("href", `${I}/claim-types/vendor.package.status`);
    // a write repair: the CLI leads, the MCP tool under it, both shown
    const stale = await rowOf(REASONS.claim_stale_evidence.label);
    expect(stale.getByText(/^cruxible authoring bind CLM-4/)).toBeInTheDocument();
    expect(stale.getByText("cruxible_authoring_bind")).toBeInTheDocument();
    expect(stale.queryByRole("button", { name: "CLI / MCP" })).toBeNull();
    // what the repair changes, in words, on the ⓘ
    fireEvent.click(stale.getByRole("button", { name: "What the repair changes" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Recapture expired evidence");
  });

  it("shows a hand edit as such, and other ways to repair on request", async () => {
    renderApp(`${I}/next`, withItems([item("k-line_run_failed"), item("k-claim_conflicted")]));
    const failed = await rowOf(REASONS.line_run_failed.label);
    expect(failed.getByText("Edit by hand")).toBeInTheDocument();
    expect(failed.queryByText("CLI")).toBeNull();
    const conflict = await rowOf(REASONS.claim_conflicted.label);
    expect(conflict.queryByText("Revise claims into distinct qualifiers")).toBeNull();
    fireEvent.click(conflict.getByRole("button", { name: "+2 other" }));
    expect(conflict.getByText("Revise claims into distinct qualifiers")).toBeInTheDocument();
    expect(conflict.getByText(`cruxible retire CLM-${"2".repeat(32)} --because BECAUSE`)).toBeInTheDocument();
  });

  it("says what a withheld repair needs instead of the command, the command path behind CLI / MCP", async () => {
    renderApp(`${I}/next`, withItems([item("k-line_not_enabled"), item("k-proposal_stale")]));
    const setup = await rowOf(REASONS.line_not_enabled.label);
    expect(setup.getByText("Needs governed write")).toBeInTheDocument();
    expect(setup.queryByText(/^cruxible line enable/)).toBeNull();
    fireEvent.click(setup.getByRole("button", { name: "Why the repair is withheld" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Running it needs governed write access.");
    fireEvent.click(setup.getByRole("button", { name: "CLI / MCP" }));
    expect(setup.getByText("cruxible line enable ingest.quarterly")).toBeInTheDocument();
    expect(setup.getByText("cruxible_line_enable")).toBeInTheDocument();
    const stale = await rowOf(REASONS.proposal_stale.label);
    expect(stale.getByText("Author only")).toBeInTheDocument();
  });

  it("explains severity levels, repairs and what the console does not observe", async () => {
    renderApp(`${I}/next`, withItems(NEXT_KIND_ITEMS));
    const table = within(await screen.findByRole("table", { name: "Next" }));
    fireEvent.click(table.getByRole("button", { name: "What severity means" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent(/Blocking: .*Repair: .*Warning: .*Setup: /);
    fireEvent.click(table.getByRole("button", { name: "What severity means" }));
    fireEvent.click(table.getByRole("button", { name: "What repair means" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("the console never runs one");
    fireEvent.click(table.getByRole("button", { name: "What repair means" }));
    fireEvent.click(screen.getByRole("button", { name: "What drift not observed means" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Workspace sources: the workspace files Claims cite: drifted citations.");
    // the summary stays one line of parts, each with its meaning on hover
    expect(screen.getByTitle("Items in the queue, evaluated now at the pinned generation")).toHaveTextContent(`${NEXT_KIND_ITEMS.length} items`);
  });
});
