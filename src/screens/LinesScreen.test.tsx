import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

describe("Lines", () => {
  it("indexes Lines with procedure, trigger, authority, mandate, enablement, last run, inbox and next", async () => {
    renderApp("/i/inst_fixture/lines");
    const main = within(await screen.findByRole("main"));
    const kev = await main.findByRole("link", { name: "kev-triage" });
    expect(kev).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    const row = within(kev.closest("tr")!);
    expect(row.getByText("security.kev-settle")).toBeInTheDocument();
    expect(row.getByText("Settle")).toBeInTheDocument();
    expect(row.getByText("cadence")).toBeInTheDocument();
    expect(await row.findByText("Succeeded")).toBeInTheDocument();
    expect(await row.findByText("3 unread")).toBeInTheDocument();
    expect(row.getByText("Line inbox unread")).toBeInTheDocument();
    const cve = within(main.getByRole("link", { name: "cve-applicability" }).closest("tr")!);
    // no mandate and no run for the capture-landing Line
    expect(await cve.findAllByText("none")).toHaveLength(2);
  });
});

describe("Lines table", () => {
  it("filters by a picked enablement word and sorts by a header, both kept in the URL", async () => {
    renderApp("/i/inst_fixture/lines?f.enabled=stopped");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("link", { name: "cve-applicability" })).toBeInTheDocument();
    expect(main.queryByRole("link", { name: "kev-triage" })).toBeNull();
    expect(main.getByText("1 of 2")).toBeInTheDocument();
    // the picker names the glossary word and offers the others
    fireEvent.click(main.getByRole("button", { name: "Filter Enabled: Stopped" }));
    fireEvent.click(within(main.getByRole("group", { name: "Enabled values" })).getByRole("checkbox", { name: /Running/ }));
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
    expect(main.getByText("daily at 06:00 UTC")).toBeInTheDocument();
    expect(main.getByText("withheld")).toBeInTheDocument();
    expect(await main.findByText("page 1 · 12 in all")).toBeInTheDocument();
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
    expect(main.getByText(/attribution withheld/)).toBeInTheDocument();
    expect(main.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
  });
});

describe("Line definitions", () => {
  it("shows the Line as authored and its slotted Procedure: slots with the builds they bind, steps with what each names", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const main = within(await screen.findByRole("main"));
    const line = within((await main.findByText("Line definition")).closest("section")!);
    expect(await line.findByText("catalog")).toBeInTheDocument(); // trigger input step
    expect(line.getByText("security.kev-http-v1")).toBeInTheDocument();
    expect(line.getByText("security-analysis-provider")).toBeInTheDocument(); // explicit binding
    const definition = within((await main.findByText("Definition")).closest("section")!);
    expect(definition.getByText("web.fetch@3")).toBeInTheDocument();
    // the Line binds parse explicitly; catalog binds by fit to the one installed web.fetch build
    expect(definition.getByText("Line binds", { exact: false })).toBeInTheDocument();
    expect(await definition.findByText("cruxible-provider-web")).toBeInTheDocument();
    expect(definition.getByText("reads the landing")).toBeInTheDocument();
    expect(definition.getByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(definition.getByRole("link", { name: "security.kev-http-v1" })).toHaveAttribute("href", "/i/inst_fixture/contracts/security.kev-http-v1");
    expect(definition.getByRole("link", { name: "security.kev_exposure" })).toHaveAttribute(
      "href",
      `/i/inst_fixture/ref/${encodeURIComponent("query:security.kev_exposure")}`,
    );
    expect(definition.getByText("parse.changed > 0 · refuses no_change")).toBeInTheDocument();
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
