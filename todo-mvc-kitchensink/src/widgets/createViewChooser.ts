import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget, DNode } from '@dojo/widgets/interfaces';
import { v } from '@dojo/widgets/d';
import router, { mainRoute } from '../routes';

interface ViewChooserProperties {
	activeView: 'list' | 'cards';
	activeFilter: string;
}

export type TodoList = Widget<ViewChooserProperties>;

const createViewChooser = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'view-chooser' ],
		getChildrenNodes: function (this: TodoList): DNode[] {
			const { activeView = 'list', activeFilter = 'all' } = this.state;

			return [
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
			];
		}
	}
});

export default createViewChooser;
