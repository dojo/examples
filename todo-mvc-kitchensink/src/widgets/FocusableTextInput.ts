import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/FocusableTextInput.m.css';

export interface FocusableTextProperties {
	focused?: boolean;
	placeholder?: string;
	value?: string;
	onKeyUp?: (event?: KeyboardEvent) => void;
	onInput?: (event?: KeyboardEvent) => void;
	onBlur?: (event?: Event) => void;
}

@theme(styles)
export default class FocusableTextInput extends ThemeableMixin(WidgetBase)<FocusableTextProperties> {
	tagName = 'input';

	afterCreate(element: HTMLInputElement) {
		const focused = this.properties.focused;
		if (focused) {
			setTimeout(() => element.focus(), 0);
		}
		else if (!focused && document.activeElement === element) {
			element.blur();
		}
	}

	onBlur(event?: Event) {
		this.properties.onBlur && this.properties.onBlur(event);
	}

	onInput(event?: KeyboardEvent) {
		this.properties.onInput && this.properties.onInput(event);
	}

	onKeyUp(event?: KeyboardEvent) {
		this.properties.onKeyUp && this.properties.onKeyUp(event);
	}

	render() {
		const { onKeyUp: onkeyup, onBlur: onblur, afterCreate, onInput: oninput } = this;
		const { placeholder, value = '' } = this.properties;

		return v(this.tagName, {
			type: 'text',
			placeholder,
			innerHTML: value,
			value,
			afterCreate,
			onkeyup,
			onblur,
			oninput,
			classes: this.classes(styles.base)
		});
	}
}
