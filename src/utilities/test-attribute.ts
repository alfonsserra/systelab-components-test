import 'reflect-metadata';

export interface IAttributeProperties {
	type?: AttributeType;
	isVisible?: boolean;
	isEnable?: boolean;
	hasLabel?: boolean;
	isMandatory?: boolean;
	maxLength?: number;
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
