import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import TextInput from '@dojo/widgets/textinput/TextInput';

export default function createTextInputElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-textinput',
		widgetConstructor: TextInput,
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
