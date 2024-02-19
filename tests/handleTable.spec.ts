import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Handle table", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  //* Test filter with table

  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(1000);
    const ageRow = page.locator("tbody tr");

    for (let row of await ageRow.all()) {
      const cellValue = await row.locator("td").last().textContent();
      const value = page
        .locator("input-filter")
        .getByPlaceholder("Age")
        .textContent();

      if ((age = "200")) {
        expect(
          page.locator(".ng-star-inserted td", { hasText: " No data found " })
        ).toContainText(" No data found ");
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});
