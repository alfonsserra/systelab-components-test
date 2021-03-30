import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';

export class BasePage {

    protected current:ElementFinder;

    constructor(private selector: string) {
        this.current=element(by.tagName(this.selector));
    }

    public getElementFinder(): ElementFinder {
        return this.current;
    }

    public async waitToBePresent(): Promise<void> {
        await browser.wait(ExpectedConditions.presenceOf(this.current));
    }
}
