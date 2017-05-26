import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/Toggler.m.css';

export interface TogglerProperties extends ThemeableProperties {
	checked?: boolean;
	onChange?: (event?: Event) => void;
}

@theme(styles)
export class Toggler extends ThemeableMixin(WidgetBase)<TogglerProperties> {
	onChange(event: Event) {
		this.properties.onChange && this.properties.onChange(event);
	}

	render() {
		const { checked = false } = this.properties;

		return v('input', {
			type: 'checkbox',
			onchange: this.onChange,
			checked: checked,
			classes: this.classes(styles.toggle)
		});
	}
}

export default Toggler;
