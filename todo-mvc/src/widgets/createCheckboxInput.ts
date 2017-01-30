import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { Widget, WidgetFactory, WidgetProperties } from '@dojo/widget-core/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';

export interface CheckboxProperties extends WidgetProperties {
	checked?: boolean;
	onChange?: (event?: Event) => void;
};

export type CheckboxInput = Widget<CheckboxProperties> & {
	onChange: (event?: Event) => void;
}

export type CheckboxInputFactory = WidgetFactory<CheckboxInput, CheckboxProperties>

const createCheckboxInput: CheckboxInputFactory = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'checkbox',
			onChange(this: CheckboxInput, event?: Event) {
				this.properties.onChange && this.properties.onChange(event);
			},
			nodeAttributes: [
				function (this: CheckboxInput): VNodeProperties {
					const { type, onChange: onchange, properties: { checked } } = this;
					return { checked, onchange, type };
				}
			]
		}
	});

export default createCheckboxInput;
