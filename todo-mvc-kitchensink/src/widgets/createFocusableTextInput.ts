import createFormFieldMixin, { FormFieldMixin } from '@dojo/widgets/mixins/createFormFieldMixin';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget, WidgetProperties } from '@dojo/widgets/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';

export interface FocusableTextProperties extends WidgetProperties {
	focused?: boolean;
	placeholder?: string;
	value?: string;
	onKeyUp?: (event?: KeyboardEvent) => void;
	onInput?: (event?: KeyboardEvent) => void;
	onBlur?: (event?: Event) => void;
}

export type FocusableTextInput = Widget<FocusableTextProperties> & FormFieldMixin<string, WidgetProperties> & {
	onKeyUp: (event?: KeyboardEvent) => void;
	onInput: (event?: KeyboardEvent) => void;
	onBlur: (event?: Event) => void;
	afterCreate: (element: HTMLInputElement) => void;
}

const createFocusableTextInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'text',

			onBlur(this: FocusableTextInput, event?: Event) {
				this.properties.onBlur && this.properties.onBlur(event);
			},
			onInput(this: FocusableTextInput, event?: KeyboardEvent) {
				this.properties.onInput && this.properties.onInput(event);
			},
			onKeyUp(this: FocusableTextInput, event?: KeyboardEvent) {
				this.properties.onKeyUp && this.properties.onKeyUp(event);
			},

			afterCreate(this: FocusableTextInput, element: HTMLInputElement) {
				const focused = this.properties.focused;
				if (focused) {
					setTimeout(() => element.focus(), 0);
				}
				else if (!focused && document.activeElement === element) {
					element.blur();
				}
			},

			nodeAttributes: [
				function (this: FocusableTextInput): VNodeProperties {
					const { onKeyUp: onkeyup, onBlur: onblur, afterCreate, onInput: oninput } = this;
					const { placeholder, value = '' } = this.properties;

					return { placeholder, innerHTML: value, value, afterCreate, onkeyup, onblur, oninput };
				}
			]
		}
	});

export default createFocusableTextInput;
