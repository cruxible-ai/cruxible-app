import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

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
    expect(await main.findByText("kev-triage-agreement")).toBeInTheDocument();
    expect(main.getByText("Missed a vendor backport.")).toBeInTheDocument();
    expect(await main.findByText(/otherwise propose/)).toBeInTheDocument();
    expect(await main.findByText("Assessments whose vulnerability is KEV-listed and whose release is shipped.")).toBeInTheDocument();
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
    expect(main.getByText(/Attribution withheld/)).toBeInTheDocument();
    expect(main.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
  });
});

describe("Line definitions", () => {
  it("shows the Line as authored and its slotted Procedure: slots with the builds they bind, steps with what each names", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const main = within(await screen.findByRole("main"));
    // the panel shows while the Line's envelope loads; read it once its rows are in
    const line = within((await main.findByText("Trigger input")).closest("section")!);
    expect(await line.findByText("catalog")).toBeInTheDocument(); // trigger input step
    expect(line.getByText("security.kev-http-v1")).toBeInTheDocument();
    expect(line.getByText("cruxible-provider-web")).toBeInTheDocument(); // the build the Line binds
    // the Procedure as authored is on the steps graph: a clicked step names its contract, slot, binding and query
    const node = async (id: string) => {
      await waitFor(() => expect(document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`)).not.toBeNull(), { timeout: 8000 });
      return document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;
    };
    fireEvent.click(await node("catalog"));
    const panel = within(await screen.findByText("Binds", { selector: "dt" }).then((dt) => dt.closest("dl")!.parentElement!));
    expect(panel.getByRole("link", { name: /security\.kev-http-v1/ })).toHaveAttribute("href", "/i/inst_fixture/contracts/security.kev-http-v1");
    expect(panel.getByText("fetch", { selector: "dd span" })).toBeInTheDocument();
    expect(panel.getByRole("link", { name: "cruxible-provider-web" })).toBeInTheDocument();
    fireEvent.click(await node("watched"));
    const query = within(await screen.findByText("Query", { selector: "dt" }).then((dt) => dt.closest("dl")!.parentElement!));
    expect(query.getByRole("link", { name: /security\.kev_exposure/ })).toHaveAttribute(
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
