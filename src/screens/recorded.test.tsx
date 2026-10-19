import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { RECORDED } from "@/fixtures/handlers";
import { renderApp } from "@/test/render";

/**
 * Every screen over the world recorded from the security kit 1.1.0 gate
 * (src/fixtures/recorded): real daemon responses must render. Edge cases the
 * gate world does not contain (refusals, contested slots, paging past the
 * first page) stay in the per-screen tests over the hand-authored world.
 */

afterEach(cleanup);

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const I = "/i/inst_fixture";
const JOB = "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test";
const REPO = "security.repo/github.com--cruxible-ai-cruxible";
const RUN = "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d";
const REVIEWED = "sha256:565afa1f991138f9d6370a401e3e1d6f87e5195ea8f7cfcbc515a70bdfe0b66d";

const main = async () => within(await screen.findByRole("main"));

describe("recorded gate world", () => {
  it("overview: kinds, next, health and kits", async () => {
    renderApp(I, RECORDED);
    const m = await main();
    expect(await m.findByText("security.assessment")).toBeInTheDocument();
    expect(m.getByText("19 kinds")).toBeInTheDocument();
    expect(await m.findByText("Line inbox unread")).toBeInTheDocument();
    expect(await m.findByText("security", { selector: "span.font-mono" })).toBeInTheDocument();
  });

  it("type map: a system-model kind with its owning kit and ClaimTypes", async () => {
    renderApp(`${I}/map?kind=security.job`, RECORDED);
    expect(await screen.findByText("Subject kind")).toBeInTheDocument();
    const panel = within(screen.getByText("Subject kind").closest("div.overflow-y-auto") as HTMLElement);
    expect(panel.getByText("security", { selector: "span.font-mono" })).toBeInTheDocument();
    expect(panel.getByText("uses")).toBeInTheDocument();
  });

  it("Subject page: a security.job with its fields, verdicts and admission", async () => {
    renderApp(`${I}/s/${encodeURIComponent(JOB)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("pkg:githubactions/actions/checkout@v4")).toBeInTheDocument();
    expect(m.getByText("6 fields · 7 Claims")).toBeInTheDocument();
    expect((await m.findAllByText("Supported")).length).toBeGreaterThan(0);
    expect(await m.findByText("2/2 admitted")).toBeInTheDocument();
  });

  it("neighborhood: a hub with its incoming column", async () => {
    renderApp(`${I}/s/${encodeURIComponent(REPO)}/graph`, RECORDED);
    expect(await screen.findByText(/18 Subjects · 17 links/)).toBeInTheDocument();
  });

  it("ledger: the generation timeline", async () => {
    renderApp(`${I}/ledger`, RECORDED);
    const m = await main();
    expect(await m.findByRole("link", { name: "g58" })).toHaveAttribute("href", `${I}?at=58`);
    expect(m.getByText("Verify the bundles before replacing a release asset.")).toBeInTheDocument();
    expect(m.getByText("50 on this page")).toBeInTheDocument();
  });

  it("next: rows rendered by reason", async () => {
    renderApp(`${I}/next`, RECORDED);
    const m = await main();
    expect(await m.findByText("23 new inbox items from Line:security.harden.")).toBeInTheDocument();
    expect(m.getAllByText("Evidence expiring")).toHaveLength(5);
  });

  it("Lines index and a Line page with paged runs, inbox and Procedure", async () => {
    renderApp(`${I}/lines`, RECORDED);
    let m = await main();
    expect(await m.findByText("17 Lines")).toBeInTheDocument();
    // the Line link (the Procedure of the same name links to its card)
    expect(m.getAllByRole("link", { name: "security.harden" })[0]).toHaveAttribute("href", `${I}/lines/security.harden`);
    cleanup();
    renderApp(`${I}/lines/security.harden`, RECORDED);
    m = await main();
    expect(await m.findByText("page 1 · 13 in all")).toBeInTheDocument();
    expect(await m.findByText(/Ask the five hardening questions/)).toBeInTheDocument();
    expect((await m.findAllByText("Unread")).length).toBeGreaterThan(0);
  });

  it("run page: a Line-triggered run", async () => {
    renderApp(`${I}/runs/${RUN}`, RECORDED);
    const m = await main();
    expect(await m.findByText("8 of 9 done")).toBeInTheDocument();
    expect(m.getByRole("link", { name: "security.cve-applicability" })).toHaveAttribute(
      "href",
      `${I}/lines/security.cve-applicability`,
    );
    expect(await m.findByText("This run read no Captures.")).toBeInTheDocument();
  });

  it("proposals and a review", async () => {
    renderApp(`${I}/proposals?status=settled`, RECORDED);
    expect(await screen.findByText("50 on this page")).toBeInTheDocument();
    cleanup();
    renderApp(`${I}/p/${encodeURIComponent(REVIEWED)}`, RECORDED);
    const m = await main();
    expect(await m.findByText("/artifact_format")).toBeInTheDocument();
  });
});
