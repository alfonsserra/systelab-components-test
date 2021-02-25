import { by } from 'protractor';
import { Widget } from './widget';
import { Button } from './button';
import { MessagePopup } from './message-popup';

export class Dialog extends Widget {

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

	public getButtonClose(): Button {
		return new Button(this.elem
			.element(by.className('slab-dialog-close')));
	}

	public async close() {
		await this.getButtonClose().click();
	}

	public getButtonByName(name: string): Button {
		return new Button(this.elem
			.element(by.buttonText(name)));
	}

	public getMessagePopup(): MessagePopup {
		return new MessagePopup();
	}
}
