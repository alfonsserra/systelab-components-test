import { Widget } from './widget-test';
import { by, ElementArrayFinder } from 'protractor';
import { ContextMenu } from './context-menu-test';

export class Grid extends Widget {

	public async getNumberOfRows(): Promise<number> {
		return await this.elem.element(by.className('ag-center-cols-container'))
			.all(by.css('div[role=row]'))
			.count();
	}

	public async getRow(row: number): Promise<Array<string>> {
		let content: string[] = [];
		let cols:ElementArrayFinder = this.elem.all(by.css('div[row-index="' + row + '"] div.ag-cell-value'));
		let numberOfRows: number = await cols.count();
		for (let i = 0; i < numberOfRows; i++) {
			let text: string = await cols.get(i).getText();
			content.push(text);
		}
		return content;
	}

	public async getValuesInRow(row: number): Promise<Array<string>>  {
		return await this.getRow(row);
	}

	public async clickOnRowMenu(row: number): Promise<void> {
		await this.clickOnRow(row,'contextMenu');
	}
	public async clickOnRow(row: number, column: string): Promise<void> {

		return await this.elem.element(by.className('ag-center-cols-container'))
			.element(by.css('div[row-index="' + row + '"]'))
			.all(by.css('div[col-id="' + column + '"]'))
			.click();
	}

	public async clickOnHeader(): Promise<void> {
		await this.elem.element(by.className('ag-header-container'))
			.element(by.className('ag-header-row'))
			.all(by.className('ag-header-cell'))
			.click();
	}

	public async clickOnCell(row: number, col: string): Promise<void> {
		await this.elem.element(by.className('ag-center-cols-container'))
			.element(by.css('div[row-index="' + row + '"]'))
			.all(by.css('div[col-id="' + col + '"]'))
			.click();
	}

	public async getGridHeader(): Promise<Array<string>> {
		// See error https://github.com/angular/protractor/issues/3818
		let cols:any = this.elem.all(by.css('.ag-header-container .ag-header-cell-label'));
		return await cols.getText();
	}

	public getMenu(): ContextMenu {
		return new ContextMenu(this.elem.element(by.tagName('systelab-grid-context-menu')));
	}
}
