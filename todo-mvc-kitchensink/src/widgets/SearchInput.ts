import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/SearchInput.css';

export interface SearchInputProperties extends ThemeableProperties {
	placeholder?: string;
	onKeyUp?: (event?: KeyboardEvent) => void;
	value?: string;
}

@theme(styles)
export default class SearchInput extends ThemeableMixin(WidgetBase)<SearchInputProperties> {
	onKeyUp(this: SearchInput, event?: KeyboardEvent) {
		this.properties.onKeyUp && this.properties.onKeyUp(event);
	}

	render() {
		const { onKeyUp: onkeyup } = this;
		const { placeholder = '', value = '' } = this.properties;

		return v('input', {
			type: 'text',
			classes: this.classes(styles.search),
			placeholder,
			value,
			onkeyup
		});
	}
}
