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

		const listClassList = [ styles.list ];

		if (activeView === 'list') {
			listClassList.push(styles.active);
		}

		const cardClassList = [ styles.cards ];

		if (activeView === 'cards') {
			cardClassList.push(styles.active);
		}

		return v('ul', {
			classes: this.classes(styles.viewChooser).get()
		}, [
			v('li.view-mode', {}, [
				v('a', {
					href: router.link(mainRoute, {
						filter: activeFilter,
						view: 'list'
					}),
					classes: this.classes(...listClassList).get()
				})
			]),
			v('li.view-mode', {}, [
				v('a', {
					href: router.link(mainRoute, {
						filter: activeFilter,
						view: 'cards'
					}),
					classes: this.classes(...cardClassList).get()
				})
			])
		]);
	}
}
