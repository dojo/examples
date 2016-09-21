import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import { h, VNode } from 'maquette';

type TodoFilterState = RenderMixinState & {
	activeFilter?: string;
};

type TodoFilterOptions = RenderMixinOptions<TodoFilterState>;

type TodoFilter = RenderMixin<TodoFilterState>;

const createTodoFilter = createRenderMixin
	.extend({
		getChildrenNodes(this: TodoFilter): VNode[] {
			const { activeFilter } = this.state;
			return [
				h('li', {}, [
					h('a', {
						innerHTML: 'All',
						href: '#all',
						classes: {
							selected: activeFilter === 'all'
						}
					})
				]),
				h('li', {}, [
					h('a', {
						innerHTML: 'Active',
						href: '#active',
						classes: {
							selected: activeFilter === 'active'
						}
					})
				]),
				h('li', {}, [
					h('a', {
						innerHTML: 'Completed',
						href: '#completed',
						classes: {
							selected: activeFilter === 'completed'
						}
					})
				])
			];
		},

		tagName: 'ul'
	});

export default createTodoFilter;
