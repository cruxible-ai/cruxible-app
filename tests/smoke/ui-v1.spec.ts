import { expect, test } from "@playwright/test";

// Runs against `VITE_CRUXIBLE_FIXTURES=authored` (playwright.config.ts's
// default, overridable with UI_SMOKE_WORLD): the MSW worker serves
// src/fixtures/authored/ at the network layer, offline.
test("fixture-backed inspection flow: dashboard, kind table, kind, contract, evidence flow, type map, Subject, neighborhood, palette, next, review, ledger, beliefs preset, automation, Line graphs, run, Procedure graph, pin", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  const main = page.getByRole("main");
  // What needs you, then each enabled Line with what wakes it (prefix dropped); kinds live on the type map, not the sidebar.
  await expect(main.getByRole("region", { name: "Needs you" }).getByRole("link", { name: /Next \d/ })).toBeVisible();
  const comingUp = main.locator("section", { has: page.getByRole("heading", { name: "Coming up" }) });
  await expect(comingUp.getByRole("link", { name: "kev-triage", exact: true })).toBeVisible();
  // The activity feed: what happened, newest first.
  await expect(main.getByRole("table", { name: "Activity" }).getByRole("link", { name: "g42" })).toBeVisible();
  await expect(main.getByText("Daily at 06:00 UTC")).toBeVisible();
  await expect(main.getByText("security.kev-catalog")).toBeVisible();
  await expect(page.locator("aside").getByText("Generation")).toBeVisible();

  // Type map node -> its panel's "Open kind page" link -> the kind page; a
  // row expands to its evidence rules; its contract opens the contract page.
  await page.locator("aside").getByRole("link", { name: "Type map" }).click();
  await page.locator(".react-flow__node").filter({ hasText: "assessment" }).first().click();
  await page.getByRole("link", { name: "Open kind page" }).click();
  await expect(page).toHaveURL(/\/kinds\/security\.assessment$/);
  await expect(page.getByRole("heading", { name: "security.assessment" })).toBeVisible();
  // The kind as a table: a row per Subject; a contested value carries the amber dot and links to its Claim.
  const subjects = page.getByRole("table", { name: "security.assessment Subjects" });
  await expect(subjects.getByRole("img", { name: /^Contested:/ })).toBeVisible();
  await subjects.getByRole("link", { name: /^not_affected/ }).click();
  await expect(page).toHaveURL(/\/s\/security\.assessment%2Frel-1-cve-2024-3094\?claim=CLM-0+a3$/);
  await expect(page.getByRole("button", { name: "Collapse status" })).toBeVisible();
  await page.goBack();
  // A kind past one page: a header click orders all of it on the daemon.
  await page.goto("/i/inst_fixture/kinds/security.package");
  await expect(page.getByText("Subjects 1–100 of 130")).toBeVisible();
  await page.getByRole("button", { name: "Sort by weekly_downloads" }).click();
  await expect(page).toHaveURL(/sort=weekly_downloads/);
  await expect(page.getByText("Sorted by the daemon, whole kind")).toBeVisible();
  await page.goto("/i/inst_fixture/kinds/security.assessment");
  await page.getByRole("tab", { name: /^ClaimTypes/ }).click();
  await expect(page).toHaveURL(/view=claim-types/);
  await page.getByRole("button", { name: "Expand status" }).click();
  await expect(page.getByText("osv-applicability", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "security.osv-applicability-v1" }).first().click();
  await expect(page).toHaveURL(/\/contracts\/security\.osv-applicability-v1$/);
  // the Trigger row links its card; the logical sources section also names it as selecting osv.query
  await expect(page.getByRole("link", { name: "security.osv-landed" })).toBeVisible();
  await expect(page.getByText("osv.query", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Procedure:security.osv-acquire" })).toBeVisible();

  // Evidence flow: hover lights a path, focus keeps it, clear restores.
  await page.locator("aside").getByRole("link", { name: "Evidence flow" }).click();
  const flow = page.getByTestId("flow");
  await expect(flow.getByText("osv.query", { exact: true })).toBeVisible();
  await flow.getByTitle(/Logical source cisa\.kev\.catalog/).first().hover();
  await flow.getByRole("button", { name: "Focus example.invalid" }).first().click();
  await expect(page).toHaveURL(/focus=source%3Acisa\.kev\.catalog/);
  await expect(flow.getByText("osv.query", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: /^Clear: Focused on/ }).click();
  await expect(flow.getByText("osv.query", { exact: true })).toBeVisible();
  await flow.getByRole("link", { name: "status" }).click();
  await expect(page).toHaveURL(/\/kinds\/security\.assessment\?view=claim-types&claim_type=security\.assessment\.status$/);
  await page.locator("aside").getByRole("link", { name: "Type map" }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(5);

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

  // Its one-hop Connections panel (drawn in the State graph's dots; headless
  // WebGL reveals a small lit set's labels as plain text), then the full
  // State graph for one more hop.
  const connections = page.locator("section", { has: page.getByRole("heading", { name: "Connections" }) });
  await connections.scrollIntoViewIfNeeded();
  await expect(connections.getByText("cve-2024-3094", { exact: true })).toBeVisible();
  await expect(connections.getByText("release", { exact: true })).toBeVisible();
  await expect(connections.getByText("vulnerability", { exact: true })).toBeVisible();
  await connections.getByRole("link", { name: "Open in State graph →" }).click();
  await expect(page).toHaveURL(/\/graph\?focus=security\.assessment%2Frel-1-cve-2024-3094$/);
  await expect(page.getByRole("heading", { name: "State graph" })).toBeVisible();

  // Next queue -> a proposal awaiting approval -> its review; the ledger.
  await page.locator("aside").getByRole("link", { name: /^Next/ }).click();
  await expect(page.getByRole("table", { name: "Next" }).getByText("Blocking", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /^sha256:aaaa/ }).click();
  await expect(page).toHaveURL(/\/p\/sha256%3Aa+$/);
  await expect(page.getByText("Approvals needed")).toBeVisible();
  await expect(page.getByRole("button", { name: /approve|activate|reject|withdraw/i })).toHaveCount(0);
  await page.locator("aside").getByRole("link", { name: "Ledger" }).click();
  await expect(page.getByRole("link", { name: "g42" })).toBeVisible();
  await expect(page.locator("aside").getByRole("link", { name: "Beliefs" })).toHaveCount(0);
  await page.goto("/i/inst_fixture/beliefs?at=42");
  await expect(page).toHaveURL(/\/next\?at=42&preset=beliefs$/);
  await expect(page.getByRole("heading", { name: "Next" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Beliefs", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Evidence expired", { exact: true })).toBeVisible();
  await expect(page.getByText("Line inbox unread", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page).toHaveURL(/\/next\?at=42$/);
  await expect(page.getByText("Line inbox unread", { exact: true })).toBeVisible();

  // Automation -> a Line -> one of its runs. Old index bookmarks keep filters.
  await page.goto("/i/inst_fixture/lines?sort=-line");
  await expect(page).toHaveURL(/\/automation\?sort=-line$/);
  await expect(page.getByRole("heading", { name: "Automation" })).toBeVisible();
  await page.locator("aside").getByRole("link", { name: "Automation" }).click();
  await page.getByRole("link", { name: "kev-triage", exact: true }).click();
  await expect(page).toHaveURL(/\/lines\/kev-triage$/);
  await expect(page.getByText("Page 1 · 12 in all")).toBeVisible();
  await expect(page.getByText(/else review/)).toBeVisible();
  // The Line's graph: its Trigger, its steps, a picked run's marks.
  const lineGraph = page.getByTestId("procedure-graph");
  await expect(lineGraph.getByText(/^Daily at /)).toBeVisible();
  await expect(lineGraph.locator(".react-flow__node")).toHaveCount(9); // the Trigger, its six steps and the two upstream nodes its read depends on
  await page.getByRole("combobox", { name: "Mark the steps with a run" }).selectOption("run-7");
  await expect(lineGraph.getByText("Refused · guard_refused")).toBeVisible();
  await page.getByRole("link", { name: "run-7", exact: true }).first().click();
  await expect(page).toHaveURL(/\/runs\/run-7$/);
  await expect(page.getByText("guard_refused")).toBeVisible();

  // A Procedure page leads with its step graph; a click on a step focuses its lineage and marks its row.
  await page.goto("/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
  const steps = page.getByTestId("procedure-graph");
  await expect(steps.locator(".react-flow__node")).toHaveCount(6);
  await steps.locator('.react-flow__node[data-id="entries"]').click({ position: { x: 12, y: 8 } });
  await expect(page.getByRole("button", { name: "Clear: Focused on entries" })).toBeVisible();
  await expect(page.locator('[data-step="entries"]')).toHaveAttribute("aria-current", "step");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /^Clear: Focused on/ })).toHaveCount(0);

  // State graph: pages the whole graph (headless WebGL draws no dots, but
  // the read, counts and kind filter run).
  await page.locator("aside").getByRole("link", { name: "State graph" }).click();
  await expect(page.getByText(/640 Subjects.*733 Subject-valued Claims.*read in 3 pages/)).toBeVisible();
  await expect(page.getByRole("button", { name: /security\.vulnerability/ })).toBeVisible();

  // Pin a generation from the generation box's list: links keep it, the box names it, back to head drops it.
  await page.getByRole("button", { name: /Generation 42 · head/ }).click();
  await page.getByRole("option", { name: /^g42/ }).click();
  await expect(page).toHaveURL(/at=42/);
  await expect(page.getByRole("button", { name: /Generation 42 · pinned/ })).toBeVisible();
  await page.locator("aside").getByRole("link", { name: "Dashboard" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\?at=42$/);
  await page.getByRole("button", { name: "Back to head" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  // Typing a number in the list is the fallback for older generations.
  await page.getByRole("button", { name: /Generation 42 · head/ }).click();
  await page.getByLabel("Pin generation").fill("42");
  await page.getByLabel("Pin generation").press("Enter");
  await expect(page).toHaveURL(/at=42/);
});
