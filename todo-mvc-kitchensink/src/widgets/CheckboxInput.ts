import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export interface CheckboxInputProperties {
	checked?: boolean;
	className?: string;
	onChange?: (event?: Event) => void;
}

export default class CheckboxInput extends WidgetBase<CheckboxInputProperties> {
	onChange() {
		this.properties.onChange && this.properties.onChange(event);
	}

	render() {
		const { checked = false, className } = this.properties;

		const classes = className ? { [className]: true } : {};

		return v('input', {
			type: 'checkbox',
			onchange: this.onChange,
			checked: checked,
			classes
		});
	}
}
