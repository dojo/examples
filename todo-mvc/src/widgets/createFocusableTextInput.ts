import WeakMap from 'dojo-shim/WeakMap';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createVNodeEvented, { VNodeEvented } from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'maquette';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export type FocusableTextInputState = RenderMixinState & FormFieldMixinState<string> & {
	focused?: boolean;
	placeholder?: string;
};

export type FocusableTextInputOptions = RenderMixinOptions<FocusableTextInputState> & FormFieldMixinOptions<string, FocusableTextInputState>;

export type FocusableTextInput = RenderMixin<FocusableTextInputState> & FormFieldMixin<string, FocusableTextInputState> & VNodeEvented;

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

const createFocusableTextInput = createRenderMixin
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: createVNodeEvented,
		initialize(instance) {
			instance.own(instance.on('input', (event: TypedTargetEvent<HTMLInputElement>) => {
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
