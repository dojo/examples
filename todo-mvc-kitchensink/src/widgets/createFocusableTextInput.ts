import WeakMap from 'dojo-shim/WeakMap';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, WidgetOptions, WidgetState } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';

interface FocusableTextInputProperties {
	focused: boolean;
	placeholder: string;
}

export type FocusableTextInputState = WidgetState & FormFieldMixinState<string> & Partial<FocusableTextInputProperties>;
export type FocusableTextInputOptions = WidgetOptions<FocusableTextInputState, FocusableTextInputProperties> & FormFieldMixinOptions<string, FocusableTextInputState>;
export type FocusableTextInput = Widget<FocusableTextInputState, FocusableTextInputProperties> & FormFieldMixin<string, FocusableTextInputState>;

const afterUpdateFunctions = new WeakMap<FocusableTextInput, {(element: HTMLInputElement): void}>();

function afterUpdate(instance: FocusableTextInput, element: HTMLInputElement) {
	const focused = instance.state.focused;
	if (focused) {
		setTimeout(() => element.focus(), 0);
	}
	else if (!focused && document.activeElement === element) {
		element.blur();
	}
}

const createFocusableTextInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'text',
			nodeAttributes: [
				function (this: FocusableTextInput): VNodeProperties {
					const afterUpdate = afterUpdateFunctions.get(this);
					const { placeholder, value } = this.state;
					return {
						afterUpdate,
						placeholder,
						value,
						afterCreate: afterUpdate
					};
				}
			]
		},
		initialize(instance) {
			afterUpdateFunctions.set(instance, (element: HTMLInputElement) => afterUpdate(instance, element));
		}
	});

export default createFocusableTextInput;
