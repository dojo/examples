import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import router, { mainRoute } from '../routes';
import * as styles from './styles/ViewChooser.css';

interface ViewChooserProperties {
	activeView: 'list' | 'cards';
	activeFilter: string;
}

@theme(styles)
export default class ViewChooser extends ThemeableMixin(WidgetBase)<ViewChooserProperties> {
	render() {
		const { activeView = 'list', activeFilter = 'all' } = this.properties;

		return v('ul', {
			classes: this.classes(styles.viewChooser)
		}, [
			v('li.view-mode', [
				v('a', {
					href: router.link(mainRoute, {
						filter: activeFilter,
						view: 'list'
					}),
					classes: this.classes(
						styles.list,
						activeView === 'list' ? styles.active : null
					)
				})
			]),
			v('li.view-mode', [
				v('a', {
					href: router.link(mainRoute, {
						filter: activeFilter,
						view: 'cards'
					}),
					classes: this.classes(
						styles.cards,
						activeView === 'cards' ? styles.active : null
					)
				})
			])
		]);
	}
}
