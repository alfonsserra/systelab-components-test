import {by, ElementFinder, Key} from "protractor";
import { Widget } from './widget';

export class Datepicker extends Widget {
	public async isPresent(): Promise<boolean> {
		return await this.getInputElement().isPresent();
	}

	public async getValue(): Promise<string> {
		return await this.getInputElement()
			.getAttribute("value");
	}

	public async setValue(value: string): Promise<void> {
		await this.clear(this.getInputElement());
		await this.getInputElement().sendKeys(value);
		await this.getInputElement().sendKeys(Key.TAB);
	}

	private getInputElement(): ElementFinder {
		return this.elem.element(by.css("input"));
	}

	private async clear(elem): Promise<void> {
		const currentText=await this.getValue();
		const len = currentText.length;
		const backspaceSeries = Array(len + 1).join(Key.BACK_SPACE);
		await elem.sendKeys(backspaceSeries);
	}

}
