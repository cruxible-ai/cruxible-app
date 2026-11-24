import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";
import { RECORDED } from "@/fixtures/handlers";
import { renderApp } from "@/test/render";

/**
 * Every screen over the world recorded from the security kit pilot on the
 * pinned core (src/fixtures/recorded): the kit's definitions and its
 * automation template adopted, `security.start` run once (SBOM import, OSV,
 * KEV, EPSS) and KEV again, the demo app's SBOM making pair Subjects
 * (occurrence, exposure, app_exposure), a package-level judgment citing a
 * section in its own words, an app-level judgment contested by a second
 * justification, a judgment waiting for review, a rejected one proposed
 * again, an unsure attestation citing a section, the dependency guidance
 * Document, a reversed start Runbook and a ledger mirror that never
 * published. Real daemon responses must render. Edge cases the world does
 * not contain (paging past the first page, withheld fields) stay in the
 * per-screen tests over the hand-authored world.
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
  URL.createObjectURL ??= () => "blob:recorded";
  URL.revokeObjectURL ??= () => {};
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const I = "/i/inst_fixture";
const CVE = "security.vulnerability/cve-2021-44228";
const API = "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1";
const APP_EXPOSURE =
  "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046";
const OCCURRENCE = "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1";
const EXPOSURE = "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228";
const OSV_RUN = "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051";
const REVIEWED = "sha256:09eb2ab9ff5d4c7515f872ab7172488c6ead6dc39b5704c393fc6fa9bb0304ed";
const SLOW = { timeout: 8000 };

const main = async () => within(await screen.findByRole("main"));
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement | null;
const panel = (m: ReturnType<typeof within>, title: string) => within(m.getByRole("heading", { name: title }).closest("section")!);

describe("recorded reference world", () => {
  it("Next reason detail opens the matching attestation's cited evidence", async () => {
    renderApp(`${I}/next?preset=beliefs`, RECORDED);
    const m = await main();
    const table = within(await m.findByRole("table", { name: "Next" }));
    const row = table.getAllByRole("row").find((r) => within(r).queryByText("New evidence, unreviewed"))!;
    expect(within(row).queryByRole("table", { name: "Attestation evidence" })).toBeNull();
    fireEvent.click(within(row).getByRole("button", { name: "Evidence" }));
    const evidence = within(await within(row).findByRole("table", { name: "Attestation evidence" }));
    expect(await evidence.findByText("Own words")).toBeInTheDocument();
    expect(await evidence.findByText(/Section Triage notes › log4j-api 2.14.1/)).toBeInTheDocument();
    expect(evidence.getAllByRole("row")).toHaveLength(3);
    expect(await within(row).findByText("Checking whether the demo app passes attacker-controlled patterns to log4j-api.")).toBeInTheDocument();
    fireEvent.click(within(row).getByRole("button", { name: "Hide evidence" }));
    expect(within(row).queryByRole("table", { name: "Attestation evidence" })).toBeNull();
  });

  it("dashboard: what needs you, no Line enabled yet, and no kits", async () => {
    renderApp(I, RECORDED);
    const m = await main();
    const strip = within(await m.findByRole("region", { name: "Needs you" }));
    expect(await strip.findByRole("link", { name: /Next 7/ })).toBeInTheDocument();
    expect(await strip.findByRole("link", { name: /Waiting for review 2/ })).toBeInTheDocument();
    expect(await panel(m, "Coming up").findByRole("button", { name: /^\d+ not enabled$/ })).toBeInTheDocument();
    expect(await panel(m, "Kits").findByText("None")).toBeInTheDocument();
  });

  it("type map: a kind with its ClaimTypes, authored in this instance; a pair kind names its ends", async () => {
    renderApp(`${I}/map?kind=security.vulnerability`, RECORDED);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    const box = within(screen.getByText("Subject kind").closest("div.overflow-y-auto") as HTMLElement);
    expect(box.getByText("security.vulnerability", { selector: "h2, h3, span, div" })).toBeInTheDocument();
    expect(await box.findByText("listed_in")).toBeInTheDocument();
    cleanup();
    renderApp(`${I}/map?kind=security.app_exposure`, RECORDED);
    const pair = within((await screen.findByText("Pair of")).parentElement!);
    expect(pair.getByRole("link", { name: "security.occurrence" })).toBeInTheDocument();
    expect(pair.getByRole("link", { name: "security.vulnerability" })).toBeInTheDocument();
  });

  it("Subject page: a CVE with its KEV fields, the Lines they came from, and the pairs it is an end of", async () => {
    renderApp(`${I}/s/${encodeURIComponent(CVE)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("CVE-2021-44228")).toBeInTheDocument();
    expect((await m.findAllByText("security.kev-triage")).length).toBeGreaterThan(0);
    const pairs = within((await m.findByRole("heading", { name: /^Pairs/ })).closest("section")!);
    expect(pairs.getByRole("link", { name: "security.exposure" })).toBeInTheDocument();
    expect(pairs.getByText("vulnerability")).toBeInTheDocument();
    expect(pairs.getByRole("link", { name: EXPOSURE.slice(EXPOSURE.indexOf("/") + 1) })).toHaveAttribute("href", `${I}/s/${encodeURIComponent(EXPOSURE)}`);
  });

  it("subject connections: beside an Open in State graph link", async () => {
    renderApp(`${I}/s/${encodeURIComponent(CVE)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("Connections")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "Open in State graph →" })).toHaveAttribute("href", `${I}/graph?focus=${encodeURIComponent(CVE)}`);
  });

  it("a pair's page leads with its ends, each key part named and its Subject linked; its contested justification", async () => {
    renderApp(`${I}/s/${encodeURIComponent(APP_EXPOSURE)}`, RECORDED);
    const m = await main();
    const ends = within(await m.findByRole("table", { name: "Ends" }));
    expect(ends.getByText("occurrence")).toBeInTheDocument();
    expect(ends.getByText("vulnerability")).toBeInTheDocument();
    expect(ends.getByRole("link", { name: OCCURRENCE.slice(OCCURRENCE.indexOf("/") + 1) })).toHaveAttribute("href", `${I}/s/${encodeURIComponent(OCCURRENCE)}`);
    expect(ends.getByRole("link", { name: "cve-2021-45046" })).toBeInTheDocument();
    expect((await m.findAllByText("Contested")).length).toBeGreaterThan(0);
  });

  it("a pair whose justification cites a section in its own words lists that section as a backlink", async () => {
    renderApp(`${I}/s/${encodeURIComponent(EXPOSURE)}`, RECORDED);
    const m = await main();
    const backlinks = within(await m.findByRole("table", { name: "Backlinks" }, SLOW));
    expect(backlinks.getByText("Cites")).toBeInTheDocument();
    expect(backlinks.getByText("justification")).toBeInTheDocument();
    expect(backlinks.getByText("triage.notes › Triage notes › log4j-core 2.14.1 › CVE-2021-44228")).toBeInTheDocument();
    expect(backlinks.getByText("Not known")).toBeInTheDocument();
  });

  it("an attestation opens to what it cites: its own words and a section of the triage notes", async () => {
    renderApp(`${I}/s/${encodeURIComponent(API)}`, RECORDED);
    const m = await main();
    // the end's pairs: its occurrence in the demo app
    const pairs = within((await m.findByRole("heading", { name: /^Pairs/ })).closest("section")!);
    expect(pairs.getByRole("link", { name: "security.occurrence" })).toBeInTheDocument();
    fireEvent.click(await m.findByRole("button", { name: /affected_by/ }));
    const attestations = within(await m.findByRole("table", { name: "Attestations" }, SLOW));
    expect(attestations.getByText("Unsure")).toBeInTheDocument();
    expect(await attestations.findByText("2 Captures", undefined, SLOW)).toBeInTheDocument();
    fireEvent.click(attestations.getByRole("button", { name: /Attestation by owner/ }));
    const cites = within(await m.findByRole("table", { name: "Attestation evidence" }, SLOW));
    expect(await cites.findByText("Own words", undefined, SLOW)).toBeInTheDocument();
    expect(cites.getByText("Section Triage notes › log4j-api 2.14.1 › CVE-2026-49844 of triage.notes")).toBeInTheDocument();
    expect(await m.findByText("Checking whether the demo app passes attacker-controlled patterns to log4j-api.", undefined, SLOW)).toBeInTheDocument();
  }, 30000);

  it("ledger: the generation timeline", async () => {
    renderApp(`${I}/ledger`, RECORDED);
    const m = await main();
    expect(await m.findByRole("link", { name: "g22" })).toHaveAttribute("href", `${I}?at=22`);
    // one page: the count beside the title, no "on this page"
    expect(m.getByRole("heading", { name: "Generations" }).closest("header")).toHaveTextContent(/^Generations\d+$/);
  });

  it("next: one row per item, its type first", async () => {
    renderApp(`${I}/next`, RECORDED);
    const m = await main();
    // four Lines accepted from the template but never enabled
    expect(await m.findAllByText("Line not enabled")).toHaveLength(4);
    expect(m.getByRole("link", { name: "security.kev-triage" })).toBeInTheDocument();
  });

  it("Lines index lists the Runbooks; a Line page with its runs, its definition and its Procedure's steps", { timeout: 30000 }, async () => {
    renderApp(`${I}/lines`, RECORDED);
    let m = await main();
    await waitFor(() => expect(m.getAllByText("4")[0]!.parentElement).toHaveTextContent("4 Lines"));
    expect(await m.findByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/security.kev-triage`);
    const runbooks = within(await m.findByRole("table", { name: "Runbooks" }));
    expect(runbooks.getByRole("link", { name: "security.start" })).toHaveAttribute("href", `${I}/runbooks/security.start`);
    expect(runbooks.getByRole("link", { name: "security.start-reversed" })).toBeInTheDocument();
    expect(runbooks.getByText("Completed")).toBeInTheDocument();
    cleanup();
    renderApp(`${I}/lines/security.kev-triage`, RECORDED);
    m = await main();
    expect(await m.findByText("Page 1 · 2 in all")).toBeInTheDocument();
    // the build slot fetch binds (the panel re-renders as its reads land: query it afresh)
    const definition = () => within(screen.getByText("Line definition").closest("section")!);
    await waitFor(() => expect(definition().getByText("cruxible-provider-web")).toBeInTheDocument(), SLOW);
    const sources = within(definition().getByRole("table", { name: "Sources" }));
    expect(sources.getByText("cisa.gov").closest("a")).toHaveAttribute("href", expect.stringMatching(/^https:\/\/www\.cisa\.gov\//));
    expect(sources.getByRole("link", { name: "kev-catalog" })).toHaveAttribute("href", `${I}/contracts/security.kev-catalog`);
    await waitFor(() => expect(node("write")).not.toBeNull(), { timeout: 8000 });
    for (const [id, tag] of Object.entries({ catalog: "FETCH", watched: "READ", entries: "EXTRACT", write: "CLAIMS" })) {
      expect(within(node(id)!).getByText(tag)).toBeInTheDocument();
    }
  });

  it("Runbook page: steps, the Trigger aimed at it, its run with every step's outcome, and its preview", async () => {
    renderApp(`${I}/runbooks/security.start`, RECORDED);
    const m = await main();
    expect(await m.findByText(/Seed a fresh instance/)).toBeInTheDocument();
    const steps = within(await m.findByRole("table", { name: "Steps" }));
    expect(steps.getAllByText("Available")).toHaveLength(4);
    expect(steps.getByRole("link", { name: "security.sbom-import.app" })).toHaveAttribute("href", `${I}/lines/security.sbom-import.app`);
    const triggers = within(m.getByRole("table", { name: "Triggers" }));
    expect(triggers.getByRole("link", { name: "Trigger:security.start-weekly" })).toBeInTheDocument();
    expect(triggers.getByTitle("on cron 0 5 * * 1 (UTC)")).toHaveTextContent(/^Every \w+ at /);
    const runs = within(m.getByRole("table", { name: "Recent runs" }));
    expect(runs.getByText("Completed")).toBeInTheDocument();
    expect(runs.getAllByText("Succeeded")).toHaveLength(4);
    expect(runs.getAllByText("Succeeded")[1]!.closest("a")).toHaveAttribute("href", `${I}/runs/${OSV_RUN}`);
    // the static preview
    expect(await m.findByText("None: no step reads what a later step writes", undefined, SLOW)).toBeInTheDocument();
    const calls = within(m.getByRole("table", { name: "Calls" }));
    expect(calls.getByText("sbom.components")).toBeInTheDocument();
    expect(calls.getByText("osv.query")).toBeInTheDocument();
    const settles = within(m.getByRole("table", { name: "Settles or proposes" }));
    expect(settles.getByRole("link", { name: "security.occurrence.scope" })).toBeInTheDocument();
    expect(settles.getAllByText("Settle").length).toBeGreaterThan(0);
    const writes = within(m.getByRole("table", { name: "Writes" }));
    expect(writes.getByRole("link", { name: "security.component.affected_by" })).toBeInTheDocument();
  });

  it("a Runbook in the wrong order: its preview reports each read of a later step's write", async () => {
    renderApp(`${I}/runbooks/security.start-reversed`, RECORDED);
    const m = await main();
    const problems = within(await m.findByRole("table", { name: "Order problems" }, SLOW));
    expect(problems.getAllByText("Reads what a later step writes").length).toBeGreaterThan(0);
    expect(m.getAllByText("Never run").length).toBeGreaterThan(0);
  });

  it("run page: the OSV run, its list call's members and its Line", async () => {
    renderApp(`${I}/runs/${OSV_RUN}`, RECORDED);
    const m = await main();
    expect(await m.findByRole("link", { name: "security.osv-query" })).toHaveAttribute("href", `${I}/lines/security.osv-query`);
    fireEvent.click(await m.findByText(/10 list members: 10 kept/));
    const members = within(await m.findByRole("table", { name: "Members of osv" }));
    expect(members.getAllByText("Kept")).toHaveLength(10);
  });

  it("state graph: every live Subject and Subject-valued Claim in one page", async () => {
    renderApp(`${I}/graph`, RECORDED);
    expect(await screen.findByTestId("dots")).toHaveTextContent(/\d+ dots · \d+ lines/);
    expect(screen.getByText("Subject-valued Claims").parentElement!).toHaveTextContent(/read in 1 page,/);
    expect(screen.getByRole("button", { name: /security\.vulnerability/ })).toBeInTheDocument();
  });

  it("kind page: security.vulnerability with its key, ClaimTypes, evidence and settlers", async () => {
    renderApp(`${I}/kinds/security.vulnerability?view=claim-types`, RECORDED);
    expect(await screen.findByRole("heading", { name: "security.vulnerability" })).toBeInTheDocument();
    const m = within(screen.getByRole("main"));
    expect(await m.findByText(/A CVE, named by its id/)).toBeInTheDocument();
    const listed = within(m.getByText("listed_in", { selector: "td > span" }).closest("tr")!);
    expect(listed.getByRole("link", { name: "security.kev-catalog" })).toHaveAttribute("href", `${I}/contracts/security.kev-catalog`);
    expect(listed.getByText("security.kev-triage")).toBeInTheDocument();
  });

  it("a pair kind's page names its ends; its justification row names the Document that guides it", async () => {
    renderApp(`${I}/kinds/security.exposure?view=claim-types&claim_type=security.exposure.justification`, RECORDED);
    const m = within(await screen.findByRole("main"));
    expect(await m.findByText("Pair of")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "security.component" })).toBeInTheDocument();
    const guide = await m.findByRole("link", { name: "Judging a dependency exposure" }, SLOW);
    expect(guide).toHaveAttribute("href", `${I}/docs?doc=security.guidance.dependency`);
  });

  it("Document page: the guidance Document's links to the ClaimTypes it guides", async () => {
    renderApp(`${I}/docs?doc=security.guidance.dependency`, RECORDED);
    const m = await main();
    const links = within(await m.findByRole("table", { name: "Links" }, SLOW));
    expect(links.getAllByText("Guides")).toHaveLength(2);
    expect(links.getByRole("link", { name: "ClaimType:security.exposure.justification" })).toBeInTheDocument();
    expect(links.getByRole("link", { name: "ClaimType:security.app_exposure.justification" })).toBeInTheDocument();
  }, 20000);

  it("About: versions beside the pin, the host, the caller, principals and approval, health, kits and Providers", async () => {
    renderApp(`${I}/about`, RECORDED);
    const m = await main();
    // versions: the daemon answers the build the console is pinned to
    const versions = within(await m.findByRole("table", { name: "Versions" }, SLOW));
    expect(versions.getAllByText("0.6.0")).toHaveLength(2);
    expect(versions.getAllByText("Same")).toHaveLength(2);
    expect(versions.queryByText("Differs")).toBeNull();
    // the host
    const host = within(await m.findByRole("list", { name: "Host" }, SLOW));
    expect(host.getAllByText("Writable").length).toBeGreaterThan(0);
    expect(host.getByText("runbooks-v1")).toBeInTheDocument();
    expect(host.getByText("None attached")).toBeInTheDocument();
    expect(await host.findByText("64", undefined, SLOW)).toBeInTheDocument();
    // the caller: a local operator, read_only, who cannot author
    const you = within(await m.findByRole("list", { name: "You" }, SLOW));
    expect(you.getByText("Local operator")).toBeInTheDocument();
    expect(you.getByText("read_only")).toBeInTheDocument();
    expect(you.getByText("cruxible.identity.principal_unconfigured")).toBeInTheDocument();
    // principals and the approval policy
    const principals = within(await m.findByRole("table", { name: "Principals" }, SLOW));
    expect(principals.getByRole("link", { name: "owner" })).toBeInTheDocument();
    expect(await m.findByRole("link", { name: "Self-approval allowed" }, SLOW)).toBeInTheDocument();
    // the ledger mirror, then the other facets
    expect(await m.findByText("https://127.0.0.1:9/cruxible/ledger.git", undefined, SLOW)).toBeInTheDocument();
    expect(m.getByText("Git said")).toBeInTheDocument();
    expect(m.getByText(/Failed to connect to 127\.0\.0\.1 port 9/)).toBeInTheDocument();
    expect(m.getByText("cruxible ledger publish --json")).toBeInTheDocument();
    expect(within(m.getByRole("table", { name: "Health" })).getAllByRole("row")).toHaveLength(9);
    // kits and Providers
    expect(await m.findByText("None installed", undefined, SLOW)).toBeInTheDocument();
    const providers = within(await m.findByRole("table", { name: "Installed Providers" }, SLOW));
    expect(providers.getByRole("link", { name: "security-osv-provider" })).toBeInTheDocument();
    expect(providers.getByRole("link", { name: "cruxible-provider-web" })).toBeInTheDocument();
  }, 20000);

  it("contract page: security.kev-catalog with its logical source and the Line that retains it", async () => {
    renderApp(`${I}/contracts/security.kev-catalog`, RECORDED);
    expect(await screen.findByRole("heading", { name: "security.kev-catalog" })).toBeInTheDocument();
    const m = within(screen.getByRole("main"));
    const sources = within((await m.findByText("Logical sources", { selector: "h2" })).closest("section")!);
    const kev = within((await sources.findByText("cisa.kev.catalog")).closest("tr")!);
    expect(kev.getByText("Line security.kev-triage")).toBeInTheDocument();
  });

  it("evidence flow: the pilot's sources, the Lines that fetch them and the ClaimTypes they may write", async () => {
    renderApp(`${I}/flow`, RECORDED);
    const flow = within(await screen.findByTestId("flow"));
    // the source's details are on its name's hover, not over the card
    const name = flow.getByText("cisa.gov");
    const catalog = name.closest("[data-card]") as HTMLElement;
    expect(within(catalog).getByText("Source")).toBeInTheDocument();
    expect(name).toHaveAttribute("title", expect.stringContaining("Logical source cisa.kev.catalog"));
    expect(name).toHaveAttribute("title", expect.stringContaining("Fetched by Line security.kev-triage"));
    expect(flow.getByText("Entered directly")).toBeInTheDocument();
  });

  it("proposals and a review", async () => {
    renderApp(`${I}/proposals?status=settled`, RECORDED);
    expect((await screen.findByRole("table", { name: "Proposals" })).closest("section")!.querySelector("header")).toHaveTextContent(/^Settled\d+$/);
    cleanup();
    renderApp(`${I}/p/${encodeURIComponent(REVIEWED)}`, RECORDED);
    const m = await main();
    // a definitions proposal: the Provider build the kit's OSV provider installs, one row
    const defs = within(await m.findByRole("table", { name: "Definitions" }, SLOW));
    expect(defs.getByText("Provider")).toBeInTheDocument();
    expect(m.queryByRole("table", { name: "Changes" })).toBeNull();
  });
});
