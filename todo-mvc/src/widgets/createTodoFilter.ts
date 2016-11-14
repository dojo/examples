import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';

type TodoFilterState = WidgetState & {
	activeFilter?: string;
};

type TodoFilterOptions = WidgetOptions<TodoFilterState>;

type TodoFilter = Widget<TodoFilterState>;

const createTodoFilter = createWidgetBase
	.extend({
		childNodeRenderers: [
			function(this: TodoFilter): DNode[] {
				const { activeFilter } = this.state;
				return [
					d('li', {}, [
						d('a', {
							innerHTML: 'All',
							href: '#all',
							classes: {
								selected: activeFilter === 'all'
							}
						})
					]),
					d('li', {}, [
						d('a', {
							innerHTML: 'Active',
							href: '#active',
							classes: {
								selected: activeFilter === 'active'
							}
						})
					]),
					d('li', {}, [
						d('a', {
							innerHTML: 'Completed',
							href: '#completed',
							classes: {
								selected: activeFilter === 'completed'
							}
						})
					])
				];
			}
		],

		tagName: 'ul.filters'
	});

export default createTodoFilter;
