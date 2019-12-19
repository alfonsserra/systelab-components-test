import { Button } from '../widgets/button-test';
import { Widget } from '../widgets/widget-test';
import { InputField } from '../widgets/inputfield-test';
import { BasePage } from '../page-objects';

export class TestAttributesService {

	public static async check(dialog: Widget | BasePage) {
		const m: Array<string> = Object.getOwnPropertyNames(Object.getPrototypeOf(dialog));

		for (let i = 0; i < m.length; i++) {
				let name = Reflect.getMetadata('test:name', dialog, m[i]);
				let type = Reflect.getMetadata('test:type', dialog, m[i]);
				let enable = Reflect.getMetadata('test:enable', dialog, m[i]);
				let visible = Reflect.getMetadata('test:visible', dialog, m[i]);
				let label = Reflect.getMetadata('test:label', dialog, m[i]);
				let mandatory = Reflect.getMetadata('test:mandatory', dialog, m[i]);
				let length = Reflect.getMetadata('test:length', dialog, m[i]);
				if (name) {
					let method: any = dialog[m[i]];
					let widget = await Reflect.apply(method, dialog, []);
					if (this.isButton(widget)) {
						await this.checkButton(<Button>widget, enable, visible)
					} else if (this.isInputField(widget)) {
						await this.checkInputField(<InputField>widget, enable, visible, label, mandatory, length)
					}
				}
		}
	}

	private static async checkButton(button: Button, enable: boolean, visible: boolean) {
		if (enable!==undefined) {
			await expect(button.isEnabled()).toEqual(enable);
		}
		if (visible!==undefined) {
			await expect(button.isDisplayed()).toEqual(visible);
		}
	}

	private static async checkInputField(input: InputField, enable: boolean, visible: boolean, label: boolean, mandatory: boolean, length: number) {
		if (enable!==undefined) {
			await expect(input.isEnabled()).toEqual(enable);
		}
		if (visible!==undefined) {
			await expect(input.isDisplayed()).toEqual(visible);
		}
		if (length!==undefined) {
			let text=this.random(length);
			await input.clear();
			await input.setText(text);
			await expect(input.getText()).toEqual(text);

			let text2=this.random(length+1);
			await input.clear();
			await input.setText(text2);
			await expect(input.getText()).toEqual(text2.substring(0,length));
		}
	}

	private static isButton(widget: Widget): boolean {
		return widget instanceof Button;
	}

	private static isInputField(widget: Widget): boolean {
		return widget instanceof InputField;
	}

	private static random(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
