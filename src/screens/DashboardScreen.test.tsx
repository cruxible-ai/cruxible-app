import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

describe("Dashboard", () => {
  it("leads with what needs you, then what each enabled Line waits for", async () => {
    renderApp("/i/inst_fixture");

    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByText("Generation")).toBeInTheDocument();

    // the needs-you strip: each tile links to where it is acted on
    const strip = within(main.getByRole("region", { name: "Needs you" }));
    expect(strip.getByRole("link", { name: /Waiting for review/ })).toHaveAttribute("href", "/i/inst_fixture/proposals?status=open");
    expect(await strip.findByRole("link", { name: /Next \d/ })).toHaveAttribute("href", "/i/inst_fixture/next");
    // a stopped Line and unread inbox items are waiting on you (amber)
    expect(strip.getByRole("link", { name: /^Waiting on you Lines 1 running 0 stalled · 1 stopped/ })).toHaveAttribute("href", "/i/inst_fixture/lines");
    expect(strip.getByRole("link", { name: /^Waiting on you Unread inbox 3/ })).toBeInTheDocument();

    // coming up: each enabled Line, with what wakes it and what it is waiting on; a stopped one says so
    const coming = within((await main.findByRole("heading", { name: "Coming up" })).closest("section")!);
    const line = await coming.findByRole("link", { name: "kev-triage" });
    expect(line).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    expect(await coming.findByText("Daily at 06:00 UTC")).toBeInTheDocument();
    expect(coming.getByText(/1 scheduled/)).toBeInTheDocument();
    expect(coming.getByRole("link", { name: "cve-applicability" })).toBeInTheDocument();
    expect(coming.getByText("Stopped")).toBeInTheDocument();

    // health is always on the page; its tile jumps to it
    expect(await main.findByText("Line dispatch")).toBeInTheDocument();
    fireEvent.click(await strip.findByRole("button", { name: /Health/ }));
    expect(await main.findByText("security.kev-catalog")).toBeInTheDocument();
  });

  it("shows what happened, newest first: a run's start folds into its finish, refusals are red, older pages load on request", async () => {
    renderApp("/i/inst_fixture");
    const feed = within(await screen.findByRole("feed", { name: "Activity" }));
    expect(await feed.findByRole("link", { name: "Generation 42" })).toHaveAttribute("href", "/i/inst_fixture?at=42");
    expect(feed.getByText(/accepted · 1 change · proposed by release-owner/)).toBeInTheDocument();
    expect(feed.getByText("Vendor advisory says rel-1 never shipped the build.")).toBeInTheDocument();
    // one row for the run that started and finished on this page
    expect(feed.getAllByText("ran · succeeded")).toHaveLength(1);
    expect(feed.queryByText("started a run")).toBeNull();
    expect(feed.getByText("landed evidence from cisa.kev.catalog")).toBeInTheDocument();
    expect(feed.getByText("posted to the inbox")).toBeInTheDocument();
    const refused = feed.getByText("ran · refused").parentElement!;
    expect(within(refused).getByRole("img", { name: "Wrong or blocked" })).toBeInTheDocument();
    expect(feed.getByText("armed → stopped")).toBeInTheDocument();
    fireEvent.click(feed.getByRole("button", { name: "Show older activity" }));
    expect(await feed.findByText("let due work lapse")).toBeInTheDocument();
    expect(feed.queryByRole("button", { name: "Show older activity" })).toBeNull();
  });

  it("keeps a ?at= pin on every link and names it in the picker", async () => {
    renderApp("/i/inst_fixture?at=42");

    const main = within(await screen.findByRole("main"));
    const line = await main.findByRole("link", { name: "kev-triage" });
    expect(line.getAttribute("href")).toMatch(/^\/i\/inst_fixture\/lines\/[^?]*kev-triage\?at=42$/);
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
    expect(await screen.findByText("At 7 refused")).toBeInTheDocument();
  });
});
