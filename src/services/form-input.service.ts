import { FormInputElement } from './form-input-element.model';

declare const allure: any;

export class FormInputService {

	public static async fillValues(form: FormInputElement[], name: string): Promise<void> {
		await allure.createStep('Action: Fill form ' + name, async () => {
			for (let input of form) {
				await input.field.setText(input.value);
			}
		})();
	}

	public static async removeValues(form: FormInputElement[], name: string) {
		await allure.createStep('Action: Remove all values in form ' + name, async () => {
			for (let input of form) {
				await input.field.clear();
			}
		})();
	}
}

