import 'reflect-metadata';

export interface IAttributeProperties {
	type?: AttributeType;
	visible?: boolean;
	enable?: boolean;
	label?: boolean;
	mandatory?: boolean;
	length?: number;
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
