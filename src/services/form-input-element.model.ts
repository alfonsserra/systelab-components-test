import { InputableInterface } from '../widgets/inputable.interface';

export interface FormInputElement {
	field: InputableInterface;
	name: string;
	value: string;
}
