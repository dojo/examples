import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import SplitPane from '@dojo/widgets/splitpane/SplitPane';

export default function createSplitPaneElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-splitpane',
		widgetConstructor: SplitPane,
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
