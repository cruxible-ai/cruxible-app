import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { READERS, READERS_WORLD } from "@/fixtures/readers";

afterEach(cleanup);

// React Flow draws edges only once it has measured the nodes: jsdom measures nothing, so measure from the
// nodes' own style (React Flow's testing recipe). Kept to this file: the other graph tests run unmeasured.
beforeAll(() => {
  globalThis.ResizeObserver = class {
    constructor(private readonly callback: ResizeObserverCallback) {}
    observe(target: Element) {
      const contentRect = { width: 1200, height: 600, x: 0, y: 0, top: 0, left: 0, right: 1200, bottom: 600 };
      this.callback([{ target, contentRect } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  (globalThis as { DOMMatrixReadOnly?: unknown }).DOMMatrixReadOnly ??= class {
    m22: number;
    constructor(transform?: string) {
      const scale = transform?.match(/scale\(([\d.]+)\)/)?.[1];
      this.m22 = scale !== undefined ? Number(scale) : 1;
    }
  };
  Object.defineProperties(HTMLElement.prototype, {
    offsetHeight: { configurable: true, get(this: HTMLElement) { return parseFloat(this.style.height) || 1; } },
    offsetWidth: { configurable: true, get(this: HTMLElement) { return parseFloat(this.style.width) || 1; } },
  });
});

const SLOW = { timeout: 8000 };
const graph = async () => within(await screen.findByTestId("procedure-graph", {}, SLOW));
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;

describe("Line dependencies around the step graph", () => {
  it("on a Line page, names who produces what its reads' Queries read in a band above the graph; a chip's toggle opens what it carries", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const g = await graph();
    // kev_exposure reads assessments and their status (cve-applicability creates and writes them) and what no Line writes
    const band = within(await g.findByRole("group", { name: "Reads from" }, SLOW));
    expect(band.getByText("Reads from")).toBeInTheDocument();
    expect(band.getByRole("link", { name: "cve-applicability" })).toHaveAttribute("href", "/i/inst_fixture/lines/cve-applicability");
    expect(band.getByText("Entered directly")).toBeInTheDocument();
    expect(band.getAllByRole("link")).toHaveLength(1); // entered directly links nowhere
    // the band sits above the canvas, and the producers are not graph nodes
    const canvas = document.querySelector('[data-testid="procedure-graph"] .react-flow')!;
    expect(band.getByText("Reads from").compareDocumentPosition(canvas) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(document.querySelector('[data-testid="procedure-graph"] .react-flow__node[data-id^="dep-"]')).toBeNull();
    // kev-triage writes nothing another Line's Query reads: no band below
    expect(g.queryByRole("group", { name: "Read by" })).toBeNull();

    fireEvent.click(band.getByRole("button", { name: "cve-applicability → kev-triage" }));
    const popover = within(await screen.findByRole("dialog", { name: "cve-applicability → kev-triage" }, SLOW));
    expect(popover.getByRole("link", { name: "kev_exposure" })).toBeInTheDocument();
    expect(popover.getByRole("link", { name: "assessment.status" })).toBeInTheDocument();
    expect(popover.getByRole("link", { name: "assessment" })).toBeInTheDocument();
    // the click opens the popover, not a graph focus
    expect(screen.queryByRole("button", { name: /^Clear: Focused on/ })).toBeNull();
    fireEvent.pointerDown(document.body);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    // a focused step dims the Lines that do not feed its lineage
    await waitFor(() => expect(node("catalog")).not.toBeNull(), SLOW);
    const chip = band.getByRole("link", { name: "cve-applicability" }).closest("[data-chip]")!;
    fireEvent.click(node("catalog"));
    await waitFor(() => expect(chip).toHaveClass("opacity-30"), SLOW);
    fireEvent.click(node("watched"));
    await waitFor(() => expect(chip).not.toHaveClass("opacity-30"), SLOW);
  });

  it("names the Lines whose Queries read what this Line writes in a Read by band under the graph, full names on hover", async () => {
    renderApp("/i/inst_fixture/lines/cve-applicability");
    const g = await graph();
    const band = within(await g.findByRole("group", { name: "Read by" }, SLOW));
    const reader = band.getByRole("link", { name: "kev-triage" });
    expect(reader).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    expect(within(reader).getByTitle("Line kev-triage")).toBeInTheDocument();
    // under the canvas
    const canvas = document.querySelector('[data-testid="procedure-graph"] .react-flow')!;
    expect(band.getByText("Read by").compareDocumentPosition(canvas) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
    // its own read-less Procedure has nothing upstream
    expect(g.queryByRole("group", { name: "Reads from" })).toBeNull();
    fireEvent.click(band.getByRole("button", { name: "cve-applicability → kev-triage" }));
    const popover = within(await screen.findByRole("dialog", { name: "cve-applicability → kev-triage" }, SLOW));
    expect(popover.getByRole("link", { name: "kev_exposure" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("lists every reading Line in the Read by band, long names that differ only at the end in full on hover, each with what it reads", async () => {
    renderApp("/i/inst_fixture/lines/cve-applicability", READERS_WORLD);
    const g = await graph();
    const band = within(await g.findByRole("group", { name: "Read by" }, SLOW));
    await waitFor(() => expect(band.getAllByRole("link")).toHaveLength(3), SLOW);
    for (const name of ["kev-triage", ...READERS]) {
      const reader = band.getByRole("link", { name });
      expect(reader).toHaveAttribute("href", `/i/inst_fixture/lines/${encodeURIComponent(name)}`);
      // the whole name on hover; it shortens from the start when the band is narrow, so the end that tells them apart stays
      const text = within(reader).getByTitle(`Line ${name}`);
      expect(text).toHaveStyle({ direction: "rtl" });
      expect(band.getByRole("button", { name: `cve-applicability → ${name}` })).toHaveTextContent("1 ClaimType");
    }
    fireEvent.click(band.getByRole("button", { name: `cve-applicability → ${READERS[1]}` }));
    const popover = within(await screen.findByRole("dialog", { name: `cve-applicability → ${READERS[1]}` }, SLOW));
    expect(popover.getByRole("link", { name: "kev_exposure" })).toBeInTheDocument();
  });
});
