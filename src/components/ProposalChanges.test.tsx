import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import type { Schemas } from "@/api/schemas";
import { BELIEF_MEMBERS, PROCEDURE_MEMBER } from "@/fixtures/authored/proposal-diff";
import { reviewSummary } from "@/fixtures/review-summary";
import { definitionGroups, ProposalChanges, SummaryChanges, summaryHasBeliefs, summaryKinds, unreadableChanges } from "./ProposalChanges";

afterEach(cleanup);

type Member = Schemas["ReviewedMember"];
type Review = Schemas["ProposalReview"];

const DIGEST = "8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec";

/** A definition member as core serves it: the stored artifact, no Statement. */
function member(artifactKind: string, path: string, artifact: Record<string, unknown>, disposition = "create"): Member {
  return {
    path,
    artifact_kind: artifactKind,
    disposition,
    closure_role: "authored",
    predecessor_artifact_digest: disposition === "create" ? null : "sha256:" + "1".repeat(64),
    candidate_artifact_digest: "sha256:" + "2".repeat(64),
    base_semantic_artifact: disposition === "create" ? null : artifact,
    candidate_semantic_artifact: artifact,
    semantic_delta: [],
    law_identifier: "playbill.definition.v1",
    law_digest: "sha256:" + "9".repeat(64),
    law_evidence: {},
    dependency_proof_refs: [],
  };
}

/** Most definitions: `identity: {kind, name}`. */
const definition = (kind: string, name: string, artifactKind: string, disposition = "create") =>
  member(artifactKind, `${artifactKind}s/${name}.json`, { artifact_format: `playbill-${artifactKind}-v1`, identity: { kind, name } }, disposition);
/** A Contract as core stores it: no identity, a name and a version. */
const contract = (name: string, version: number) =>
  member("contract", `contracts/${name}/v${version}.json`, { artifact_format: "cruxible-contract-v1", description: "A request.", fields: [], name, version });

const CONTRACT = contract("osv.match.request", 1);
const PROVIDER = definition("Provider", `web-provider/${DIGEST}`, "provider");
const CLAIM_TYPE = definition("ClaimType", "security.finding/verdict", "claim-type");
/** A Document as core stores it: its identity a typed ref string. */
const DOCUMENT = member("document", "documents/kit-security.json", { artifact_format: "cruxible-document-v1", identity: "document:kit-security", kind: "document", title: "Kit security 1.3.0" });

const review = (members: Member[]): Review => ({ proposal_id: "sha256:" + "d1".repeat(32), members }) as unknown as Review;

function renderChanges(members: Member[], limit?: number) {
  return renderAt(<ProposalChanges review={review(members)} {...(limit !== undefined ? { limit } : {})} />);
}

function renderAt(element: React.ReactNode) {
  const router = createMemoryRouter([{ path: "/i/:instanceId", element }], { initialEntries: ["/i/inst_fixture"] });
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <DataSourceProvider client={createApiClient({ baseUrl: "https://fixtures.example" })}>
        <RouterProvider router={router} />
      </DataSourceProvider>
    </QueryClientProvider>,
  );
}

