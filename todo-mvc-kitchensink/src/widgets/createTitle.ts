import { Widget } from '@dojo/widgets/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';
import createWidgetBase from '@dojo/widgets/createWidgetBase';

interface TitleProperties {
	label: string;
}

const createTitle = createWidgetBase.mixin({
	mixin: {
		tagName: 'h1',
		nodeAttributes: [
			function (this: Widget<TitleProperties>): VNodeProperties {
				return { innerHTML: this.properties.label };
			}
		]
	}
});

export default createTitle;
