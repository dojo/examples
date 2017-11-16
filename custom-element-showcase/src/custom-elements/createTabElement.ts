import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Tab from '@dojo/widgets/tabcontroller/Tab';

export default function createTabElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-tab',
		widgetConstructor: Tab,
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
