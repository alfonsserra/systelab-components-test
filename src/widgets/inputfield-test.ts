import { Widget } from './widget-test';
import { InputableInterface } from './inputable.interface';

export class InputField extends Widget implements InputableInterface {

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
