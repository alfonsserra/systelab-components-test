import { by } from 'protractor';
import { Button } from './button';
import { Widget } from './widget';

export class Popup extends Widget {

	public async getText(): Promise<string> {
		return await this.elem.getText();
	}

	private getButton(text: string): Button {
		return new Button(this.elem
			.element(by.tagName('systelab-dialog-bottom'))
			.element(by.buttonText(text)));
	}
}
