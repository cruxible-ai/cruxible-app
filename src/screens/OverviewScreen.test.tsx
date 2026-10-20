import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

describe("Overview", () => {
  it("orients at the head: kinds with counts, Claims, next items and health", async () => {
    renderApp("/i/inst_fixture");

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByText("generation")).toBeInTheDocument();

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
    expect(await screen.findByText(/pinned \(head 42\)/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to head" })).toBeInTheDocument();
  });

  it("shows a refused pin instead of reading the head", async () => {
    renderApp("/i/inst_fixture?at=7");
    expect(await screen.findByText("at 7 refused")).toBeInTheDocument();
  });
});
