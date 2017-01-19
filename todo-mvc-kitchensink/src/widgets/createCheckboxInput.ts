import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget, WidgetProperties } from '@dojo/widgets/interfaces';
import createFormFieldMixin, { FormFieldMixin } from '@dojo/widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from '@dojo/interfaces/vdom';

export interface CheckboxInputProperties extends WidgetProperties {
	checked: boolean;
	onChange?: (event?: Event) => void;
}

export type CheckboxInput = Widget<CheckboxInputProperties> & FormFieldMixin<string, CheckboxInputProperties> & {
	onChange: (event?: Event) => void;
};

const createCheckboxInput = createWidgetBase
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
					const { onChange: onchange } = this;
					const { checked } = this.state;

					return checked !== undefined ? { checked, onchange } : { onchange };
				}
			]
		}
	});

export default createCheckboxInput;
