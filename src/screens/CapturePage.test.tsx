import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { ADVISORY, CITING_CLAIM, FETCHED, PRIVATE, RUNBOOK } from "@/fixtures/authored/captures";

afterEach(cleanup);
beforeAll(() => {
  // jsdom has no object URLs; the download link only needs a string.
  URL.createObjectURL ??= () => "blob:capture";
  URL.revokeObjectURL ??= () => undefined;
});

const page = (digest: string) => `/i/inst_fixture/ref/${encodeURIComponent(`Capture:${digest}`)}`;

describe("Capture page", () => {
  it("leads with the handle, source and time, and shows the fetched body unwrapped with a download", async () => {
    renderApp(page(FETCHED));
    expect(await screen.findByRole("heading", { name: `CAP-${FETCHED.slice(7, 19)}` })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(main.getByText("cisa.kev.catalog")).toBeInTheDocument();
    // the response the server sent, pretty-printed, not core's wrapper
    expect(await main.findByText(/"title": "CISA Catalog of Known Exploited Vulnerabilities"/)).toBeInTheDocument();
    expect(main.queryByText(/body_base64/)).not.toBeInTheDocument();
    expect(main.getByRole("link", { name: "https://www.cisa.gov/kev.json" })).toBeInTheDocument();
    expect(main.getByRole("link", { name: /Download/ })).toHaveAttribute("download", "cisa.kev.catalog.json");
    // the SDK call the card names as next is not shown
    expect(main.queryByText(/client\.read_capture/)).not.toBeInTheDocument();
  });

  it("shows the card's sample of citing Claims, what each says, and how many cite it in all", async () => {
    renderApp(page(FETCHED));
    const cited = within((await screen.findByText("Cited by")).closest("section")!);
    expect(await cited.findByText("security.vulnerability.kev_listed")).toBeInTheDocument();
    expect(cited.getByRole("link", { name: "security.vulnerability/cve-2024-3094" })).toBeInTheDocument();
    expect(cited.getByText("A sample of 1 of the 12 Claims that cite it")).toBeInTheDocument();
    expect(cited.getByRole("link", { name: new RegExp(CITING_CLAIM.slice(0, 10)) })).toBeInTheDocument();
    // the bare card is gone: its fields are the header, Contents and Cited by
    expect(screen.queryByText("Card")).not.toBeInTheDocument();
  });

  it("says when the token can't read bodies and gives the CLI read", async () => {
    renderApp(page(PRIVATE));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(/can't read Capture contents: that takes governed_write/)).toBeInTheDocument();
    expect(main.getByText(`cruxible capture read CAP-${PRIVATE.slice(7, 19)}`)).toBeInTheDocument();
  });

  it("renders a markdown file as prose, with a Raw toggle back to the text and the download kept", async () => {
    renderApp(page(RUNBOOK));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("heading", { name: "Triage runbook" })).toBeInTheDocument();
    expect(main.getByText("vendor advisory").tagName).toBe("STRONG");
    expect(main.getByRole("button", { name: "Markdown" })).toHaveAttribute("aria-pressed", "true");
    expect(main.getByRole("link", { name: /Download/ })).toHaveAttribute("download", "repo.docs.triage-runbook.md");
    fireEvent.click(main.getByRole("button", { name: "Raw" }));
    expect(main.getByText(/# Triage runbook/)).toBeInTheDocument();
    expect(main.queryByRole("heading", { name: "Triage runbook" })).toBeNull();
  });

  it("renders fetched HTML only inside a sandboxed frame that runs nothing", async () => {
    renderApp(page(ADVISORY));
    const main = within(await screen.findByRole("main"));
    const frame = (await main.findByTitle(`Contents of CAP-${ADVISORY.slice(7, 19)}`)) as HTMLIFrameElement;
    expect(frame.tagName).toBe("IFRAME");
    expect(frame.getAttribute("sandbox")).toBe("");
    const srcDoc = frame.getAttribute("srcdoc")!;
    expect(srcDoc).toContain("Fixed in 2.4.1.");
    expect(srcDoc).toContain("Content-Security-Policy");
    expect(srcDoc).not.toContain("<script");
    // never in the page's own DOM
    expect(main.queryByRole("heading", { name: "VSA-1" })).toBeNull();
    expect(main.getByRole("link", { name: /Download/ })).toHaveAttribute("download", "vendor.advisories.html");
    fireEvent.click(main.getByRole("button", { name: "Raw" }));
    expect(main.queryByTitle(`Contents of CAP-${ADVISORY.slice(7, 19)}`)).toBeNull();
    expect(main.getByText(/<h1>VSA-1<\/h1>/)).toBeInTheDocument();
  });
});
