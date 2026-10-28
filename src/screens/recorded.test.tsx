import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";
import { RECORDED } from "@/fixtures/handlers";
import { renderApp } from "@/test/render";

/**
 * Every screen over the world recorded from a security kit 1.3.0 reference
 * instance on the pinned core (src/fixtures/recorded): the kit and its
 * example automation, an SBOM, OSV, KEV and EPSS runs, the repository and
 * registry pulls, and the maintainer's own words on one assessment (a
 * contested status). Real daemon responses must render. Edge cases the world
 * does not contain (refusals, paging past the first page) stay in the
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
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const I = "/i/inst_fixture";
const JOB = "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test";
const ASSESSMENT = "security.assessment/gate-app-1.0.0--cve-2021-44228";
const RELEASE = "security.release/gate-app--1.0.0";
const RUN = "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a";
const REVIEWED = "sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6";

const main = async () => within(await screen.findByRole("main"));

describe("recorded reference world", () => {
  it("overview: what needs you, enabled Lines with what wakes them, and kits", async () => {
    renderApp(I, RECORDED);
    const m = await main();
    const strip = within(await m.findByRole("region", { name: "Needs you" }));
    expect(await strip.findByRole("link", { name: /Next \d/ })).toBeInTheDocument();
    expect(await m.findByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/security.kev-triage`);
    expect((await m.findAllByText("When cisa.kev.catalog lands")).length).toBeGreaterThan(0);
    expect(await m.findByText("security", { selector: "span.font-mono" })).toBeInTheDocument();
  });

  it("type map: a system-model kind with its owning kit and ClaimTypes", async () => {
    renderApp(`${I}/map?kind=security.job`, RECORDED);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    const panel = within(screen.getByText("Subject kind").closest("div.overflow-y-auto") as HTMLElement);
    expect(panel.getByText("security", { selector: "span.font-mono" })).toBeInTheDocument();
    expect(panel.getByText("uses")).toBeInTheDocument();
  });

  it("Subject page: a security.job with its fields, verdicts and admission", async () => {
    renderApp(`${I}/s/${encodeURIComponent(JOB)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("pkg:githubactions/actions/checkout@v4")).toBeInTheDocument();
    expect(m.getByText("6 fields · 7 Claims")).toBeInTheDocument();
    expect((await m.findAllByText("Supported")).length).toBeGreaterThan(0);
    expect(await m.findByText("2/2 admitted")).toBeInTheDocument();
  });

  it("Subject page: the author's own words, admitted under the coordinator self-source, and a contested slot", async () => {
    renderApp(`${I}/s/${encodeURIComponent(ASSESSMENT)}`, RECORDED);
    fireEvent.click(await screen.findByRole("button", { name: "Expand justification" }));
    const m = await main();
    expect(await m.findByText("Own words")).toBeInTheDocument();
    // the ClaimType admits the coordinator self-source contract: own words are admitted evidence, sourced to the principal
    expect(m.getByText("Principal:robertmalone")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "playbill.coordinator-self-source-v1 v1" })).toHaveAttribute(
      "href",
      `${I}/contracts/playbill.coordinator-self-source-v1`,
    );
    // the rationale and the revision both carry the author's words
    expect(m.getAllByText("gate-app launches log4j-core 2.14.1 with formatMsgNoLookups=true, so JNDI lookups in messages are disabled.").length).toBeGreaterThan(0);
    // status: OSV's affected against the maintainer's not_affected
    expect(m.getAllByText("Contested").length).toBeGreaterThan(0); // the slot, and the Subject's verdict
    fireEvent.click(m.getByRole("button", { name: "Expand status" }));
    expect((await m.findAllByText("Conflicted")).length).toBe(2);
    expect(await m.findByText("osv.dev.query")).toBeInTheDocument();
  });

  it("neighborhood: a hub with its incoming column", async () => {
    renderApp(`${I}/s/${encodeURIComponent(RELEASE)}/graph`, RECORDED);
    expect(await screen.findByText(/16 Subjects · 15 links/)).toBeInTheDocument();
  });

  it("ledger: the generation timeline", async () => {
    renderApp(`${I}/ledger`, RECORDED);
    const m = await main();
    expect(await m.findByRole("link", { name: "g12" })).toHaveAttribute("href", `${I}?at=12`);
    expect(m.getByText("The maintainer reads the launcher flag as a mitigation; OSV says affected.")).toBeInTheDocument();
    expect(m.getByText("13 on this page")).toBeInTheDocument();
  });

  it("next: rows rendered by reason", async () => {
    renderApp(`${I}/next`, RECORDED);
    const m = await main();
    // grouped by reason: the contested status, then six Lines never enabled (a reason new at this pin)
    expect(await m.findByText("Claims conflict")).toBeInTheDocument();
    const notEnabled = m.getByText("Line not enabled");
    expect(notEnabled.nextElementSibling).toHaveTextContent("6");
    expect(m.getByText("accepted but never enabled; enable it to run on its Triggers")).toBeInTheDocument();
  });

  it("Lines index and a Line page with paged runs, its definition and its slotted Procedure", async () => {
    renderApp(`${I}/lines`, RECORDED);
    let m = await main();
    expect((await m.findByText("19")).parentElement).toHaveTextContent("19 Lines");
    // the Line link, named under the shared security. prefix
    expect(m.getByRole("link", { name: "harden" })).toHaveAttribute("href", `${I}/lines/security.harden`);
    cleanup();
    renderApp(`${I}/lines/security.kev-triage`, RECORDED);
    m = await main();
    expect(await m.findByText("Page 1 · 2 in all")).toBeInTheDocument();
    expect(await m.findByText(/Read the KEV catalog Capture that triggered the Line/)).toBeInTheDocument();
    const line = within((await m.findByText("Line definition")).closest("section")!);
    expect(await line.findByText("catalog")).toBeInTheDocument();
    expect(line.getByText("None: every slot binds by fit")).toBeInTheDocument();
    expect(line.getByText("from cisa.kev.catalog")).toBeInTheDocument();
    // the Procedure as authored is on the steps graph: a clicked step names its interface and binding
    await waitFor(() => expect(document.querySelector('[data-testid="procedure-graph"] .react-flow__node[data-id="parse"]')).not.toBeNull(), { timeout: 8000 });
    fireEvent.click(document.querySelector('[data-testid="procedure-graph"] .react-flow__node[data-id="parse"]')!);
    expect(await screen.findByText("By fit: security-analysis-provider", { selector: "dd" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /security\.kev-catalog/ }).closest("dl")).not.toBeNull();
  });

  it("run page: a Line-triggered run", async () => {
    renderApp(`${I}/runs/${RUN}`, RECORDED);
    const m = await main();
    expect(await m.findByText("3 of 3 done")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "security.epss-daily" })).toHaveAttribute("href", `${I}/lines/security.epss-daily`);
    expect(await m.findByText("1 Captures")).toBeInTheDocument();
  });

  it("state graph: every live Subject and Subject-valued Claim in one page", async () => {
    renderApp(`${I}/graph`, RECORDED);
    expect(await screen.findByTestId("dots")).toHaveTextContent("68 dots · 86 lines");
    const stats = screen.getByText("Subject-valued Claims").parentElement!;
    expect(stats).toHaveTextContent(/68 Subjects\s*86 Subject-valued Claims\s*read in 1 page,/);
    expect(screen.getByRole("button", { name: /security\.job/ })).toBeInTheDocument();
  });

  it("kind page: security.job with keys, ClaimTypes, evidence and settlers", async () => {
    renderApp(`${I}/kinds/security.job?view=claim-types`, RECORDED);
    expect(await screen.findByRole("heading", { name: "security.job" })).toBeInTheDocument();
    const m = within(screen.getByRole("main"));
    expect(await m.findByText(/One job of a workflow/)).toBeInTheDocument();
    expect(m.getAllByText("workflow_ref").length).toBeGreaterThan(1); // a key, and a ClaimType row
    expect(m.getByRole("heading", { name: "ClaimTypes (9)" })).toBeInTheDocument();
    const workflow = within(m.getByText("workflow", { selector: "td > span" }).closest("tr")!);
    expect(workflow.getByRole("link", { name: "→ security.workflow" })).toHaveAttribute("href", `${I}/kinds/security.workflow`);
    expect(workflow.getByRole("link", { name: "security.fetched-v1" })).toHaveAttribute("href", `${I}/contracts/security.fetched-v1`);
    expect(workflow.getByText("Rivals conflict")).toBeInTheDocument();
    expect(workflow.getByText("v7")).toBeInTheDocument();
    // 13 security.job Subjects; needs: 6 live Claims on 5 of them
    const needs = within(m.getByText("needs", { selector: "td > span" }).closest("tr")!);
    expect(await needs.findByText("38%")).toHaveAttribute("title", "5 of 13 live Subjects");
    expect(needs.getByText("6", { selector: "td" })).toBeInTheDocument();
    expect(needs.getByText("All answer")).toBeInTheDocument();
  });

  it("contract page: security.fetched-v1 with its logical sources, landing Triggers, Lines and 42 admitting ClaimTypes", async () => {
    renderApp(`${I}/contracts/security.fetched-v1`, RECORDED);
    expect(await screen.findByRole("heading", { name: "security.fetched-v1" })).toBeInTheDocument();
    const m = within(screen.getByRole("main"));
    expect(m.getByText("Admitted by").nextElementSibling).toHaveTextContent("42 ClaimTypes");
    // logical sources from the definitions: a Line parameter names KEV's; a Trigger selects the repository snapshot
    expect(await m.findByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(m.getByText(/retained by Line security.kev-daily · selected by security.kev-landed, security.kev-landed-attention/)).toBeInTheDocument();
    expect(m.getByText("github.repo.snapshot")).toBeInTheDocument();
    expect(m.getByText(/security.repo-pull.cruxible-ci, under a source named at run time/)).toBeInTheDocument();
    expect(await m.findByText("security.harden-on-snapshot")).toBeInTheDocument();
    expect(m.getAllByRole("link", { name: "security.harden" })[0]).toHaveAttribute("href", `${I}/lines/security.harden`);
    // producers from the pins section: the acquiring Procedure retains, the parser its landings start reads
    const producers = within((await m.findByText("Captured under it by")).closest("section")!);
    const acquire = await producers.findByRole("link", { name: "Procedure:security.repo-acquire" });
    expect(within(acquire.parentElement!).getByText("retains Captures under it")).toBeInTheDocument();
    const parse = producers.getByRole("link", { name: "Procedure:security.repo-parse" });
    expect(within(parse.parentElement!).getByText("reads its landings")).toBeInTheDocument();
  });

  it("evidence flow: the reference world's sources, the Lines that read them and the ClaimTypes they may write", async () => {
    renderApp(`${I}/flow`, RECORDED);
    const flow = within(await screen.findByTestId("flow"));
    expect(flow.getByText("github.repo.snapshot")).toBeInTheDocument();
    // where each source comes from: the Line that fetches it (its host and schedule) or a direct run (its Procedure's gist)
    const kevDaily = within(flow.getByRole("link", { name: "kev-daily" }).closest("[title]") as HTMLElement);
    expect(kevDaily.getByText(/^From /)).toBeInTheDocument();
    expect(kevDaily.getByText("Trigger")).toBeInTheDocument();
    const sbomAcquire = within(flow.getByRole("link", { name: "sbom-acquire" }).closest("[title]") as HTMLElement);
    expect(sbomAcquire.getByText("Read one CycloneDX JSON SBOM from the attached workspace")).toBeInTheDocument();
    expect(sbomAcquire.getByText("none")).toBeInTheDocument();
    // a source says how it arrives; who retains it is on hover
    const sbom = flow.getByText("cyclonedx.sbom").closest("[title]") as HTMLElement;
    expect(within(sbom).getByText("Workspace file")).toBeInTheDocument();
    expect(flow.getByText("cisa.kev.catalog").closest("[title]")).toHaveAttribute("title", expect.stringContaining("Retained by Line security.kev-daily"));
    // the contract is a tag on the source, linked
    expect(flow.getAllByRole("link", { name: "fetched-v1" })[0]).toHaveAttribute("href", `${I}/contracts/security.fetched-v1`);
    // Lines in their own column, named without the shared kit namespace, linked
    expect(flow.getAllByRole("link", { name: "repo-parse.cruxible-ci" })[0]).toHaveAttribute("href", `${I}/lines/security.repo-parse.cruxible-ci`);
    expect(screen.getByText("Names under", { exact: false })).toHaveTextContent("Names under security.");
    expect(flow.getByRole("link", { name: "needs" })).toHaveAttribute("href", `${I}/kinds/security.job?view=claim-types&claim_type=security.job.needs`);
    // own-word statements go straight to the ClaimTypes that accept them
    expect(flow.getByText("Your statements")).toBeInTheDocument();
  });

  it("proposals and a review", async () => {
    renderApp(`${I}/proposals?status=settled`, RECORDED);
    expect(await screen.findByText("13 on this page")).toBeInTheDocument();
    cleanup();
    renderApp(`${I}/p/${encodeURIComponent(REVIEWED)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("security.assessment.justification")).toBeInTheDocument();
    fireEvent.click(await m.findByRole("button", { name: /field changes/ }));
    expect(await m.findByText("/artifact_format")).toBeInTheDocument();
  });
});
