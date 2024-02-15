import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // by Tag name
  await page.locator("input").first().click();

  // by ID
  page.locator("#inputEmail1");

  //By Class value
  page.locator(".shape-rectangle");

  //By attribute
  page.locator("[placeholder='Email']");

  // Combine different selectors
  page.locator("input[placeholder='Email'].shape-rectangle");

  //By xpath (NOT RECOMMEND)
  page.locator("//*[@id='inputEmail']");

  // By partial text match
  page.locator(":text('Using')");

  // By exact text match
  page.locator(":text-is('Using the Grid')");
});

test("User facing locator", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();
  await page.getByText("Using the Grid").click();
  // await page.getByTitle("IoT Dashboard").click();
  await page.getByTestId("SignIn").click();
});
