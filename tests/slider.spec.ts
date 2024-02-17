import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("Slider test", async ({ page }) => {
  //* Update attribute
  /*
    const tempGauge = page.locator("[tabtitle='Temperature'] ngx-temperature-dragger circle");
    await tempGauge.evaluate( node => {
      node.setAttribute("cx","232.630")
      node.setAttribute("cy","232.630")
    })

    await tempGauge.click();
    */

    //* Mouse movement
    const tempBox = page.locator("[tabtitle='Temperature'] ngx-temperature-dragger");
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x= box.x + box.width/2
    const y = box.y + box.height /2
    await page.mouse.move(x,y)
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x+100, y+100);
    await page.mouse.up();
    await expect(tempBox).toContainText("30")
}); 
