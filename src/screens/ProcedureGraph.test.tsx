import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { renderApp, TEST_BASE } from "@/test/render";
import { NODE_WIDTH } from "@/components/graph/ProcedureGraph";
import { TEMPLATE_LINE, TEMPLATE_WORLD } from "@/fixtures/template";
import { KEV_TRIAGE_SPEC } from "@/fixtures/authored/definitions";
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
    expect(pages.getByTitle(/^url = https:\/\/vendor\.example\/advisories\?page=1( |$)/)).toBeInTheDocument();
    expect(pages.getByText("logical_source")).toBeInTheDocument();
    // only the step that reads a parameter shows it
    expect(within(node("view")).queryByText("url")).toBeNull();
  });

  it("on a Procedure page, names the input each step reads as a row in it, with no input node", async () => {
    renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.advisory-pages", TEMPLATE_WORLD);
    await graph();
    await waitFor(() => expect(node("pages")).not.toBeNull(), SLOW);
    expect(node("$input")).toBeNull();
    expect(within(node("pages")).getByTitle(/^url( |$)/)).toBeInTheDocument();
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

  it("shows what a derive does: what it reads and commits, its request and result Contracts, the result's description once read", async () => {
    let release!: () => void;
    const held = new Promise<void>((resolve) => (release = resolve));
    const hold = http.post(`${TEST_BASE}/api/v1/:instance/get-batch`, async ({ request }) => {
      if ((await request.clone().text()).includes("security.advisory-narrow.result@1")) await held;
      return undefined;
    });
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD, { handlers: [hold] });
    await graph();
    await waitFor(() => expect(node("view")).not.toBeNull(), SLOW);
    const view = () => within(node("view"));
    // from the definition alone: in reading order, each linked
    expect(view().getByText("Input").nextElementSibling).toHaveTextContent("advisory-page");
    expect(view().getByText("advisory-narrow.request").closest("a")).toHaveAttribute("href", expect.stringContaining("security.advisory-narrow.request"));
    expect(view().getByText("advisory-narrow.result").closest("a")).toHaveAttribute("title", "Result Contract security.advisory-narrow.result@1");
    expect(view().getByText("advisory-view").closest("a")).toHaveAttribute("href", "/i/inst_fixture/contracts/security.advisory-view");
    // the result Contract's description waits for its read; the node is drawn without it
    expect(view().queryByText(/One derived JSON document/)).toBeNull();
    release();
    const description = await waitFor(() => view().getByText(/^One derived JSON document: the advisory pages/), SLOW);
    expect(description).toHaveClass("line-clamp-2");
    expect(description).toHaveAttribute("title", expect.stringContaining("merged in page order"));
  });

  it("names a fetch's allowed origins, says on a parameter's hover what its request field means, and keeps the node when that read fails", async () => {
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    await graph();
    await waitFor(() => expect(within(node("pages")).getByTitle(/The first page's URL/)).toBeInTheDocument(), SLOW);
    expect(within(node("pages")).getByText("Origins").nextElementSibling).toHaveTextContent("https://vendor.example");
    expect(within(node("pages")).getByTitle(/The first page's URL/)).toHaveAttribute("title", "url = https://vendor.example/advisories?page=1\nThe first page's URL; each page names the next.");
    // an extract's field names on hover of its count; a claims step's ceiling from the Line
    expect(within(node("entries")).getByText("2 fields")).toHaveAttribute("title", "fixed_in, advisory");
    expect(within(node("write")).getByText("At most").nextElementSibling).toHaveTextContent("propose");
    cleanup();

    const fail = http.post(`${TEST_BASE}/api/v1/:instance/get-batch`, async ({ request }) =>
      (await request.clone().text()).includes("web.fetch.pages.request@1") ? HttpResponse.json({ error: "down" }, { status: 500 }) : undefined,
    );
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD, { handlers: [fail] });
    await graph();
    await waitFor(() => expect(within(node("pages")).getByText("url")).toBeInTheDocument(), SLOW);
    expect(within(node("pages")).getByTitle("url = https://vendor.example/advisories?page=1")).toBeInTheDocument();
    expect(within(node("pages")).queryByTitle(/The first page's URL/)).toBeNull();
  });

  it("with a run picked, links the Captures each step read and produced", async () => {
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    await graph();
    const picker = await screen.findByRole("combobox", { name: "Mark the steps with a run" }, SLOW);
    await waitFor(() => expect(within(picker).getAllByRole("option").length).toBeGreaterThan(1), SLOW);
    expect(within(node("view")).queryByText("Out")).toBeNull(); // no run: no Captures
    fireEvent.change(picker, { target: { value: "run-t2" } });
    await waitFor(() => expect(within(node("view")).getByText("Out")).toBeInTheDocument(), SLOW);
    const out = within(node("view")).getByText("Out").nextElementSibling as HTMLElement;
    expect(within(out).getByRole("link", { hidden: true })).toHaveAttribute("href", `/i/inst_fixture/ref/${encodeURIComponent("CAP-787878787878")}`);
    // a derive's input is what the step it reads produced; the next derive reads this one's output
    expect(within(node("view")).getByText("In").nextElementSibling).toHaveTextContent("CAP-747474747474");
    expect(within(node("fixes")).getByText("In").nextElementSibling).toHaveTextContent("CAP-787878787878");
  });

  it("holds a long Procedure's canvas to most of the window in either orientation; the graph pans inside it", async () => {
    const saved = { steps: KEV_TRIAGE_SPEC.steps, returns: KEV_TRIAGE_SPEC.returns ?? null };
    KEV_TRIAGE_SPEC.steps = Array.from({ length: 48 }, (_, i) => ({
      read: `read_${i}`,
      query: "security.kev_exposure",
      params: i ? { prior: { $ref: "step" as const, step: `read_${i - 1}`, path: ["rows"] } } : {},
    }));
    KEV_TRIAGE_SPEC.returns = null;
    try {
      renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
      await graph();
      await waitFor(() => expect(node("read_47")).not.toBeNull(), SLOW);
      const height = () => parseFloat(document.querySelector<HTMLElement>('[data-testid="procedure-graph"] .react-flow')!.parentElement!.parentElement!.style.height);
      const most = Math.round(window.innerHeight * 0.8);
      // top to bottom (the default): 48 steps would be thousands of pixels tall at a readable zoom
      expect(height()).toBeGreaterThan(0);
      expect(height()).toBeLessThanOrEqual(most);
      const top = node("read_0").style.transform;
      fireEvent.click(screen.getByRole("button", { name: "Lay the steps out left to right" }));
      await waitFor(() => expect(node("read_0").style.transform).not.toBe(top), SLOW);
      expect(height()).toBeGreaterThan(0);
      expect(height()).toBeLessThanOrEqual(most);
    } finally {
      KEV_TRIAGE_SPEC.steps = saved.steps;
      KEV_TRIAGE_SPEC.returns = saved.returns;
    }
  }, 30000);
});
