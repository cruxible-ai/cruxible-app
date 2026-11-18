import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { renderApp, TEST_BASE } from "@/test/render";
import { inferredInput, NODE_WIDTH } from "@/components/graph/ProcedureGraph";
import type { StepMark } from "@/lib/run-marks";
import type { ProcedureSpec } from "@/lib/definitions";
import { term } from "@/lib/vocabulary";
import { TEMPLATE_LINE, TEMPLATE_WORLD } from "@/fixtures/template";
import { KEV_TRIAGE_SPEC } from "@/fixtures/authored/definitions";
import { AUTHORED } from "@/fixtures/handlers";
import type { GetResult } from "@/api/schemas";
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
    expect(node("entries")).toHaveTextContent("vulnerabilities · key cve_id");
    expect(within(node("entries")).getByText("cve_id").tagName).toBe("CODE");
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
    expect(panel.getByText("vulnerabilities")).toBeInTheDocument();
    expect(panel.getByText("cve_id")).toBeInTheDocument();
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

  it("a derive node shows its operation, then its result's description in full, then its parameters; no Input, Request, Result or Output rows", async () => {
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
    // the operation the Line binds, alone: no effect word; the edges in and out name what flows, the panel the Contracts
    await waitFor(() => expect(view().getByText("advisory.narrow")).toBeInTheDocument(), SLOW);
    expect(node("view")).not.toHaveTextContent(/\bpure\b/);
    for (const label of ["Input", "Output", "Request", "Result"]) expect(view().queryByText(label)).toBeNull();
    expect(view().queryByText(/advisory-narrow\.(request|result)/)).toBeNull();
    // the result Contract's description waits for its read; the node is drawn without it
    expect(view().queryByText(/One derived JSON document/)).toBeNull();
    const before = parseFloat(node("view").style.height);
    release();
    const text = "One derived JSON document: the advisory pages' entries that name a watched CVE, merged in page order.";
    const description = await waitFor(() => view().getByText(text), SLOW);
    // in full: not clamped, as many rows as it wraps to, and the node grows by them
    expect(description).not.toHaveClass("line-clamp-2");
    const rows = parseFloat(description.style.height) / 16;
    expect(rows).toBeGreaterThanOrEqual(3);
    await waitFor(() => expect(parseFloat(node("view").style.height)).toBe(before + rows * 16), SLOW);
    // first after the operation
    const body = description.parentElement!;
    expect(body.children[0]).toHaveTextContent("advisory.narrow");
    expect(body.children[1]).toBe(description);
  });

  it("the side panel shows the description the node shows and, for a call, its effect, operation, full Contract names and versions and its kinds", async () => {
    // The fetch's result Contract carries a description here, so the FETCH step has one too.
    const described = http.post(`${TEST_BASE}/api/v1/:instance/get-batch`, async ({ request }) => {
      if (!(await request.clone().text()).includes("Contract:web.fetch.pages.result@1")) return undefined;
      const fixture = TEMPLATE_WORLD.find((f) => (f.response as { results?: GetResult[] }).results?.some((r) => r.ref === "Contract:web.fetch.pages.result@1"))!;
      const response = structuredClone(fixture.response) as { results: GetResult[] };
      for (const r of response.results) {
        if (r.ref === "Contract:web.fetch.pages.result@1") (r.card as { description?: string }).description = "Every advisory page, one Capture each, in the order the pages name each other.";
      }
      return HttpResponse.json(response);
    });
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD, { handlers: [described] });
    await graph();
    const panelText = () => screen.getByTestId("step-description");
    const link = (group: string, text: string) => within(screen.getByRole("list", { name: group })).getByText(text).closest("a");

    // DERIVE
    await waitFor(() => expect(within(node("view")).getByText(/^One derived JSON document: the advisory pages/)).toBeInTheDocument(), SLOW);
    fireEvent.click(node("view"));
    await waitFor(() => expect(panelText()).toHaveTextContent("One derived JSON document: the advisory pages' entries that name a watched CVE, merged in page order."), SLOW);
    const derive = within(screen.getByRole("list", { name: "Derive" }));
    expect(derive.getByText("pure")).toBeInTheDocument();
    expect(derive.getByText("advisory.narrow")).toBeInTheDocument();
    expect(link("Derive", "security.advisory-narrow.request@1")).toHaveAttribute("href", expect.stringContaining(encodeURIComponent("Contract:security.advisory-narrow.request@1")));
    expect(link("Derive", "security.advisory-narrow.result@1")).not.toBeNull();
    expect(link("Inputs", "security.advisory-page")).toHaveAttribute("href", expect.stringContaining("security.advisory-page"));
    expect(link("Output", "security.advisory-view")).toHaveAttribute("href", expect.stringContaining("security.advisory-view"));

    // FETCH: its description in full on the node and in the panel; what the node shows is in the panel too
    await waitFor(() => expect(within(node("pages")).getByText(/^Every advisory page, one Capture each/)).not.toHaveClass("line-clamp-2"), SLOW);
    fireEvent.click(node("pages"));
    await waitFor(() => expect(panelText()).toHaveTextContent("Every advisory page, one Capture each, in the order the pages name each other."), SLOW);
    expect(within(screen.getByRole("list", { name: "Provider" })).getByText("external read")).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Provider" })).getByText("web.fetch.pages")).toBeInTheDocument();
    expect(link("Provider", "web.fetch.pages.request@1")).not.toBeNull();
    expect(link("Provider", "web.fetch.pages.result@1")).not.toBeNull();
    expect(link("Returns", "security.advisory-page")).not.toBeNull();
    expect(within(screen.getByRole("list", { name: "Fetches" })).getByText("https://vendor.example")).toBeInTheDocument();
    const params = within(screen.getByRole("list", { name: "Parameters" }));
    expect(params.getByText("url")).toBeInTheDocument();
    expect(params.getByText("https://vendor.example/advisories?page=1")).toBeInTheDocument();
    expect(params.getByText("vendor.advisories")).toBeInTheDocument();

    // READ: its Query's description, in full
    await waitFor(() => expect(within(node("watched")).getByText("Returns")).toBeInTheDocument(), SLOW);
    fireEvent.click(node("watched"));
    await waitFor(() => expect(panelText()).toHaveTextContent("Assessments whose vulnerability is KEV-listed and whose release is shipped."), SLOW);
    expect(panelText()).not.toHaveClass("line-clamp-2");
    expect(within(screen.getByRole("list", { name: "Reads" })).getByText("vulnerability")).toBeInTheDocument();
  });

  it("names a fetch's allowed origins, says on a parameter's hover what its request field means, and keeps the node when that read fails", async () => {
    renderApp(`/i/inst_fixture/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    await graph();
    await waitFor(() => expect(within(node("pages")).getByTitle(/The first page's URL/)).toBeInTheDocument(), SLOW);
    expect(within(node("pages")).getByText("Origins").nextElementSibling).toHaveTextContent("https://vendor.example");
    expect(within(node("pages")).getByTitle(/The first page's URL/)).toHaveAttribute("title", "url = https://vendor.example/advisories?page=1\nThe first page's URL; each page names the next.");
    // an extract's record set; a claims step's ceiling from the Line
    expect(within(node("entries")).getByText("fixes").tagName).toBe("CODE");
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
    // unrecorded inputs are named only when the reference names one Capture for sure: view reads a list of pages (no In
    // row), fixes reads view's one Capture, entries reads fixes' one Capture
    expect(within(node("view")).queryByText("In")).toBeNull();
    expect(within(node("fixes")).getByText("In").nextElementSibling).toHaveTextContent("CAP-787878787878");
    expect(within(node("entries")).getByText("In").nextElementSibling).toHaveTextContent("CAP-797979797979");
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

  it("names declared parameters no step reads in an Unused band, with the Line's value on a Line page; a parameter two steps read shows in both", async () => {
    const saved = { steps: KEV_TRIAGE_SPEC.steps, params: KEV_TRIAGE_SPEC.params, returns: KEV_TRIAGE_SPEC.returns ?? null };
    KEV_TRIAGE_SPEC.params = { used: { type: { kind: "string" } }, unused: { type: { kind: "string" } } };
    KEV_TRIAGE_SPEC.steps = ["one", "two"].map((read) => ({ read, query: "security.kev_exposure", params: { selected: { $ref: "param" as const, path: ["used"] } } }));
    KEV_TRIAGE_SPEC.returns = null;
    const proof = AUTHORED.flatMap((f) => ((f.response as { results?: GetResult[] }).results ?? [f.response as GetResult]))
      .filter((r) => r?.ref === "Line:kev-triage" && r.detail === "proof")
      .map((r) => (r.proof as { envelope: { parameters: Record<string, unknown> } }).envelope);
    const before = proof.map((e) => e.parameters);
    try {
      renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
      const g = await graph();
      const band = within(await g.findByRole("group", { name: "Unused" }, SLOW));
      expect(band.getByText("unused").tagName).toBe("CODE");
      expect(band.queryByText("used")).toBeNull();
      await waitFor(() => expect(node("two")).not.toBeNull(), SLOW);
      // the parameter both steps read sits on each one's Query parameter row (not yet given on a Procedure page)
      await waitFor(() => expect(within(node("one")).getByText("$params.used")).toBeInTheDocument(), SLOW);
      expect(within(node("two")).getByText("$params.used")).toBeInTheDocument();
      cleanup();

      for (const e of proof) e.parameters = { used: "a", unused: "kept" };
      renderApp("/i/inst_fixture/lines/kev-triage");
      const line = within(await (await graph()).findByRole("group", { name: "Unused" }, SLOW));
      expect(line.getByTitle("unused = kept")).toBeInTheDocument();
    } finally {
      KEV_TRIAGE_SPEC.steps = saved.steps;
      KEV_TRIAGE_SPEC.returns = saved.returns;
      if (saved.params === undefined) delete KEV_TRIAGE_SPEC.params;
      else KEV_TRIAGE_SPEC.params = saved.params;
      proof.forEach((e, i) => (e.parameters = before[i]!));
    }
  }, 30000);
});

describe("the Capture a step read, inferred", () => {
  const ran = (capturesOut?: string[]): StepMark => ({ term: term("step", "fired"), notes: [], hints: [], provider: null, ...(capturesOut ? { capturesOut } : {}) });
  const notRun: StepMark = { term: term("step", "not_run"), notes: [], hints: [], provider: null };
  const slot = { in: { name: "req", version: 1 }, out: { name: "res", version: 1 }, effect: "external_read" as const };
  const ref = (step: string, ...path: string[]) => ({ $ref: "step" as const, step, path });
  const spec = (captures: Record<string, string>, extract: unknown): ProcedureSpec =>
    ({
      procedure: "p",
      slots: { fetch: slot },
      steps: [
        { call: "pages", slot: "fetch", input: {}, captures },
        { extract: "rows", capture: extract, records: "/*", row: "r@1", key: { id: { at: "id" } }, fields: {} },
      ],
    }) as unknown as ProcedureSpec;

  it("names the one Capture of a call's only output that the step's reference reads", () => {
    const marks = new Map([["pages", ran(["sha256:b"])], ["rows", ran()]]);
    expect(inferredInput(spec({ body: "k.body" }, ref("pages", "body")), 1, marks)).toBe("sha256:b");
  });

  it("names nothing when the call has several outputs (body and headers): which digest is the body is not known", () => {
    const marks = new Map([["pages", ran(["sha256:b", "sha256:h"])], ["rows", ran()]]);
    expect(inferredInput(spec({ body: "k.body", headers: "k.headers" }, ref("pages", "body")), 1, marks)).toBeNull();
  });

  it("names nothing for a step the run did not run", () => {
    const marks = new Map([["pages", ran(["sha256:b"])], ["rows", notRun]]);
    expect(inferredInput(spec({ body: "k.body" }, ref("pages", "body")), 1, marks)).toBeNull();
  });

  it("names nothing for a call reading Captures from two predecessors", () => {
    const two = {
      procedure: "p",
      slots: { fetch: slot, merge: { ...slot, effect: "pure" as const } },
      steps: [
        { call: "a", slot: "fetch", input: {}, captures: { capture: "k.a" } },
        { call: "b", slot: "fetch", input: {}, captures: { capture: "k.b" } },
        { call: "both", slot: "merge", input: { left: ref("a", "capture"), right: ref("b", "capture") }, captures: { capture: "k.both" } },
      ],
    } as unknown as ProcedureSpec;
    const marks = new Map([["a", ran(["sha256:a"])], ["b", ran(["sha256:b"])], ["both", ran()]]);
    expect(inferredInput(two, 2, marks)).toBeNull();
  });
});
