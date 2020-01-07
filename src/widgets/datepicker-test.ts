import { by, ElementFinder, protractor } from "protractor";
import { Widget } from './widget-test';

export class Datepicker extends Widget
{
    public async isPresent(): Promise<boolean>
    {
        return await this.getInputElement().isPresent();
    }

    public async getValue(): Promise<string>
    {
        return await this.getInputElement().getAttribute("value");
    }

    public async setValue(value: string): Promise<void>
    {
        await this.getInputElement().clear();
        await this.getInputElement().sendKeys(value);
        await this.getInputElement().sendKeys(protractor.Key.TAB);
    }

    private getInputElement(): ElementFinder {
        return this.elem.element(by.css("input"));
    }
}
