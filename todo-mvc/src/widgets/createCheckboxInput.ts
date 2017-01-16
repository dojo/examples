import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget, WidgetFactory, WidgetState, WidgetProperties } from '@dojo/widgets/interfaces';
import createFormFieldMixin, { FormFieldMixin } from '@dojo/widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from '@dojo/interfaces/vdom';

export interface CheckboxProperties extends WidgetProperties {
	checked?: boolean;
	onChange?: (event?: Event) => void;
};

export type CheckboxInput = Widget<CheckboxProperties> & FormFieldMixin<string, WidgetState> & {
	onChange: (event?: Event) => void;
}

export type CheckboxInputFactory = WidgetFactory<CheckboxInput, CheckboxProperties>

const createCheckboxInput: CheckboxInputFactory = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'checkbox',
			onChange(this: CheckboxInput, event?: Event) {
				this.properties.onChange && this.properties.onChange(event);
			},
			nodeAttributes: [
				function (this: CheckboxInput): VNodeProperties {
					const { checked } = this.properties;
					return { checked, onchange: this.onChange };
				}
			]
		}
	});

export default createCheckboxInput;
