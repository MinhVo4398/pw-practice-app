import { Page , expect} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage  extends HelperBase{
    constructor(page : Page) {
        super(page);
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){   
        const calenderInputField =  this.page.getByPlaceholder("Form Picker");
        await calenderInputField.click();
        const dateToAssert =  await this.selectDateInThenCalendar(numberOfDaysFromToday);         
        await expect(calenderInputField).toHaveValue(dateToAssert);
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calenderInputField =  this.page.getByPlaceholder("Range Picker");
        await calenderInputField.click();
        const dateToAssertStart =  await this.selectDateInThenCalendar(startDayFromToday);    
        const dateToAssertEnd =  await this.selectDateInThenCalendar(startDayFromToday);   
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
        await expect(calenderInputField).toHaveValue(dateToAssert);
    }

    private async selectDateInThenCalendar(numberOfDaysFromToday: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday); // get numberOfDaysFromToday days from today
        const expectedDate = date.getDate().toString(); // convert number to String
        const expectedMonthShot = date.toLocaleDateString("En-US",{month:"short"}); // Ex Jul (July);
        const expectedMonthLong = date.toLocaleDateString("En-US", {month:"long"});
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
      
        let calendarMothAndYear = await this.page.locator("nb-calendar-view-mode").textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calendarMothAndYear.includes(expectedMonthAndYear)) {
        await this.page.locator(".next-month").click();
            calendarMothAndYear = await this.page.locator("nb-calendar-view-mode").textContent();
        }
      
        await this.page.locator(".day-cell.ng-star-inserted").getByText(expectedDate, {exact:true}).click();
        return dateToAssert;
    }
}