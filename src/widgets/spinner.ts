import {by} from "protractor";
import {Widget} from "./widget";

export class Spinner extends Widget {

	public async clear(): Promise<void>  {
		await this.elem.element(by.tagName('input')).clear();
	}

	public async setText(text: string): Promise<void> {
		await this.elem.element(by.tagName('input')).sendKeys(text);
	}

	public async getText(): Promise<string> {
		return await this.elem.element(by.tagName('input')).getAttribute('value');
	}

	public async increase(): Promise<void> {
		await this.elem.element(by.className('input-group-append')).click();
	}

	public async decrease(): Promise<void> {
		await this.elem.element(by.className('input-group-prepend')).click();
	}

}