describe("ProposalChanges definitions", () => {
  it("lists a definition-only change set grouped by kind, each name linked to its page", () => {
    renderChanges([PROVIDER, CLAIM_TYPE, CONTRACT, PROCEDURE_MEMBER]);
    const groups = screen.getAllByRole("group").map((g) => g.getAttribute("aria-label"));
    expect(groups).toEqual(["ClaimType", "Contract", "Procedure", "Provider"]);
    const contract = within(screen.getByRole("group", { name: "Contract" }));
    expect(contract.getByRole("link", { name: "osv.match.request/v1" })).toHaveAttribute("href");
    expect(contract.getByRole("img", { name: "Created" })).toBeInTheDocument();
    // a revised Procedure reads as a revision
    expect(within(screen.getByRole("group", { name: "Procedure" })).getByRole("img", { name: "Revised" })).toBeInTheDocument();
    // a digest-named provider reads short, whole on hover
    const provider = screen.getByText(`web-provider/${DIGEST.slice(0, 12)}…`);
    expect(provider).toHaveAttribute("title", `web-provider/${DIGEST}`);
    expect(screen.queryByText(/more on the proposal page/)).toBeNull();
  });

  it("names Contracts by name and version and Documents by their identity ref, as core stores them", () => {
    renderChanges([CONTRACT, DOCUMENT]);
    expect(within(screen.getByRole("group", { name: "Contract" })).getByRole("link", { name: "osv.match.request/v1" })).toHaveAttribute(
      "href",
      `/i/inst_fixture/ref/${encodeURIComponent("Contract:osv.match.request/v1")}`,
    );
    expect(within(screen.getByRole("group", { name: "Document" })).getByRole("link", { name: "kit-security" })).toHaveAttribute("href");
    expect(unreadableChanges([CONTRACT, DOCUMENT])).toEqual([]);
  });

  it("shows Claims and definitions together", () => {
    renderChanges([PROCEDURE_MEMBER, ...BELIEF_MEMBERS]);
    expect(screen.getByRole("group", { name: "Procedure" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "security.vulnerability/cve-2024-0001" }).length).toBeGreaterThan(0);
    expect(screen.getAllByText("kev_listed").length).toBeGreaterThan(0);
  });

  it("caps definitions apart from Claims and counts the rest", () => {
    const many = Array.from({ length: 5 }, (_, i) => contract(`c${i}`, 1));
    renderChanges([...many, CLAIM_TYPE, ...BELIEF_MEMBERS], 3);
    // three definitions shown (by kind, then name), Claims still shown under the same cap
    expect(screen.getByRole("group", { name: "ClaimType" })).toBeInTheDocument();
    expect(within(screen.getByRole("group", { name: "Contract" })).getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("(5)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^\+\d+ more on the proposal page/ })).toBeInTheDocument();
  });

  it("leaves a definition without a served, named artifact to the unreadable list", () => {
    const withheld: Member = { ...CONTRACT, path: "contracts/withheld.json", base_semantic_artifact: null, candidate_semantic_artifact: null };
    const unnamed: Member = { ...CONTRACT, path: "contracts/unnamed.json", candidate_semantic_artifact: { artifact_format: "x" } };
    expect(definitionGroups([withheld, unnamed])).toEqual([]);
    expect(unreadableChanges([withheld, unnamed, CONTRACT]).map((u) => u.path)).toEqual(["contracts/withheld.json", "contracts/unnamed.json"]);
  });
});

describe("SummaryChanges: definitions from the review's summary form", () => {
  const ID = "sha256:" + "d1".repeat(32);

  it("names each row from the group's shared fields and its own, by kind, as the detailed read does", () => {
    // two Contracts share their version and format (said once on the group); a lone Document's row carries nothing of its own
    const summary = reviewSummary(ID, [CONTRACT, contract("osv.query.request", 1), DOCUMENT, PROVIDER]);
    expect(summary.groups.find((g) => g.artifact_kind === "contract")!.shared_fields["after.version"]).toEqual({ value: 1 });
    expect(summary.groups.find((g) => g.artifact_kind === "document")!.rows[0]!.after).toEqual({});
    expect(summaryHasBeliefs(summary)).toBe(false);
    expect(summaryKinds(summary).map((k) => [k.type, k.total, k.rows.map((r) => r.name)])).toEqual([
      ["Contract", 2, ["osv.match.request/v1", "osv.query.request/v1"]],
      ["Document", 1, ["kit-security"]],
      ["Provider", 1, [`web-provider/${DIGEST}`]],
    ]);
    renderAt(<SummaryChanges summary={summary} />);
    expect(within(screen.getByRole("group", { name: "Contract" })).getByRole("link", { name: "osv.query.request/v1" })).toHaveAttribute("href");
    expect(within(screen.getByRole("group", { name: "Document" })).getByRole("link", { name: "kit-security" })).toBeInTheDocument();
    expect(within(screen.getByRole("group", { name: "Contract" })).getAllByRole("img", { name: "Created" })).toHaveLength(2);
    expect(screen.queryByText(/more on the proposal page/)).toBeNull();
  });

  it("counts members past the served rows and the cap into more", () => {
    // 8 Contracts: the summary serves 5 rows; the cap of 3 shows 3 and counts the other 5, plus the ClaimType
    const summary = reviewSummary(ID, [...Array.from({ length: 8 }, (_, i) => contract(`c${i}`, 1)), CLAIM_TYPE]);
    renderAt(<SummaryChanges summary={summary} limit={3} />);
    expect(within(screen.getByRole("group", { name: "ClaimType" })).getAllByRole("link")).toHaveLength(1);
    expect(within(screen.getByRole("group", { name: "Contract" })).getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("(8)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "+6 more on the proposal page →" })).toBeInTheDocument();
  });

  it("reads a row no stored field names by its path, and marks Subject and Claim groups for the detailed read", () => {
    const unnamed = member("contract", "contracts/unnamed.json", { artifact_format: "x" });
    renderAt(<SummaryChanges summary={reviewSummary(ID, [unnamed])} />);
    expect(screen.getByText("contracts/unnamed.json")).toBeInTheDocument();
    expect(summaryHasBeliefs(reviewSummary(ID, [PROCEDURE_MEMBER, ...BELIEF_MEMBERS]))).toBe(true);
  });
});
