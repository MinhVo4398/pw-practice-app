import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("Navigate to form page", async ({ page }) => {
  const navigationPage = new NavigationPage(page);
  await navigationPage.formLayoutsPage();
  await navigationPage.datePickerDate();
  await navigationPage.smartTablePage();
  await navigationPage.toastrPage();
  await navigationPage.tooltipPage();
}); 