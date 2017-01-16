import { Widget, WidgetFactory, WidgetProperties, DNode } from '@dojo/widgets/interfaces';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { v }  from '@dojo/widgets/d';

export interface TodoFilterProperties extends WidgetProperties {
	activeFilter?: string;
};

export type TodoFilter = Widget<TodoFilterProperties>;

export type TodoFilterFactory = WidgetFactory<TodoFilter, TodoFilterProperties>

function createFilterItems(activeFilter: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[0].toUpperCase() + filterItem.substring(1);
		return v('li', {}, [
			v('a', {
				innerHTML: label,
				href: `#${filterItem}`,
				classes: {
					selected: activeFilter === filterItem
				}
			})
		]);
	});
}

const createTodoFilter: TodoFilterFactory = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'filters' ],
		getChildrenNodes: function(this: TodoFilter): DNode[] {
			const activeFilter = this.properties.activeFilter || '';
			return createFilterItems(activeFilter);
		}
	}
});

export default createTodoFilter;
