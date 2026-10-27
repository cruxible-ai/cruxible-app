import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

beforeAll(() => {
  // React Flow measures its pane; jsdom has no ResizeObserver.
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const graph = async () => within(await screen.findByTestId("procedure-graph"));
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;

describe("Procedure graph", () => {
  it("draws a Procedure's steps on its page; a click focuses the step's lineage and marks its row; Esc clears both", async () => {
    renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
    const g = await graph();
    await waitFor(() => expect(node("parse")).not.toBeNull());
    for (const id of ["catalog", "watched", "parse", "changed", "settle"]) expect(node(id)).not.toBeNull();
    // the guard's else halts under no id: the graph names it after the guard
    expect(node("changed.else")).not.toBeNull();
    expect(g.getByText("from cisa.kev.catalog")).toBeInTheDocument();
    expect(g.getByText("By fit: security-analysis-provider")).toBeInTheDocument();

    fireEvent.click(node("parse"));
    expect(await screen.findByRole("button", { name: "Clear: Focused on parse" })).toBeInTheDocument();
    expect(document.querySelector('[data-step="parse"]')).toHaveAttribute("aria-current", "step");
    // upstream and downstream stay lit; nothing here is off the lineage of parse
    expect(node("catalog").style.opacity).toBe("1");
    expect(node("settle").style.opacity).toBe("1");

    fireEvent.click(node("watched"));
    expect(await screen.findByRole("button", { name: "Clear: Focused on watched" })).toBeInTheDocument();
    expect(node("catalog").style.opacity).toBe("0.18"); // a sibling input, not watched's lineage

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("button", { name: /^Clear: Focused on/ })).toBeNull());
    expect(document.querySelector('[data-step="watched"]')).not.toHaveAttribute("aria-current");
  });

  it("wraps the graph in the Line: its Trigger, its max authority on the terminal, and a picked run's marks", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const g = await graph();
    await waitFor(() => expect(node("trigger:security.kev-daily")).not.toBeNull());
    expect(g.getByText("Daily at 06:00 UTC")).toBeInTheDocument();
    expect(within(node("settle")).getByText("Max authority Settle")).toBeInTheDocument();
    expect(within(node("parse")).getByText("Line binds security-analysis-provider")).toBeInTheDocument();

    const picker = await screen.findByRole("combobox", { name: "Mark the steps with a run" });
    await waitFor(() => expect(within(picker).getAllByRole("option").length).toBeGreaterThan(1));
    fireEvent.change(picker, { target: { value: "run-7" } });
    await waitFor(() => expect(within(node("changed")).getByText(/Refused · guard_refused/)).toBeInTheDocument());
    expect(node("changed").querySelector('[role="img"][aria-label^="Refused"]')).toHaveClass("bg-red-500"); // the red dot
    expect(within(node("catalog")).getByText(/Succeeded · read 1 Capture/)).toBeInTheDocument();
    expect(within(node("settle")).getByText(/Not run|delivered/)).toBeInTheDocument();
    expect(screen.getByText(/Each step marked with what happened in run/)).toBeInTheDocument();
  });
});
