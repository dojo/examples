import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Checkbox from '@dojo/widgets/checkbox/Checkbox';

export default function createCheckboxElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-checkbox',
		widgetConstructor: Checkbox,
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
