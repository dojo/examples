import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import TabController from '@dojo/widgets/tabcontroller/TabController';

export default function createTabControllerElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-tabcontroller',
		widgetConstructor: TabController,
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
