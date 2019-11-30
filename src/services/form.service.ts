import { TestUtil } from '../utilities/test-util';
import { InputableInterface } from '../widgets/inputable.interface';
import { SystelabDialogTest } from '../widgets/systelab-dialog-test';
import { FormInputElement } from './form-input-element.model';
import { FormButtonElement } from './form-input-button.model';

declare const allure: any;

export class FormService {

	public static checkDialogTitleAndButtons(page: SystelabDialogTest, expectedTitle: string, buttons?: FormButtonElement[]) {
		TestUtil.checkWidgetPresentAndDisplayed(page,expectedTitle);
		TestUtil.checkText(page.getTitle(), 'Window title', expectedTitle);
		if (buttons) {
			FormService.checkButtons(page, buttons);
		}
	}

	public static removeValuesInForm(form: FormInputElement[], name: string) {
		allure.createStep('Action: Remove all values in form ' + name, () => {
			form.forEach((input) => {
				this.clearField(input.field);
			});
		})();
	}

	public static fillForm(form: FormInputElement[], name: string) {
		allure.createStep('Action: Fill form ' + name, () => {
			form.forEach((input) => {
				input.field.setText(input.value);
				TestUtil.checkText(input.field.getText(), 'Field "' + input.name + '" in form "' + name + '" should be ' + input.value, input.value, false);
			});
		})();
	}

	public static clearField(widget: InputableInterface) {
		widget.clear();
	}

	public static fillField(widget: InputableInterface, name: string, value: string) {
		allure.createStep('Action: Fill ' + name + ' with value ' + value, () => {
			widget.setText(value);
		})();
	}

	public static checkButtons(page: SystelabDialogTest, buttons: FormButtonElement[]) {
		allure.createStep('Action: Review the button name and status:' + JSON.stringify(buttons), () => {

			TestUtil.checkNumber(page.getNumberOfButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);

			buttons.forEach((buttonElem) => {
				TestUtil.checkBoolean(page.getButtonByName(buttonElem.name).isPresent(), `Button ${buttonElem.name} is present`);
			});

			buttons.filter((b) => b.enable)
				.forEach((buttonElem) => {
					TestUtil.checkBoolean(page.getButtonByName(buttonElem.name).isEnabled(), `Button ${buttonElem.name} is enabled`);
				});
			buttons.filter((b) => !b.enable)
				.forEach((buttonElem) => {
					TestUtil.checkBoolean(page.getButtonByName(buttonElem.name).isDisabled(), `Button ${buttonElem.name} is disabled`);
				});
			allure.createStep('The buttons are in the correct status', () => {
			})();
		})();
	}
}

