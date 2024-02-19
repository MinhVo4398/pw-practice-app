import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.only("Datepicker test", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calenderInputField = page.getByPlaceholder("Form Picker");
  await calenderInputField.click();
    
  let date = new Date();
  date.setDate(date.getDate() + 15); // get 15 days from today
  const expectedDate = date.getDate().toString(); // convert number to String
  const expectedMonthShot = date.toLocaleDateString("En-US",{month:"short"}); // Ex Jul (July);
  const expectedMonthLong = date.toLocaleDateString("En-US", {month:"long"});
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

  let calendarMothAndYear = await page.locator("nb-calendar-view-mode").textContent();
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
  while(!calendarMothAndYear.includes(expectedMonthAndYear)) {
      await page.locator(".next-month").click();
      calendarMothAndYear = await page.locator("nb-calendar-view-mode").textContent();
  }

  await page.locator("[class='day-cell ng-star-inserted']").getByText(expectedDate, {exact:true}).click();
  await expect(calenderInputField).toHaveValue(dateToAssert);
}); 
