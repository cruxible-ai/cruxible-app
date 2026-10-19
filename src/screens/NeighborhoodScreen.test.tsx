import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const GRAPH = "/i/inst_fixture/s/security.assessment%2Frel-1-cve-2024-3094/graph";

describe("Neighborhood graph", () => {
  it("draws the outgoing depth-1 neighborhood with incoming counts as badges", async () => {
    renderApp(GRAPH);
    expect(await screen.findByText(/3 Subjects · 2 links · 3 reads/)).toBeInTheDocument();
    expect(screen.getByText("rel-1")).toBeInTheDocument();
    // a node's panel pages what points at it
    fireEvent.click(screen.getByText("cve-2024-3094"));
    expect(await screen.findByText("Incoming (2)")).toBeInTheDocument();
    expect(await screen.findByText("security.vulnerability.related")).toBeInTheDocument();
    // cve-2024-3094 names cve-2024-6387 beyond depth 1: shown as a hidden-outgoing badge
    expect(screen.getAllByText("+1→").length).toBeGreaterThan(0);
  });

  // (The depth toggle itself navigates; jsdom's AbortSignal trips react-router's
  // navigation, so the Playwright smoke clicks it and this test opens ?depth=2.)
  it("walks one more hop at depth 2", async () => {
    renderApp(`${GRAPH}?depth=2`);
    expect(await screen.findByText(/5 Subjects · 4 links · 4 reads/)).toBeInTheDocument();
    expect(screen.getByText("xz-utils")).toBeInTheDocument();
  });
});
