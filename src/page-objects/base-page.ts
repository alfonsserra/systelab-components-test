import { by, element, ElementFinder } from 'protractor';

export class BasePage {

    protected current:ElementFinder;

    constructor(private selector: string) {
        this.current=element(by.tagName(this.selector));
    }

    public getElementFinder() {
        return this.current;
    }

    /**
     * Utility to wait until the Page is present and displayed
     * @param {BasePage} obj
     */
    public async wait(): Promise<boolean> {
        return await this.current.isPresent() && await this.current.isDisplayed();
    }

}
