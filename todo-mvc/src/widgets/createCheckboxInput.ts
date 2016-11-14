import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState } from 'dojo-interfaces/widgetBases';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'maquette';

export type CheckboxInputState = WidgetState & FormFieldMixinState<string> & {
	checked?: boolean;
};

export type CheckboxInputOptions = WidgetOptions<CheckboxInputState> & FormFieldMixinOptions<string, CheckboxInputState>;

export type CheckboxInput = Widget<CheckboxInputState> & FormFieldMixin<string, CheckboxInputState>;

const createCheckboxInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: createVNodeEvented,
		initialize(instance) {
			instance.own(instance.on('input', (event: any) => {
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
