import {test as base} from '@playwright/test';
import { PageManager } from '../pw-practice-app/page-objects/pageManager';

export type TestOptions = {
    globalsQaUrl: string
    formLayoutPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaUrl: ['', {option: true}],
    formLayoutPage: async({page}, use) => {
        await page.goto("/");
        await page.getByText('Form').first().click();
        await page.getByText("Form Layouts").click();
        await use('');
        console.log("Tear down")
    },

    pageManager: async({page,formLayoutPage} ,use) => {
        const pm = new PageManager(page);
        await use(pm);
    }
})