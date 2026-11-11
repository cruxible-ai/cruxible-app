import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { RUNBOOK_WAKES } from "@/test/runbook-wakes";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import { AT, COORDINATE, NOW } from "@/fixtures/authored/world";
import { LINE_INBOX_ITEM } from "@/fixtures/authored/lines";
import { orientQuery } from "@/api/requests";
import { ORIENT_PAGE } from "@/api/hooks";
import { withOrient } from "@/test/fresh";

afterEach(cleanup);

describe("Lines", () => {
  it("opens Automation and redirects old index bookmarks with their pin and filters", async () => {
    renderApp("/i/inst_fixture/automation");
    expect(await screen.findByRole("heading", { name: "Automation" })).toBeInTheDocument();
    expect(document.title).toBe("Automation · Cruxible");
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: "Automation" })).toHaveAttribute("href", "/i/inst_fixture/automation");
    cleanup();
    renderApp("/i/inst_fixture/lines?at=42&f.state=stopped");
    expect(await screen.findByRole("heading", { name: "Automation" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByRole("link", { name: "cve-applicability" })).toBeInTheDocument();
    expect(main.queryByRole("link", { name: "kev-triage" })).toBeNull();
    expect(screen.getByRole("button", { name: /Generation 42 · pinned/ })).toBeInTheDocument();
  });

  it("reads each Line from what starts it to what it ends in, running first, with its last run and what needs you", async () => {
    renderApp("/i/inst_fixture/lines");
    const main = within(await screen.findByRole("main"));
    const kev = await main.findByRole("link", { name: "kev-triage" });
    expect(kev).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    const row = within(kev.closest("tr")!);
    expect(await row.findByText("Succeeded")).toBeInTheDocument();
    expect(await row.findByText("Inbox: 3 unread")).toBeInTheDocument();
    // what it ends in comes from the evidence flow, after the Line's authority
    expect(await row.findByText(/^(settles|proposes|posts to|lands)$/)).toBeInTheDocument();
    const cve = within(main.getByRole("link", { name: "cve-applicability" }).closest("tr")!);
    expect(await cve.findByText("Never run")).toBeInTheDocument();
    // Procedure, mandates, authority and due work are columns to switch on
    expect(main.queryByRole("columnheader", { name: /Mandate/ })).toBeNull();
    expect(main.getByRole("button", { name: /Columns \(\d+ of \d+\)/ })).toBeInTheDocument();
  });
});

describe("Lines table", () => {
  it("filters by a picked enablement word and sorts by a header, both kept in the URL", async () => {
    renderApp("/i/inst_fixture/lines?f.state=stopped");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("link", { name: "cve-applicability" })).toBeInTheDocument();
    expect(main.queryByRole("link", { name: "kev-triage" })).toBeNull();
    expect(main.getByText("1 of 2")).toBeInTheDocument();
    // the State column is one to switch on; its filter still applies from the URL, and Clear lifts it
    fireEvent.click(main.getByRole("button", { name: /Clear/ }));
    expect(await main.findByRole("link", { name: "kev-triage" })).toBeInTheDocument();
    cleanup();
    renderApp("/i/inst_fixture/lines?sort=-line");
    const sorted = within(await screen.findByRole("table", { name: "Lines" }));
    await sorted.findByRole("link", { name: "kev-triage" });
    expect(sorted.getAllByRole("link", { name: /^(kev-triage|cve-applicability)$/ }).map((a) => a.textContent)).toEqual(["kev-triage", "cve-applicability"]);
    expect(sorted.getByRole("columnheader", { name: /Line/ })).toHaveAttribute("aria-sort", "descending");
  });
});

