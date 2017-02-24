import { v } from '@dojo/widget-core/d';
import { DoubleClickEventHandler, KeyPressEventHandler } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

interface LabelProperties {
	label: string;
	onDoubleClick?: DoubleClickEventHandler;
	onKeyPress?: KeyPressEventHandler;
}

export class Label extends WidgetBase<LabelProperties> {
	onDoubleClick(event?: MouseEvent) {
		this.properties.onDoubleClick && this.properties.onDoubleClick(event);
	}

	onKeyPress(event?: KeyboardEvent) {
		this.properties.onKeyPress && this.properties.onKeyPress(event);
	}

	render() {
		return v('label', {
			innerHTML: this.properties.label,
			'aria-describedby': 'edit-instructions',
			tabindex: '0',
			ondblclick: this.onDoubleClick,
			onkeypress: this.onKeyPress
		});
	}
}

export default Label;
