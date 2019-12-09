import { by } from 'protractor';
import { Widget } from './widget-test';
import { Button } from './button-test';
import { MesssagePopup } from './message-popup-test';

export class SystelabDialogTest extends Widget {

	public async getNumberOfButtons():Promise<number> {
		return await this.elem
			.element(by.tagName('systelab-dialog-bottom'))
			.all(by.tagName('button')).count();
	}

	public async getTitle(): Promise<string> {
		return await this.elem
			.element(by.tagName('systelab-dialog-header'))
			.element(by.className('slab-dialog-header')).getText();
	}

	public getButtonClose() {
		return this.elem
			.element(by.className('slab-dialog-close'));
	}

	public async back() {
		await this.close();
	}

	public async close() {
		await this.getButtonClose().click();
	}

	public getButtonByName(name: string): Button {
		return new Button(this.elem
			.element(by.buttonText(name)));
	}

	public getMesssagePopup(): MesssagePopup {
		return new MesssagePopup();
	}
}
