import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Select from '@dojo/widgets/select/Select';

export default function createSelectElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-select',
		widgetConstructor: Select,
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
