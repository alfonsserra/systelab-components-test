import { JSConsole } from './js-console';
import { browser } from 'protractor';

declare const allure: any;

export class TestUtil {
	private static console = new JSConsole();

	public static init(tms: string, feature: string, version: string, user: string): void {
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

	public static async hasErrorsInConsole(): Promise<boolean> {
		return await this.console.hasErrors();
	}
}
