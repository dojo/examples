import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Textarea from '@dojo/widgets/textarea/Textarea';

export default function createTextareaElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-textarea',
		widgetConstructor: Textarea,
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
