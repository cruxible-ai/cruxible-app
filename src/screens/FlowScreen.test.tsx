import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { TEMPLATE_WORLD } from "@/fixtures/template";
import { AUTHORITY_COLOR } from "@/lib/palette";

afterEach(cleanup);

const I = "/i/inst_fixture";

describe("Evidence flow", () => {
  it("shows its title and description while the model loads", async () => {
    renderApp(`${I}/flow`);
    expect(await screen.findByText("Loading…")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Evidence flow" })).toBeInTheDocument();
    expect(screen.getByText(/Where evidence comes from and what it turns into/)).toBeInTheDocument();
  });

  it("columns sources, the Lines that fetch them, and the ClaimTypes they write, each a link", async () => {
    renderApp(`${I}/flow`);
    const flow = within(await screen.findByTestId("flow", {}, { timeout: 8000 }));
    // three columns: Source, Line, What it produces (the first two words also label each card)
    expect(flow.getAllByText("Source").length).toBeGreaterThan(1);
    expect(flow.getAllByText("Line").length).toBeGreaterThan(1);
    expect(flow.getByText("What it produces")).toBeInTheDocument();
    // a source is named by where it comes from (the host its fetch names); its logical source id and who fetches it are on its name's hover
    const sourceName = flow.getByText("example.invalid");
    expect(sourceName).toHaveAttribute("title", expect.stringContaining("Logical source cisa.kev.catalog"));
    expect(sourceName).toHaveAttribute("title", expect.stringContaining("Fetched when an agent runs security.kev-acquire"));
    const source = sourceName.closest("[data-card]") as HTMLElement;
    expect(within(source).getByText("Fetched")).toBeInTheDocument();
    expect(within(source).getByText("When an agent runs it")).toBeInTheDocument();
    expect(within(source).getByText("Landed")).toBeInTheDocument();
    // with no host, the logical source names it
    expect(flow.getByText("osv.query")).toBeInTheDocument();
    // Lines in their own column, linked, with their kind, authority (on hover) and last run
    expect(flow.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    expect(flow.getByRole("link", { name: "kev-triage" })).toHaveAttribute("title", expect.stringContaining("At most settle"));
    const card = flow.getByRole("link", { name: "kev-triage" }).closest("[data-card]") as HTMLElement;
    expect(within(card).getByText("Last run")).toBeInTheDocument();
    // source cards and Line cards say which they are
    expect(within(source).getByText("Source")).toBeInTheDocument();
    expect(within(card).getByText("Line")).toBeInTheDocument();
    // ClaimTypes under their kind
    expect(flow.getByRole("link", { name: "security.vulnerability" })).toHaveAttribute("href", `${I}/kinds/security.vulnerability`);
    expect(flow.getByRole("link", { name: "kev_listed" })).toBeInTheDocument();
    // the legend names the neutral color for what no Line writes
    expect(screen.getByText("Written by people or agents")).toBeInTheDocument();
    expect(screen.queryByText("By hand")).toBeNull();
    // nothing pops over the graph on hover: no card, row or edge carries a hover bubble (only names do)
    for (const el of document.querySelectorAll('[data-testid="flow"] [data-card]')) expect(el).not.toHaveAttribute("title");
    expect(document.querySelector('[data-testid="flow"] svg title')).toBeNull();
    // no old columns
    expect(screen.queryByText("Lines that read them")).toBeNull();
    expect(screen.queryByText("Where it comes from")).toBeNull();
  });

  it("?focus= keeps one source's path, not its siblings, behind a separate focus control", async () => {
    renderApp(`${I}/flow?focus=${encodeURIComponent("source:cisa.kev.catalog")}`);
    const flow = within(await screen.findByTestId("flow", {}, { timeout: 8000 }));
    expect(flow.getByText("example.invalid")).toBeInTheDocument();
    // the Line that reads it stays
    expect(flow.getByRole("link", { name: "kev-triage" })).toBeInTheDocument();
    expect(flow.queryByText("osv.query")).toBeNull();
    expect(flow.queryByRole("link", { name: "cve-applicability" })).toBeNull();
    expect(screen.getByRole("button", { name: "Clear: Focused on example.invalid" })).toBeInTheDocument();
  });

  it("links a Line from the Line whose writes its Query reads; a click opens the Query and what it connects", async () => {
    renderApp(`${I}/flow`);
    await screen.findByTestId("flow", {}, { timeout: 8000 });
    // kev-triage's kev_exposure walks assessments and their status: cve-applicability creates and writes them
    const link = await screen.findByRole("button", { name: "Link cve-applicability → kev-triage" }, { timeout: 8000 });
    expect(link).toHaveAttribute("data-testid", "dependency-link");
    // the reader also reads what no Line writes: Entered directly links to it as well
    expect(screen.getByRole("button", { name: "Link Entered directly → kev-triage" })).toBeInTheDocument();
    // the producer sits above the reader
    const card = (name: string) => screen.getByRole("link", { name }).closest("[data-card]") as HTMLElement;
    expect(parseFloat(card("cve-applicability").style.top)).toBeLessThan(parseFloat(card("kev-triage").style.top));

    fireEvent.click(link);
    const popover = within(await screen.findByRole("dialog", { name: "cve-applicability → kev-triage" }));
    expect(popover.getByRole("link", { name: "kev_exposure" })).toHaveAttribute("href", `${I}/ref/${encodeURIComponent("query:security.kev_exposure")}`);
    expect(popover.getByRole("link", { name: "assessment.status" })).toHaveAttribute("title", "ClaimType security.assessment.status");
    expect(popover.getByText("Kinds")).toBeInTheDocument();
    expect(popover.getByRole("link", { name: "assessment" })).toBeInTheDocument();
    // what no Line writes stays off this link
    expect(popover.queryByText("vulnerability.kev_listed")).toBeNull();
    // Esc closes it (and leaves the page as it was)
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("draws two edge styles, both in the legend: evidence solid, a link that feeds a Line dashed with an arrow", async () => {
    renderApp(`${I}/flow`);
    const flow = await screen.findByTestId("flow", {}, { timeout: 8000 });
    await screen.findByRole("button", { name: "Link cve-applicability → kev-triage" }, { timeout: 8000 });
    expect(screen.getByText("Evidence")).toBeInTheDocument();
    expect(screen.getByText("Feeds a Line")).toBeInTheDocument();
    const paths = [...flow.querySelectorAll("svg path[d]")].filter((p) => p.getAttribute("stroke") !== "transparent" && !p.closest("marker"));
    const evidence = paths.filter((p) => !p.getAttribute("marker-end"));
    const feeds = paths.filter((p) => p.getAttribute("marker-end"));
    expect(evidence.length).toBeGreaterThan(0);
    expect(feeds.length).toBeGreaterThan(1); // Line → Line, and Entered directly → Line
    // one stroke for both; only the dash differs
    const style = (p: Element) => [p.getAttribute("stroke"), p.getAttribute("stroke-width"), p.getAttribute("stroke-opacity")].join(" ");
    expect(new Set([...evidence, ...feeds].map(style)).size).toBe(1);
    for (const p of evidence) expect(p).not.toHaveAttribute("stroke-dasharray");
    for (const p of feeds) expect(p).toHaveAttribute("stroke-dasharray", "4 3");
    // every feeding link runs in a lane (right-angled), Entered directly's too: no curves among them
    for (const p of feeds) expect(p.getAttribute("d")).not.toContain("C");
  });

  it("colors only what the legend names: Line stripes and ClaimType bars in the authority palette, other cards neutral", async () => {
    renderApp(`${I}/flow`, TEMPLATE_WORLD);
    const flow = await screen.findByTestId("flow", {}, { timeout: 8000 });
    await waitFor(() => expect(flow.querySelector('[data-card^="derive:"]')).not.toBeNull(), { timeout: 8000 });
    const legend = new Set(Object.values(AUTHORITY_COLOR).map((c) => c.toLowerCase()));
    const swatch = (el: HTMLElement) => el.style.borderLeftColor || el.style.borderLeft.split(" ").slice(2).join(" ");
    for (const el of flow.querySelectorAll<HTMLElement>("[data-card]")) {
      const color = swatch(el);
      if (color) expect(legend.has(hex(color))).toBe(true);
    }
    // a derive card carries no color of its own (it has no authority): its kind word is plain, like Source and Line
    // two derive columns still fit the content width of a 1440 px window (about 1,150 px)
    expect(parseFloat(flow.style.width)).toBeLessThanOrEqual(1150);
    const derive = flow.querySelector<HTMLElement>('[data-card^="derive:"]')!;
    expect(swatch(derive)).toBe("");
    expect(within(derive).getByText("Derive")).not.toHaveAttribute("style");
  });
});

/** A CSS color (`rgb(r, g, b)` or hex) as lowercase #rrggbb. */
function hex(color: string): string {
  const rgb = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(color);
  if (!rgb) return color.toLowerCase();
  return `#${rgb.slice(1, 4).map((n) => Number(n).toString(16).padStart(2, "0")).join("")}`;
}
