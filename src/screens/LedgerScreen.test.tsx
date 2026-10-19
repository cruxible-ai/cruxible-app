import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

const ACCEPTED = "sha256:" + "6".repeat(64);
const OPEN = "sha256:" + "a".repeat(64);

describe("Ledger", () => {
  it("lists accepted proposals newest first and peeks a change set", async () => {
    renderApp("/i/inst_fixture/ledger");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("2 of 3 settled on this page")).toBeInTheDocument();
    expect(main.getByText(/Interim view/)).toBeInTheDocument();
    const links = main.getAllByRole("link", { name: /^sha256:/ });
    expect(links[0]).toHaveAttribute("href", `/i/inst_fixture/p/${encodeURIComponent(ACCEPTED)}`);
    fireEvent.click(main.getByRole("button", { name: `Expand ${ACCEPTED}` }));
    expect(await main.findByText("Vendor advisory says rel-1 never shipped the build.")).toBeInTheDocument();
    expect(main.getByRole("link", { name: /CLM-0+a3/ })).toBeInTheDocument();
  });
});

describe("Proposals and review", () => {
  it("lists open proposals", async () => {
    renderApp("/i/inst_fixture/proposals");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("link", { name: /^sha256:aaaa/ })).toHaveAttribute(
      "href",
      `/i/inst_fixture/p/${encodeURIComponent(OPEN)}`,
    );
  });

  it("renders a review read-only: deltas, governance, approvals, item reasons", async () => {
    renderApp(`/i/inst_fixture/p/${encodeURIComponent(ACCEPTED)}`);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("object.value")).toBeInTheDocument();
    expect(main.getByText("absent")).toBeInTheDocument();
    expect(main.getByText("independent-principal ×1")).toBeInTheDocument();
    expect(main.getByText("security-lead")).toBeInTheDocument();
    expect(main.getByText(/submitted by release-owner/)).toBeInTheDocument();
    expect(main.getByText(/needs a body-reading credential/)).toBeInTheDocument();
    expect(main.queryByRole("button", { name: /approve|activate|reject|withdraw|readmit/i })).toBeNull();
    cleanup();
    renderApp(`/i/inst_fixture/p/${encodeURIComponent(OPEN)}`);
    expect(await screen.findByText("OSV lists xz 5.6.0 and 5.6.1 as affected; rel-1 pins 5.6.1.")).toBeInTheDocument();
    expect(screen.getByText("lifecycle.state")).toBeInTheDocument();
  });
});
