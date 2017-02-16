import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/title.css';

interface TitleProperties {
	label: string;
}

@theme(styles)
export default class Title extends ThemeableMixin(WidgetBase)<TitleProperties> {
	render() {
		return v('h1', {
			innerHTML: this.properties.label,
			classes: this.classes(styles.title).get()
		});
	}
}
