import { Widget } from './widget';

export class RadioButton extends Widget {

	public async isSelected(): Promise<boolean> {
			return await this.elem.isSelected();
	}
}
