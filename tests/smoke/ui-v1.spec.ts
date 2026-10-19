import { expect, test } from "@playwright/test";

// Runs against `VITE_CRUXIBLE_FIXTURES=1` (playwright.config.ts): the MSW
// worker serves src/fixtures/recorded/ at the network layer, offline.
test("fixture-backed inspection flow: overview, type map, Subject, neighborhood, palette, next, review, ledger, beliefs, pin", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  const main = page.getByRole("main");
  await expect(main.getByText("Subjects by kind")).toBeVisible();
  await expect(main.getByRole("link", { name: "security.vulnerability", exact: true })).toBeVisible();
  await expect(main.getByText("Claims conflict")).toBeVisible();
  await expect(main.getByText("security.kev-catalog")).toBeVisible();
  await expect(page.locator("aside").getByText("Generation")).toBeVisible();

  // Sidebar kind -> type map opened on that kind.
  await page.locator("aside").getByRole("link", { name: /security\.assessment/ }).click();
  await expect(page).toHaveURL(/\/map\?kind=security\.assessment$/);
  await expect(page.getByRole("heading", { name: "Type map" })).toBeVisible();
  await expect(page.locator(".react-flow__node")).toHaveCount(4);
  await expect(page.getByText("Subject kind", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /^status/ }).click();
  await expect(page.getByText("osv-applicability", { exact: true })).toBeVisible();

  // A sample Subject opens its Subject page.
  await page.locator(".react-flow__node", { hasText: "security.vulnerability" }).click();
  await page.getByRole("link", { name: "cve-2024-3094" }).click();
  await expect(page).toHaveURL(/\/s\/security\.vulnerability%2Fcve-2024-3094$/);
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
  await expect(page.getByText("2 of 3 settled on this page")).toBeVisible();
  await page.locator("aside").getByRole("link", { name: "Beliefs" }).click();
  await page.getByRole("button", { name: /Stale beliefs/ }).click();
  await expect(page.getByText("Evidence expired", { exact: true })).toBeVisible();

  // Pin a generation: links keep it, the picker names it, back to head drops it.
  await page.getByLabel("Pin generation").fill("42");
  await page.getByLabel("Pin generation").press("Enter");
  await expect(page).toHaveURL(/at=42/);
  await expect(page.getByText(/pinned \(head 42\)/)).toBeVisible();
  await page.locator("aside").getByRole("link", { name: "Overview" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\?at=42$/);
  await page.getByRole("button", { name: "Back to head" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
});
