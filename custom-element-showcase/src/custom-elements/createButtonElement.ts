import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Button from '@dojo/widgets/button/Button';

export default function createButtonElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-button',
		widgetConstructor: Button,
		events: [
			{
				propertyName: 'onClick',
				eventName: 'click'
			}
		]
	};
};
