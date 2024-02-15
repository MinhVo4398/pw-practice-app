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

test.only("Locating child elements", async ({ page }) => {
  await page.locator("nb-card nb-radio :text-is('Option 1')").click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(":text-is('Option 2')")
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("Locating parent element", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing locator", async ({ page }) => {
  const basicForm = await page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  await basicForm
    .filter({ hasText: "Basic Form" })
    .getByRole("textbox", { name: "Password" })
    .fill("Welcome123");
  await basicForm.locator("nb-checkbox").click();

  await basicForm.filter({ hasText: "Basic Form" }).getByRole("button").click();

  await expect(emailField).toHaveValue("test@test.com");
});

test("Extracting value", async ({ page }) => {
  // single text value
  const basicForm = await page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" });

  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toEqual("Submit");

  // get all text value
  const allRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtonLabels).toContain("Option 1");

  //input value
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual("test@test.com");

  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toEqual("Email");
});
