import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.only("Datepicker test", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calenderInputField = page.getByPlaceholder("Form Picker");
  await calenderInputField.click();

  await page.locator("[class='day-cell ng-star-inserted']").getByText("1", {exact:true}).click();
  await expect(calenderInputField).toHaveValue("Feb 1, 2024");

 
}); 
