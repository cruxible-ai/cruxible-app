import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

const I = "/i/inst_fixture";

describe("Evidence flow", () => {
  it("columns sources, the Lines that fetch them, and the ClaimTypes they write, each a link", async () => {
    renderApp(`${I}/flow`);
    const flow = within(await screen.findByTestId("flow", {}, { timeout: 8000 }));
    // three columns: Source, Line, What it produces (the first two words also label each card)
    expect(flow.getAllByText("Source").length).toBeGreaterThan(1);
    expect(flow.getAllByText("Line").length).toBeGreaterThan(1);
    expect(flow.getByText("What it produces")).toBeInTheDocument();
    // a source is named by where it comes from (the host its fetch names); its logical source id and who fetches it are on hover
    const source = flow.getByText("example.invalid").closest("[title]") as HTMLElement;
    expect(source).toHaveAttribute("title", expect.stringContaining("Logical source cisa.kev.catalog"));
    expect(source).toHaveAttribute("title", expect.stringContaining("Fetched when an agent runs security.kev-acquire"));
    expect(within(source).getByText("Fetched")).toBeInTheDocument();
    expect(within(source).getByText("When an agent runs it")).toBeInTheDocument();
    expect(within(source).getByText("Landed")).toBeInTheDocument();
    // with no host, the logical source names it
    expect(flow.getByText("osv.query")).toBeInTheDocument();
    // Lines in their own column, linked, with their kind, authority (on hover) and last run
    expect(flow.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    const card = flow.getByRole("link", { name: "kev-triage" }).closest("[title]") as HTMLElement;
    expect(card).toHaveAttribute("title", expect.stringContaining("At most settle"));
    expect(within(card).getByText("Last run")).toBeInTheDocument();
    // source cards and Line cards say which they are
    expect(within(source).getByText("Source")).toBeInTheDocument();
    expect(within(card).getByText("Line")).toBeInTheDocument();
    // ClaimTypes under their kind
    expect(flow.getByRole("link", { name: "security.vulnerability" })).toHaveAttribute("href", `${I}/kinds/security.vulnerability`);
    expect(flow.getByRole("link", { name: "kev_listed" })).toBeInTheDocument();
    // the legend names the neutral color for what no Line writes
    expect(screen.getByText("Written by people or agents")).toBeInTheDocument();
    expect(screen.queryByText("By hand")).toBeNull();
    // no old columns
    expect(screen.queryByText("Lines that read them")).toBeNull();
    expect(screen.queryByText("Where it comes from")).toBeNull();
  });

  it("?focus= keeps one source's path, not its siblings, behind a separate focus control", async () => {
    renderApp(`${I}/flow?focus=${encodeURIComponent("source:cisa.kev.catalog")}`);
    const flow = within(await screen.findByTestId("flow", {}, { timeout: 8000 }));
    expect(flow.getByText("example.invalid")).toBeInTheDocument();
    // the Line that reads it stays
    expect(flow.getByRole("link", { name: "kev-triage" })).toBeInTheDocument();
    expect(flow.queryByText("osv.query")).toBeNull();
    expect(flow.queryByRole("link", { name: "cve-applicability" })).toBeNull();
    expect(screen.getByRole("button", { name: "Clear: Focused on example.invalid" })).toBeInTheDocument();
  });
});
