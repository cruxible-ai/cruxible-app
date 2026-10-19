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

describe("Line page", () => {
  it("shows triggers, withheld enabler, runs with the history seam, track record, dispositions, mandate scope and condition, readings, inbox", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("heading", { name: "kev-triage" })).toBeInTheDocument();
    expect(main.getByText("daily at 06:00 UTC")).toBeInTheDocument();
    expect(main.getByText("withheld")).toBeInTheDocument();
    expect(main.getByText("2 recent of 12")).toBeInTheDocument();
    expect(main.getByText(/Older runs need the daemon's per-Line run history/)).toBeInTheDocument();
    expect(main.getByRole("link", { name: "run-7" })).toHaveAttribute("href", "/i/inst_fixture/runs/run-7");
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

describe("Run page", () => {
  it("shows nodes, the refusal, the proposal produced, Captures read and withheld attribution", async () => {
    renderApp("/i/inst_fixture/runs/run-7");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("guard_refused")).toBeInTheDocument();
    expect(main.getByText("4 of 6 done")).toBeInTheDocument();
    expect(main.getByText("The settle target is outside the mandate's ClaimType scope.")).toBeInTheDocument();
    expect(main.getByRole("link", { name: `sha256:${"a".repeat(64)}` })).toHaveAttribute(
      "href",
      `/i/inst_fixture/p/sha256%3A${"a".repeat(64)}`,
    );
    expect(await main.findByRole("link", { name: "CAP-9e1b3d5f7a9c" })).toBeInTheDocument();
    expect(main.getByText(/attribution withheld/)).toBeInTheDocument();
    expect(main.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
  });
});
