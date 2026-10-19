import { expect, test } from "@playwright/test";

// Runs against `VITE_CRUXIBLE_FIXTURES=1` (playwright.config.ts): the MSW
// worker serves src/fixtures/recorded/ at the network layer, offline.
test("fixture-backed inspection flow: overview, type map, pinned generation", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  const main = page.getByRole("main");
  await expect(main.getByText("Subjects by kind")).toBeVisible();
  await expect(main.getByRole("link", { name: "security.vulnerability" })).toBeVisible();
  await expect(main.getByText("Claim conflicted")).toBeVisible();
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

  // A sample Subject opens its reference card.
  await page.locator(".react-flow__node", { hasText: "security.vulnerability" }).click();
  await page.getByRole("link", { name: "cve-2024-3094" }).click();
  await expect(page).toHaveURL(/\/ref\/security\.vulnerability%2Fcve-2024-3094$/);
  await expect(page.getByRole("heading", { name: "security.vulnerability/cve-2024-3094" })).toBeVisible();
  await expect(page.getByText("CVE-2024-3094", { exact: true })).toBeVisible();

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
