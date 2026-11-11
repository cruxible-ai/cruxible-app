import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { DOCS, PRIVATE_DOC } from "@/fixtures/authored/documents";
import { withOrient } from "@/test/fresh";

afterEach(cleanup);
beforeAll(() => {
  // jsdom has no object URLs; the download link only needs a string.
  URL.createObjectURL ??= () => "blob:document";
  URL.revokeObjectURL ??= () => undefined;
});

const docs = (doc?: string) => `/i/inst_fixture/docs${doc ? `?doc=${doc}` : ""}`;

describe("Docs", () => {
  it("is a sidebar tab, leads with the counts row and the find box, and lists every Document with kind, type and revision", async () => {
    renderApp(docs());
    expect(await screen.findByRole("link", { name: "Docs" })).toHaveAttribute("href", "/i/inst_fixture/docs");
    const main = within(screen.getByRole("main"));
    expect(await main.findByRole("heading", { name: "Docs" })).toBeInTheDocument();
    await main.findByRole("list", { name: "Documents" });
    expect(main.getByText(String(DOCS.length)).parentElement).toHaveTextContent(`${DOCS.length} Documents`);
    const list = within(main.getByRole("list", { name: "Documents" }));
    expect(list.getAllByRole("button")).toHaveLength(DOCS.length);
    const architecture = within(list.getByRole("button", { name: /Triage architecture/ }));
    expect(architecture.getByText("design")).toBeInTheDocument();
    expect(architecture.getByText("text/markdown")).toBeInTheDocument();
    expect(await architecture.findByText("rev 3")).toBeInTheDocument();

    // the find box filters by name, title, kind or media type
    fireEvent.change(main.getByRole("textbox", { name: /Find a Document/ }), { target: { value: "html" } });
    expect(list.getAllByRole("button").map((b) => b.querySelector("div")!.textContent)).toEqual(["Vendor advisory VSA-1"]);
    expect(main.getByText("1 match")).toBeInTheDocument();
  });

  it("opens the first authored Document, past the kit receipt listed before it", async () => {
    renderApp(docs());
    const main = within(await screen.findByRole("main"));
    const list = within(await main.findByRole("list", { name: "Documents" }));
    expect(list.getAllByRole("button")[0]).toHaveTextContent("Kit security 1.3.0");
    expect(list.getByRole("button", { name: /Triage architecture/ })).toHaveAttribute("aria-current", "true");
  });

  it("reads a kit receipt as tables of the paths it owns and carries, digests shortened with copy, the JSON behind a disclosure", async () => {
    renderApp(docs("kit-security"));
    const main = within(await screen.findByRole("main"));
    const owned = within(await main.findByRole("table", { name: "Owned artifacts" }));
    const row = within(owned.getByText("queries/security.kev_exposure.json").closest("tr")!);
    // installed and release differ here; each digest shortened, whole on hover, with copy
    expect(row.getByTitle("sha256:" + "b2".repeat(32))).toHaveTextContent(/^sha256:b2b2b2b2…$/);
    expect(row.getByRole("button", { name: `Copy sha256:${"a2".repeat(32)}` })).toBeInTheDocument();
    // no content digest: a dash
    expect(row.getByText("—")).toBeInTheDocument();
    expect(within(main.getByRole("table", { name: "Carried artifacts" })).getByText("capture-contracts/playbill.self-source-v1.json")).toBeInTheDocument();
    // the raw receipt only on request
    expect(main.queryByText(/"playbill-kit-receipt-v1"/)).toBeNull();
    fireEvent.click(main.getByRole("button", { name: /Receipt \(raw JSON\)/ }));
    expect(await main.findByText(/"tag": "playbill-kit-receipt-v1"/)).toBeInTheDocument();
  });

  it("renders markdown as prose, with cruxible refs as chips and a Raw toggle", async () => {
    renderApp(docs());
    const main = within(await screen.findByRole("main"));
    // the cards (revision, size) and the body arrive apart; read once both have
    expect(await main.findByText("Revision 3")).toBeInTheDocument();
    expect(await main.findByRole("link", { name: /Download/ })).toHaveAttribute("download", "architecture.md");
    expect(main.getByRole("heading", { name: "Triage architecture", level: 1 })).toBeInTheDocument();
    expect(main.getByText("Captures").tagName).toBe("STRONG");
    expect(main.getByRole("table")).toBeInTheDocument();
    // a cruxible:// ref in the body is a chip linking into the console
    expect(main.getByRole("link", { name: /kev-triage/ })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    fireEvent.click(main.getByRole("button", { name: "Raw" }));
    expect(main.getByText(/^# Triage architecture/)).toBeInTheDocument();
  });

  it("renders HTML only in a sandboxed frame, JSON pretty-printed, binary as a download", async () => {
    renderApp(docs("vendor-advisory"));
    const main = within(await screen.findByRole("main"));
    const frame = await main.findByTitle("Body of Vendor advisory VSA-1");
    expect(frame.tagName).toBe("IFRAME");
    expect(frame.getAttribute("sandbox")).toBe("");
    expect(frame.getAttribute("srcdoc")).toContain("Fixed in 2.4.1.");
    expect(frame.getAttribute("srcdoc")).not.toMatch(/<script|onload=/);
    expect(main.queryByRole("heading", { name: "Advisory VSA-1" })).toBeNull();
    cleanup();

    renderApp(docs("kev-thresholds"));
    expect(await screen.findByText(/"max_age_days": 30/)).toBeInTheDocument();
    cleanup();

    renderApp(docs("network-diagram"));
    const binary = within(await screen.findByRole("main"));
    expect(await binary.findByText("Binary (10 bytes): download it to open.")).toBeInTheDocument();
    expect(binary.getByRole("link", { name: /Download/ })).toHaveAttribute("download", "network-diagram.bin");
  });

  it("reads a body larger than one range in ranges and joins them, though each range alone is not UTF-8", async () => {
    renderApp(docs("release-log"));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(/^Showing the first 200,000 of 262,149 characters/)).toBeInTheDocument();
    expect(main.getByText("256 KB")).toBeInTheDocument();
  });

  it("says when the token can't read Document bodies, with the CLI read", async () => {
    renderApp(docs(PRIVATE_DOC));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("governed_write")).toBeInTheDocument();
    expect(main.getByRole("button", { name: "Why the body is not shown" })).toBeInTheDocument();
    expect(main.getByText(`cruxible get Document:${PRIVATE_DOC} --detail body`)).toBeInTheDocument();
  });

  it("hides the list for a wider reader, and steps between Documents while hidden", async () => {
    // jsdom here has no working localStorage: the toggle must work without it.
    renderApp(docs(DOCS[0]!.name));
    const main = within(await screen.findByRole("main"));
    await main.findByRole("list", { name: "Documents" });
    fireEvent.click(main.getByRole("button", { name: "Hide the Document list" }));
    expect(main.queryByRole("list", { name: "Documents" })).toBeNull();
    expect(main.getByText(`1 of ${DOCS.length}`)).toBeInTheDocument();
    expect(main.getByRole("button", { name: "Previous Document" })).toBeDisabled();
    fireEvent.click(main.getByRole("button", { name: "Next Document" }));
    expect(await main.findByText(`2 of ${DOCS.length}`)).toBeInTheDocument();
    fireEvent.click(main.getByRole("button", { name: "Show the Document list" }));
    expect(main.getByRole("list", { name: "Documents" })).toBeInTheDocument();
    expect(main.queryByRole("button", { name: "Next Document" })).toBeNull();
  });

  it("reads full window: linkable headings, Escape returns to the page", async () => {
    renderApp(docs());
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("heading", { name: "Triage architecture", level: 1 })).toHaveAttribute("id", "triage-architecture");
    fireEvent.click(main.getByRole("button", { name: "Read in the full window" }));
    const reader = within(await screen.findByRole("dialog", { name: /^Reading / }));
    expect(reader.getByRole("button", { name: "Exit full-window reading" })).toBeInTheDocument();
    expect(reader.getByRole("heading", { name: "Triage architecture", level: 1 })).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("says when the named Document is not at this generation", async () => {
    renderApp(docs("gone"));
    expect(await screen.findByText(/Not found:/)).toHaveTextContent("Not found: gone");
  });

  it("says there are no Documents on a fresh instance", async () => {
    renderApp(docs(), withOrient("documents", { documents: [] }));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("No Documents")).toBeInTheDocument();
    expect(main.queryByRole("list", { name: "Documents" })).toBeNull();
  });
});
