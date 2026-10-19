import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

async function openPalette() {
  renderApp("/i/inst_fixture");
  await screen.findByRole("heading", { name: "Overview" });
  act(() => {
    window.dispatchEvent(new CustomEvent("cruxible:jump"));
  });
  return screen.getByRole("textbox", { name: "Reference" });
}

// Choosing a route navigates, which jsdom's AbortSignal cannot carry through
// react-router; the Playwright smoke covers navigation.
describe("Jump palette", () => {
  it("completes Subject kinds, then a kind's sample ids", async () => {
    const input = await openPalette();
    fireEvent.change(input, { target: { value: "vulner" } });
    const completion = await screen.findByRole("button", { name: /security\.vulnerability\/ .*Tab/ });
    fireEvent.click(completion);
    expect(input).toHaveValue("security.vulnerability/");
    expect(await screen.findByRole("button", { name: /security\.vulnerability\/cve-2023-4863/ })).toBeInTheDocument();
  });

  it("resolves a typed ref through one read, and says when state does not know it", async () => {
    const input = await openPalette();
    fireEvent.change(input, { target: { value: "security.vulnerability/cve-2024-3094" } });
    expect(await screen.findByRole("button", { name: /cve-2024-3094.*resolved/ })).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "security.vulnerability/cve-1999-0001" } });
    expect(await screen.findByText(/No accepted Subject security.vulnerability\/cve-1999-0001/)).toBeInTheDocument();
  });
});
