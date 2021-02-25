import { by, element } from 'protractor';
import { Widget } from './widget';
import { Button } from './button';

export class MessagePopup extends Widget {
	public BUTTON_CLOSE = 0;
	public BUTTONS_YES_NO = 1;

	constructor() {
		super(element(by.tagName('dialog-view')));
	}

	public async getTextMessage() {
		return await this.byId('popup-message').getText();
	}

	public getButtonYes(): Button {
		return this.getButton('Yes');
	}

	public getButtonNo(): Button {
		return this.getButton('No');
	}

	public getButtonClose(): Button {
		return this.getButton('Close');
	}

	public async close() {
		await this.getButtonClose().click();
	}

	private getButton(text: string): Button {
		return new Button(this.elem
			.element(by.tagName('systelab-dialog-bottom'))
			.element(by.buttonText(text))); // this depends on the system locale...
	}
}