describe("Line page", () => {
  it("shows triggers, withheld enabler, runs paged, track record, dispositions, mandate scope and condition, readings, inbox", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("heading", { name: "kev-triage" })).toBeInTheDocument();
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: "Automation" })).toHaveClass("bg-zinc-800");
    expect(main.getByText("Daily at 06:00 UTC")).toBeInTheDocument();
    expect(main.getByText("withheld")).toBeInTheDocument();
    expect(await main.findByText("Page 1 · 12 in all")).toBeInTheDocument();
    expect(await main.findByRole("link", { name: "run-6" })).toBeInTheDocument();
    expect(main.getAllByRole("link", { name: "run-7" })[0]).toHaveAttribute("href", "/i/inst_fixture/runs/run-7");
    expect(main.getByRole("button", { name: "Older →" })).toBeInTheDocument();
    // what each run changed, from its nodes' summaries; blank for a run with none that write
    const runs = within(main.getByRole("table", { name: "Runs" }));
    expect(await runs.findByText("32 written · 2 absent")).toBeInTheDocument();
    expect(runs.getByRole("columnheader", { name: /Changed/ })).toBeInTheDocument();
    expect(await main.findByText("kev-triage-agreement")).toBeInTheDocument();
    expect(main.getByText("Missed a vendor backport.")).toBeInTheDocument();
    // the settle Mandate in words: what it settles, when a Subject leaves the source, under which condition
    // the settle Mandate as a table: per ClaimType what it settles and does on removal; its condition Query
    const mandate = within(await main.findByRole("table", { name: "Mandate security.kev-settle" }));
    const status = within(mandate.getByRole("link", { name: "status" }).closest("tr")!);
    expect(mandate.getByRole("link", { name: "status" })).toHaveAttribute("href", "/i/inst_fixture/claim-types/security.assessment.status");
    expect(status.getByText("new")).toBeInTheDocument();
    expect(status.getByText("retires")).toBeInTheDocument();
    expect(await main.findByText(/else review/)).toBeInTheDocument();
    expect(main.getByRole("button", { name: "What settles means" })).toBeInTheDocument();
    expect(main.getAllByRole("link", { name: "kev_exposure" })[0]).toHaveAttribute("href", `/i/inst_fixture/ref/${encodeURIComponent("query:security.kev_exposure")}`);
    expect(await main.findByText("Contradicted")).toBeInTheDocument();
    // the inbox reads as on the Inbox page: an opened item is its payload's fields and its facts
    const inbox = within(await main.findByRole("table", { name: "Inbox" }));
    fireEvent.click(await inbox.findByRole("button", { name: `Expand ${LINE_INBOX_ITEM}` }));
    const fields = within(await main.findByRole("list", { name: "Payload fields" }));
    expect(await fields.findByText("rel-1")).toBeInTheDocument();
    expect(within(main.getByRole("list", { name: "Item" })).getByText("3 times")).toBeInTheDocument();
    expect(main.queryByRole("button", { name: /^(run|dispatch|enable|disable|ack|dismiss|link|evaluate)/i })).toBeNull();
  });
});

describe("Line page tables", () => {
  it("sorts the runs page and says the sort covers only that page; the inbox in the Inbox page's rows", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage?runs.sort=-nodes");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(/^Sorted within the newest \d+ of 12 runs\.$/)).toBeInTheDocument();
    const runs = within(main.getByRole("table", { name: "Runs" }));
    expect(runs.getByRole("columnheader", { name: /Nodes done/ })).toHaveAttribute("aria-sort", "descending");
    const inbox = within(await main.findByRole("table", { name: "Inbox" }));
    // the Inbox page's status marker, a payload that is text read as served, no raw preview column, no id column
    expect(await inbox.findByRole("img", { name: /Unread/ })).toBeInTheDocument();
    expect(inbox.getByText("CVE-2024-6387 is KEV-listed; no assessment exists for rel-1.")).toBeInTheDocument();
    expect(inbox.queryByRole("columnheader", { name: /Node|Item/ })).toBeNull();
    // the Line filter already names the Line: no Line column; statuses filter on the Inbox page
    expect(inbox.queryByRole("columnheader", { name: "Line" })).toBeNull();
    expect(main.getAllByRole("link", { name: "Open in Inbox" }).map((a) => a.getAttribute("href"))).toContain("/i/inst_fixture/inbox?line=kev-triage");
  });
});

describe("Run page", () => {
  it("shows nodes, the refusal, the proposal produced, Captures read and withheld attribution", async () => {
    renderApp("/i/inst_fixture/runs/run-7");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("guard_refused")).toBeInTheDocument();
    expect(main.getByText("4 of 6 done")).toBeInTheDocument();
    expect(main.getByText("The settle target is outside the mandate's ClaimType scope.")).toBeInTheDocument();
    // the proposal id is shown shortened (full id on hover)
    expect(main.getByRole("link", { name: /^sha256:a{12}…$/ })).toHaveAttribute(
      "href",
      `/i/inst_fixture/p/sha256%3A${"a".repeat(64)}`,
    );
    expect(await main.findByRole("link", { name: "CAP-9e1b3d5f7a9c" })).toBeInTheDocument();
    expect(main.getByTitle("It names the enabling credential")).toHaveTextContent("Withheld");
    expect(main.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
  });
});

