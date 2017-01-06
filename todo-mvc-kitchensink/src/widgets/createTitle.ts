import { Widget, WidgetState } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';

interface TitleProperties {
	label: string;
}

type TitleState = WidgetState & TitleProperties;

const createTitle = createWidgetBase.mixin({
	mixin: {
		tagName: 'h1',
		nodeAttributes: [
			function (this: Widget<TitleState, TitleProperties>): VNodeProperties {
				return { innerHTML: this.state.label };
			}
		]
	}
});

export default createTitle;
