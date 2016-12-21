import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, WidgetOptions, WidgetState } from 'dojo-widgets/interfaces';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from 'dojo-interfaces/vdom';

export type CheckboxInputState = WidgetState & FormFieldMixinState<string> & {
	checked: boolean;
};

export type CheckboxProperties = {
	checked: boolean;
};

export type CheckboxInputOptions = WidgetOptions<CheckboxInputState, CheckboxProperties> & FormFieldMixinOptions<string, CheckboxInputState>;

export type CheckboxInput = Widget<CheckboxInputState, CheckboxProperties> & FormFieldMixin<string, CheckboxInputState>;

const createCheckboxInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'checkbox',
			nodeAttributes: [
				function (this: CheckboxInput): VNodeProperties {
					const { checked } = this.state;
					return checked !== undefined ? { checked } : {};
				}
			]
		}
	});

export default createCheckboxInput;
