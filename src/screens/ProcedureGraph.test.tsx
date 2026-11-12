import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { http } from "msw";
import { renderApp, TEST_BASE } from "@/test/render";
import { NODE_WIDTH } from "@/components/graph/ProcedureGraph";
import { TEMPLATE_LINE, TEMPLATE_WORLD } from "@/fixtures/template";
import { LANDING_TRIGGER, READERS_WORLD } from "@/fixtures/readers";

afterEach(cleanup);

beforeAll(() => {
  // React Flow measures its pane; jsdom has no ResizeObserver.
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

// Generous waits: under load the graph's layout outlasts the 1 s defaults.
const SLOW = { timeout: 8000 };
const graph = async () => within(await screen.findByTestId("procedure-graph", {}, SLOW));
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;

describe("Procedure graph", () => {
  it("draws a Procedure's steps on its page; a click focuses the step's lineage and marks its row; Esc clears both", async () => {
    renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
    await graph();
    await waitFor(() => expect(node("entries")).not.toBeNull(), SLOW);
    // each step is a node with its id and its template stage; a step outside the template keeps its kind word
    const stages = { catalog: "FETCH", watched: "READ", entries: "EXTRACT", settle: "CLAIMS" };
    for (const [id, tag] of Object.entries(stages)) expect(within(node(id)).getByText(tag)).toBeInTheDocument();
    expect(within(node("changed")).getByText("Guard")).toBeInTheDocument();
    expect(node("changed").querySelector("[data-stage]")).toBeNull();
    expect(node("catalog").querySelector("[data-stage]")).toHaveAttribute("data-stage", "fetch");
    // the guard's else halts under no id: the graph names it after the guard
    expect(within(node("changed.else")).getByText("no_change")).toBeInTheDocument();
    // each step's key fields, terse: payload names as code, named things linked
    expect(node("catalog")).toHaveTextContent("fetch · JSON");
    expect(node("watched")).toHaveTextContent("kev_exposure");
    expect(within(node("watched")).getByText("kev_exposure").closest("a")).toHaveAttribute("href", `/i/inst_fixture/ref/${encodeURIComponent("query:security.kev_exposure")}`);
    expect(node("entries")).toHaveTextContent("/vulnerabilities/* · key cveID · 1 field");
    expect(within(node("entries")).getByText("cveID").tagName).toBe("CODE");
    expect(node("settle")).toHaveTextContent("kev_date_added → vulnerability");
    expect(within(node("settle")).getByText("kev_date_added").closest("a")).toHaveAttribute("href", "/i/inst_fixture/claim-types/security.vulnerability.kev_date_added");
    expect(node("changed")).toHaveTextContent("else halt");

    fireEvent.click(node("entries"));
    expect(await screen.findByRole("button", { name: "Clear: Focused on entries" }, SLOW)).toBeInTheDocument();
    expect(document.querySelector('[data-step="entries"]')).toHaveAttribute("aria-current", "step");
    // upstream and downstream stay lit
    expect(node("catalog").style.opacity).toBe("1");
    expect(node("settle").style.opacity).toBe("1");

    fireEvent.click(node("watched"));
    expect(await screen.findByRole("button", { name: "Clear: Focused on watched" }, SLOW)).toBeInTheDocument();
    expect(node("catalog").style.opacity).toBe("0.18"); // a sibling input, not watched's lineage

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("button", { name: /^Clear: Focused on/ })).toBeNull(), SLOW);
    expect(document.querySelector('[data-step="watched"]')).not.toHaveAttribute("aria-current");
  });

  it("wraps the graph in the Line: its Trigger in a Runs on band, the build its slot binds, and a picked run's marks and counts", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const g = await graph();
    const runsOn = within(await g.findByRole("group", { name: "Runs on" }, SLOW));
    expect(runsOn.getByRole("link", { name: "security.kev-daily" })).toHaveAttribute("href", expect.stringContaining("security.kev-daily"));
    // a UTC schedule reads in the viewer's zone (the suite runs in America/New_York)
    expect(runsOn.getByText(/^Daily at 1:00\s?AM EST$|^Daily at 2:00\s?AM EDT$/)).toBeInTheDocument();
    // a schedule feeds no step: no marker; and the Trigger is not a node of the graph
    expect(runsOn.queryByRole("button", { name: /^lands/ })).toBeNull();
    await waitFor(() => expect(node("catalog")).not.toBeNull(), SLOW);
    expect(document.querySelector('[data-testid="procedure-graph"] .react-flow__node[data-id^="trigger:"]')).toBeNull();
    // the call reads the landing; the build its slot binds is on hover
    await waitFor(() => expect(node("catalog")).toHaveTextContent("landing · JSON"), SLOW);
    await waitFor(() => expect(node("catalog").querySelector("[title*='slot fetch → cruxible-provider-web']")).not.toBeNull(), SLOW);
    expect(g.queryByText(/1,766/)).toBeNull(); // no run picked: no counts

    const picker = await screen.findByRole("combobox", { name: "Mark the steps with a run" }, SLOW);
    await waitFor(() => expect(within(picker).getAllByRole("option").length).toBeGreaterThan(1), SLOW);
    fireEvent.change(picker, { target: { value: "run-7" } });
    await waitFor(() => expect(within(node("changed")).getByText(/Refused · guard_refused/)).toBeInTheDocument(), SLOW);
    expect(node("changed").querySelector('[role="img"][aria-label^="Refused"]')).toHaveClass("bg-red-500"); // the red dot
    // a node with a summary shows the run's counts; one without (the refusal) keeps its verdict
    expect(within(node("catalog")).getByText("1 Capture")).toBeInTheDocument();
    expect(within(node("watched")).getByText("3 rows")).toBeInTheDocument();
    expect(within(node("entries")).getByText("1,766 records · complete")).toBeInTheDocument();
    expect(within(node("settle")).getByText(/Not run|delivered/)).toBeInTheDocument();
    expect(screen.getByText("Marked with run")).toBeInTheDocument();
    // a clicked step opens its fields in groups
    fireEvent.click(node("entries"));
    const panel = within(await screen.findByRole("list", { name: "Records" }, SLOW));
    expect(panel.getByText("/vulnerabilities/*")).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Fields" })).getByText("dateAdded")).toBeInTheDocument();
  });

  it("draws every step as a slot of one width: the kind word and name in its header, ports where edges attach", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    await graph();
    await waitFor(() => expect(node("settle")).not.toBeNull(), SLOW);
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-testid="procedure-graph"] .react-flow__node')];
    expect(nodes.length).toBeGreaterThan(4);
    for (const n of nodes) expect(n.style.width).toBe(`${NODE_WIDTH}px`);
    // the kind word carries its meaning on hover; no legend repeats it
    expect(within(node("catalog")).getByText("FETCH")).toHaveAttribute("title", expect.stringContaining("Fetches evidence"));
    expect(screen.queryByText("Writes Claims")).toBeNull();
    // the name is mono (a step id), the kind word is not
    expect(within(node("catalog")).getByText("catalog").closest(".font-mono")).not.toBeNull();
    expect(within(node("catalog")).getByText("FETCH").closest(".font-mono")).toBeNull();
    // a port shows only where an edge attaches: catalog feeds entries, nothing feeds it
    const ports = (id: string) => [...node(id).querySelectorAll<HTMLElement>(".react-flow__handle")].map((h) => !h.className.includes("!opacity-0"));
    expect(ports("catalog")).toEqual([false, true]);
    expect(ports("entries")).toEqual([true, true]);
  });

  it("shows a Line's parameters as rows in the step that reads them, with their values; never as a step of their own", async () => {
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    await graph();
    await waitFor(() => expect(node("pages")).not.toBeNull(), SLOW);
    expect(node("$input")).toBeNull();
    expect(screen.queryByText("Parameters")).toBeNull();
    const pages = within(node("pages"));
    expect(pages.getByText("url").tagName).toBe("CODE");
    expect(pages.getByText("https://vendor.example/advisories?page=1")).toBeInTheDocument();
    expect(pages.getByTitle("url = https://vendor.example/advisories?page=1")).toBeInTheDocument();
    expect(pages.getByText("logical_source")).toBeInTheDocument();
    // only the step that reads a parameter shows it
    expect(within(node("view")).queryByText("url")).toBeNull();
  });

  it("on a Procedure page, names the input each step reads as a row in it, with no input node", async () => {
    renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.advisory-pages", TEMPLATE_WORLD);
    await graph();
    await waitFor(() => expect(node("pages")).not.toBeNull(), SLOW);
    expect(node("$input")).toBeNull();
    expect(within(node("pages")).getByTitle("url")).toBeInTheDocument();
  });

  it("names a landing Trigger's step on its Runs on entry; a click focuses that step", async () => {
    renderApp("/i/inst_fixture/lines/cve-applicability", READERS_WORLD);
    const g = await graph();
    const runsOn = within(await g.findByRole("group", { name: "Runs on" }, SLOW));
    expect(runsOn.getByRole("link", { name: LANDING_TRIGGER })).toBeInTheDocument();
    expect(runsOn.getByText("When assessments.inbox lands")).toBeInTheDocument();
    await waitFor(() => expect(node("record")).not.toBeNull(), SLOW);
    fireEvent.click(runsOn.getByRole("button", { name: "lands → record" }));
    expect(await screen.findByRole("button", { name: "Clear: Focused on record" }, SLOW)).toBeInTheDocument();
  });

  it("shows what a read's Query is as rows in its node once the Query's card is read, and the node before it is", async () => {
    // Hold the Query's card until the node has drawn without it.
    let release!: () => void;
    const held = new Promise<void>((resolve) => (release = resolve));
    const hold = http.post(`${TEST_BASE}/api/v1/:instance/get-batch`, async ({ request }) => {
      if ((await request.clone().text()).includes("QueryDefinition:security.kev_exposure")) await held;
      return undefined;
    });
    renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage", undefined, { handlers: [hold] });
    await graph();
    await waitFor(() => expect(node("watched")).not.toBeNull(), SLOW);
    const watched = () => within(node("watched"));
    // not yet read: the Query's name (a link to its page) and nothing else
    expect(watched().getByText("kev_exposure").closest("a")).toHaveAttribute("href", `/i/inst_fixture/ref/${encodeURIComponent("query:security.kev_exposure")}`);
    expect(watched().queryByText("Returns")).toBeNull();
    expect(watched().queryByText("From")).toBeNull();

    release();
    await waitFor(() => expect(watched().getByText("Returns")).toBeInTheDocument(), SLOW);
    // its description as written (clamped, all of it on hover), the kind its rows start from, its parameters, what it returns
    const description = watched().getByText("Assessments whose vulnerability is KEV-listed and whose release is shipped.");
    expect(description).toHaveClass("line-clamp-2");
    expect(description).toHaveAttribute("title", "Assessments whose vulnerability is KEV-listed and whose release is shipped.");
    expect(watched().getByText("From").nextElementSibling).toHaveTextContent("vulnerability");
    expect(watched().getByTitle("From security.vulnerability")).toBeInTheDocument();
    expect(watched().getByText("3 fields").closest("[title]")).toHaveAttribute("title", "cve_id, release, status");
    expect(watched().getByText("kev_exposure").closest("a")).not.toBeNull();
  });
});
