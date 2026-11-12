import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { AUTHORED } from "@/fixtures/handlers";
import type { OrientResult } from "@/api/schemas";
import { RUNBOOK_WAKES } from "@/test/runbook-wakes";
import { freshDashboard, unhealthyDashboard } from "@/test/dashboard-worlds";
import { renderApp } from "@/test/render";

/** jsdom here has no working localStorage: an in-memory one per test. */
function memoryStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (i) => [...items.keys()][i] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, String(value)),
  };
}

const SEEN_KEY = "cruxible.dashboard.seen:inst_fixture";

beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const panel = async (name: string) => within((await screen.findByRole("heading", { name })).closest("section")!);

describe("Dashboard", () => {
  it("leads with what needs you, then what each enabled Line waits for", async () => {
    renderApp("/i/inst_fixture");

    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByText("Generation")).toBeInTheDocument();

    // the needs-you strip: each tile links to where it is acted on
    const strip = within(main.getByRole("region", { name: "Needs you" }));
    expect(strip.getByRole("link", { name: /Waiting for review/ })).toHaveAttribute("href", "/i/inst_fixture/proposals?status=open");
    expect(await strip.findByRole("link", { name: /Next \d/ })).toHaveAttribute("href", "/i/inst_fixture/next");
    // a stopped Line and unread inbox items are waiting on you (amber)
    expect(strip.getByRole("link", { name: /^Waiting on you Lines 1 running 0 stalled · 1 stopped/ })).toHaveAttribute("href", "/i/inst_fixture/lines");
    expect(strip.getByRole("link", { name: /^Waiting on you Unread inbox 3/ })).toBeInTheDocument();

    // coming up: each enabled Line, with what wakes it and what it is waiting on; a stopped one says so
    const coming = within((await main.findByRole("heading", { name: "Coming up" })).closest("section")!);
    const line = await coming.findByRole("link", { name: "kev-triage" });
    expect(line).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    expect(await coming.findByText("Daily at 06:00 UTC")).toBeInTheDocument();
    expect(coming.getByText(/1 scheduled/)).toBeInTheDocument();
    expect(coming.getByRole("link", { name: "cve-applicability" })).toBeInTheDocument();
    expect(coming.getByText("Stopped")).toBeInTheDocument();

    // health is always on the page; its tile jumps to it
    expect(await main.findByText("Line dispatch")).toBeInTheDocument();
    fireEvent.click(await strip.findByRole("button", { name: /Health/ }));
    expect(await main.findByText("security.kev-catalog")).toBeInTheDocument();
  });

  it("shows what happened, newest first: a Line run folds into one row, refusals are red, older rows page in", async () => {
    renderApp("/i/inst_fixture");
    const feed = within(await screen.findByRole("feed", { name: "Activity" }));
    // a definition proposal keeps its own row
    expect(await feed.findByRole("link", { name: "Generation 42" })).toHaveAttribute("href", "/i/inst_fixture?at=42");
    expect(feed.getByText(/accepted · 1 change · proposed by release-owner/)).toBeInTheDocument();
    expect(feed.getByText("Vendor advisory says rel-1 never shipped the build.")).toBeInTheDocument();
    // kev-triage's run: its start, landing and accepted generation are one row, each part linked
    const run = feed.getByRole("link", { name: "succeeded" });
    expect(run).toHaveAttribute("href", `/i/inst_fixture/runs/RUN-${"a1".repeat(16)}`);
    const row = within(run.closest("div")!);
    expect(row.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    expect(row.getByText("3 changes")).toBeInTheDocument();
    expect(row.getByRole("link", { name: "g41" })).toHaveAttribute("href", "/i/inst_fixture?at=41");
    expect(row.getByRole("link", { name: "CAP-cccc…" })).toBeInTheDocument();
    expect(feed.queryByText(/started a run|landed evidence/)).toBeNull();
    expect(feed.queryByRole("link", { name: "Generation 41" })).toBeNull();
    // a refused run is red
    const refused = feed.getByRole("link", { name: "refused" }).closest("div")!;
    expect(within(refused).getByRole("img", { name: /Refused at admission/ })).toBeInTheDocument();
    expect(feed.getByText("posted to the inbox")).toBeInTheDocument();
    expect(feed.getByText("armed → stopped")).toBeInTheDocument();
    fireEvent.click(feed.getByRole("button", { name: "Show older activity" }));
    expect(await feed.findByText("let due work lapse")).toBeInTheDocument();
    expect(feed.queryByRole("button", { name: "Show older activity" })).toBeNull();
  });

  it("shows whether the knowledge is current: freshness per source, stale beliefs and evidence per kind", async () => {
    renderApp("/i/inst_fixture");
    const freshness = await panel("Freshness");
    const sources = within(await freshness.findByRole("list", { name: "Sources" }));
    const kev = await sources.findByRole("link", { name: "cisa.kev.catalog" });
    expect(kev).toHaveAttribute("href", `/i/inst_fixture/flow?focus=${encodeURIComponent("source:cisa.kev.catalog")}`);
    const cell = within(kev.closest("li")!);
    expect(cell.getByRole("link", { name: /ago$/ }).getAttribute("href")).toMatch(/^\/i\/inst_fixture\/ref\/Capture/);
    expect(cell.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");

    const stale = await panel("Stale beliefs");
    expect(await stale.findByText("3 stale")).toBeInTheDocument();
    const vulnerability = stale.getByRole("link", { name: "security.vulnerability" }).closest("tr")!;
    expect(within(vulnerability).getByRole("link", { name: "2" })).toHaveAttribute("href", "/i/inst_fixture/next?preset=beliefs&f.family=stale");
    expect(within(vulnerability).getByRole("link", { name: /kev_listed 1d/ })).toHaveAttribute(
      "href",
      "/i/inst_fixture/kinds/security.vulnerability?claim_type=security.vulnerability.kev_listed",
    );

    const evidence = await panel("Evidence coverage");
    expect(evidence.getByText("2 not admitted")).toBeInTheDocument();
    const bar = within(evidence.getByRole("group", { name: "security.vulnerability evidence" }));
    expect(bar.getByRole("link", { name: "Required, not admitted: 1" })).toHaveAttribute("href", "/i/inst_fixture/next?preset=beliefs&f.family=stale");
    expect(bar.getByRole("link", { name: "Admitted evidence: 2" })).toHaveAttribute("href", "/i/inst_fixture/kinds/security.vulnerability?view=claim-types");
    expect(bar.getByRole("link", { name: "Own words: 4" })).toBeInTheDocument();
    expect(screen.queryByText("Not served by this daemon")).toBeNull();
  });

  it("shows no stale or evidence card when the daemon does not serve those counts", async () => {
    const strip = (row: Record<string, unknown>) => {
      const { stale_count, evidence_counts, ...rest } = row;
      void stale_count;
      void evidence_counts;
      return rest;
    };
    const fixtures = AUTHORED.map((f) => {
      const response = f.response as { section?: string; claim_types?: Record<string, unknown>[] };
      return response.section === "claim_types" ? { ...f, response: { ...response, claim_types: response.claim_types!.map(strip) } } : f;
    });
    renderApp("/i/inst_fixture", fixtures);
    expect(await screen.findByRole("heading", { name: "Freshness" })).toBeInTheDocument();
    expect(await screen.findByRole("list", { name: "Sources" })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("heading", { name: "Stale beliefs" })).toBeNull());
    expect(screen.queryByRole("heading", { name: "Evidence coverage" })).toBeNull();
  });

  it("records a first visit, then lists beliefs changed since the generation last marked seen", async () => {
    renderApp("/i/inst_fixture");
    // a first visit has nothing to compare: no card, the head recorded as the mark
    expect(await screen.findByRole("heading", { name: "Coming up" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Since you last looked" })).toBeNull();
    expect(JSON.parse(localStorage.getItem(SEEN_KEY)!)).toMatchObject({ generation: 42 });
    cleanup();

    localStorage.setItem(SEEN_KEY, JSON.stringify({ generation: 41, at: "2026-10-19T08:00:00Z" }));
    renderApp("/i/inst_fixture");
    const later = await panel("Since you last looked");
    expect(later.getByRole("link", { name: "g41" })).toHaveAttribute("href", "/i/inst_fixture?at=41");
    expect(await later.findByRole("link", { name: /Created 1 New/ })).toHaveAttribute("href", "/i/inst_fixture/ledger");
    expect(later.getByRole("link", { name: /Revised 1 Revised/ })).toBeInTheDocument();
    expect(later.getByRole("link", { name: /Retired 1 Retired/ })).toBeInTheDocument();
    const byKind = within(later.getByRole("table"));
    expect(byKind.getByRole("link", { name: "security.vulnerability" })).toHaveAttribute("href", "/i/inst_fixture/kinds/security.vulnerability");
    expect(byKind.getByRole("link", { name: "security.assessment" })).toBeInTheDocument();

    fireEvent.click(later.getByRole("button", { name: "Mark seen" }));
    expect(await later.findByText("Nothing new")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(SEEN_KEY)!)).toMatchObject({ generation: 42 });
  });

  it("keeps a ?at= pin on every link and names it in the picker", async () => {
    renderApp("/i/inst_fixture?at=42");

    const main = within(await screen.findByRole("main"));
    const line = await main.findByRole("link", { name: "kev-triage" });
    expect(line.getAttribute("href")).toMatch(/^\/i\/inst_fixture\/lines\/[^?]*kev-triage\?at=42$/);
    // the picker names the pin and the head it is not following
    expect(await screen.findByRole("button", { name: /Generation 42 · pinned/ })).toBeInTheDocument();
    expect(screen.getByText("Head is 42")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to head" })).toBeInTheDocument();
  });

  it("lists recent generations in the generation box and says what is waiting to be accepted", async () => {
    renderApp("/i/inst_fixture");
    const box = within(await screen.findByLabelText("Generation"));
    // why the head has not moved: the proposal waiting for review, linked
    expect(await box.findByRole("link", { name: /1 proposal waiting for review/ })).toHaveAttribute(
      "href",
      "/i/inst_fixture/proposals?status=open",
    );
    fireEvent.click(await box.findByRole("button", { name: /Generation 42 · head/ }));
    const list = within(await screen.findByRole("listbox", { name: "Generations" }));
    expect(list.getByRole("option", { name: /^Head/ })).toBeInTheDocument();
    // newest first, each with when, who and how many changes (picking one pins it: the smoke covers that in a browser)
    const g42 = await list.findByRole("option", { name: /^g42/ });
    expect(g42).toHaveTextContent("1 change");
    expect(g42).toHaveTextContent("release-owner");
    expect(g42).toHaveTextContent("Vendor advisory says rel-1 never shipped the build.");
    expect(list.getByRole("textbox", { name: "Pin generation" })).toBeInTheDocument();
  });

  it("shows a refused pin instead of reading the head", async () => {
    renderApp("/i/inst_fixture?at=7");
    expect(await screen.findByText("At 7 refused")).toBeInTheDocument();
  });
  it("lists the Lines orient says need attention, each linked to its Line", async () => {
    // the authored orient page, now naming its stopped Line (and one stalled beyond the three it lists)
    const flagged = AUTHORED.map((fixture) => {
      const orient = fixture.response as OrientResult;
      if (!fixture.path.endsWith("/orient") || !orient.attention?.enablements) return fixture;
      const enablements = { running: 1, stalled: 3, stopped: 1, needs_attention: ["Line:cve-applicability stopped (credential_revoked)", "Line:kev-triage stalled", "Line:epss-daily stalled"] };
      return { ...fixture, response: { ...orient, attention: { ...orient.attention, enablements } } };
    });
    renderApp("/i/inst_fixture", flagged);
    const table = within(await screen.findByRole("table", { name: "Needs attention" }));
    const section = within(table.getByRole("row", { name: /cve-applicability/ }));
    expect(section.getByRole("link", { name: "cve-applicability" })).toHaveAttribute("href", "/i/inst_fixture/lines/cve-applicability");
    expect(section.getByText("Stopped")).toBeInTheDocument();
    expect(section.getByText("credential_revoked")).toBeInTheDocument();
    const stalled = within(table.getByRole("row", { name: /kev-triage/ }));
    expect(stalled.getByText("Stalled")).toBeInTheDocument();
    expect(stalled.getByText("—")).toBeInTheDocument();
    // orient lists at most three: the panel says how many it names of the flagged total
    expect(screen.getByText("first 3 of 4")).toBeInTheDocument();
  });

  it("shows no needs-attention table when orient names none", async () => {
    renderApp("/i/inst_fixture");
    expect(await screen.findByRole("region", { name: "Needs you" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Coming up" })).toBeInTheDocument();
    expect(screen.queryByRole("table", { name: "Needs attention" })).toBeNull();
  });
  it("shows a Line run by a Runbook's Trigger on that Runbook's schedule in Coming up", async () => {
    renderApp("/i/inst_fixture", RUNBOOK_WAKES);
    const coming = within((await screen.findByRole("heading", { name: "Coming up" })).closest("section")!);
    const runbook = await coming.findByRole("link", { name: "demo.maintain" });
    expect(runbook).toHaveAttribute("href", "/i/inst_fixture/runbooks/demo.maintain");
    // the Trigger and the Line's step are on hover; the schedule reads in words with its next fire
    expect(runbook.closest("[title]")).toHaveAttribute("title", expect.stringMatching(/^Trigger:demo\.maintain-daily · step 1/));
    expect(runbook.closest("li")).toHaveTextContent(/next in/);
    expect(coming.queryByText("Runs when asked")).toBeNull();
  });


  it("does not call checks it did not observe healthy: the tile names them, the Health header counts nothing", async () => {
    renderApp("/i/inst_fixture", freshDashboard());
    const strip = within(await screen.findByRole("region", { name: "Needs you" }));
    const tile = await strip.findByRole("button", { name: /Health 3 not observed \/ not configured/ });
    expect(tile).toHaveTextContent("Floor, Ledger mirror, Procedure catalog");
    expect(within(tile).queryByText("Healthy")).toBeNull();
    const health = await panel("Health");
    const table = within(health.getByRole("table", { name: "Health" }));
    expect(within(table.getByRole("row", { name: /^Floor/ })).getByText("Not observed")).toBeInTheDocument();
    // the domains next did not observe are rows like the others, not a footnote
    expect(within(table.getByRole("row", { name: /Workspace floor/ })).getByText("Not observed")).toBeInTheDocument();
    expect(health.queryByText(/healthy|need a look/)).toBeNull();
    expect(health.queryByText(/^Not observed:/)).toBeNull();
  });

  it("counts only the checks that need a look, in the tile and the Health header", async () => {
    renderApp("/i/inst_fixture", unhealthyDashboard());
    const strip = within(await screen.findByRole("region", { name: "Needs you" }));
    const tile = await strip.findByRole("button", { name: /^Wrong or blocked Health 2 need a look/ });
    expect(tile).toHaveTextContent("Provider lane, Compiler");
    const health = await panel("Health");
    expect(await health.findByText("2 need a look")).toBeInTheDocument();
    const lane = within(health.getByRole("row", { name: /Provider lane/ }));
    expect(lane.getByText("Unavailable")).toBeInTheDocument();
    expect(lane.getByText("Reinstall the provider builds")).toBeInTheDocument();
  });

  it("shows evidence coverage with no live Claims as the empty state alone", async () => {
    renderApp("/i/inst_fixture", freshDashboard());
    const evidence = await panel("Evidence coverage");
    expect(await evidence.findByText("No live Claims")).toBeInTheDocument();
    expect(evidence.queryByText("all met")).toBeNull();
  });

  it("says each panel's emptiness once on a fresh instance", async () => {
    localStorage.setItem(SEEN_KEY, JSON.stringify({ generation: 41, at: "2026-10-19T08:00:00Z" }));
    renderApp("/i/inst_fixture", freshDashboard());
    // a zero stands alone in its tile
    const strip = within(await screen.findByRole("region", { name: "Needs you" }));
    expect(strip.getByRole("link", { name: /Waiting for review/ })).toHaveTextContent(/^Waiting for review0$/);
    expect(await strip.findByRole("link", { name: /Unread inbox/ })).toHaveTextContent(/^Unread inbox0$/);
    expect(strip.getByRole("link", { name: /^Next/ })).toHaveTextContent(/^Next0$/);
    expect(strip.getByRole("link", { name: /^Lines/ })).toHaveTextContent(/^Lines0running$/);
    // Coming up: the fold of Lines not enabled, nothing else
    const coming = await panel("Coming up");
    expect(await coming.findByRole("button", { name: "2 not enabled" })).toBeInTheDocument();
    expect(coming.queryByText(/None enabled|Lines enabled|^\d+ enabled$/)).toBeNull();
    // Since you last looked: the empty state and the generations it covers, no zero totals
    const since = await panel("Since you last looked");
    expect(await since.findByText("No Claim changes")).toBeInTheDocument();
    expect(since.getByRole("link", { name: "Ledger" })).toBeInTheDocument();
    expect(since.queryByRole("link", { name: /New|Revised|Retired/ })).toBeNull();
  });
});
