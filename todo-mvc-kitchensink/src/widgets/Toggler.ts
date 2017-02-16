import { v } from '@dojo/widget-core/d';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/Toggler.css';

export interface TogglerProperties {
	checked?: boolean;
	onChange?: (event?: Event) => void;
}

@theme(styles)
export class Toggler extends ThemeableMixin(WidgetBase)<TogglerProperties> {
	onChange() {
		this.properties.onChange && this.properties.onChange(event);
	}

	render() {
		const { checked = false } = this.properties;

		return v('input', {
			type: 'checkbox',
			onchange: this.onChange,
			checked: checked,
			classes: this.classes(styles.toggle).get()
		});
	}
}

export default Toggler;
