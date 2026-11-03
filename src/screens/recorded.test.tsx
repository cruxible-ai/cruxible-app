import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";
import { RECORDED } from "@/fixtures/handlers";
import { renderApp } from "@/test/render";

/**
 * Every screen over the world recorded from the security kit pilot on the
 * pinned core (src/fixtures/recorded): the KEV and EPSS Lines (fetch, extract,
 * Claims) with two runs each, ten watched CVEs and the KEV catalog, and the
 * owner's own words naming each watched CVE. Real daemon responses must
 * render. Edge cases the world does not contain (refusals, contested slots,
 * paging past the first page) stay in the per-screen tests over the
 * hand-authored world.
 */

afterEach(cleanup);

// jsdom has no WebGL: stand in for the cosmos canvas with what it was given.
vi.mock("@/components/graph/CosmosDots", () => ({
  CosmosDots: ({ nodes, edges }: { nodes: unknown[]; edges: unknown[] }) => (
    <div data-testid="dots">
      {nodes.length} dots · {edges.length} lines
    </div>
  ),
}));

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const I = "/i/inst_fixture";
const CVE = "security.vulnerability/cve-2014-0160";
const RUN = "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305";
const REVIEWED = "sha256:403bef0e25bc436e940c36c9beaddd58ff192392030bc54a2850ea05aa72f8ec";

const main = async () => within(await screen.findByRole("main"));
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement | null;

