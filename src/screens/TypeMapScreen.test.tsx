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
    expect(panel.getByText("security.assessment")).toBeInTheDocument(); // pointed at by
  });

  it("opens a Subject-valued ClaimType on its kind link", async () => {
    renderApp("/i/inst_fixture/map?claim_type=security.release.product");
    expect(await screen.findByText("Kind link")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "security.product" })[0]!);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
  });
});
