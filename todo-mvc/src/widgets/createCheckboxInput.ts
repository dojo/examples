import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createVNodeEvented, { VNodeEvented } from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'maquette';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export type CheckboxInputState = RenderMixinState & FormFieldMixinState<string> & {
	checked?: boolean
};

export type CheckboxInputOptions = RenderMixinOptions<CheckboxInputState> & FormFieldMixinOptions<string, CheckboxInputState>;

export type CheckboxInput = RenderMixin<CheckboxInputState> & FormFieldMixin<string, CheckboxInputState> & VNodeEvented;

export interface CheckboxInputFactory extends ComposeFactory<CheckboxInput, CheckboxInputOptions> { }

const createCheckboxInput: CheckboxInputFactory = createRenderMixin
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
			function (this: CheckboxInput) {
				const props: VNodeProperties = {};

				if (this.state.checked !== undefined) {
					props.checked = this.state.checked;
				}

				return props;
			}
		],
		type: 'checkbox',
		tagName: 'input'
	});

export default createCheckboxInput;
