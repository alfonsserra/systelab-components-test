import { Button } from '../widgets/button-test';
import { Widget } from '../widgets/widget-test';

export class TestAttributesService {

	public static isButton(toBeDetermined: Widget): boolean {
		return toBeDetermined instanceof Button;
	}

	public static check(dialog) {
		for (var member in dialog) {
			console.log(member);
			if (!dialog.hasOwnProperty(member)) {
				let name = Reflect.getMetadata('test:name', dialog, member);
				let type = Reflect.getMetadata('test:type', dialog, member);
				let enable = Reflect.getMetadata('test:enable', dialog, member);
				let length = Reflect.getMetadata('test:length', dialog, member);
				if (name) {
					let method: any = dialog[member];
					let widget = Reflect.apply(method, dialog, []);
					if (this.isButton(widget)) {
						expect((<Button>widget).isEnabled()).toEqual(enable);
					}
				}
			}
		}
	}
}
