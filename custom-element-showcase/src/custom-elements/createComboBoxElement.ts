import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import ComboBox from '@dojo/widgets/combobox/ComboBox';

export default function createComboBoxElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-combobox',
		widgetConstructor: ComboBox,
		events: [
			{
				propertyName: 'onChange',
				eventName: 'change'
			},
			{
				propertyName: 'onClick',
				eventName: 'click'
			}
		]
	};
};
