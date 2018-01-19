import { v } from '@dojo/widget-core/d';
import { WithTarget } from './interfaces';

export function createInputNode(value: string, placeholder: string, oninput: (event: WithTarget) => void) {
	return v('fieldset', { classes: 'form-group' }, [
		v('input', {
			value,
			classes: ['form-control', 'form-control-lg'],
			type: 'text',
			placeholder,
			oninput
		})
	]);
}
