import { Widget, WidgetProperties, WidgetFactory } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';

export interface TitleProperties extends WidgetProperties {
	label?: string;
}

export interface TitleFactory extends WidgetFactory<Widget<TitleProperties>, TitleProperties> { }

const createTitle: TitleFactory = createWidgetBase.mixin({
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
