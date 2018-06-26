import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import * as css from './styles/loading.m.css';

export class Loading extends WidgetBase {
	render() {
		return v('div', { key: this.properties.key, classes: css.spinner });
	}
}
