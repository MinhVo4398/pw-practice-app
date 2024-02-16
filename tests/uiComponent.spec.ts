import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe('Form layout page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click(); 
    })
    test('Input fields', async ({ page }) => {
        const usingtheGridEmailInput  = page.locator("nb-card",{hasText:"Using the Grid"}).getByRole("textbox",{name:"Email"})

        await usingtheGridEmailInput.fill("test@test.com");
        
        //* Generic assertion
        const inputValue = await usingtheGridEmailInput.inputValue(); // take value from input field
        expect(inputValue).toEqual("test@test.com");

        //* Locator assertion
        await expect(usingtheGridEmailInput).toHaveValue("test@test.com");
    })

    test('Radio button', async ({ page }) => {
        const usingtheGridForm  = page.locator("nb-card",{hasText:"Using the Grid"});

       // await usingtheGridForm.getByLabel("Option 1").check({force: true});
        await usingtheGridForm.getByRole("radio", {name:"Option 1"}).check({force:true});
        //* First way validation
        const radioStatus = await usingtheGridForm.getByRole("radio", {name:"Option 1"}).isChecked();
        expect(radioStatus).toBeTruthy();

        //* Second way validation
        await expect(usingtheGridForm.getByRole("radio", {name:"Option 1"})).toBeChecked();

        //Validate choose option 2, and verify option 1 is not checked
        await usingtheGridForm.getByRole("radio", {name:"Option 2"}).check({force:true});
        expect(await usingtheGridForm.getByRole("radio", {name:"Option 1"}).isChecked()).toBeFalsy();
        expect(await usingtheGridForm.getByRole("radio", {name:"Option 2"}).isChecked()).toBeTruthy();

    })
    
    
})


