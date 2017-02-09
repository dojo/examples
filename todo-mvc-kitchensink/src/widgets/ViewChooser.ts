import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import router, { mainRoute } from '../routes';

interface ViewChooserProperties {
	activeView: 'list' | 'cards';
	activeFilter: string;
}

export default class ViewChooser extends WidgetBase<ViewChooserProperties> {
	render() {
		const { activeView = 'list', activeFilter = 'all' } = this.properties;

		return v('ul', {
			classes: {
				'view-chooser': true
			}
		}, [
			v('li.view-mode', {}, [
				v('a', {
					href: router.link(mainRoute, {
						filter: activeFilter,
						view: 'list'
					}),
					classes: {
						list: true,
						active: activeView === 'list'
					}
				})
			]),
			v('li.view-mode', {}, [
				v('a', {
					href: router.link(mainRoute, {
						filter: activeFilter,
						view: 'cards'
					}),
					classes: {
						cards: true,
						active: activeView === 'cards'
					}
				})
			])
		]);
	}
}
