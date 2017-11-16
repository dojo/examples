import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import TitlePane from '@dojo/widgets/titlepane/TitlePane';

export default function createTitlePaneElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-titlepane',
		widgetConstructor: TitlePane,
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
