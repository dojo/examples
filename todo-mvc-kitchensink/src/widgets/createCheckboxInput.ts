import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, WidgetOptions, WidgetState } from 'dojo-widgets/interfaces';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from 'dojo-interfaces/vdom';

interface CheckboxInputProperties {
	checked: boolean;
}

export type CheckboxInputState = WidgetState & FormFieldMixinState<string> & CheckboxInputProperties;
export type CheckboxInputOptions = WidgetOptions<CheckboxInputState, CheckboxInputProperties> & FormFieldMixinOptions<string, CheckboxInputState>;
export type CheckboxInput = Widget<CheckboxInputState, CheckboxInputProperties> & FormFieldMixin<string, CheckboxInputState>;

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
