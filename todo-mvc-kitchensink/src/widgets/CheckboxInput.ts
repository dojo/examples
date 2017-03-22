import { v } from '@dojo/widget-core/d';
import { ThemeableMixin, theme, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/CheckboxInput.m.css';

export interface CheckboxInputProperties extends ThemeableProperties {
	checked?: boolean;
	onChange?: (event?: Event) => void;
}

@theme(styles)
export default class CheckboxInput extends ThemeableMixin(WidgetBase)<CheckboxInputProperties> {
	onChange(event: Event) {
		this.properties.onChange && this.properties.onChange(event);
	}

	render() {
		const { checked = false } = this.properties;

		return v('input', {
			type: 'checkbox',
			onchange: this.onChange,
			checked: checked,
			classes: this.classes(styles.checkbox)
		});
	}
}
