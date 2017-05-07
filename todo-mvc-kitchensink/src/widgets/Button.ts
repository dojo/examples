import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/Button.m.css';

export interface ButtonProperties extends ThemeableProperties {
	label: string;
	onClick?: () => void;
}

@theme(styles)
export default class Button extends ThemeableMixin(WidgetBase)<ButtonProperties> {
	onClick() {
		this.properties.onClick && this.properties.onClick();
	}

	render() {
		const { label } = this.properties;

		return v('button', {
			innerHTML: label,
			onclick: this.onClick,
			classes: this.classes(styles.button, styles.button2)
		});
	}
}
