import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { BODY, FIXES, FIXES_KIND, HEADERS, LATER_REVISION, P1, P2, P3, PROPOSAL_L, PROPOSAL_T, RUN_PAIR, RUN_T0, RUN_T1, SCALAR_PAIR, TEMPLATE_LINE, TEMPLATE_WORLD, VIEW } from "@/fixtures/template";

afterEach(cleanup);
beforeAll(() => {
  URL.createObjectURL ??= () => "blob:capture";
  URL.revokeObjectURL ??= () => undefined;
});

const I = "/i/inst_fixture";
const SLOW = { timeout: 8000 };
const handle = (digest: string) => `CAP-${digest.slice(7, 19)}`;
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;

describe("D-R37 template: the step graph", () => {
  it("tags each step with its stage; a derive is pure and names its operation; a list fetch shows its origin and cap", async () => {
    renderApp(`${I}/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    await screen.findByTestId("procedure-graph", {}, SLOW);
    await waitFor(() => expect(node("view")).not.toBeNull(), SLOW);
    await waitFor(() => expect(node("view").querySelector("[data-stage]")).toHaveAttribute("data-stage", "derive"), SLOW);
    const stages = { watched: "READ", pages: "FETCH", view: "DERIVE", fixes: "DERIVE", entries: "EXTRACT", write: "CLAIMS" };
    for (const [id, tag] of Object.entries(stages)) expect(within(node(id)).getByText(tag)).toBeInTheDocument();
    expect(node("view")).toHaveTextContent("pure · advisory.narrow");
    expect(node("fixes")).toHaveTextContent("pure · advisory.fixes");
    await waitFor(() => expect(node("pages")).toHaveTextContent("vendor.example · JSON · ≤ 20 Captures"), SLOW);

    // a derive's panel: operation, inputs and output as fields
    fireEvent.click(within(node("view")).getByText("view"));
    const derive = within(await screen.findByRole("list", { name: "Derive" }, SLOW));
    expect(derive.getByText("advisory.narrow")).toBeInTheDocument();
    expect(derive.getByText("pure")).toBeInTheDocument();
    const inputs = within(screen.getByRole("list", { name: "Inputs" }));
    expect(inputs.getByText("pages.pages")).toBeInTheDocument();
    expect(inputs.getByRole("link", { name: "watched" })).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Output" })).getByRole("link", { name: "advisory-view" })).toBeInTheDocument();

    // the claims panel lists the kinds it may create, value targets included
    fireEvent.click(within(node("write")).getByText("write"));
    const writes = within(await screen.findByRole("list", { name: "Writes on" }, SLOW));
    expect(writes.getByText("Creates")).toBeInTheDocument();
    expect(writes.getByRole("link", { name: "advisory" })).toBeInTheDocument();
  }, 20000);

  it("on a run, a list fetch marks its members kept, dropped and the provider's word that it is incomplete", async () => {
    renderApp(`${I}/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    const picker = await screen.findByRole("combobox", { name: "Mark the steps with a run" }, SLOW);
    await waitFor(() => expect(within(picker).getAllByRole("option").length).toBeGreaterThan(2), SLOW);
    fireEvent.change(picker, { target: { value: "run-t2" } });
    await waitFor(() => expect(within(node("pages")).getByText("2 kept · 1 dropped · incomplete")).toBeInTheDocument(), SLOW);
    fireEvent.click(within(node("pages")).getByText("pages"));
    const members = within(await screen.findByRole("table", { name: "Members" }, SLOW));
    expect(members.getByText("dropped · oversized")).toBeInTheDocument();
    expect(members.getAllByText("kept")).toHaveLength(2);
    expect(screen.getByText(/Incomplete \(provider\)/)).toBeInTheDocument();
  });
});

describe("D-R37 template: Captures", () => {
  it("a derived Capture shows what it was derived from, its reducer, and the restriction it inherited", async () => {
    renderApp(`${I}/ref/${handle(VIEW)}`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    const from = within((await main.findByText("Derived from")).closest("section")!);
    for (const d of [P1, P2, P3]) expect(await from.findByRole("link", { name: handle(d) })).toBeInTheDocument();
    expect(from.getByText("Provider build")).toBeInTheDocument();
    expect(from.getByText("Operation")).toBeInTheDocument();
    expect(await main.findByText(/restricted \(inherited from/)).toBeInTheDocument();
    const access = (await main.findByText(/restricted \(inherited from/)).closest("span")!;
    expect(within(access).getByRole("link", { name: "security.advisory-page" })).toHaveAttribute("href", `${I}/contracts/security.advisory-page`);
  });

  it("a list member shows its siblings from the same fetch, each with its request URL and page", async () => {
    renderApp(`${I}/ref/${handle(P2)}`, TEMPLATE_WORLD);
    const table = within(await screen.findByRole("table", { name: "List members" }, SLOW));
    expect(table.getByRole("link", { name: handle(P1) })).toBeInTheDocument();
    expect(table.getByText(handle(P2))).toBeInTheDocument(); // itself, unlinked
    expect(table.getByText("https://vendor.example/advisories?page=3")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: RUN_T1 })).toHaveAttribute("href", `${I}/runs/${RUN_T1}`);
  });

  it("a call's two scalar Captures are its other outputs, unclassified: no list, no pages", async () => {
    renderApp(`${I}/ref/${handle(BODY)}`, [...TEMPLATE_WORLD, ...SCALAR_PAIR]);
    const table = within(await screen.findByRole("table", { name: "Other outputs of this call" }, SLOW));
    expect(table.getByRole("link", { name: handle(HEADERS) })).toBeInTheDocument();
    expect(table.getByText(handle(BODY))).toBeInTheDocument(); // itself, unlinked
    expect(table.queryByText("Page")).toBeNull();
    expect(screen.queryByRole("table", { name: "List members" })).toBeNull();
    expect(screen.queryByText(/The list this Capture is a member of/)).toBeNull();
    expect(screen.getByRole("link", { name: RUN_PAIR })).toHaveAttribute("href", `${I}/runs/${RUN_PAIR}`);
  });

  it("a derived CaptureKind names the derives that commit it, their operation and the kinds they derive from", async () => {
    renderApp(`${I}/contracts/${FIXES_KIND}`, TEMPLATE_WORLD);
    const table = within(await screen.findByRole("table", { name: "Derived by" }, SLOW));
    expect(table.getByText("advisory.fixes")).toBeInTheDocument();
    expect(table.getByRole("link", { name: "advisory-pages" })).toHaveAttribute("href", `${I}/lines/advisory-pages`);
    expect(table.getByRole("link", { name: "security.advisory-view" })).toHaveAttribute("href", `${I}/contracts/security.advisory-view`);
    expect(screen.getByText("Derived")).toBeInTheDocument(); // the grade term
  });
});

describe("D-R37 template: evidence chains (CD2)", () => {
  it("on the Subject page, the cited Capture first (record, field), then its chain one hop per expand", async () => {
    renderApp(`${I}/s/${encodeURIComponent("security.assessment/rel-1-cve-2024-3094")}`, TEMPLATE_WORLD);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    const evidence = within(await screen.findByRole("table", { name: "Evidence" }, SLOW));
    expect(evidence.getByText("CVE-2024-3094")).toBeInTheDocument();
    expect(evidence.getByText("status")).toBeInTheDocument();
    const chain = await screen.findByRole("button", { name: `Derived from 1 Capture (${handle(FIXES)})` }, SLOW);
    expect(screen.queryByRole("link", { name: handle(VIEW) })).toBeNull(); // nothing read before the expand
    fireEvent.click(chain);
    expect(await screen.findByRole("link", { name: handle(VIEW) }, SLOW)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: handle(P1) })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: `Expand Derived from 3 Captures (${handle(VIEW)})` }));
    expect(await screen.findByRole("link", { name: handle(P1) }, SLOW)).toBeInTheDocument();
  });

  it("in the proposal side panel, the cited Capture then its chain; a list absence witness lists every member", async () => {
    renderApp(`${I}/p/${encodeURIComponent(PROPOSAL_T)}`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "security.vulnerability/cve-2024-3094 security.vulnerability.fixed_in" }, SLOW));
    const panel = within(await main.findByRole("complementary", { name: "Change detail" }));
    fireEvent.click(await panel.findByRole("button", { name: `Derived from 1 Capture (${handle(FIXES)})` }, SLOW));
    expect(await panel.findByRole("link", { name: handle(VIEW) }, SLOW)).toBeInTheDocument();
    cleanup();

    renderApp(`${I}/p/${encodeURIComponent(PROPOSAL_L)}`, TEMPLATE_WORLD);
    const second = within(await screen.findByRole("main"));
    fireEvent.click(await second.findByRole("button", { name: "security.vulnerability/cve-2023-4863 security.vulnerability.advisory" }, SLOW));
    const witness = within(await second.findByRole("complementary", { name: "Change detail" }));
    expect(witness.getByText("Absence witness · 3 Captures")).toBeInTheDocument();
  });
});

