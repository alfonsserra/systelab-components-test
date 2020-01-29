import { Widget } from './widget';
import { by, ElementArrayFinder } from 'protractor';

export class MultipleComboBox extends Widget {

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
		 await this.elem.all(by.css('.ag-selection-checkbox'))
		 	.get(i).click();
	}

	public async selectOptionByText(text: string): Promise<void> {
		let index = -1;
		let rows: ElementArrayFinder = this.elem.all(by.css('.ag-cell-value'));
		let numberOfItems: number = await rows.count();
		for (let i = 0; i < numberOfItems; i++) {
			let cellText: string = await rows.get(i).getText();
			if  ( cellText == text )  {
				index = i;
			}
		}
		if ( index != -1 ) {
			await this.selectOptionByNumber(index);
		}
	}

}

