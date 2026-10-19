import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
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

describe("Type map", () => {
  it("opens on ?kind= with identity, ClaimTypes, incoming links and sample Subjects", async () => {
    renderApp("/i/inst_fixture/map?kind=security.vulnerability");

    expect(await screen.findByRole("heading", { name: "Type map" })).toBeInTheDocument();
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    const panel = within(screen.getByText("Subject kind").closest("div.overflow-y-auto") as HTMLElement);
    expect(panel.getByText("security.vulnerability.cve_id")).toBeInTheDocument();
    expect(panel.getByText("kev_listed")).toBeInTheDocument();
    expect(panel.getByText("security.assessment")).toBeInTheDocument(); // pointed at by
    const sample = await panel.findByRole("link", { name: "cve-2024-3094" });
    expect(sample).toHaveAttribute("href", "/i/inst_fixture/ref/security.vulnerability%2Fcve-2024-3094");
  });

  it("opens on ?claim_type= with the ClaimType's evidence rules from its card", async () => {
    renderApp("/i/inst_fixture/map?claim_type=security.assessment.status");

    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    expect(await screen.findByText("osv-applicability")).toBeInTheDocument();
    expect(screen.getByText("stale after")).toBeInTheDocument();
    expect(screen.getByText(/affected, not_affected, under_investigation/)).toBeInTheDocument();
  });

  it("opens a Subject-valued ClaimType on its kind link", async () => {
    renderApp("/i/inst_fixture/map?claim_type=security.release.product");
    expect(await screen.findByText("Kind link")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "security.product" })[0]!);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
  });
});
