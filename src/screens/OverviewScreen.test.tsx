import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

describe("Overview", () => {
  it("orients at the head: kinds with counts, Claims, next items and health", async () => {
    renderApp("/i/inst_fixture");

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByText("Generation")).toBeInTheDocument();

    const kind = main.getByRole("link", { name: "security.vulnerability" });
    expect(kind).toHaveAttribute("href", "/i/inst_fixture/kinds/security.vulnerability");

    // next: the conflicted assessment links to its Subject card.
    const subject = await main.findByRole("link", { name: "security.assessment/rel-1-cve-2024-3094" });
    expect(subject).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.assessment%2Frel-1-cve-2024-3094",
    );
    expect(main.getByText("Claims conflict")).toBeInTheDocument();
    expect(main.getByText("Line dispatch")).toBeInTheDocument();
    expect(await main.findByText("security.kev-catalog")).toBeInTheDocument();
  });

  it("keeps a ?at= pin on every link and names it in the picker", async () => {
    renderApp("/i/inst_fixture?at=42");

    const main = within(await screen.findByRole("main"));
    const kind = await main.findByRole("link", { name: "security.vulnerability" });
    expect(kind).toHaveAttribute("href", "/i/inst_fixture/kinds/security.vulnerability?at=42");
    // the picker names the pin and the head it is not following
    expect(await screen.findByRole("button", { name: /Generation 42 · pinned/ })).toBeInTheDocument();
    expect(screen.getByText("Head is 42")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to head" })).toBeInTheDocument();
  });

  it("lists recent generations in the generation box and says what is waiting to be accepted", async () => {
    renderApp("/i/inst_fixture");
    const box = within(await screen.findByLabelText("Generation"));
    // why the head has not moved: the proposal waiting for review, linked
    expect(await box.findByRole("link", { name: /1 proposal waiting for review/ })).toHaveAttribute(
      "href",
      "/i/inst_fixture/proposals?status=open",
    );
    fireEvent.click(await box.findByRole("button", { name: /Generation 42 · head/ }));
    const list = within(await screen.findByRole("listbox", { name: "Generations" }));
    expect(list.getByRole("option", { name: /^Head/ })).toBeInTheDocument();
    // newest first, each with when, who and how many changes (picking one pins it: the smoke covers that in a browser)
    const g42 = await list.findByRole("option", { name: /^g42/ });
    expect(g42).toHaveTextContent("1 change");
    expect(g42).toHaveTextContent("release-owner");
    expect(g42).toHaveTextContent("Vendor advisory says rel-1 never shipped the build.");
    expect(list.getByRole("textbox", { name: "Pin generation" })).toBeInTheDocument();
  });

  it("shows a refused pin instead of reading the head", async () => {
    renderApp("/i/inst_fixture?at=7");
    expect(await screen.findByText("at 7 refused")).toBeInTheDocument();
  });
});
