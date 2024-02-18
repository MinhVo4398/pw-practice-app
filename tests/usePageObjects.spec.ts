import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("Navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerDate();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test.only("Parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "welcome1",
      "Option 1"
    );
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox("David", "test@test.com", false);
  await pm.navigateTo().datePickerDate();
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(9);
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10);
  await page.pause();
});
