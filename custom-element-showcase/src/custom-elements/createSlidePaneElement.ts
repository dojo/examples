import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import SlidePane from '@dojo/widgets/slidepane/SlidePane';

export default function createSlidePaneElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-slidepane',
		widgetConstructor: SlidePane,
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
