import { by } from 'protractor';
import { Widget } from './widget-test';
import { Button } from './button-test';
import { FormInputElement } from '../services';
import { InputableInterface } from './inputable.interface';
import 'reflect-metadata';

export interface IAttributeProperties {
	name?: string;
	value?: string;
	type?: AttributeType;
	isVisible?: boolean;
}

export enum AttributeType {
	Text,
	Date,
	Number,
	Password
}

export const ATTRIBUTE_PREFIX = 'test:';

/**
 * Adds attribute metadata to a property
 * @param {IAttributeProperties} attributes
 * @returns {(target: any, propertyKey: string) => void}
 * @constructor
 */
export function TestAttribute(attributes: IAttributeProperties) {
	return (target: object, propertyKey: string) => {
		if (attributes !== undefined && attributes !== null) {
			Object.keys(attributes).forEach(key => {
				Reflect.defineMetadata(`${ATTRIBUTE_PREFIX}${key}`, attributes[key], target, propertyKey);
			});
		}
	};
}

export class SystelabDialogTest extends Widget {

	public async getNumberOfButtons():Promise<number> {
		return await this.elem
			.element(by.tagName('systelab-dialog-bottom'))
			.all(by.tagName('button')).count();
	}

	public async getTitle(): Promise<string> {
		return await this.elem
			.element(by.tagName('systelab-dialog-header'))
			.element(by.className('slab-dialog-header')).getText();
	}

	public getButtonClose() {
		return this.elem
			.element(by.className('slab-dialog-close'));
	}

	public async back() {
		await this.getButtonClose().click();
	}

	public getButtonByName(name: string): Button {
		return new Button(this.elem
			.element(by.buttonText(name)));
	}

	public getInputElements(i?: number): FormInputElement[] {
		const form: FormInputElement[] = [];
		for (var member in this) {
			if (!this.hasOwnProperty(member)) {
				let name = Reflect.getMetadata('test:name', this, member);
				let type = Reflect.getMetadata('test:type', this, member);
				let value = Reflect.getMetadata('test:value', this, member);
				if (name) {
					let method: any = this[member];
					let widget = Reflect.apply(method, this, []);
					form.push({field: <InputableInterface>widget, name: name, value: value})
				}
			}
		}
		return form;
	}
}
