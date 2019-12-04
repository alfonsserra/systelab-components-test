import { browser, ElementFinder } from 'protractor';
import { JSConsole } from './js-console';
import { SystelabDialogTest } from '..';
import { FormInputElement } from '../services/form-input-element.model';
import { FormButtonElement } from '../services';

declare const allure: any;

export class Check {

	private static console = new JSConsole();

	public static init(tms: string, feature: string, version: string, user: string) {
		allure.addLabel('tms', tms);
		allure.addLabel('feature', feature);
		let capabilities = browser.driver.getCapabilities()
			.then((caps) => {
				browser.browserName = caps.get('browserName');
				allure.addLabel('browser', browser.browserName);
			});
		if (version) {
			allure.addLabel('appVersion', version);
		}
		if (user) {
			allure.addLabel('tester', user);
		}
		allure.addLabel('testExecutionDateTime', new Date().toLocaleString());
		this.console.clear();
	}

	public static async hasErrorsInConsole():Promise<boolean> {
		return await this.console.hasErrors();
	}

	public static async checkNumber(n: Promise<number>, name: string, expectedCount: number, verbose = true): Promise<void> {
		let expectation = async (n, name, expectedCount) => await expect(n)
			.toEqual(expectedCount, 'Count "' + name + '" should be ' + expectedCount)
		await this.doIt3(expectation, verbose, name + ' is equals to ' + expectedCount, n, name, expectedCount);
	}

	public static async checkBoolean(n: Promise<boolean>, name: string, verbose = true): Promise<void> {
		let expectation = async (n, name) => await expect(n).toBeTruthy(name)
		await this.doIt2(expectation, verbose, name, n, name);
	}

	public static async checkText(text: Promise<string>, name: string, expectedText: string, verbose = true): Promise<void> {
		let expectation = async (text, name, expectedText) =>await expect(text)
			.toEqual(expectedText, 'Field "' + name + '" should be ' + expectedText);
		await this.doIt3(expectation, verbose, name + ' is equals to ' + expectedText, text, name, expectedText);
	}

	public static async checkForm(form: FormInputElement[], name: string, verbose = true): Promise<void> {
		await allure.createStep('Action: Review the form ' + name, async () => {
			let expectation =async (form, name)=>{
				for(let item of form) {
					await expect(item.field.getText()).toEqual(item.value, 'Field "' + item.name + '" in form "' + name + '" should be ' + item.value);
				}
			};
			await this.doIt2(expectation, verbose, 'The form is in the correct status', form, name)
		})();
	}

	public static async checkArray(texts: string[], expectedTexts: string[], actionName: string, verbose = true): Promise<void> {
		if (verbose) {
			await allure.createStep(`Action: Review the ` + actionName + `: [${expectedTexts}]`, async () => {})();
		}
		await expect(texts).toEqual(expectedTexts);
		if (verbose) {
			await allure.createStep('It works as intended', async () => {})();
		}
	}

	public static async checkIsPresent(field: ElementFinder, name: string, verbose = true): Promise<void> {

		let expectation = async (field, name) => await expect(field.isPresent())
			.toEqual(true, name + ' is present');
		await this.doIt2(expectation, verbose, name + ' is present', field, name);
	}

	public static async checkIsNoPresent(field: ElementFinder, name: string, verbose = true): Promise<void> {

		let expectation = async (field, name) => await expect(field.isPresent())
			.toEqual(false, name + ' is not present');
		await this.doIt2(expectation, verbose, name + ' is not present', field, name);
	}

	public static async checkIsEnabled(field: ElementFinder, name: string, verbose = true): Promise<void> {

		let expectation = async (field, name) => await expect(field.isEnabled())
			.toEqual(true, name + ' is enabled');
		await this.doIt2(expectation, verbose, name + ' is enabled', field, name);
	}

	public static async checkIsDisabled(field: ElementFinder, name: string, verbose = true): Promise<void> {

		let expectation = async (field, name) => await expect(field.isEnabled())
			.toEqual(null, name + ' is disabled');
		await this.doIt2(expectation, verbose, name + ' is disabled', field, name);
	}

	public static async checkAttribute(field: ElementFinder, attributeName: string, name: string, expectedValue: string, verbose = true): Promise<void> {
		let expectation = async (field, attributeName, name, expectedValue)=> await expect(field.getAttribute(attributeName))
			.toEqual(expectedValue, 'Attribute: "' + attributeName + '" of Field: "' + name + '" should be ' + expectedValue);
		await this.doIt4(expectation, verbose, 'Attribute: "' + attributeName + '" of Field: "' + name + '" is equal ' + expectedValue, field, attributeName, name, expectedValue);
	}

	public static async checkDisableAttribute(field: ElementFinder, name: string, expectedValue: string, verbose = true): Promise<void> {
		let expectation = async (field, name, expectedValue )=>await expect(field.getAttribute('disabled'))
			.toEqual(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
		await this.doIt3(expectation, verbose, 'Field "' + name + '" is disabled is equal ' + expectedValue, field, name, expectedValue);
	}

	public static async checkDialogTitleAndButtons(page: SystelabDialogTest, expectedTitle: string, buttons?: FormButtonElement[]) {
		await page.wait();
		await this.checkText(page.getTitle(), 'Window title', expectedTitle);
		if (buttons) {
			await this.checkButtons(page, buttons);
		}
	}

	public static async checkButtons(page: SystelabDialogTest, buttons: FormButtonElement[]):Promise<void> {
			await Check.checkNumber(page.getNumberOfButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);
			let expectedTxt = '';
			for(let button of buttons) {
				if (button.exist) {
					await Check.checkBoolean(page.getButtonByName(button.name).isPresent(), `Button ${button.name} is present`, false);
					expectedTxt += (expectedTxt === '' ? '':', ') + button.name;
					if (button.enable) {
						await Check.checkBoolean(page.getButtonByName(button.name).isEnabled(), `Button ${button.name} is enabled`, false);
						expectedTxt += ' is enabled';
					} else {
						await Check.checkBoolean(page.getButtonByName(button.name).isDisabled(), `Button ${button.name} is disabled`, false);
						expectedTxt += ' is disabled';
					}
				}
			}
			if (expectedTxt !== '') {
				await allure.createStep(expectedTxt, () => {
				})();
			}
	}

	private static async doIt2(expectation: (x,y) => any, verbose, text, param1, param2): Promise<void> {
		if (verbose) {
			await allure.createStep(text, async () => {
				await expectation(param1, param2);
			})();
		} else {
			await expectation(param1, param2);
		}
	}

	private static async doIt3(expectation: (x,y,z) => any, verbose, text, param1, param2, param3): Promise<void> {
		if (verbose) {
			await allure.createStep(text, async () => {
				await expectation(param1, param2, param3);
			})();
		} else {
			await expectation(param1, param2, param3);
		}
	}

	private static async doIt4(expectation: (x,y,z,k) => any, verbose, text, param1, param2, param3, param4): Promise<void> {
		if (verbose) {
			await allure.createStep(text, async () => {
				await expectation(param1, param2, param3, param4);
			})();
		} else {
			await expectation(param1, param2, param3, param4);
		}
	}
}
