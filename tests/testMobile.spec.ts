import { test, expect } from "@playwright/test";

test.only("Input fields", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name == "mobile") {
    // Run tren mobile nen responsive, nen locator co su thay doi
    await page.locator(".sidebar-toggle").click();
  }

  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  if (testInfo.project.name == "mobile") {
    // Run tren mobile nen responsive, nen locator co su thay doi
    await page.locator(".sidebar-toggle").click();
  }

  const usingTheGridEmailInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });

  await usingTheGridEmailInput.fill("tes2@test.com");
});
