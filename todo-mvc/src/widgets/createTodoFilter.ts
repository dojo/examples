import { Messages } from 'dojo-i18n/i18n';
import createI18nMixin, { I18nMixin, I18nOptions, I18nState } from 'dojo-widgets/mixins/createI18nMixin';
import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import { h, VNode } from 'maquette';
import bundle from '../nls/main';

type TodoFilterState = RenderMixinState & {
	activeFilter?: string;
};

type TodoFilterOptions = RenderMixinOptions<TodoFilterState> & I18nOptions;

type TodoFilter = RenderMixin<TodoFilterState> & I18nMixin<Messages, I18nState>;

const createTodoFilter = createRenderMixin
	.mixin(createI18nMixin)
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
