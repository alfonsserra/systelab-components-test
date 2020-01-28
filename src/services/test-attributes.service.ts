import { Button } from '../widgets/button';
import { Widget } from '../widgets/widget';
import { InputField } from '../widgets/inputfield';
import { BasePage } from '../page-objects';

export class TestAttributesService {

	public static async check(container: Widget | BasePage) {
		const methods: Array<string> = Object.getOwnPropertyNames(Object.getPrototypeOf(container));

		for (let method of methods) {
			const name = Reflect.getMetadata('test:name', container, method);
			const type = Reflect.getMetadata('test:type', container, method);
			const enable = Reflect.getMetadata('test:enable', container, method);
			const visible = Reflect.getMetadata('test:visible', container, method);
			const label = Reflect.getMetadata('test:label', container, method);
			const mandatory = Reflect.getMetadata('test:mandatory', container, method);
			const length = Reflect.getMetadata('test:length', container, method);
			if (name) {
				const widget = await Reflect.apply(container[method], container, []);
				if (this.isButton(widget)) {
					await this.checkButton(widget as Button, enable, visible);
				} else if (this.isInputField(widget)) {
					await this.checkInputField(widget as InputField, enable, visible, label, mandatory, length);
				}
			}
		}
	}

	private static async checkButton(button: Button, enable: boolean, visible: boolean) {
		if (enable !== undefined) {
			await expect(button.isEnabled())
				.toEqual(enable);
		}
		if (visible !== undefined) {
			await expect(button.isDisplayed())
				.toEqual(visible);
		}
	}

	private static async checkInputField(input: InputField, enable: boolean, visible: boolean, label: boolean, mandatory: boolean, length: number) {
		if (enable !== undefined) {
			await expect(input.isEnabled())
				.toEqual(enable);
		}
		if (visible !== undefined) {
			await expect(input.isDisplayed())
				.toEqual(visible);
		}
		if (length !== undefined) {
			const text = this.getRandomWord(length);
			await input.clear();
			await input.setText(text);
			await expect(input.getText())
				.toEqual(text);

			const text2 = this.getRandomWord(length + 1);
			await input.clear();
			await input.setText(text2);
			await expect(input.getText())
				.toEqual(text2.substring(0, length));
		}
	}

	private static isButton(widget: Widget): boolean {
		return widget instanceof Button;
	}

	private static isInputField(widget: Widget): boolean {
		return widget instanceof InputField;
	}

	private static getRandomWord(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
