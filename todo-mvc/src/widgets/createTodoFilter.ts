import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import { h, VNode } from 'maquette';

interface TodoFilterState extends WidgetState {
	activeFilter?: string;
}

interface TodoFilterOptions extends WidgetOptions<TodoFilterState> { }

type TodoFilter = Widget<TodoFilterState>;

const createTodoFilter = createWidget
	.mixin({
		mixin: {
			getChildrenNodes(): VNode[] {
				const todoFilter: TodoFilter = this;
				const filter = todoFilter.state.activeFilter;
				return [
					h('li', {}, [
						h('a', {
							innerHTML: 'All',
							href: '#all',
							classes: {
								selected: filter === 'all'
							}
						})
					]),
					h('li', {}, [
						h('a', {
							innerHTML: 'Active',
							href: '#active',
							classes: {
								selected: filter === 'active'
							}
						})
					]),
					h('li', {}, [
						h('a', {
							innerHTML: 'Completed',
							href: '#completed',
							classes: {
								selected: filter === 'completed'
							}
						})
					])
				];
			}
		}
	})
	.extend({
		'tagName': 'ul'
	});

export default createTodoFilter;