describe("D-R37 template: runs, Lines and the evidence flow", () => {
  it("the run page tables each item's change: kind, Subject, ClaimType and value, linked", async () => {
    renderApp(`${I}/runs/${RUN_T1}`, TEMPLATE_WORLD);
    const table = within(await screen.findByRole("table", { name: "Changes" }, SLOW));
    await waitFor(() => expect(table.getByText("re-observed")).toBeInTheDocument(), SLOW);
    for (const word of ["revised", "new Subject", "retired"]) expect(table.getByText(word)).toBeInTheDocument();
    expect(table.getAllByText("new")).toHaveLength(2);
    expect(table.getByText("9.8p1")).toBeInTheDocument();
    expect(table.getByText("9.7p1").closest(".line-through")).not.toBeNull();
    expect(table.getAllByRole("link", { name: "security.vulnerability.fixed_in" })[0]).toHaveAttribute("href", `${I}/claim-types/security.vulnerability.fixed_in`);
    expect(screen.getByText("3 claims")).toBeInTheDocument();
  });

  it("a re-observed Claim shows the run's own value, read at the run's coordinate, after a later generation revised it", async () => {
    renderApp(`${I}/runs/${RUN_T0}`, [...TEMPLATE_WORLD, ...LATER_REVISION]);
    const table = within(await screen.findByRole("table", { name: "Changes" }, SLOW));
    await waitFor(() => expect(table.getByText("open")).toBeInTheDocument(), SLOW);
    expect(table.getByText("re-observed")).toBeInTheDocument();
    expect(table.getByRole("link", { name: "security.assessment.status" })).toBeInTheDocument();
    expect(table.queryByText("fixed")).toBeNull(); // the head's value is not this run's
  });

  it("a Line's Ends in names the kinds it may create, value targets included", async () => {
    renderApp(`${I}/lines`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    const row = within((await main.findByRole("link", { name: TEMPLATE_LINE })).closest("tr")!);
    expect(await row.findByText("creates", {}, SLOW)).toBeInTheDocument();
    expect(row.getByRole("link", { name: "advisory" })).toHaveAttribute("href", `${I}/kinds/security.advisory`);
  });

  it("the evidence flow draws derives between sources and Lines, and a derived landing as a Line → Line link", async () => {
    renderApp(`${I}/flow`, TEMPLATE_WORLD);
    const flow = within(await screen.findByTestId("flow", {}, SLOW));
    expect(flow.getAllByText("Derive")).toHaveLength(3); // the column, and each derive card
    expect(flow.getByRole("link", { name: "advisory.narrow" })).toBeInTheDocument();
    expect(flow.getByRole("link", { name: "advisory.fixes" })).toBeInTheDocument();
    expect(document.querySelector('[data-testid="landing-link"]')).toHaveAttribute("aria-label", "Link advisory-pages → fix-followup · lands security.advisory-fixes");
  });
});
