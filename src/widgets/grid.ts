import {Widget} from './widget';
import {by, element, ElementArrayFinder} from 'protractor';
import {ContextMenu} from './context-menu';

export class Grid extends Widget {

	public async getNumberOfRows(): Promise<number> {
		return await this.elem.element(by.className('ag-center-cols-container'))
			.all(by.css('div[role=row]'))
			.count();
	}

	public async getValuesInRow(row: number): Promise<Array<string>>  {
		const content: string[] = [];
		const cols:ElementArrayFinder = this.elem.all(by.css(`div[row-index="${row}"] div.ag-cell-value`));
		const numberOfRows: number = await cols.count();
		for (let i = 0; i < numberOfRows; i++) {
			const text: string = await cols.get(i).getText();
			content.push(text);
		}
		return content;
	}

	public async getValueInCell(row: number, columnName: string): Promise<string>  {
		const cellSelector = `[role='gridcell'][col-id='` + columnName + `']`;
		const gridCell = await element.all(by.css(cellSelector)).get(row);
        return await gridCell.getText();
	}

	public async clickOnRowMenu(row: number): Promise<void> {
		await this.clickOnLeftPinnedCell(row,'contextMenu');
	}

	public async clickOnRow(row: number, column: string): Promise<void> {
		return await this.clickOnCell(row,column);
	}

	public async clickOnHeader(): Promise<void> {
		await this.elem.element(by.className('ag-header-container'))
			.element(by.className('ag-header-row'))
			.all(by.className('ag-header-cell'))
			.click();
	}

	public async clickOnHeaderCell(columnIndex: number): Promise<void> {
		await this.elem.all(by.className('ag-header-cell-text'))
			.get(columnIndex - 1)
			.click();
	}

	public async clickOnCell(row: number, column: string): Promise<void> {
		await this.elem.element(by.className('ag-center-cols-container'))
			.element(by.css(`div[row-index="${row}"]`))
			.all(by.css(`div[col-id="${column}"]`))
			.click();
	}

	public async clickOnLeftPinnedCell(row: number, column: string): Promise<void> {
		await this.elem.element(by.className('ag-pinned-left-cols-container'))
			.element(by.css(`div[row-index="${row}"]`))
			.all(by.css(`div[col-id="${column}"]`))
			.click();
	}

	public async selectRow(row: number): Promise<void> {
		await this.elem.all(by.css(`div[row-index="${row}"] div[col-id="selectCol"] input`))
			.click();
	}

	public async getHeaderCaptions(): Promise<Array<string>> {
		let content: string[] = [];
		const cols: ElementArrayFinder = this.elem.all(by.className('ag-header-cell'));
		const numberOfFields: number = await cols.count();
		for (let i = 0; i < numberOfFields; i++) {
			const text: string = await cols.get(i).getText();
			content.push(text);
		}
		return content;
	}

	public async getHeaderCells(): Promise<Array<Element>> {
		let content: Element[] = [];
		const cols: ElementArrayFinder = this.elem.all(by.className('ag-header-cell'));
		const numberOfFields: number = await cols.count();
		for (let i = 0; i < numberOfFields; i++) {
			content.push(await cols.get(i));
		}
		return content;
	}

	public async getGridHeader(): Promise<Array<string>> {
		// See error https://github.com/angular/protractor/issues/3818
		const cols: any = this.elem.all(by.css('.ag-header-row .ag-header-cell-label'));
		return await cols.getText();
	}

	public getMenu(): ContextMenu {
		return new ContextMenu(this.elem.element(by.tagName('systelab-grid-context-menu')));
	}
}
