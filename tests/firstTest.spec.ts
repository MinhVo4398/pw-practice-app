import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe("Suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts").click();
  });
  test("The first test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("Navigate to Datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});

test.describe.skip("Suite 2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });
  test("The first test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("Navigate to Datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
