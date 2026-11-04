import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

const I = "/i/inst_fixture";
const section = async (name: string) => within((await screen.findByRole("heading", { name: new RegExp(`^${name}`) })).closest("section")!);
const row = (table: ReturnType<typeof within>, text: string) => within(table.getByText(text, { selector: "a, span" }).closest("tr")!);

describe("Overview", () => {
  it("is its own page beside the Dashboard, in the nav", async () => {
    renderApp(`${I}/overview`);
    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    const nav = within(screen.getByRole("navigation"));
    expect(nav.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", I);
    expect(nav.getByRole("link", { name: "Overview" })).toHaveAttribute("href", `${I}/overview`);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("button", { name: "About the Overview" })).toBeInTheDocument();
    // the state's size: Subjects, accepted / conflicted Claims, what waits for review
    expect(main.getByText("Claims accepted")).toBeInTheDocument();
    expect(main.getByText("Waiting for review").nextSibling).toHaveTextContent("1");
  });

  it("lists every kind: Subjects, ClaimTypes, Claims, what feeds it and its last change", async () => {
    renderApp(`${I}/overview`);
    const kinds = await section("Kinds");
    const assessment = await kinds.findByRole("link", { name: "security.assessment" });
    expect(assessment).toHaveAttribute("href", `${I}/kinds/security.assessment`);
    const r = within(assessment.closest("tr")!);
    // Claims sums the kind's live Claims (orient kind=K counters)
    expect(await r.findByText("6")).toBeInTheDocument();
    // a Line creates assessments and writes their status
    expect(await r.findByRole("link", { name: "cve-applicability" })).toHaveAttribute("href", `${I}/lines/cve-applicability`);
    expect(await r.findByRole("link", { name: "g42" })).toBeInTheDocument();
    // no Line creates products: entered directly
    const product = within((await kinds.findByRole("link", { name: "security.product" })).closest("tr")!);
    expect(await product.findByText("Entered directly")).toBeInTheDocument();
    // a kind no change in the read touched says how far back the read went
    const packages = within((await kinds.findByRole("link", { name: "security.package" })).closest("tr")!);
    expect(await packages.findByText("before g41")).toBeInTheDocument();
  });

  it("lists recent changes to beliefs, newest first, each linked to its Subject, ClaimType and Claim", async () => {
    renderApp(`${I}/overview`);
    const changes = await section("Recent changes to beliefs");
    const table = within(await changes.findByRole("table", { name: "Recent changes to beliefs" }));
    expect(changes.getByText("g41–g42")).toBeInTheDocument();
    const rows = table.getAllByRole("row").slice(1);
    // g42's revision first: from → to, the principal who proposed it
    const first = within(rows[0]!);
    expect(first.getByRole("link", { name: "g42" })).toBeInTheDocument();
    expect(first.getByRole("link", { name: "rel-1-cve-2024-3094" })).toHaveAttribute("href", `${I}/s/${encodeURIComponent("security.assessment/rel-1-cve-2024-3094")}`);
    expect(first.getByRole("link", { name: "status" })).toHaveAttribute("href", `${I}/claim-types/security.assessment.status`);
    expect(first.getByText("Value changed")).toBeInTheDocument();
    expect(first.getByText("affected")).toBeInTheDocument();
    expect(first.getByText("not_affected")).toBeInTheDocument();
    expect(first.getByText("release-owner")).toBeInTheDocument();
    expect(first.getByRole("link", { name: /CLM-/ }).getAttribute("href")).toMatch(/CLM-0+a3/);
    // only Claim members: the release Subject's own member is not a belief change
    expect(rows).toHaveLength(4);
    expect(within(rows[3]!).getByText("First stated")).toBeInTheDocument();
  });

  it("shows coverage per ClaimType against the kind's Subjects", async () => {
    renderApp(`${I}/overview`);
    const coverage = await section("Coverage");
    const table = within(await coverage.findByRole("table", { name: "Coverage" }));
    const status = row(table, "status");
    expect(status.getByText("of 2")).toBeInTheDocument();
    expect(status.getByText("100%")).toBeInTheDocument();
  });

  it("lists each source: what it is captured under, when it last landed, how often, and the Lines that read it", async () => {
    renderApp(`${I}/overview`);
    const sources = await section("Sources");
    const kev = within((await sources.findByRole("link", { name: "cisa.kev.catalog" })).closest("tr")!);
    expect(kev.getByRole("link", { name: "cisa.kev.catalog" })).toHaveAttribute("href", `${I}/flow?focus=${encodeURIComponent("source:cisa.kev.catalog")}`);
    expect(kev.getByRole("link", { name: "security.kev-http-v1" })).toHaveAttribute("href", `${I}/contracts/security.kev-http-v1`);
    expect(kev.getByText("3")).toBeInTheDocument();
    expect(kev.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    // a source no landing has reached yet still lists, with its readers
    const osv = within((await sources.findByRole("link", { name: "osv.query" })).closest("tr")!);
    expect(osv.getByText("never")).toBeInTheDocument();
  });

  it("lists the documents, each linked to the Docs page", async () => {
    renderApp(`${I}/overview`);
    const documents = await section("Documents");
    const table = within(await documents.findByRole("table", { name: "Documents" }));
    expect(table.getAllByRole("link")[0]!.getAttribute("href")).toMatch(new RegExp(`^${I}/docs\\?doc=`));
  });
});
