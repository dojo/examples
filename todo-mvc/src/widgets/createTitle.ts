import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetState } from 'dojo-interfaces/widgetBases';
import { VNodeProperties } from 'dojo-interfaces/vdom';

const createTitle = createWidgetBase.mixin({
	mixin: {
		tagName: 'h1',
		nodeAttributes: [
			function (this: Widget<WidgetState & { label: string }>): VNodeProperties {
				return { innerHTML: this.state.label };
			}
		]
	}
});

export default createTitle;
