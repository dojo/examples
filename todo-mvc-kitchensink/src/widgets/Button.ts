import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export interface ButtonProperties {
	label: string;
	onClick?: () => void;
	className?: string;
}

export default class Button extends WidgetBase<ButtonProperties> {
	onClick() {
		this.properties.onClick && this.properties.onClick();
	}

	render() {
		const { label, className } = this.properties;

		const classes = className ? { [className]: true } : {};

		return v('button', {
			innerHTML: label,
			onclick: this.onClick,
			classes
		});
	}
}
