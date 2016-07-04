import createWidget, { Widget, WidgetState} from 'dojo-widgets/createWidget';
import { h, VNode } from 'maquette/maquette';

const createTodoFilter = createWidget
	.mixin({
		mixin: {
			getChildrenNodes(): VNode[] {
				const todoFilter: Widget<WidgetState> = this;
				const filter = (<any> todoFilter.state).activeFilter;
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