describe("Line definitions", () => {
  it("shows the Line as authored and its slotted Procedure: slots with the builds they bind, steps with what each names", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const main = within(await screen.findByRole("main"));
    // the panel shows while the Line's envelope loads; read it once its rows are in
    const sources = within(await main.findByRole("table", { name: "Sources" }));
    // its only call reads the landing: the source row says so, with the CaptureKind (linked) and the build the Line binds
    expect(sources.getByText("landing")).toHaveAttribute("title", "The Capture whose landing started the run");
    expect(sources.getByRole("link", { name: "kev-http-v1" })).toHaveAttribute("href", "/i/inst_fixture/contracts/security.kev-http-v1");
    expect(sources.getByText("cruxible-provider-web")).toBeInTheDocument();
    // the Procedure as authored is on the steps graph: a clicked step names its contract, slot, binding and query
    const node = async (id: string) => {
      await waitFor(() => expect(document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`)).not.toBeNull(), { timeout: 8000 });
      return document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;
    };
    fireEvent.click(await node("catalog"));
    expect(within(await screen.findByRole("list", { name: "Returns" })).getByRole("link", { name: "kev-http-v1" })).toHaveAttribute("href", "/i/inst_fixture/contracts/security.kev-http-v1");
    const provider = within(screen.getByRole("list", { name: "Provider" }));
    expect(provider.getByText("fetch")).toBeInTheDocument();
    expect(provider.getByRole("link", { name: "cruxible-provider-web" })).toBeInTheDocument();
    fireEvent.click(await node("watched"));
    const query = within(await screen.findByRole("list", { name: "Reads" }));
    expect(query.getByRole("link", { name: "kev_exposure" })).toHaveAttribute(
      "href",
      `/i/inst_fixture/ref/${encodeURIComponent("query:security.kev_exposure")}`,
    );
  });

  it("shows a landing Trigger's contract, the logical sources it selects and the Line it starts", async () => {
    renderApp(`/i/inst_fixture/ref/${encodeURIComponent("Trigger:security.kev-landed")}`);
    const main = within(await screen.findByRole("main"));
    const definition = within((await main.findByText("Definition")).closest("section")!);
    expect(definition.getByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(definition.getByRole("link", { name: "security.kev-http-v1" })).toBeInTheDocument();
    expect(definition.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
  });
});

describe("Runbooks on the Lines page", () => {
  /** The runbooks section past the console's page bound: every page names a next cursor, the last read one too. */
  function cappedRunbooks() {
    const pages = [];
    for (let page = 0; page < 20; page += 1) {
      pages.push(
        defineFixture({
          method: "get",
          path: "/api/v1/{instance_id}/orient",
          query: orientQuery({ coordinate: COORDINATE, section: "runbooks", limit: ORIENT_PAGE, ...(page > 0 ? { cursor: `rb-${page}` } : {}) }),
          response: {
            tag: "playbill-orient-v1",
            instance: "inst_fixture",
            coordinate: COORDINATE,
            generation: AT.generation,
            accepted_at: "2026-10-19T09:30:00Z",
            evaluation_time: NOW,
            section: "runbooks",
            runbooks: [{ runbook: `Runbook:rb.${String(page).padStart(2, "0")}`, lifecycle: "live", steps: 2, triggers_total: 0 }],
            next_cursor: `rb-${page + 1}`,
          },
        }),
      );
    }
    return pages;
  }

  it("says when it holds only a slice of the Runbooks the daemon lists", async () => {
    const recorded = new Set(cappedRunbooks().map((f) => f.key));
    renderApp("/i/inst_fixture/lines", [...AUTHORED.filter((f) => !recorded.has(f.key)), ...cappedRunbooks()]);
    const main = within(await screen.findByRole("main"));
    const panel = within((await main.findByRole("heading", { name: "Runbooks" })).closest("section")!);
    expect(panel.getByText("first 20")).toBeInTheDocument();
    expect(panel.getByText("First 20 Runbooks; more are not read here")).toBeInTheDocument();
    expect(within(panel.getByRole("table", { name: "Runbooks" })).getAllByRole("link")).toHaveLength(20);
  });

  it("says None under Runbooks when the instance has none", async () => {
    renderApp("/i/inst_fixture/lines");
    const main = within(await screen.findByRole("main"));
    await main.findByRole("table", { name: "Lines" });
    const panel = within((await main.findByRole("heading", { name: "Runbooks" })).closest("section")!);
    expect(panel.getByText("None")).toBeInTheDocument();
    expect(panel.queryByRole("table")).toBeNull();
  });

  it("says None under a Line's Next when nothing in the queue is about it", async () => {
    renderApp("/i/inst_fixture/lines/cve-applicability");
    const main = within(await screen.findByRole("main"));
    const panel = within((await main.findByRole("heading", { name: "Next" })).closest("section")!);
    expect(panel.getByText("None")).toBeInTheDocument();
  });

  it("says None under Lines on a fresh instance", async () => {
    renderApp("/i/inst_fixture/lines", withOrient("lines", { lines: [] }));
    const main = within(await screen.findByRole("main"));
    const panel = within((await main.findByRole("heading", { name: "Lines" })).closest("section")!);
    expect(await panel.findByText("None")).toBeInTheDocument();
  });
});

describe("Lines run by a Runbook", () => {
  it("names the Runbook whose Trigger runs a Line on the Automation table and the Line page", async () => {
    renderApp("/i/inst_fixture/automation", RUNBOOK_WAKES);
    const main = within(await screen.findByRole("main"));
    const lines = within(await main.findByRole("table", { name: "Lines" }));
    const row = within((await lines.findByRole("link", { name: "demo.maintain" })).closest("tr")!);
    expect(row.getByRole("link", { name: "cve-applicability" })).toBeInTheDocument();
    expect(row.queryByText("none")).toBeNull();
    cleanup();

    renderApp("/i/inst_fixture/lines/cve-applicability", RUNBOOK_WAKES);
    const runBy = within(await screen.findByRole("list", { name: "Run by Runbooks" }));
    expect(runBy.getByRole("link", { name: "demo.maintain" })).toHaveAttribute("href", "/i/inst_fixture/runbooks/demo.maintain");
    expect(screen.queryByText(/it runs only when started by hand/)).toBeNull();
  });
});
