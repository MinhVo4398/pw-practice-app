import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
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
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(100)}@test.com`;

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 1"
    );
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );
  // await pm.navigateTo().datePickerDate();
  // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5);
  // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 11);
  await page.pause();
});
 