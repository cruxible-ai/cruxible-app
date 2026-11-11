import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import type { Schemas } from "@/api/schemas";
import { BELIEF_MEMBERS, PROCEDURE_MEMBER } from "@/fixtures/authored/proposal-diff";
import { definitionGroups, ProposalChanges, unreadableChanges } from "./ProposalChanges";

afterEach(cleanup);

type Member = Schemas["ReviewedMember"];
type Review = Schemas["ProposalReview"];

const DIGEST = "8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec";

/** A definition member as core serves it: the artifact's typed identity, no Statement. */
function definition(kind: string, name: string, artifactKind: string, disposition = "create"): Member {
  const artifact = { artifact_format: `playbill-${artifactKind}-v1`, identity: { kind, name } };
  return {
    path: `${artifactKind}s/${name}.json`,
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

const CONTRACT = definition("Contract", "osv.match.request/v1", "contract");
const PROVIDER = definition("Provider", `web-provider/${DIGEST}`, "provider");
const CLAIM_TYPE = definition("ClaimType", "security.finding/verdict", "claim_type");

const review = (members: Member[]): Review => ({ proposal_id: "sha256:" + "d1".repeat(32), members }) as unknown as Review;

function renderChanges(members: Member[], limit?: number) {
  const router = createMemoryRouter(
    [{ path: "/i/:instanceId", element: <ProposalChanges review={review(members)} {...(limit !== undefined ? { limit } : {})} /> }],
    { initialEntries: ["/i/inst_fixture"] },
  );
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

  it("shows Claims and definitions together", () => {
    renderChanges([PROCEDURE_MEMBER, ...BELIEF_MEMBERS]);
    expect(screen.getByRole("group", { name: "Procedure" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "security.vulnerability/cve-2024-0001" }).length).toBeGreaterThan(0);
    expect(screen.getAllByText("kev_listed").length).toBeGreaterThan(0);
  });

  it("caps definitions apart from Claims and counts the rest", () => {
    const many = Array.from({ length: 5 }, (_, i) => definition("Contract", `c${i}/v1`, "contract"));
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
