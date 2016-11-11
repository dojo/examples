import { Messages } from 'dojo-i18n/i18n';
import WeakMap from 'dojo-shim/WeakMap';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createI18nMixin, { I18nMixin, I18nOptions, I18nState } from 'dojo-widgets/mixins/createI18nMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createVNodeEvented, { VNodeEvented } from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'maquette';
import bundle from '../nls/main';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export type FocusableTextInputState = RenderMixinState & FormFieldMixinState<string> & I18nState & {
	focused?: boolean;
	placeholder?: string;
};

export type FocusableTextInputOptions = RenderMixinOptions<FocusableTextInputState> & FormFieldMixinOptions<string, FocusableTextInputState> & I18nOptions;

export type FocusableTextInput = RenderMixin<FocusableTextInputState> & FormFieldMixin<string, FocusableTextInputState> & VNodeEvented & I18nMixin<Messages, I18nState>;

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
	.mixin(createI18nMixin)
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

		bundles: [ bundle ],
		tagName: 'input',
		type: 'text'
	});

export default createFocusableTextInput;
