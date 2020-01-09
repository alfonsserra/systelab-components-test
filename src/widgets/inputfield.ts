import { Widget } from './widget';

export class InputField extends Widget {

	public async clear() {
		await this.elem.clear();
	}

	public async setText(text: string): Promise<void> {
		await this.elem.sendKeys(text);
	}

	public async getText(): Promise<string> {
		return await this.elem.getAttribute('value');
	}

	public async isEnabled(): Promise<boolean> {
		return await this.elem.isEnabled();
	}

}
