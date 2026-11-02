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
  it("opens on ?kind= with identity, kit, ClaimType links into the kind page and incoming kinds", async () => {
    renderApp("/i/inst_fixture/map?kind=security.vulnerability");

    expect(await screen.findByRole("heading", { name: "Type map" })).toBeInTheDocument();
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    const panel = within(screen.getByText("Subject kind").closest("div.overflow-y-auto") as HTMLElement);
    expect(panel.getByRole("link", { name: "Open kind page →" })).toHaveAttribute("href", "/i/inst_fixture/kinds/security.vulnerability");
    expect(panel.getByRole("link", { name: /kev_listed/ })).toHaveAttribute(
      "href",
      "/i/inst_fixture/kinds/security.vulnerability?claim_type=security.vulnerability.kev_listed",
    );
    expect(panel.getByRole("link", { name: "security.kev-http-v1" })).toHaveAttribute("href", "/i/inst_fixture/contracts/security.kev-http-v1");
    expect(panel.getByText("security", { selector: "span.font-mono" })).toBeInTheDocument(); // owning kit
    expect(panel.getByText("assessment")).toBeInTheDocument(); // pointed at by (namespace dropped)
  });

  it("toggles to only kinds that hold Subjects, linkable from the URL", async () => {
    renderApp("/i/inst_fixture/map");
    const toggle = await screen.findByRole("button", { name: "Only kinds with Subjects" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle);
    expect(await screen.findByRole("button", { name: "Only kinds with Subjects", pressed: true })).toBeInTheDocument();
    // every fixture kind holds Subjects, so nothing drops and the count reads as all kinds
    expect(screen.queryByText(/^of \d+ kinds$/)).toBeNull();
    cleanup();
    renderApp("/i/inst_fixture/map?populated=1");
    expect(await screen.findByRole("button", { name: "Only kinds with Subjects", pressed: true })).toBeInTheDocument();
  });

  it("names the focus in a chip at the top of the graph; the chip and Esc clear it", async () => {
    renderApp("/i/inst_fixture/map?kind=security.vulnerability");
    const chip = await screen.findByRole("button", { name: "Clear: Focused on vulnerability" });
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    fireEvent.click(chip);
    expect(screen.queryByText("Subject kind")).toBeNull();
    cleanup();
    renderApp("/i/inst_fixture/map?kind=security.vulnerability");
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByText("Subject kind")).toBeNull();
    expect(screen.queryByRole("button", { name: /^Clear: Focused on/ })).toBeNull();
  });

  it("opens a Subject-valued ClaimType on its kind link", async () => {
    renderApp("/i/inst_fixture/map?claim_type=security.release.product");
    expect(await screen.findByText("Kind link")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "product" })[0]!);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
  });
});
