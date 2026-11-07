import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { QueryClient } from "@tanstack/react-query";
import { renderApp, TEST_BASE } from "@/test/render";
import { defineFixture } from "@/fixtures/fixture";
import { COORDINATE } from "@/fixtures/authored/world";
import { headQuery } from "@/api/requests";
import { server } from "@/test/msw-server";
import { BODY, FIXES, FIXES_KIND, G40, G41, HEAD_MOVED_ON, HEADERS, LATER_REVISION, P1, PAIR_DEFINED_AT_BOUND, PAIR_LIST_AT_BOUND, PAIR_PROCEDURE, PAIR_REVISED_AT_HEAD, P2, P3, PROPOSAL_L, PROPOSAL_T, REVISED_CLAIM, RUN_PAIR, RUN_T0, RUN_T1, RUN_T2, SCALAR_PAIR, TEMPLATE_LINE, TEMPLATE_WORLD, VIEW, WITHHELD_SOURCE } from "@/fixtures/template";

afterEach(cleanup);
beforeAll(() => {
  URL.createObjectURL ??= () => "blob:capture";
  URL.revokeObjectURL ??= () => undefined;
});

const I = "/i/inst_fixture";
const SLOW = { timeout: 8000 };
const handle = (digest: string) => `CAP-${digest.slice(7, 19)}`;
const headAt = (generation: number) => ({ tag: "playbill-head-v1" as const, instance: "inst_fixture", coordinate: COORDINATE, generation });
/** The latest head, answered by `respond` (unpinned reads only). */
const latestHead = (respond: () => Promise<number>) =>
  http.get(`${TEST_BASE}/api/v1/:instance/head`, async ({ request }) => {
    if (new URL(request.url).searchParams.has("at")) return undefined;
    return HttpResponse.json(headAt(await respond()));
  });
/** A cached head at `generation`, stale: its observers refetch it in the background. */
const staleHead = (generation: number) => (client: QueryClient) => client.setQueryData(["head", "inst_fixture", null], headAt(generation), { updatedAt: Date.now() - 60_000 });
const node = (id: string) => document.querySelector(`[data-testid="procedure-graph"] .react-flow__node[data-id="${id}"]`) as HTMLElement;

