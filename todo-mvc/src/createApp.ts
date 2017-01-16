import { DNode, Widget, WidgetState, WidgetProperties } from '@dojo/widgets/interfaces';
import createProjector from '@dojo/widgets/createProjector';
import { todoInput } from './actions/userActions';
import { v, w } from '@dojo/widgets/d';
import { assign } from '@dojo/core/lang';

import { Item } from './stores/todoStore';
import createTitle from './widgets/createTitle';
import createMainSection from './widgets/createMainSection';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter, { TodoFooterProperties } from './widgets/createTodoFooter';
import externalStateMixin from '@dojo/widgets/mixins/externalState';
import { bind } from './utils';

export interface ApplicationState extends WidgetState {
	id: string;
	todos: Item[];
	completedCount: number;
	activeCount: number;
	activeFilter: string;
	allCompleted: boolean;
}

const createApp = createProjector
.mixin(externalStateMixin)
.mixin({
	mixin: {
		getChildrenNodes: function(this: Widget<WidgetProperties>): DNode[] {
			const { todos = [], activeCount, completedCount, activeFilter } = <ApplicationState> this.state;
			const classes = todos && todos.length ? [] : [ 'hidden' ];
			const todoFooterProperties: TodoFooterProperties = { id: 'todo-footer', activeCount, completedCount, activeFilter, classes };

			return [
				v('header', {}, [
					w(createTitle, { id: 'title', label: 'todos' }),
					w(createFocusableTextInput, { id: 'new-todo', classes: ['new-todo'], focused: true, placeholder: 'What needs to be done?', onKeyUp: bind(todoInput, this) })
				]),
				w(createMainSection, assign(<WidgetProperties> {}, this.state, { id: 'main-section' })),
				w(createTodoFooter, todoFooterProperties)
			];
		},
		classes: [ 'todoapp' ],
		tagName: 'section'
	}
});

export default createApp;
