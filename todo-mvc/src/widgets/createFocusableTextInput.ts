import { ComposeFactory } from 'dojo-compose/compose';
import WeakMap from 'dojo-shim/WeakMap';
import createTextInput from 'dojo-widgets/createTextInput';
import { Widget, WidgetOptions } from 'dojo-widgets/createWidget';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinState, FormFieldMixinOptions } from 'dojo-widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from 'maquette';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export interface FocusableTextInputOptions extends WidgetOptions<FormFieldMixinState<string>>, FormFieldMixinOptions<string, FormFieldMixinState<string>> { }

export type FocusableTextInput = Widget<FormFieldMixinState<string>> & FormFieldMixin<string, FormFieldMixinState<string>> & {state: any};

export interface FocusableTextInputFactory extends ComposeFactory<FocusableTextInput, FocusableTextInputOptions> { }

const afterUpdateFunctions = new WeakMap<FocusableTextInput, {(element: HTMLInputElement): void}>();

function afterUpdate(instance: FocusableTextInput, element: HTMLInputElement) {
	const focused: boolean = instance.state.focused;
	if (focused) {
		setTimeout(() => element.focus(), 0);
	}
	else if (!focused && document.activeElement === element) {
		element.blur();
	}
}

const createFocusableTextInput: FocusableTextInputFactory = createTextInput
	.mixin({
		mixin: createFormFieldMixin,
		aspectAdvice: {
			before: {
				getNodeAttributes(overrides: VNodeProperties = {}) {
					const focusableTextInput: FocusableTextInput = this;

					overrides.afterUpdate = afterUpdateFunctions.get(focusableTextInput);

					if (focusableTextInput.state.placeholder !== undefined) {
						overrides.placeholder = focusableTextInput.state.placeholder;
					}

					return [overrides];
				}
			}
		},
		initialize(instance) {
			instance.own(instance.on('input', (event: TypedTargetEvent<HTMLInputElement>) => {
				instance.value = event.target.value;
			}));
			afterUpdateFunctions.set(instance, (element: HTMLInputElement) => afterUpdate(instance, element));
		}
	})
	.extend({
		type: 'text',
		tagName: 'input'
	});

export default createFocusableTextInput;
