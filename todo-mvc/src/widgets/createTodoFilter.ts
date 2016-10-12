import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import { h, VNode } from 'maquette';
import bundle from '../nls/main';

type TodoFilterState = RenderMixinState & {
	activeFilter?: string;
};

type TodoFilterOptions = RenderMixinOptions<TodoFilterState>;

type TodoFilter = RenderMixin<TodoFilterState>;

const createTodoFilter = createRenderMixin
	.extend({
		getChildrenNodes(this: TodoFilter): VNode[] {
			const { activeFilter } = this.state;
			const messages = this.localizeBundle(bundle);
			return [
				h('li', {}, [
					h('a', {
						innerHTML: messages['all'],
						href: '#all',
						classes: {
							selected: activeFilter === 'all'
						}
					})
				]),
				h('li', {}, [
					h('a', {
						innerHTML: messages['active'],
						href: '#active',
						classes: {
							selected: activeFilter === 'active'
						}
					})
				]),
				h('li', {}, [
					h('a', {
						innerHTML: messages['completed'],
						href: '#completed',
						classes: {
							selected: activeFilter === 'completed'
						}
					})
				])
			];
		},

		bundles: [ bundle ],
		tagName: 'ul'
	});

export default createTodoFilter;
