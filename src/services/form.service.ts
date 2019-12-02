import { TestUtil } from '../utilities/test-util';
import { InputableInterface } from '../widgets/inputable.interface';
import { SystelabDialogTest } from '../widgets/systelab-dialog-test';
import { FormInputElement } from './form-input-element.model';
import { FormButtonElement } from './form-input-button.model';

declare const allure: any;

export class FormService {

	public static async checkDialogTitleAndButtons(page: SystelabDialogTest, expectedTitle: string, buttons?: FormButtonElement[]) {
		await TestUtil.checkWidgetPresentAndDisplayed(page,expectedTitle);
		await TestUtil.checkText(page.getTitle(), 'Window title', expectedTitle);
		if (buttons) {
			await FormService.checkButtons(page, buttons);
		}
	}

	public static async removeValuesInForm(form: FormInputElement[], name: string) {
		await allure.createStep('Action: Remove all values in form ' + name, async () => {
			for (let input of form) {
				await this.clearField(input.field);
			}
		})();
	}

	public static async fillForm(form: FormInputElement[], name: string):Promise<void> {
		await allure.createStep('Action: Fill form ' + name, async () => {
			for (let input of form) {
				await input.field.setText(input.value);
				await TestUtil.checkText(input.field.getText(), 'Field "' + input.name + '" in form "' + name + '" should be ' + input.value, input.value, false);
			}
		})();
	}

	public static async clearField(widget: InputableInterface):Promise<void> {
		await widget.clear();
	}

	public static async fillField(widget: InputableInterface, name: string, value: string):Promise<void> {
		await allure.createStep('Action: Fill ' + name + ' with value ' + value, async () => {
			await widget.setText(value);
		})();
	}

	public static async checkButtons(page: SystelabDialogTest, buttons: FormButtonElement[]):Promise<void> {
		await allure.createStep('Action: Review the button name and status:' + JSON.stringify(buttons), async () => {

			await TestUtil.checkNumber(page.getNumberOfButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);
			for(let button of buttons) {
					await TestUtil.checkBoolean(page.getButtonByName(button.name).isPresent(), `Button ${button.name} is present`);
			}

			for(let button of buttons.filter((b) => b.enable)) {
					await TestUtil.checkBoolean(page.getButtonByName(button.name).isEnabled(), `Button ${button.name} is enabled`);
			}

			for(let button of buttons.filter((b) => !b.enable)) {
					await TestUtil.checkBoolean(page.getButtonByName(button.name).isDisabled(), `Button ${button.name} is disabled`);
			}
			await allure.createStep('The buttons are in the correct status', () => {
			})();
		})();
	}
}

