import { DNode, WidgetOptions, WidgetMixin, WidgetFactory, WidgetProperties } from '@dojo/widget-core/interfaces';
import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import storeMixin, { StoreMixinApi, StoreMixinProperties } from '@dojo/widget-core/mixins/storeMixin';
import { v, w } from '@dojo/widget-core/d';

import { todoInput } from './actions/userActions';
import { bind } from './utils';

export interface AppProperties extends WidgetProperties, StoreMixinProperties { }

export interface AppMixin extends WidgetMixin<AppProperties>, StoreMixinApi { }

export interface AppFactory extends WidgetFactory<AppMixin, WidgetOptions<AppProperties>> { }

const createApp: AppFactory = createWidgetBase
	.mixin(storeMixin)
	.mixin({
		mixin: {
			classes: [ 'todoapp' ],
			tagName: 'section',
			getChildrenNodes: function(this: AppMixin): DNode[] {
				const { todos = [], activeCount, completedCount, allCompleted, activeFilter } = this.state;
				const classes = todos && todos.length ? [] : [ 'hidden' ];
				const todoFooterProperties = { id: 'todo-footer', activeCount, completedCount, activeFilter, classes };

				return [
					v('header', {}, [
						w('title', { label: 'todos' }),
						w('text-input', { classes: ['new-todo'], focused: true, placeholder: 'What needs to be done?', onKeyUp: bind(todoInput, this) })
					]),
					w('main-section', { todos, activeFilter, allCompleted }),
					w('todo-footer', todoFooterProperties)
				];
			}
		}
	});

export default createApp;