describe("recorded reference world", () => {
  it("overview: what needs you, no Line enabled yet, and no kits", async () => {
    renderApp(I, RECORDED);
    const m = await main();
    const strip = within(await m.findByRole("region", { name: "Needs you" }));
    expect(await strip.findByRole("link", { name: /Next 2/ })).toBeInTheDocument();
    expect(await m.findByText("No Line is enabled, so nothing runs on its own.")).toBeInTheDocument();
    expect(await m.findByText("No kits installed.")).toBeInTheDocument();
  });

  it("type map: a kind with its ClaimTypes, authored in this instance", async () => {
    renderApp(`${I}/map?kind=security.vulnerability`, RECORDED);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    const panel = within(screen.getByText("Subject kind").closest("div.overflow-y-auto") as HTMLElement);
    expect(panel.getByText("security.vulnerability", { selector: "h2, h3, span, div" })).toBeInTheDocument();
    expect(await panel.findByText("listed_in")).toBeInTheDocument();
  });

  it("Subject page: a watched CVE with its fields, the Line each came from, and admission", async () => {
    renderApp(`${I}/s/${encodeURIComponent(CVE)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("CVE-2014-0160")).toBeInTheDocument();
    // every Claim supported: the header says so in one phrase
    expect(await m.findByText("All supported")).toBeInTheDocument();
    expect(await m.findByText("CISA KEV catalog 2026.10.30: dateAdded 2022-05-04.")).toBeInTheDocument();
    expect(m.getAllByText("1/1 admitted")).toHaveLength(7);
    expect(m.getAllByText("security.kev-triage").length).toBeGreaterThan(0);
  });

  it("subject connections: the CVE's catalog link, beside an Open in State graph link", async () => {
    renderApp(`${I}/s/${encodeURIComponent(CVE)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("Connections")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "Open in State graph →" })).toHaveAttribute("href", `${I}/graph?focus=${encodeURIComponent(CVE)}`);
  });

  it("ledger: the generation timeline", async () => {
    renderApp(`${I}/ledger`, RECORDED);
    const m = await main();
    expect(await m.findByRole("link", { name: "g10" })).toHaveAttribute("href", `${I}?at=10`);
    expect(m.getByText("Watch the pilot's CVEs.")).toBeInTheDocument();
    expect(m.getByText("11 on this page")).toBeInTheDocument();
  });

  it("next: rows rendered by reason", async () => {
    renderApp(`${I}/next`, RECORDED);
    const m = await main();
    // two Lines accepted but never enabled
    const notEnabled = await m.findByText("Line not enabled");
    expect(notEnabled.nextElementSibling).toHaveTextContent("2");
    expect(m.getByText("accepted but never enabled; enable it to run on its Triggers")).toBeInTheDocument();
  });

  it("Lines index and a Line page with its runs, its definition and its Procedure's steps", async () => {
    renderApp(`${I}/lines`, RECORDED);
    let m = await main();
    await waitFor(() => expect(m.getAllByText("2")[0]!.parentElement).toHaveTextContent("2 Lines"));
    // the Line link, named under the shared security. prefix
    expect(await m.findByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/security.kev-triage`);
    cleanup();
    renderApp(`${I}/lines/security.kev-triage`, RECORDED);
    m = await main();
    expect(await m.findByText("Page 1 · 2 in all")).toBeInTheDocument();
    expect(await m.findByText(/Read the CISA KEV catalog and write each watched CVE/)).toBeInTheDocument();
    const line = within((await m.findByText("Line definition")).closest("section")!);
    expect(await line.findByText("cruxible-provider-web")).toBeInTheDocument(); // the build slot fetch binds
    expect(within(line.getByText("Retains").nextElementSibling as HTMLElement).getByText("cisa.kev.catalog")).toBeInTheDocument();
    // the Procedure as authored is on the steps graph: each node its id and kind
    await waitFor(() => expect(node("write")).not.toBeNull(), { timeout: 8000 });
    const kinds = { catalog: "Call", watched: "Read", entries: "Extract", write: "Claims" };
    for (const [id, kind] of Object.entries(kinds)) expect(within(node(id)!).getByText(kind)).toBeInTheDocument();
    fireEvent.click(node("catalog")!);
    const panel = within(await screen.findByText("Binds", { selector: "dt" }).then((dt) => dt.closest("dl")!));
    expect(panel.getByRole("link", { name: /security\.kev-catalog/ })).toBeInTheDocument();
    expect(panel.getByRole("link", { name: "cruxible-provider-web" })).toBeInTheDocument();
  });

  it("run page: a Line-triggered run", async () => {
    renderApp(`${I}/runs/${RUN}`, RECORDED);
    const m = await main();
    expect(await m.findByText("5 of 5 done")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "security.epss-triage" })).toHaveAttribute("href", `${I}/lines/security.epss-triage`);
    expect(await m.findByText("1 Captures")).toBeInTheDocument();
  });

  it("state graph: every live Subject and Subject-valued Claim in one page", async () => {
    renderApp(`${I}/graph`, RECORDED);
    expect(await screen.findByTestId("dots")).toHaveTextContent("11 dots · 8 lines");
    const stats = screen.getByText("Subject-valued Claims").parentElement!;
    expect(stats).toHaveTextContent(/11 Subjects\s*8 Subject-valued Claims\s*read in 1 page,/);
    expect(screen.getByRole("button", { name: /security\.vulnerability/ })).toBeInTheDocument();
  });

  it("kind page: security.vulnerability with its key, ClaimTypes, evidence and settlers", async () => {
    renderApp(`${I}/kinds/security.vulnerability?view=claim-types`, RECORDED);
    expect(await screen.findByRole("heading", { name: "security.vulnerability" })).toBeInTheDocument();
    const m = within(screen.getByRole("main"));
    expect(await m.findByText(/A CVE, named by its id/)).toBeInTheDocument();
    expect(m.getByRole("heading", { name: "ClaimTypes (8)" })).toBeInTheDocument();
    const listed = within(m.getByText("listed_in", { selector: "td > span" }).closest("tr")!);
    expect(listed.getByRole("link", { name: "security.kev-catalog" })).toHaveAttribute("href", `${I}/contracts/security.kev-catalog`);
    expect(listed.getByText("All answer")).toBeInTheDocument();
    // the settle Mandate on the KEV Line covers it
    expect(listed.getByText("security.kev-triage")).toBeInTheDocument();
    // the owner's own words name each watched CVE
    const cveId = within(m.getByText("cve_id", { selector: "td > span" }).closest("tr")!);
    expect(cveId.getByText("Own words")).toBeInTheDocument();
  });

  it("contract page: security.kev-catalog with its logical source, the Line that retains it and 4 admitting ClaimTypes", async () => {
    renderApp(`${I}/contracts/security.kev-catalog`, RECORDED);
    expect(await screen.findByRole("heading", { name: "security.kev-catalog" })).toBeInTheDocument();
    const m = within(screen.getByRole("main"));
    expect(m.getByText("Admitted by").nextElementSibling).toHaveTextContent("4 ClaimTypes");
    // the logical source from the definitions: the Line's parameter names it
    const sources = within((await m.findByText("Logical sources", { selector: "h2" })).closest("section")!);
    const kev = within((await sources.findByText("cisa.kev.catalog")).closest("tr")!);
    expect(kev.getByText("Line security.kev-triage")).toBeInTheDocument(); // retained by
    // producers from the pins section: the Procedure that captures under it retains
    const producers = within((await m.findByText("Captured under it by")).closest("section")!);
    const triage = await producers.findByRole("link", { name: "Procedure:security.kev-triage" });
    expect(within(triage.parentElement!).getByText("retains Captures under it")).toBeInTheDocument();
  });

  it("evidence flow: the pilot's sources, the Lines that fetch them and the ClaimTypes they may write", async () => {
    renderApp(`${I}/flow`, RECORDED);
    const flow = within(await screen.findByTestId("flow"));
    // a source is named by its host; its schedule (the fetching Line's Trigger) and last landing on its face
    const catalog = flow.getByText("cisa.gov").closest("[title]") as HTMLElement;
    expect(within(catalog).getByText("Source")).toBeInTheDocument();
    expect(within(catalog).getByText("Fetched")).toBeInTheDocument();
    expect(within(catalog).getByText(/^Daily at /)).toBeInTheDocument();
    expect(within(catalog).getByText("Landed")).toBeInTheDocument();
    // the logical source, who fetches it, how it arrives and its contract are on hover
    expect(catalog).toHaveAttribute("title", expect.stringContaining("Logical source cisa.kev.catalog"));
    expect(catalog).toHaveAttribute("title", expect.stringContaining("Fetched by Line security.kev-triage"));
    expect(catalog).toHaveAttribute("title", expect.stringContaining("Arrives by HTTP fetch"));
    expect(catalog).toHaveAttribute("title", expect.stringContaining("Captured under security.kev-catalog"));
    // the Line that fetches it: its own card, linked, with its last run
    const kev = within(flow.getByRole("link", { name: "kev-triage" }).closest("[title]") as HTMLElement);
    expect(kev.getByText("Line")).toBeInTheDocument();
    expect(kev.getByText("Last run")).toBeInTheDocument();
    expect(screen.getByText("Names under", { exact: false })).toHaveTextContent("Names under security.");
    expect(flow.getByRole("link", { name: "listed_in" })).toHaveAttribute(
      "href",
      `${I}/kinds/security.vulnerability?view=claim-types&claim_type=security.vulnerability.listed_in`,
    );
    // own-word statements go straight to the ClaimTypes that accept them
    expect(flow.getByText("Entered directly")).toBeInTheDocument();
  });

  it("proposals and a review", async () => {
    renderApp(`${I}/proposals?status=settled`, RECORDED);
    expect(await screen.findByText("10 on this page")).toBeInTheDocument();
    cleanup();
    renderApp(`${I}/p/${encodeURIComponent(REVIEWED)}`, RECORDED);
    const m = await main();
    expect(await m.findByText(/1 change: \+1 provider/)).toHaveTextContent("Settled, accepted. 1 change: +1 provider.");
    fireEvent.click(await m.findByRole("button", { name: /field changes/ }));
    expect(await m.findByText("/artifact_format")).toBeInTheDocument();
  });
});
