import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import * as css from './styles/loading.m.css';

export class Loading extends WidgetBase {
	render() {
		return v('div', { key: this.properties.key, classes: css.spinner });
	}
}
