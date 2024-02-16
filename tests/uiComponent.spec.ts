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
    
})


