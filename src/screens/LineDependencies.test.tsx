import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

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
const edge = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__edge[data-id="${id}"]`) as SVGGElement | null;

describe("Line dependencies on the step graph", () => {
  it("on a Line page, names who produces what each read's Query reads, left of the read; a click on its edge opens what it carries", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    await graph();
    // kev_exposure reads assessments and their status (cve-applicability creates and writes them) and what no Line writes
    await waitFor(() => expect(node("dep-up:watched:cve-applicability")).not.toBeNull(), SLOW);
    expect(within(node("dep-up:watched:cve-applicability")).getByText("cve-applicability").closest("a")).toHaveAttribute("href", "/i/inst_fixture/lines/cve-applicability");
    expect(within(node("dep-up:watched:")).getByText("Entered directly")).toBeInTheDocument();
    expect(node("dep-up:watched:").querySelector("a")).toBeNull();
    // left of the read
    const x = (id: string) => Number(/translate\(([-\d.]+)px/.exec(node(id).style.transform)?.[1]);
    expect(x("dep-up:watched:cve-applicability")).toBeLessThan(x("watched"));
    // kev-triage writes nothing another Line's Query reads: no downstream chips
    expect(document.querySelector('[data-testid="procedure-graph"] .react-flow__node[data-id^="dep-down:"]')).toBeNull();

    await waitFor(() => expect(edge("dep:dep-up:watched:cve-applicability")).not.toBeNull(), SLOW);
    // unlabeled
    expect(document.querySelector('[data-testid="procedure-graph"] .react-flow__edgelabel-renderer')?.textContent ?? "").not.toContain("cve-applicability");
    fireEvent.click(edge("dep:dep-up:watched:cve-applicability")!);
    const popover = within(await screen.findByRole("dialog", { name: "cve-applicability → kev-triage" }, SLOW));
    expect(popover.getByRole("link", { name: "kev_exposure" })).toBeInTheDocument();
    expect(popover.getByRole("link", { name: "assessment.status" })).toBeInTheDocument();
    expect(popover.getByRole("link", { name: "assessment" })).toBeInTheDocument();
    // the click opens the popover, not an edge focus
    expect(screen.queryByRole("button", { name: /^Clear: Focused on/ })).toBeNull();
    fireEvent.pointerDown(document.body);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("names the Lines whose Queries read what this Line writes, right of its claims step", async () => {
    renderApp("/i/inst_fixture/lines/cve-applicability");
    await graph();
    await waitFor(() => expect(node("dep-down:kev-triage")).not.toBeNull(), SLOW);
    expect(within(node("dep-down:kev-triage")).getByText("kev-triage").closest("a")).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    const x = (id: string) => Number(/translate\(([-\d.]+)px/.exec(node(id).style.transform)?.[1]);
    expect(x("dep-down:kev-triage")).toBeGreaterThan(x("propose"));
    // its own read-less Procedure has nothing upstream
    expect(document.querySelector('[data-testid="procedure-graph"] .react-flow__node[data-id^="dep-up:"]')).toBeNull();
    await waitFor(() => expect(edge("dep:propose:dep-down:kev-triage")).not.toBeNull(), SLOW);
    fireEvent.click(edge("dep:propose:dep-down:kev-triage")!);
    const popover = within(await screen.findByRole("dialog", { name: "cve-applicability → kev-triage" }, SLOW));
    expect(popover.getByRole("link", { name: "kev_exposure" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
