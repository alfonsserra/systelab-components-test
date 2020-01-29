import { Widget } from './widget';
import { by, ElementArrayFinder } from 'protractor';

export class ComboBox extends Widget {

	public async click(): Promise<void> {
		await this.elem.click();
	}

	public async getOptions(): Promise<Array<string>> {
		let content: string[] = [];
		let rows: ElementArrayFinder = this.elem.all(by.css('.ag-cell-value'));
		let numberOfItems: number = await rows.count();
		for (let i = 0; i < numberOfItems; i++) {
			let text: string = await rows.get(i).getText();
			content.push(text);
		}
		return content;
	}

	public async selectOptionByNumber(i: number): Promise<void> {
		await this.elem.all(by.css(`[role='row'][row-index='` + i + `']`)).get(1).click();
	}

	public async selectOptionByText(text: string): Promise<void> {
		await this.elem.all(by.cssContainingText('.ag-cell-value',text)).click();
	}

}

