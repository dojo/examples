import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Radio from '@dojo/widgets/radio/Radio';

export default function createRadioElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-radio',
		widgetConstructor: Radio,
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
