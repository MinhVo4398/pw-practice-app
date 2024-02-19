import { test, expect } from "@playwright/test";
import { delay } from 'rxjs/operators';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe.only("Form layout page", () => {
  test.describe.configure({retries:2})

  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test.only("Input fields", async ({ page }, testInfo) => {
    if(testInfo.retry) {
      // do something
    }

    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("tes2@test.com");

    //* Generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue(); // take value from input field
    expect(inputValue).toEqual("test@test.com");

    //* Locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test@test.com");
  });

  test.only("Radio button", async ({ page }) => {
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

  test('Tooltips', async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    const toolTipCard = page.locator("nb-card",{hasText:"Tooltip Placements"});
    await toolTipCard.getByRole("button",{name:"Top"}).hover();

    //check tooltips
    page.getByRole("tooltip") // work if you have a role tooltip created
    //* Way 1
    //const tooltipsValue = page.locator("nb-tooltip", {hasText:"This is a tooltip"});
    //await expect(tooltipsValue).toHaveText("This is a tooltip")

    //* Way 2
    const tooltip = await page.locator("nb-tooltip").textContent();
    expect(tooltip).toEqual("This is a tooltip");
  })

  test('dialog box', async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on("dialog", dialog =>{
        expect(dialog.message()).toEqual("Are you sure you want to delete?");
        dialog.accept();
    })    
    await page.getByRole("table").locator("tr", {hasText:"mdo@gmail.com"}).locator(".nb-trash").click();
    // Verify after delete, first is not displayed
    await expect(page.locator("table tr").first()).not.toHaveText("mdo@gmail.com");
  })
  
  test('web table', async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    //* Get the row by any text in this row
    const targetRow = page.getByRole("row", {name:"twitter@outlook.com"});
    await targetRow.locator(".nb-edit").click();
    // After click edit, locator has change to input so that cannot reuse targetRow 
    // So that use other locator like placeholder
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("35");
    await page.locator(".nb-checkmark").click();

    //* 2 Get the row based on the value in the specific column
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    const targetRowById = page.getByRole("row", {name:"11"}).filter({has: page.locator("td").nth(1).getByText("11")})
    await targetRowById.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("E-mail").clear();
    await page.locator("input-editor").getByPlaceholder("E-mail").fill("test@test.com");
    await page.locator(".nb-checkmark").click();
    await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com");
  })
  
  
});
