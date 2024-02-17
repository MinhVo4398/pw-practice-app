import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutPage";

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

test.only("Parametrized methods", async ({ page }) => {
  const navigationPage = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigationPage.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@test.com",
    "welcome1",
    "Option 1"
  );
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    "David",
    "test@test.com",
    false
  );
  await page.pause();
});
