import { v } from '@dojo/widget-core/d';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/Title.m.css';

interface TitleProperties {
	label: string;
}

@theme(styles)
export default class Title extends ThemeableMixin(WidgetBase)<TitleProperties> {
	render() {
		return v('h1', {
			innerHTML: this.properties.label,
			classes: this.classes(styles.title)
		});
	}
}
