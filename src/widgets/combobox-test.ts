import { Widget } from './widget-test';
import { by, ElementArrayFinder } from 'protractor';
import { ComboBoxItem } from './combobox-item-test';

export class ComboBox extends Widget {

	public async click(): Promise<void> {
		await this.elem.click();
	}

	public async getPage(): Promise<Array<ComboBoxItem>> {
		let content: ComboBoxItem[] = [];
		let rows: ElementArrayFinder = this.elem.all(by.css('.ag-cell-value'));
		let numberOfItems: number = await rows.count();
		for (let i = 0; i < numberOfItems; i++) {
			await content.push(new ComboBoxItem(rows.get(i)));
		}
		return content;
	}
}

