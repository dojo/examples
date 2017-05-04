import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/ViewChooser.m.css';

interface ViewChooserProperties {
	activeView: 'list' | 'cards';
	activeFilter: 'all' | 'active' | 'completed';
}

@theme(styles)
export default class ViewChooser extends ThemeableMixin(WidgetBase)<ViewChooserProperties> {
	render() {
		const { activeView, activeFilter } = this.properties;

		return v('ul', {
			classes: this.classes(styles.viewChooser)
		}, [
			v('li.view-mode', [
				v('a', {
					href: `#/${activeFilter}?view=list`,
					classes: this.classes(
						styles.list,
						activeView === 'list' ? styles.active : null
					)
				})
			]),
			v('li.view-mode', [
				v('a', {
					href: `#/${activeFilter}?view=cards`,
					classes: this.classes(
						styles.cards,
						activeView === 'cards' ? styles.active : null
					)
				})
			])
		]);
	}
}
