import WeakMap from 'dojo-shim/WeakMap';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState } from 'dojo-interfaces/widgetBases';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'maquette';

export type FocusableTextInputState = WidgetState & FormFieldMixinState<string> & {
	focused?: boolean;
	placeholder?: string;
};

export type FocusableTextInputOptions = WidgetOptions<FocusableTextInputState> & FormFieldMixinOptions<string, FocusableTextInputState>;

export type FocusableTextInput = Widget<FocusableTextInputState> & FormFieldMixin<string, FocusableTextInputState>;

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

const createFocusableTextInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: createVNodeEvented,
		initialize(instance) {
			instance.own(instance.on('input', (event: any) => {
				instance.value = event.target.value;
			}));
			afterUpdateFunctions.set(instance, (element: HTMLInputElement) => afterUpdate(instance, element));
		}
	})
	.extend({
		nodeAttributes: [
			function (this: FocusableTextInput): VNodeProperties {
				const afterUpdate = afterUpdateFunctions.get(this);
				const { placeholder } = this.state;
				return { afterUpdate, placeholder };
			}
		],

		tagName: 'input',

		type: 'text'
	});

export default createFocusableTextInput;
