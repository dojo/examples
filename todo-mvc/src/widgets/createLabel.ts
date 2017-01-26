import { Widget, WidgetProperties, WidgetFactory } from '@dojo/widget-core/interfaces';
import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { VNodeProperties } from '@dojo/interfaces/vdom';

export interface LabelProperties extends WidgetProperties {
	label?: string;
	onKeypress?: (event: KeyboardEvent) => void;
	onDblclick?: (event: MouseEvent) => void;
}

export type Label = Widget<LabelProperties> & {
	onKeypress: (event: KeyboardEvent) => void;
	onDblclick: (event: MouseEvent) => void;
}

export interface LabelFactory extends WidgetFactory<Label, LabelProperties> {}

const createLabel: LabelFactory = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'label',
			onDblclick(this: Label, event: MouseEvent) {
				this.properties.onDblclick && this.properties.onDblclick(event);
			},
			onKeypress(this: Label, event: KeyboardEvent) {
				this.properties.onKeypress && this.properties.onKeypress(event);
			},
			nodeAttributes: [
				function (this: Label): VNodeProperties {
					return {
						innerHTML: this.properties.label,
						'aria-describedby': 'edit-instructions',
						tabindex: '0',
						onkeyup: this.onKeypress,
						ondblclick: this.onDblclick
					};
				}
			]
		}
	});

export default createLabel;
