import createWidget, { Widget, WidgetState } from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';
import createParentMixin, { ParentMap } from 'dojo-widgets/mixins/createParentMapMixin';
import { h, VNode } from 'maquette/maquette';

type TodoFilter = ParentMap<Widget<WidgetState>>;

function manageChildren() {
	const todoFooter = <TodoFilter> this;
	const filterAllWidget = todoFooter.children.get('filter-all');
	const filterActiveWidget = todoFooter.children.get('filter-active');
	const filterCompletedWidget = todoFooter.children.get('filter-completed');

	const activeFilter = (<any> todoFooter).state.activeFilter;
	filterAllWidget.setState({
		classes: []
	});

	filterActiveWidget.setState({
		classes: []
	});

	filterCompletedWidget.setState({
		classes: []
	});

	if (activeFilter === 'active') {
		filterActiveWidget.setState({
			classes: ['selected']
		});
	} else if (activeFilter === 'completed') {
		filterCompletedWidget.setState({
			classes: ['selected']
		});
	} else {
		filterAllWidget.setState({
			classes: ['selected']
		});
	}
}

const createTodoFilter = createWidget
	.mixin({
		mixin: createParentMixin,
		initialize(instance) {
			const filterAllButton = createWidget({
				'tagName': 'a',
				'state': {
					'id': 'filter-all',
					'label': 'All',
					'classes': ['selected']
				}
			});

			const filterActiveButton = createWidget({
				'tagName': 'a',
				'state': {
					'id': 'filter-active',
					'label': 'Active'
				}
			});

			const filterCompletedButton = createWidget({
				'tagName': 'a',
				'state': {
					'id': 'filter-completed',
					'label': 'Completed'
				}
			});
			instance.append([filterAllButton, filterActiveButton, filterCompletedButton]);
			instance.on('statechange', manageChildren);
		}
	})
	.mixin({
		mixin: {
			getChildrenNodes(): VNode[] {
				const todoFilter: ParentMap<Child> = this;

				return [
					h('li', {}, [
						todoFilter.children.get('filter-all').render()
					]),
					h('li', {}, [
						todoFilter.children.get('filter-active').render()
					]),
					h('li', {}, [
						todoFilter.children.get('filter-completed').render()
					])
				];
			}
		}
	})
	.extend({
		'tagName': 'ul'
	});

	export default createTodoFilter;

