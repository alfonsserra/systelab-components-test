import { by, ElementFinder } from 'protractor';

export class Widget {
	constructor(protected elem: ElementFinder) {
	}

	public getElement(): ElementFinder {
		return this.elem;
	}

	public async isPresent(): Promise<boolean> {
		return await this.elem.isPresent();
	}

	public async isDisplayed(): Promise<boolean> {
		return await this.elem.isDisplayed();
	}

	public async isEnabled(): Promise<boolean> {
		return await this.elem.isEnabled();
	}

	public async isDisabled(): Promise<boolean> {
		return await this.elem.isEnabled()
			.then(enabled => !enabled);
	}

	public byId(id: string): ElementFinder {
		return this.elem.element(by.id((id)));
	}

	public byTagName(id: string): ElementFinder {
		return this.elem.element(by.tagName((id)));
	}

	public byCSS(id: string): ElementFinder {
		return this.elem.element(by.css((id)));
	}

	/**
	 * Utility to wait until the Page is present and displayed
	 * @param {Widget} obj
	 */
	public async wait(): Promise<boolean> {
		return await this.elem.isPresent() && await this.elem.isDisplayed();
	}
}
