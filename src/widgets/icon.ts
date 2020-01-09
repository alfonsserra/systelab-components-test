import { Widget } from './widget';

export class Icon extends Widget {
	public async click(): Promise<void> {
		await this.elem.click();
	}
}
