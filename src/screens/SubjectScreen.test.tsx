import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

const ASSESSMENT = "/i/inst_fixture/s/security.assessment%2Frel-1-cve-2024-3094";

describe("Subject page", () => {
  it("pages the Subjects pointing at this one", async () => {
    renderApp("/i/inst_fixture/s/security.vulnerability%2Fcve-2024-3094");
    expect(await screen.findByText("Pointed at by")).toBeInTheDocument();
    expect(await screen.findByText("security.assessment.vulnerability")).toBeInTheDocument();
  });

  it("shows the card: fields, values, Subject links, flags, verdicts and admission", async () => {
    renderApp(ASSESSMENT);
    expect(await screen.findByRole("heading", { name: "rel-1-cve-2024-3094" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(main.getByText("security.assessment")).toBeInTheDocument();
    // in the Claims table and again in the field history
    expect(main.getAllByRole("link", { name: "security.release/rel-1" })[0]).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.release%2Frel-1",
    );
    expect(main.getAllByText("Contested").length).toBeGreaterThan(0);
    expect(await main.findByText("1/1 admitted")).toBeInTheDocument();
    expect(main.getByRole("link", { name: /Neighborhood/ })).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.assessment%2Frel-1-cve-2024-3094/graph",
    );
  });

  it("expands a contested slot into both Claims with contenders, evidence, admission and revisions", async () => {
    renderApp(ASSESSMENT);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    expect(await screen.findByText("OSV lists the release's xz package within the affected range.")).toBeInTheDocument();
    expect(screen.getByText("Vendor advisory: the backdoored build was never shipped in rel-1.")).toBeInTheDocument();
    expect(screen.getAllByText("Contenders")).toHaveLength(2);
    expect(screen.getByText("security.osv-applicability-v1 v1")).toBeInTheDocument();
    expect(screen.getByText("Admission accounts")).toBeInTheDocument();
    expect(await screen.findAllByText("r2")).not.toHaveLength(0);
    // a revision's generation links back to this page pinned there
    const generation = screen.getAllByRole("link", { name: "g40" })[0]!;
    expect(generation.getAttribute("href")).toContain("?at=40");
  });

  it("pages the field history", async () => {
    renderApp(ASSESSMENT);
    expect(await screen.findByText("Vendor advisory says rel-1 never shipped the build.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Older →" }));
    expect(await screen.findByRole("button", { name: "← Newer" })).toBeInTheDocument();
    expect(screen.queryByText("Vendor advisory says rel-1 never shipped the build.")).toBeNull();
  });

  it("says plainly when the Subject does not exist at this generation", async () => {
    renderApp("/i/inst_fixture/s/security.vulnerability%2Fcve-1999-0001");
    expect(await screen.findByText(/No accepted Subject security.vulnerability\/cve-1999-0001/)).toBeInTheDocument();
  });
});
