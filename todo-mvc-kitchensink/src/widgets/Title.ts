import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

interface TitleProperties {
	label: string;
}

export default class Title extends WidgetBase<TitleProperties> {
	render() {
		return v('h1', {
			innerHTML: this.properties.label
		});
	}
}
