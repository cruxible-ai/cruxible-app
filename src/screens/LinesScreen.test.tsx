import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import { AT, COORDINATE, NOW } from "@/fixtures/authored/world";
import { orientQuery } from "@/api/requests";
import { ORIENT_PAGE } from "@/api/hooks";

afterEach(cleanup);

describe("Lines", () => {
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
    const item = await main.findByRole("button", { name: /^INB-7777/ });
    fireEvent.click(item);
    expect(await main.findByText(/"release": "rel-1"/)).toBeInTheDocument();
    expect(main.queryByRole("button", { name: /^(run|dispatch|enable|disable|ack|dismiss|link|evaluate)/i })).toBeNull();
  });
});

describe("Line page tables", () => {
  it("sorts the runs page and says the sort covers only that page; filters the inbox by state", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage?runs.sort=-nodes&inbox.f.status=acknowledged");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(/^Sorted within the newest \d+ of 12 runs\.$/)).toBeInTheDocument();
    const runs = within(main.getByRole("table", { name: "Runs" }));
    expect(runs.getByRole("columnheader", { name: /Nodes done/ })).toHaveAttribute("aria-sort", "descending");
    const inbox = within(await main.findByRole("table", { name: "Inbox" }));
    expect(inbox.queryByRole("button", { name: /^INB-7777/ })).toBeNull(); // unread: filtered out
    expect(inbox.getByRole("button", { name: "Filter State: Acknowledged" })).toBeInTheDocument();
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

  it("shows no Runbooks panel when the instance has none, and the whole list without a slice mark", async () => {
    renderApp("/i/inst_fixture/lines");
    const main = within(await screen.findByRole("main"));
    await main.findByRole("table", { name: "Lines" });
    expect(main.queryByRole("heading", { name: "Runbooks" })).toBeNull();
  });
});
