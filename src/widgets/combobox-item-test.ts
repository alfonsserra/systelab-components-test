import { Widget } from './widget-test';
import { by } from 'protractor';

export class ComboBoxItem extends Widget {

	public async click():Promise<void> {
		await this.elem.click();
	}

}

