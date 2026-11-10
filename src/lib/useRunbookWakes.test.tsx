import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataSourceProvider } from "@/api/DataSourceContext";
import type { GetResult, Schemas } from "@/api/schemas";
import { useRunbookWakes } from "@/lib/useRunbookWakes";
import { AUTHORED } from "@/fixtures/handlers";
import { RUNBOOK_WAKES } from "@/test/runbook-wakes";
import { COORDINATE } from "@/fixtures/authored/world";

afterEach(cleanup);

/**
 * Regression from review: two cached generations serve the same Runbook ref
 * with another schedule (07:00, then 09:00) and other steps; moving between
 * them must read the selected generation's card, never keep the first.
 */
describe("Runbook wakes across cached generations", () => {
  it("reads the schedule and steps the selected generation serves", async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const head = AUTHORED.find((f) => f.path.endsWith("/head"))!.response as Schemas["Head"];
    const template = RUNBOOK_WAKES.at(-1)!.response as { results: GetResult[] };
    for (const [generation, oid, hour, line] of [
      [1, "a".repeat(40), 7, "cve-applicability"],
      [2, "b".repeat(40), 9, "kev-triage"],
    ] as const) {
      const coordinate = { ...COORDINATE, git_oid: oid };
      client.setQueryData(["head", "inst_fixture", String(generation)], { ...head, coordinate, generation });
      client.setQueryData(["orient-section-runbooks", "inst_fixture", oid], {
        rows: [{ runbook: "Runbook:demo.maintain", lifecycle: "live", triggers_total: 1 }],
        truncated: false,
      });
      client.setQueryData(["get-batch", "inst_fixture", oid, "summary", ["Runbook:demo.maintain"]], {
        ...template,
        coordinate,
        results: template.results.map((r) => ({
          ...r,
          accepted_coordinate: coordinate,
          card: {
            ...(r.card as Schemas["GetRunbookCard"]),
            steps: [{ step: 1, target: `Line:${line}`, availability: "available" }],
            triggers: [{ trigger: "Trigger:demo.maintain-daily", version: generation, fires: `on cron 0 ${hour} * * * (UTC)` }],
          },
        })),
      });
    }
    function Probe() {
      const wakes = useRunbookWakes();
      const navigate = useNavigate();
      const [line, list] = [...wakes.byLine][0] ?? [];
      return (
        <>
          <button onClick={() => navigate("?at=2")}>Cached G2</button>
          <output>{line ? `${line} ${list![0]!.fires}` : ""}</output>
        </>
      );
    }
    render(
      <MemoryRouter initialEntries={["/i/inst_fixture?at=1"]}>
        <QueryClientProvider client={client}>
          <DataSourceProvider config={{ baseUrl: "https://fixtures.example" }}>
            <Routes>
              <Route path="/i/:instanceId" element={<Probe />} />
            </Routes>
          </DataSourceProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByText("cve-applicability on cron 0 7 * * * (UTC)")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cached G2" }));
    expect(await screen.findByText("kev-triage on cron 0 9 * * * (UTC)")).toBeInTheDocument();
    expect(screen.queryByText(/0 7 \*/)).toBeNull();
  });
});
