import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

describe("Kind page", () => {
  it("shows identity, kit and every ClaimType with value, cardinality, role, evidence, freshness and settler", async () => {
    renderApp("/i/inst_fixture/kinds/security.assessment");
    expect(await screen.findByRole("heading", { name: "security.assessment" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByText("Whether one release is affected by one CVE: one per pair.")).toBeInTheDocument();
    expect(main.getByText("release_id")).toBeInTheDocument();
    expect(main.getByText("(unique)")).toBeInTheDocument();
    const status = within(main.getByText("status", { selector: "td" }).closest("tr")!);
    expect(status.getByText("enum")).toBeInTheDocument();
    expect(status.getByText("captured")).toBeInTheDocument();
    expect(status.getByRole("link", { name: "security.osv-applicability-v1" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/contracts/security.osv-applicability-v1",
    );
    expect(status.getByText("7d")).toBeInTheDocument();
    // the kev-settle Mandate scopes security.assessment.status; kev-triage settles under it
    expect(await status.findByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    // K5 columns wait on core; K2 columns are post-v1
    expect(status.getAllByText("K5")).toHaveLength(2);
    expect(status.getAllByText("K1")).toHaveLength(2);
    expect(status.getAllByText("—").length).toBeGreaterThanOrEqual(2);
    const release = within(main.getByText("release", { selector: "td" }).closest("tr")!);
    expect(release.getByRole("link", { name: "→ security.release" })).toHaveAttribute("href", "/i/inst_fixture/kinds/security.release");
    expect(release.getByText("review")).toBeInTheDocument();
  });

  it("opens ?claim_type= expanded with its evidence rules", async () => {
    renderApp("/i/inst_fixture/kinds/security.assessment?claim_type=security.assessment.status");
    expect(await screen.findByText("osv-applicability")).toBeInTheDocument();
    expect(screen.getByText(/a Capture under one of these contracts is required/)).toBeInTheDocument();
    expect(screen.getByText(/settles under security.kev-settle/)).toBeInTheDocument();
  });

  it("lists what points at the kind", async () => {
    renderApp("/i/inst_fixture/kinds/security.vulnerability");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("link", { name: "security.assessment.vulnerability" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/kinds/security.assessment?claim_type=security.assessment.vulnerability",
    );
    fireEvent.click(main.getByRole("button", { name: "Expand kev_listed" }));
    expect(await main.findByText(/the author's own words|a Capture under one of these/)).toBeInTheDocument();
  });
});
