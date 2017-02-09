import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export interface SearchInputProperties {
	placeholder?: string;
	onKeyUp?: (event?: KeyboardEvent) => void;
	value?: string;
}

export default class SearchInput extends WidgetBase<SearchInputProperties> {
	onKeyUp(this: SearchInput, event?: KeyboardEvent) {
		this.properties.onKeyUp && this.properties.onKeyUp(event);
	}

	render() {
		const { onKeyUp: onkeyup } = this;
		const { placeholder = '', value = ''} = this.properties;

		return v('input', {
			type: 'text',
			classes: {
				search: true
			},
			placeholder,
			value,
			onkeyup
		});
	}
}
