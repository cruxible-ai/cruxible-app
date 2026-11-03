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

// Generous waits: under load the graph's layout outlasts the 1 s defaults.
const SLOW = { timeout: 8000 };
const graph = async () => within(await screen.findByTestId("procedure-graph", {}, SLOW));
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;

describe("Procedure graph", () => {
  it("draws a Procedure's steps on its page; a click focuses the step's lineage and marks its row; Esc clears both", async () => {
    renderApp("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
    await graph();
    await waitFor(() => expect(node("entries")).not.toBeNull(), SLOW);
    // each step is a node with its id and kind
    const kinds = { catalog: "Call", watched: "Read", entries: "Extract", changed: "Guard", settle: "Claims" };
    for (const [id, kind] of Object.entries(kinds)) expect(within(node(id)).getByText(kind)).toBeInTheDocument();
    // the guard's else halts under no id: the graph names it after the guard
    expect(within(node("changed.else")).getByText("no_change")).toBeInTheDocument();
    expect(within(node("catalog")).getByText("security.kev-http-v1")).toBeInTheDocument();
    expect(within(node("catalog")).getByText("slot fetch")).toBeInTheDocument();

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

  it("wraps the graph in the Line: its Trigger, the build its slot binds, and a picked run's marks", async () => {
    renderApp("/i/inst_fixture/lines/kev-triage");
    const g = await graph();
    await waitFor(() => expect(node("trigger:security.kev-daily")).not.toBeNull(), SLOW);
    // a UTC schedule reads in the viewer's zone (the suite runs in America/New_York)
    expect(g.getByText(/^Daily at 1:00\s?AM EST$|^Daily at 2:00\s?AM EDT$/)).toBeInTheDocument();
    await waitFor(() => expect(within(node("catalog")).getByText("slot fetch → cruxible-provider-web")).toBeInTheDocument(), SLOW);

    const picker = await screen.findByRole("combobox", { name: "Mark the steps with a run" }, SLOW);
    await waitFor(() => expect(within(picker).getAllByRole("option").length).toBeGreaterThan(1), SLOW);
    fireEvent.change(picker, { target: { value: "run-7" } });
    await waitFor(() => expect(within(node("changed")).getByText(/Refused · guard_refused/)).toBeInTheDocument(), SLOW);
    expect(node("changed").querySelector('[role="img"][aria-label^="Refused"]')).toHaveClass("bg-red-500"); // the red dot
    expect(within(node("catalog")).getByText(/Succeeded · read 1 Capture/)).toBeInTheDocument();
    expect(within(node("settle")).getByText(/Not run|delivered/)).toBeInTheDocument();
    expect(screen.getByText(/Each step marked with what happened in run/)).toBeInTheDocument();
  });
});
