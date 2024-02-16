import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe("Form layout page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("Input fields", async ({ page }) => {
    const usingtheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingtheGridEmailInput.fill("test@test.com");

    //* Generic assertion
    const inputValue = await usingtheGridEmailInput.inputValue(); // take value from input field
    expect(inputValue).toEqual("test@test.com");

    //* Locator assertion
    await expect(usingtheGridEmailInput).toHaveValue("test@test.com");
  });

  test("Radio button", async ({ page }) => {
    const usingtheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // await usingtheGridForm.getByLabel("Option 1").check({force: true});
    await usingtheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    //* First way validation
    const radioStatus = await usingtheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeTruthy();

    //* Second way validation
    await expect(
      usingtheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    //Validate choose option 2, and verify option 1 is not checked
    await usingtheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    expect(
      await usingtheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
    expect(
      await usingtheGridForm
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();
  });

  test("checkboxes", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    await page.getByRole("checkbox",{"name":"Hide on click"}).uncheck({force:true});
    await page.getByRole("checkbox",{"name":"Prevent arising of duplicate toast"}).check({force:true});

    //* Check all the checkboxes on the page
    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) { //all() return a promise ==> use await
        await box.check({force:true});
        expect(await box.isChecked()).toBeTruthy();
    }
  });

  test('List and dropdown', async ({ page }) => {
    const dropdownMenu = page.locator("ngx-header nb-select");
    await dropdownMenu.click();

    page.getByRole("list"); // when the list has a UL tag
    page.getByRole("listitem"); // when the list has LI tag

    // const optionList = page.getByRole("list").locator("nb-option");
    const optionList = page.locator("nb-option-list nb-option");
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await optionList.filter({hasText:"Dark"}).click();
    
    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("background-color","rgb(34, 43, 69)");

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }


    await dropdownMenu.click();
    for(const color in colors) {
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS("background-color",colors[color]);
        if(color != "Corporate") {
            await dropdownMenu.click();
        }
   
    }

  })
  
});