describe("D-R37 template: the step graph", () => {
  it("tags each step with its stage; a derive is pure and names its operation; a list fetch shows its origin and cap", async () => {
    renderApp(`${I}/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    await screen.findByTestId("procedure-graph", {}, SLOW);
    await waitFor(() => expect(node("view")).not.toBeNull(), SLOW);
    await waitFor(() => expect(node("view").querySelector("[data-stage]")).toHaveAttribute("data-stage", "derive"), SLOW);
    const stages = { watched: "READ", pages: "FETCH", view: "DERIVE", fixes: "DERIVE", entries: "EXTRACT", write: "CLAIMS" };
    for (const [id, tag] of Object.entries(stages)) expect(within(node(id)).getByText(tag)).toBeInTheDocument();
    expect(node("view")).toHaveTextContent("pure · advisory.narrow");
    expect(node("fixes")).toHaveTextContent("pure · advisory.fixes");
    await waitFor(() => expect(node("pages")).toHaveTextContent("vendor.example · JSON · ≤ 20 Captures"), SLOW);

    // a derive's panel: operation, inputs and output as fields
    fireEvent.click(within(node("view")).getByText("view"));
    const derive = within(await screen.findByRole("list", { name: "Derive" }, SLOW));
    expect(derive.getByText("advisory.narrow")).toBeInTheDocument();
    expect(derive.getByText("pure")).toBeInTheDocument();
    const inputs = within(screen.getByRole("list", { name: "Inputs" }));
    expect(inputs.getByText("pages.pages")).toBeInTheDocument();
    expect(inputs.getByRole("link", { name: "watched" })).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Output" })).getByRole("link", { name: "advisory-view" })).toBeInTheDocument();

    // the claims panel lists the kinds it may create, value targets included
    fireEvent.click(within(node("write")).getByText("write"));
    const writes = within(await screen.findByRole("list", { name: "Writes on" }, SLOW));
    expect(writes.getByText("Creates")).toBeInTheDocument();
    expect(writes.getByRole("link", { name: "advisory" })).toBeInTheDocument();
  }, 20000);

  it("on a run, a list fetch marks its members kept, dropped and the provider's word that it is incomplete", async () => {
    renderApp(`${I}/lines/${TEMPLATE_LINE}`, TEMPLATE_WORLD);
    const picker = await screen.findByRole("combobox", { name: "Mark the steps with a run" }, SLOW);
    await waitFor(() => expect(within(picker).getAllByRole("option").length).toBeGreaterThan(2), SLOW);
    fireEvent.change(picker, { target: { value: "run-t2" } });
    await waitFor(() => expect(within(node("pages")).getByText("2 kept · 1 dropped · incomplete")).toBeInTheDocument(), SLOW);
    fireEvent.click(within(node("pages")).getByText("pages"));
    const members = within(await screen.findByRole("table", { name: "Members" }, SLOW));
    expect(members.getByText("Dropped")).toBeInTheDocument();
    expect(members.getByText("oversized")).toBeInTheDocument();
    expect(members.getAllByText("Kept")).toHaveLength(2);
    expect(screen.getByText(/Incomplete \(provider\)/)).toBeInTheDocument();
  });
});

describe("D-R37 template: the run page", () => {
  it("lists a list call's members with their status, and the run's completeness with each reason", async () => {
    renderApp(`${I}/runs/${RUN_T2}`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    // a dropped member opens its list
    const members = within(await main.findByRole("table", { name: "Members of pages" }, SLOW));
    expect(members.getByText("Dropped")).toBeInTheDocument();
    expect(members.getAllByText("Kept")).toHaveLength(2);
    expect(main.getByText("3 list members: 2 kept, 1 not, incomplete")).toBeInTheDocument();
    expect(main.getByText(/Incomplete \(provider\)/)).toBeInTheDocument();
    const reasons = within(main.getByRole("table", { name: "Completeness reasons" }));
    expect(reasons.getByText("Incomplete input")).toBeInTheDocument();
    expect(main.getByText("Incomplete")).toBeInTheDocument();
  });
});

describe("D-R37 template: Captures", () => {
  it("a derived Capture shows what it was derived from, its reducer, and the restriction it inherited", async () => {
    renderApp(`${I}/ref/${handle(VIEW)}`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    const from = within((await main.findByText("Derived from")).closest("section")!);
    for (const d of [P1, P2, P3]) expect(await from.findByRole("link", { name: handle(d) })).toBeInTheDocument();
    expect(from.getByText("Provider")).toBeInTheDocument();
    expect(from.getByRole("link", { name: "Provider:security-advisory-provider/5b5b5b5b" })).toBeInTheDocument();
    expect(from.getByText("advisory.view")).toBeInTheDocument();
    expect(await main.findByText(/restricted \(inherited from/)).toBeInTheDocument();
    const access = (await main.findByText(/restricted \(inherited from/)).closest("span")!;
    expect(within(access).getByRole("link", { name: "security.advisory-page" })).toHaveAttribute("href", `${I}/contracts/security.advisory-page`);
  });

  it("a list member shows its siblings from the same fetch, each with its index and status", async () => {
    renderApp(`${I}/ref/${handle(P2)}`, TEMPLATE_WORLD);
    const table = within(await screen.findByRole("table", { name: "List members" }, SLOW));
    expect(table.getByRole("link", { name: handle(P1) })).toBeInTheDocument();
    expect(table.getByText(handle(P2))).toBeInTheDocument(); // itself, unlinked
    expect(table.getAllByText("Kept")).toHaveLength(3);
    expect(table.getByText("2").closest("span")).toHaveAttribute("title", expect.stringContaining("pages[2]"));
    expect(screen.getByRole("link", { name: RUN_T1 })).toHaveAttribute("href", `${I}/runs/${RUN_T1}`);
  });

  const unclassified = async (fixtures: typeof TEMPLATE_WORLD) => {
    renderApp(`${I}/ref/${handle(BODY)}`, [...TEMPLATE_WORLD, ...SCALAR_PAIR, ...fixtures]);
    const table = within(await screen.findByRole("table", { name: "Other outputs of this call" }, SLOW));
    expect(table.getByRole("link", { name: handle(HEADERS) })).toBeInTheDocument();
    expect(table.getByText(handle(BODY))).toBeInTheDocument(); // itself, unlinked
    expect(table.queryByText("Page")).toBeNull();
    expect(screen.queryByRole("table", { name: "List members" })).toBeNull();
    expect(screen.queryByText(/The list this Capture is a member of/)).toBeNull();
    expect(screen.getByRole("link", { name: RUN_PAIR })).toHaveAttribute("href", `${I}/runs/${RUN_PAIR}`);
  };

  it("a call's two scalar Captures are its other outputs, unclassified: no list, no pages", async () => {
    await unclassified(PAIR_DEFINED_AT_BOUND);
  }, 20000);

  it("an old run's outputs are classified by its definition as bound, never a later revision's", async () => {
    // the head's revision makes the same call return one list field; run-pair was bound before it
    await unclassified([...PAIR_DEFINED_AT_BOUND, ...PAIR_REVISED_AT_HEAD]);
    cleanup();
    // the bound definition unread: unclassified, whatever the head says
    await unclassified(PAIR_REVISED_AT_HEAD);
  }, 20000);

  it("a call whose one Capture field was a list when the run was bound lists its members, without pages", async () => {
    renderApp(`${I}/ref/${handle(BODY)}`, [...TEMPLATE_WORLD, ...SCALAR_PAIR, ...PAIR_LIST_AT_BOUND]);
    const table = within(await screen.findByRole("table", { name: "List members" }, SLOW));
    expect(table.getByRole("link", { name: handle(HEADERS) })).toBeInTheDocument();
    expect(table.queryByText("Page")).toBeNull();
    expect(screen.getByText(/The list this Capture is a member of \(pages\)/)).toBeInTheDocument();
  }, 20000);

  it("an old run whose bound coordinate is past the retained window: no definition read there, outputs unclassified", async () => {
    const atBound: string[] = [];
    const parsing: Promise<void>[] = [];
    const listen = ({ request }: { request: Request }) => {
      if (!request.url.includes("/get-batch")) return;
      parsing.push(
        request
          .clone()
          .json()
          .then((body: { at?: { git_oid?: string }; refs?: string[] }) => {
            if (body.at?.git_oid === G40.git_oid) atBound.push(...(body.refs ?? []));
          }),
      );
    };
    server.events.on("request:start", listen);
    try {
      // the list definition at g40 would classify the outputs as list members, were it read
      await unclassified([...PAIR_LIST_AT_BOUND, ...HEAD_MOVED_ON]);
      await Promise.all(parsing);
      expect(atBound).toEqual([]);
    } finally {
      server.events.removeListener("request:start", listen);
    }
  }, 20000);

  describe("only a fresh head authorizes a historical read", () => {
    // run-pair's bound coordinate (g40's oid) at generation 57: inside the window of a g120 head, past that of g121
    const at57 = defineFixture({
      method: "get",
      path: "/api/v1/{instance_id}/head",
      query: headQuery(G40.git_oid),
      response: { tag: "playbill-head-v1", instance: "inst_fixture", coordinate: G40, generation: 57 },
    });
    /** Every get-batch ref read at the bound coordinate, and every generation read for it. */
    const watch = () => {
      const atBound: string[] = [];
      let targetReads = 0;
      const parsing: Promise<void>[] = [];
      const listen = ({ request }: { request: Request }) => {
        if (request.url.includes(`/head?at=${G40.git_oid}`)) targetReads += 1;
        if (!request.url.includes("/get-batch")) return;
        parsing.push(
          request
            .clone()
            .json()
            .then((body: { at?: { git_oid?: string }; refs?: string[] }) => {
              if (body.at?.git_oid === G40.git_oid) atBound.push(...(body.refs ?? []));
            }),
        );
      };
      server.events.on("request:start", listen);
      return {
        atBound: async () => (await Promise.all(parsing), atBound),
        targetReads: () => targetReads,
        stop: () => server.events.removeListener("request:start", listen),
      };
    };
    const fixtures = [...TEMPLATE_WORLD, ...SCALAR_PAIR, ...PAIR_LIST_AT_BOUND, at57];

    it("a cached g120 head being refetched authorizes nothing; the fresh g121 leaves g57 unauthorized", async () => {
      let release: (generation: number) => void = () => undefined;
      let refetches = 0;
      const watched = watch();
      try {
        renderApp(`${I}/ref/${handle(BODY)}`, fixtures, {
          // the head refetch stays in flight until released
          handlers: [latestHead(() => ((refetches += 1), new Promise<number>((resolve) => (release = resolve))))],
          // a g120 head already cached, stale: its observers refetch it in the background
          seed: staleHead(120),
        });
        await waitFor(() => expect(refetches).toBeGreaterThan(0), SLOW);
        // the bound coordinate's generation (57) is read, and still nothing at that coordinate while the refetch is in flight
        await waitFor(() => expect(watched.targetReads()).toBeGreaterThan(0), SLOW);
        await new Promise((resolve) => setTimeout(resolve, 150));
        expect(await watched.atBound()).toEqual([]);
        expect(screen.queryByRole("table", { name: "List members" })).toBeNull();
        release(121);
        // fresh g121: g57 is past the window, so the outputs stay unclassified and nothing is read there
        await screen.findByRole("table", { name: "Other outputs of this call" }, SLOW);
        expect(await watched.atBound()).toEqual([]);
      } finally {
        watched.stop();
      }
    }, 20000);

    it("a fresh head inside the window authorizes the read at the bound coordinate", async () => {
      const watched = watch();
      try {
        renderApp(`${I}/ref/${handle(BODY)}`, fixtures, { handlers: [latestHead(async () => 100)] });
        const table = within(await screen.findByRole("table", { name: "List members" }, SLOW));
        expect(table.getByRole("link", { name: handle(HEADERS) })).toBeInTheDocument();
        expect(await watched.atBound()).toContain(`Procedure:${PAIR_PROCEDURE}`);
      } finally {
        watched.stop();
      }
    }, 20000);
  });

  it("a derived CaptureKind names the derives that commit it, their operation and the kinds they derive from", async () => {
    renderApp(`${I}/contracts/${FIXES_KIND}`, TEMPLATE_WORLD);
    const table = within(await screen.findByRole("table", { name: "Derived by" }, SLOW));
    expect(table.getByText("advisory.fixes")).toBeInTheDocument();
    expect(table.getByRole("link", { name: "advisory-pages" })).toHaveAttribute("href", `${I}/lines/advisory-pages`);
    expect(table.getByRole("link", { name: "security.advisory-view" })).toHaveAttribute("href", `${I}/contracts/security.advisory-view`);
    expect(screen.getByText("Derived")).toBeInTheDocument(); // the grade term
  });
});

describe("D-R37 template: evidence chains (CD2)", () => {
  it("on the Subject page, the cited Capture first (record, field), then its chain one hop per expand", async () => {
    renderApp(`${I}/s/${encodeURIComponent("security.assessment/rel-1-cve-2024-3094")}`, TEMPLATE_WORLD);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    const evidence = within(await screen.findByRole("table", { name: "Evidence" }, SLOW));
    expect(evidence.getByText("CVE-2024-3094")).toBeInTheDocument();
    expect(evidence.getByText("status")).toBeInTheDocument();
    const chain = await screen.findByRole("button", { name: `Derived from 1 Capture (${handle(FIXES)})` }, SLOW);
    expect(screen.queryByRole("link", { name: handle(VIEW) })).toBeNull(); // nothing read before the expand
    fireEvent.click(chain);
    expect(await screen.findByRole("link", { name: handle(VIEW) }, SLOW)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: handle(P1) })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: `Expand Derived from 3 Captures (${handle(VIEW)})` }));
    expect(await screen.findByRole("link", { name: handle(P1) }, SLOW)).toBeInTheDocument();
  });

  it("in the proposal side panel, the cited Capture then its chain; a list absence witness lists every member", async () => {
    renderApp(`${I}/p/${encodeURIComponent(PROPOSAL_T)}`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "security.vulnerability/cve-2024-3094 security.vulnerability.fixed_in" }, SLOW));
    const panel = within(await main.findByRole("complementary", { name: "Change detail" }));
    fireEvent.click(await panel.findByRole("button", { name: `Derived from 1 Capture (${handle(FIXES)})` }, SLOW));
    expect(await panel.findByRole("link", { name: handle(VIEW) }, SLOW)).toBeInTheDocument();
    cleanup();

    renderApp(`${I}/p/${encodeURIComponent(PROPOSAL_L)}`, TEMPLATE_WORLD);
    const second = within(await screen.findByRole("main"));
    fireEvent.click(await second.findByRole("button", { name: "security.vulnerability/cve-2023-4863 security.vulnerability.advisory" }, SLOW));
    const witness = within(await second.findByRole("complementary", { name: "Change detail" }));
    expect(witness.getByText("Absence witness · 3 Captures")).toBeInTheDocument();
  });
});

describe("D-R37 template: a withheld source in a chain", () => {
  const row = (scope: ReturnType<typeof within>, digest: string) => scope.getByRole("link", { name: handle(digest) }).closest("tr")!;

  it("the full chain marks a withheld source and its source and time as withheld, a readable restricted one as restricted", async () => {
    renderApp(`${I}/s/${encodeURIComponent("security.assessment/rel-1-cve-2024-3094")}`, [...TEMPLATE_WORLD, ...WITHHELD_SOURCE]);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    fireEvent.click(await screen.findByRole("button", { name: `Derived from 1 Capture (${handle(FIXES)})` }, SLOW));
    fireEvent.click(await screen.findByRole("button", { name: `Expand Derived from 3 Captures (${handle(VIEW)})` }, SLOW));
    await screen.findByRole("link", { name: handle(P1) }, SLOW);
    const main = within(screen.getByRole("main"));
    const withheld = within(row(main, P1));
    expect(withheld.getAllByText("withheld")).toHaveLength(3); // the mark, the source, the time
    expect(row(main, P1).querySelector('[data-access="withheld"]')).toHaveAttribute("title", expect.stringContaining("cruxible_body_read_restricted"));
    expect(within(row(main, P2)).getByText("restricted")).toBeInTheDocument();
    expect(within(row(main, P2)).getByText("vendor.advisories")).toBeInTheDocument();
  });

  it("the compact chain in the proposal side panel marks it too", async () => {
    renderApp(`${I}/p/${encodeURIComponent(PROPOSAL_T)}`, [...TEMPLATE_WORLD, ...WITHHELD_SOURCE]);
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "security.vulnerability/cve-2024-3094 security.vulnerability.fixed_in" }, SLOW));
    const panel = within(await main.findByRole("complementary", { name: "Change detail" }));
    fireEvent.click(await panel.findByRole("button", { name: `Derived from 1 Capture (${handle(FIXES)})` }, SLOW));
    fireEvent.click(await panel.findByRole("button", { name: `Expand Derived from 3 Captures (${handle(VIEW)})` }, SLOW));
    await panel.findByRole("link", { name: handle(P1) }, SLOW);
    expect(within(row(panel, P1)).getByText("withheld")).toBeInTheDocument();
    expect(within(row(panel, P3)).getByText("restricted")).toBeInTheDocument();
  });
});

describe("D-R37 template: runs, Lines and the evidence flow", () => {
  it("the run page tables each item's change: kind, Subject, ClaimType and value, linked", async () => {
    renderApp(`${I}/runs/${RUN_T1}`, TEMPLATE_WORLD);
    const table = within(await screen.findByRole("table", { name: "Changes" }, SLOW));
    await waitFor(() => expect(table.getByText("re-observed")).toBeInTheDocument(), SLOW);
    for (const word of ["revised", "new Subject", "retired"]) expect(table.getByText(word)).toBeInTheDocument();
    expect(table.getAllByText("new")).toHaveLength(2);
    expect(table.getByText("9.8p1")).toBeInTheDocument();
    expect(table.getByText("9.7p1").closest(".line-through")).not.toBeNull();
    expect(table.getAllByRole("link", { name: "security.vulnerability.fixed_in" })[0]).toHaveAttribute("href", `${I}/claim-types/security.vulnerability.fixed_in`);
    expect(screen.getByText("3 claims")).toBeInTheDocument();
  });

  it("a re-observed Claim shows the run's own value, read at the run's coordinate, after a later generation revised it", async () => {
    renderApp(`${I}/runs/${RUN_T0}`, [...TEMPLATE_WORLD, ...LATER_REVISION]);
    const table = within(await screen.findByRole("table", { name: "Changes" }, SLOW));
    await waitFor(() => expect(table.getByText("open")).toBeInTheDocument(), SLOW);
    expect(table.getByText("re-observed")).toBeInTheDocument();
    expect(table.getByRole("link", { name: "security.assessment.status" })).toBeInTheDocument();
    expect(table.queryByText("fixed")).toBeNull(); // the head's value is not this run's
  });

  it("a re-observed Claim whose run coordinate is past the retained window is not read, and never shows another generation's value", async () => {
    const reads: { at?: string; ids: string[] }[] = [];
    const parsing: Promise<void>[] = [];
    const listen = ({ request }: { request: Request }) => {
      if (!request.url.includes("/claims/read-batch")) return;
      parsing.push(
        request
          .clone()
          .json()
          .then((body: { at?: { git_oid?: string }; claim_ids?: string[] }) => {
            reads.push({ ...(body.at?.git_oid ? { at: body.at.git_oid } : {}), ids: body.claim_ids ?? [] });
          }),
      );
    };
    server.events.on("request:start", listen);
    try {
      renderApp(`${I}/runs/${RUN_T0}`, [...TEMPLATE_WORLD, ...LATER_REVISION, ...HEAD_MOVED_ON]);
      const table = within(await screen.findByRole("table", { name: "Changes" }, SLOW));
      await waitFor(() => expect(table.getByText("not read")).toBeInTheDocument(), SLOW);
      expect(table.queryByText("open")).toBeNull();
      expect(table.queryByText("fixed")).toBeNull();
      await Promise.all(parsing);
      expect(reads.filter((r) => r.ids.includes(REVISED_CLAIM))).toEqual([]);
      expect(reads.some((r) => r.at === G41.git_oid)).toBe(false);
    } finally {
      server.events.removeListener("request:start", listen);
    }
  }, 20000);

  it("a cached head being refetched authorizes no Claim read at the run's coordinate; a fresh head past it leaves it not read", async () => {
    let release: (generation: number) => void = () => undefined;
    let refetches = 0;
    let atRun = 0;
    const listen = ({ request }: { request: Request }) => {
      if (request.url.includes("/claims/read-batch")) atRun += 1;
    };
    server.events.on("request:start", listen);
    try {
      // run-t0 was accepted at g41: inside a g104 head's window, past a g105 head's
      renderApp(`${I}/runs/${RUN_T0}`, [...TEMPLATE_WORLD, ...LATER_REVISION], {
        handlers: [latestHead(() => ((refetches += 1), new Promise<number>((resolve) => (release = resolve))))],
        seed: staleHead(104),
      });
      await screen.findByRole("table", { name: "Changes" }, SLOW);
      await waitFor(() => expect(refetches).toBeGreaterThan(0), SLOW);
      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(atRun).toBe(0);
      release(105);
      const table = within(screen.getByRole("table", { name: "Changes" }));
      await waitFor(() => expect(table.getByText("not read")).toBeInTheDocument(), SLOW);
      expect(atRun).toBe(0);
    } finally {
      server.events.removeListener("request:start", listen);
    }
  }, 20000);

  it("a Line's Ends in names the kinds it may create, value targets included", async () => {
    renderApp(`${I}/lines`, TEMPLATE_WORLD);
    const main = within(await screen.findByRole("main"));
    const row = within((await main.findByRole("link", { name: TEMPLATE_LINE })).closest("tr")!);
    expect(await row.findByText("creates", {}, SLOW)).toBeInTheDocument();
    expect(row.getByRole("link", { name: "advisory" })).toHaveAttribute("href", `${I}/kinds/security.advisory`);
  });

  it("the evidence flow draws derives between sources and Lines, and a derived landing as a Line → Line link", async () => {
    renderApp(`${I}/flow`, TEMPLATE_WORLD);
    const flow = within(await screen.findByTestId("flow", {}, SLOW));
    expect(flow.getAllByText("Derive")).toHaveLength(3); // the column, and each derive card
    expect(flow.getByRole("link", { name: "advisory.narrow" })).toBeInTheDocument();
    expect(flow.getByRole("link", { name: "advisory.fixes" })).toBeInTheDocument();
    expect(document.querySelector('[data-testid="landing-link"]')).toHaveAttribute("aria-label", "Link advisory-pages → fix-followup · lands security.advisory-fixes");
  });
});
