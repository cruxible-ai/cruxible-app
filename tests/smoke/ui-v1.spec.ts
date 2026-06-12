import { expect, test } from "@playwright/test";

test("fixture-backed v1 inspection flow", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/i\/inst_fixture$/);
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await expect(page.getByText("3 entities")).toBeVisible();
  await expect(page.getByText("2 edges")).toBeVisible();
  await expect(page.getByText("snap_fixture").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "blocked work items" }).first()).toBeVisible();

  await page.locator("aside").getByRole("link", { name: /WorkItem/ }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\/browse\/WorkItem$/);
  await expect(page.getByRole("heading", { name: "WorkItem" })).toBeVisible();
  await expect(page.getByRole("link", { name: "wi-fixture-1" })).toBeVisible();
  await expect(page.getByRole("link", { name: "wi-fixture-2" })).toBeVisible();

  await page.getByRole("button", { name: "blocked" }).click();
  await expect(page).toHaveURL(/\/browse\/WorkItem\?status=blocked$/);
  await expect(page.getByRole("link", { name: "wi-fixture-2" })).toBeVisible();
  await expect(page.getByRole("link", { name: "wi-fixture-1" })).toHaveCount(0);

  await page.getByRole("button", { name: "all" }).click();
  await page.getByRole("link", { name: "wi-fixture-1" }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\/e\/WorkItem\/wi-fixture-1$/);
  await expect(page.getByRole("heading", { name: "Fixture work item" })).toBeVisible();
  await expect(page.getByText("A planned fixture work item used by dev fixtures mode.")).toBeVisible();
  await expect(page.getByText("work item implements roadmap item")).toBeVisible();
  await expect(page.getByRole("link", { name: "Fixture roadmap item" })).toBeVisible();

  await page.getByRole("button", { name: /SRC-fixture00001/ }).click();
  await expect(page.getByText("Fixture source text:")).toBeVisible();
  await expect(page.getByText("the evidence behind the fixture edge.")).toBeVisible();

  await page.getByRole("link", { name: /work item change context/ }).click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\/views\/work_item_change_context\?work_item_id=wi-fixture-1$/);
  await expect(page.getByRole("heading", { name: "work item change context" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Fixture roadmap item" })).toBeVisible();

  await page.goto("/i/inst_fixture/g/WorkItem/wi-fixture-1");
  await expect(page.getByRole("heading", { name: "Graph" })).toBeVisible();
  await expect(page.getByText("WorkItem/wi-fixture-1")).toBeVisible();
  await expect(page.getByText(/1-hop neighborhood .* 1 edges/)).toBeVisible();
  await expect(page.locator(".react-flow__node")).toHaveCount(2);
  await expect(page.locator(".react-flow__node", { hasText: "Fixture work item" })).toBeVisible();
  const roadmapNode = page.locator(".react-flow__node", { hasText: "Fixture roadmap item" });
  await expect(roadmapNode).toBeVisible();
  await roadmapNode.click();
  await expect(page).toHaveURL(/\/i\/inst_fixture\/g\/RoadmapItem\/ri-fixture-1$/);
  await expect(page.getByText("RoadmapItem/ri-fixture-1")).toBeVisible();
  await expect(page.locator(".react-flow__node")).toHaveCount(1);
  await expect(page.locator(".react-flow__node", { hasText: "Fixture roadmap item" })).toBeVisible();
});
