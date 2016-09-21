import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createVNodeEvented, { VNodeEvented } from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'maquette';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export type CheckboxInputState = RenderMixinState & FormFieldMixinState<string> & {
	checked?: boolean;
};

export type CheckboxInputOptions = RenderMixinOptions<CheckboxInputState> & FormFieldMixinOptions<string, CheckboxInputState>;

export type CheckboxInput = RenderMixin<CheckboxInputState> & FormFieldMixin<string, CheckboxInputState> & VNodeEvented;

const createCheckboxInput = createRenderMixin
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: createVNodeEvented,
		initialize(instance) {
			instance.own(instance.on('input', (event: TypedTargetEvent<HTMLInputElement>) => {
				instance.value = event.target.value;
			}));
		}
	})
	.extend({
		nodeAttributes: [
			function (this: CheckboxInput): VNodeProperties {
				const { checked } = this.state;
				return checked !== undefined ? { checked } : {};
			}
		],

		tagName: 'input',

		type: 'checkbox'
	});

export default createCheckboxInput;
