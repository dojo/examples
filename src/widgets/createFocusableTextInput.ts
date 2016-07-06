import { ComposeFactory } from 'dojo-compose/compose';
import WeakMap from 'dojo-core/WeakMap';
import createTextInput from 'dojo-widgets/createTextInput';
import { Widget, WidgetOptions } from 'dojo-widgets/createWidget';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinState, FormFieldMixinOptions } from 'dojo-widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from 'maquette/maquette';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export interface FocusableTextInputOptions extends WidgetOptions<FormFieldMixinState<string>>, FormFieldMixinOptions<string, FormFieldMixinState<string>> { }

export type FocusableTextInput = Widget<FormFieldMixinState<string>> & FormFieldMixin<string, FormFieldMixinState<string>> & {state: any};

export interface FocusableTextInputFactory extends ComposeFactory<FocusableTextInput, FocusableTextInputOptions> { }

const afterUpdateFunctions = new WeakMap<FocusableTextInput, {(element: any): any}>();

function afterUpdate(instance: any, element: any) {
	const focusableTextInput: FocusableTextInput = instance;
	const focused: boolean = focusableTextInput.state.focused;
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

					return [overrides];
				}
			}
		},
		initialize(instance) {
			instance.own(instance.on('input', (event: TypedTargetEvent<HTMLInputElement>) => {
				instance.value = event.target.value;
			}));
			afterUpdateFunctions.set(instance, (element: any) => afterUpdate(instance, element));
		}
	})
	.extend({
		type: 'text',
		tagName: 'input'
	});

export default createFocusableTextInput;
