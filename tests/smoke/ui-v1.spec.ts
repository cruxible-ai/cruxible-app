import { expect, test } from "@playwright/test";

// Runs against `VITE_CRUXIBLE_FIXTURES=1` (playwright.config.ts): the MSW
// worker serves src/fixtures/recorded/ at the network layer, offline.
test("fixture-backed inspection flow: overview, kind, contract, evidence flow, type map, Subject, neighborhood, palette, next, review, ledger, beliefs, lines and their graphs, run, Procedure graph, pin", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  const main = page.getByRole("main");
  await expect(main.getByText("Subjects by kind")).toBeVisible();
  await expect(main.getByRole("link", { name: "security.vulnerability", exact: true })).toBeVisible();
  await expect(main.getByText("Claims conflict")).toBeVisible();
  await expect(main.getByText("security.kev-catalog")).toBeVisible();
  await expect(page.locator("aside").getByText("Generation")).toBeVisible();

  // Sidebar kind -> its kind page; a row expands to its evidence rules; its
  // contract opens the contract page; the type map stays the overview.
  await page.locator("aside").getByRole("link", { name: /security\.assessment/ }).click();
  await expect(page).toHaveURL(/\/kinds\/security\.assessment$/);
  await expect(page.getByRole("heading", { name: "security.assessment" })).toBeVisible();
  await page.getByRole("button", { name: "Expand status" }).click();
  await expect(page.getByText("osv-applicability", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "security.osv-applicability-v1" }).first().click();
  await expect(page).toHaveURL(/\/contracts\/security\.osv-applicability-v1$/);
  // the Trigger row links its card; the logical sources section also names it as selecting osv.query
  await expect(page.getByRole("link", { name: "security.osv-landed" })).toBeVisible();
  await expect(page.getByText("osv.query", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Procedure:security.osv-acquire" })).toBeVisible();

  // Evidence flow: hover lights a path, focus keeps it, clear restores.
  await page.locator("aside").getByRole("link", { name: "Evidence flow" }).click();
  const flow = page.getByTestId("flow");
  await expect(flow.getByText("osv.query")).toBeVisible();
  await flow.getByText("cisa.kev.catalog").hover();
  await flow.getByRole("button", { name: "Focus security.kev-http-v1" }).click();
  await expect(page).toHaveURL(/focus=contract%3Asecurity\.kev-http-v1/);
  await expect(flow.getByText("osv.query")).toHaveCount(0);
  await page.getByRole("button", { name: /^Clear: Focused on/ }).click();
  await expect(flow.getByText("osv.query")).toBeVisible();
  await flow.getByRole("link", { name: "status" }).click();
  await expect(page).toHaveURL(/\/kinds\/security\.assessment\?claim_type=security\.assessment\.status$/);
  await page.locator("aside").getByRole("link", { name: "Type map" }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(4);

  // A Subject page, opened by ref.
  await page.goto("/i/inst_fixture/s/security.vulnerability%2Fcve-2024-3094");
  await expect(page.getByRole("heading", { name: "cve-2024-3094" })).toBeVisible();
  await expect(page.getByText("CVE-2024-3094", { exact: true })).toBeVisible();

  // Jump palette: type a ref, Enter opens its Subject page.
  await page.keyboard.press("ControlOrMeta+k");
  await page.getByRole("textbox", { name: "Reference" }).fill("security.assessment/rel-1-cve-2024-3094");
  await expect(page.getByRole("button", { name: /resolved/ })).toBeVisible();
  await page.getByRole("textbox", { name: "Reference" }).press("Enter");
  await expect(page).toHaveURL(/\/s\/security\.assessment%2Frel-1-cve-2024-3094$/);
  await page.getByRole("button", { name: "Expand status" }).click();
  await expect(page.getByText("OSV lists the release's xz package within the affected range.")).toBeVisible();

  // Its neighborhood, then one more hop.
  await page.getByRole("link", { name: "Neighborhood" }).click();
  await expect(page.getByText(/3 Subjects · 2 links/)).toBeVisible();
  await page.getByRole("button", { name: "depth 2" }).click();
  await expect(page).toHaveURL(/graph\?depth=2$/);
  await expect(page.getByText(/5 Subjects · 4 links/)).toBeVisible();
  await expect(page.locator(".react-flow__node")).toHaveCount(5);

  // Next queue -> a proposal awaiting approval -> its review; the ledger.
  await page.locator("aside").getByRole("link", { name: /^Next/ }).click();
  await expect(page.getByRole("heading", { name: "Blocking" })).toBeVisible();
  await page.getByRole("link", { name: /^sha256:aaaa/ }).click();
  await expect(page).toHaveURL(/\/p\/sha256%3Aa+$/);
  await expect(page.getByText("lifecycle.state")).toBeVisible();
  await expect(page.getByRole("button", { name: /approve|activate|reject|withdraw/i })).toHaveCount(0);
  await page.locator("aside").getByRole("link", { name: "Ledger" }).click();
  await expect(page.getByRole("link", { name: "g42" })).toBeVisible();
  await page.locator("aside").getByRole("link", { name: "Beliefs" }).click();
  await page.getByRole("button", { name: /Stale beliefs/ }).click();
  await expect(page.getByText("Evidence expired", { exact: true })).toBeVisible();

  // Lines -> a Line -> one of its runs.
  await page.locator("aside").getByRole("link", { name: "Lines" }).click();
  await page.getByRole("link", { name: "kev-triage", exact: true }).click();
  await expect(page).toHaveURL(/\/lines\/kev-triage$/);
  await expect(page.getByText("page 1 · 12 in all")).toBeVisible();
  await expect(page.getByText(/otherwise propose/)).toBeVisible();
  // The Line's graph: its Trigger, its steps, a picked run's marks.
  const lineGraph = page.getByTestId("procedure-graph");
  await expect(lineGraph.getByText("daily at 06:00 UTC")).toBeVisible();
  await expect(lineGraph.locator(".react-flow__node")).toHaveCount(7);
  await page.getByRole("combobox", { name: "Mark the steps with a run" }).selectOption("run-7");
  await expect(lineGraph.getByText("Refused · guard_refused")).toBeVisible();
  await page.getByRole("link", { name: "run-7", exact: true }).first().click();
  await expect(page).toHaveURL(/\/runs\/run-7$/);
  await expect(page.getByText("guard_refused")).toBeVisible();

  // A Procedure page leads with its step graph; a click on a step focuses its lineage and marks its row.
  await page.goto("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
  const steps = page.getByTestId("procedure-graph");
  await expect(steps.locator(".react-flow__node")).toHaveCount(6);
  await steps.locator('.react-flow__node[data-id="parse"]').click({ position: { x: 12, y: 8 } });
  await expect(page.getByRole("button", { name: "Clear: Focused on parse" })).toBeVisible();
  await expect(page.locator('[data-step="parse"]')).toHaveAttribute("aria-current", "step");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /^Clear: Focused on/ })).toHaveCount(0);

  // State graph: pages the whole graph (headless WebGL draws no dots, but
  // the read, counts and kind filter run).
  await page.locator("aside").getByRole("link", { name: "State graph" }).click();
  await expect(page.getByText(/640 Subjects · 733 Subject-valued Claims · 3 pages/)).toBeVisible();
  await expect(page.getByRole("button", { name: /security\.vulnerability/ })).toBeVisible();

  // Pin a generation from the generation box's list: links keep it, the box names it, back to head drops it.
  await page.getByRole("button", { name: /Generation 42 · head/ }).click();
  await page.getByRole("option", { name: /^g42/ }).click();
  await expect(page).toHaveURL(/at=42/);
  await expect(page.getByRole("button", { name: /Generation 42 · pinned/ })).toBeVisible();
  await page.locator("aside").getByRole("link", { name: "Overview" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\?at=42$/);
  await page.getByRole("button", { name: "Back to head" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  // Typing a number in the list is the fallback for older generations.
  await page.getByRole("button", { name: /Generation 42 · head/ }).click();
  await page.getByLabel("Pin generation").fill("42");
  await page.getByLabel("Pin generation").press("Enter");
  await expect(page).toHaveURL(/at=42/);
});
