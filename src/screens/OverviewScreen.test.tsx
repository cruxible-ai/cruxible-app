import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { LARGE_HEAD, OVERVIEW_LARGE } from "@/fixtures/overview-large";
import { withOrient } from "@/test/fresh";

afterEach(cleanup);

const I = "/i/inst_fixture";
const section = async (name: string) => within((await screen.findByRole("heading", { name })).closest("section")!);

describe("Overview", () => {
  it("is its own page beside the Dashboard, in the nav, with no tables", async () => {
    renderApp(`${I}/overview`);
    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    const nav = within(screen.getByRole("navigation"));
    expect(nav.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", I);
    expect(nav.getByRole("link", { name: "Overview" })).toHaveAttribute("href", `${I}/overview`);
    expect(screen.getByText(/^A snapshot of this instance/)).toBeInTheDocument();
    await section("How it grew");
    expect(screen.queryAllByRole("table")).toHaveLength(0);
  });

  it("opens on the instance's size, each number linked to the view that lists it", async () => {
    renderApp(`${I}/overview`);
    const hero = within(await screen.findByRole("region", { name: "At a glance" }));
    const subjects = await hero.findByRole("link", { name: /^Subjects/ });
    expect(subjects).toHaveAttribute("href", `${I}/map`);
    await waitFor(() => expect(subjects).toHaveTextContent("138"));
    expect(hero.getByRole("link", { name: /^Beliefs/ })).toHaveTextContent("16");
    expect(hero.getByRole("link", { name: /^Beliefs/ })).toHaveAttribute("href", `${I}/next?preset=beliefs`);
    expect(hero.getByRole("link", { name: /^Lines/ })).toHaveAttribute("href", `${I}/lines`);
    expect(hero.getByRole("link", { name: /^Generations/ })).toHaveTextContent("42");
    expect(await hero.findByRole("link", { name: /^Sources/ })).toHaveAttribute("href", `${I}/flow`);
    // the instance, its kit and when it began (genesis on the generations page)
    expect(hero.getByText("inst_fixture")).toBeInTheDocument();
    expect(await hero.findByText("security")).toBeInTheDocument();
    expect(hero.getByText("0.3.0")).toBeInTheDocument();
    expect(hero.getByText("since")).toBeInTheDocument();
  });

  it("maps what it knows: a bubble per kind opens the kind, an arrow opens its ClaimType", async () => {
    renderApp(`${I}/overview`);
    const map = await section("What it knows");
    const bubble = await map.findByRole("link", { name: "security.vulnerability: 3 Subjects" });
    expect(bubble).toHaveAttribute("href", `${I}/kinds/security.vulnerability`);
    expect(map.getByRole("link", { name: "security.package: 130 Subjects" })).toBeInTheDocument();
    const arrow = map.getByRole("link", { name: /^security\.release\.product: release to product/ });
    expect(arrow).toHaveAttribute("href", `${I}/claim-types/security.release.product`);
    // hover detail is reachable by focus too
    fireEvent.focus(bubble);
    const tip = within(await map.findByRole("tooltip"));
    expect(tip.getByText("Subjects").nextSibling).toHaveTextContent("3");
  });

  it("draws where the evidence comes from: sources to Lines to kinds, each band and node linked", async () => {
    renderApp(`${I}/overview`);
    const flow = await section("Where it comes from");
    const source = await flow.findByRole("link", { name: /^Source cisa\.kev\.catalog/ });
    expect(source).toHaveAttribute("href", `${I}/flow?focus=${encodeURIComponent("source:cisa.kev.catalog")}`);
    expect(flow.getByRole("link", { name: /^Line kev-triage/ })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    // a band from a source opens the Line that reads it; a Line's band into a kind opens the Line
    expect(flow.getByRole("link", { name: "osv.query to cve-applicability: 2 Claims" })).toHaveAttribute("href", `${I}/lines/cve-applicability`);
    expect(flow.getByRole("link", { name: "cve-applicability to assessment: 2 Claims" })).toHaveAttribute("href", `${I}/lines/cve-applicability`);
    // a source no landing has reached yet still shows
    expect(flow.getByRole("link", { name: /^Source osv\.query/ })).toBeInTheDocument();
    // Claims no Line writes enter directly; their band opens the kind
    expect(flow.getByRole("link", { name: "Entered directly to product: 1 Claim" })).toHaveAttribute("href", `${I}/kinds/security.product`);
    expect(flow.getByText("Source last landed")).toBeInTheDocument();
  });

  it("shows how it stands: per kind by evidence rule, then every Claim by state, each segment linked", async () => {
    renderApp(`${I}/overview`);
    const stands = await section("How it stands");
    const captured = await stands.findByRole("link", { name: "security.assessment: 2 Claims, evidence Captured" });
    expect(captured).toHaveAttribute("href", `${I}/kinds/security.assessment?view=claim-types`);
    expect(stands.getByRole("link", { name: "Conflicted: 1 Claim" })).toHaveAttribute("href", `${I}/next?preset=beliefs&f.family=contested`);
    expect(stands.getByRole("link", { name: /Waiting for review/ })).toHaveAttribute("href", `${I}/proposals?status=open`);
    fireEvent.mouseEnter(captured);
    expect(within(await stands.findByRole("tooltip")).getByText("2 of 6")).toBeInTheDocument();
  });

  it("shows how it grew: live Claims at sampled generations, each opening the Overview as it stood then", async () => {
    renderApp(`${I}/overview`);
    const grew = await section("How it grew");
    expect(grew.getByText(/^g0–g42/)).toBeInTheDocument();
    const head = await grew.findByRole("link", { name: "Generation 42: 725 live Claims" });
    expect(head).toHaveAttribute("href", `${I}/overview?at=42`);
    // earlier generations land newest first, a few at a time; the oldest arrives last
    expect(await grew.findByRole("link", { name: "Generation 0: 0 live Claims" }, { timeout: 4000 })).toBeInTheDocument();
    expect(grew.getByText("g0–g42")).toBeInTheDocument();
  });

  it("scales to a larger instance: ten kinds, nine sources, eight Lines, run and kit marks", async () => {
    renderApp(`${I}/overview`, OVERVIEW_LARGE);
    const map = await section("What it knows");
    await waitFor(() => expect(map.getAllByRole("link", { name: /Subjects?$/ })).toHaveLength(10));
    const flow = await section("Where it comes from");
    await waitFor(() => expect(flow.getAllByRole("link", { name: /^Source / })).toHaveLength(9));
    expect(flow.getAllByRole("link", { name: /^Line / })).toHaveLength(8);
    // a stale source and one that never landed
    expect(flow.getByText("Older")).toBeInTheDocument();
    expect(flow.getByText("Never landed")).toBeInTheDocument();
    const grew = await section("How it grew");
    expect(grew.getByText(`g${LARGE_HEAD - 49}–g${LARGE_HEAD}`)).toBeInTheDocument();
    await waitFor(() => expect(grew.getAllByRole("link", { name: /^Generation \d+: \d+ live Claims?$/ })).toHaveLength(12));
    const run = grew.getAllByRole("link", { name: /: run of ops\./ })[0]!;
    expect(run.getAttribute("href")).toMatch(new RegExp(`^${I}/runs/RUN-`));
    expect(grew.getByRole("link", { name: `Generation ${LARGE_HEAD - 12}: Upgrade kit platform from 1.2.0 to 1.3.0` })).toBeInTheDocument();
    expect(screen.queryAllByRole("table")).toHaveLength(0);
  });

  it("says what is absent on a fresh instance: no kinds, Subjects or live Claims, and no growth chart", async () => {
    renderApp(`${I}/overview`, withOrient("claim_types", { claim_types: [] }, withOrient(null, { kinds: [], generation: 0 })));
    expect(await (await section("What it knows")).findByText("No kinds declared yet")).toBeInTheDocument();
    expect(await (await section("How it stands")).findByText("No Subjects yet")).toBeInTheDocument();
    const grew = await section("How it grew");
    expect(await grew.findByText("No live Claims yet")).toBeInTheDocument();
    expect(grew.queryByRole("link", { name: /^Generation \d+:/ })).toBeNull();
  });
});
