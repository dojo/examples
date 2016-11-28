import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';

type TodoFilterState = WidgetState & {
	activeFilter?: string;
};

type TodoFilterOptions = WidgetOptions<TodoFilterState>;

type TodoFilter = Widget<TodoFilterState>;

function createFilterItems(activeFilter: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[0].toUpperCase() + filterItem.substring(1);
		return d('li', {}, [
			d('a', {
				innerHTML: label,
				href: `#${filterItem}`,
				classes: {
					selected: activeFilter === filterItem
				}
			})
		]);
	});
}

const createTodoFilter = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'filters' ],
		childNodeRenderers: [
			function(this: TodoFilter): DNode[] {
				const activeFilter = this.state.activeFilter || '';
				return createFilterItems(activeFilter);
			}
		]
	}
});

export default createTodoFilter;
