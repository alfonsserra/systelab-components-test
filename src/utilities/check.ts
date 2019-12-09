import { ElementFinder } from 'protractor';

declare const allure: any;

class MyExpectation {
	constructor(public reason: string) {
	}
	public expect<T>(actual: T): jasmine.Matchers<T> {
		if (this.reason) {
			return allure.createStep(this.reason, function () {
				return expect(actual);
			})();
		} else {
			return expect(actual);
		}
	}
}

export function because(reason: string): MyExpectation {
	return new MyExpectation(reason);
}

export class Check {

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
