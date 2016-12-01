import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import createProjector from 'dojo-widgets/createProjector';
import { todoInput } from './actions/userActions';
import d from 'dojo-widgets/d';

import createTitle from './widgets/createTitle';
import createMainSection from './widgets/createMainSection';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter, { TodoFooterState } from './widgets/createTodoFooter';

const createApp = createProjector.mixin({
	mixin: {
		getChildrenNodes: function(this: Widget<WidgetState>): DNode[] {
			const { state } = this;
			const { todo, todos } = <any> state;
			const newTodoOptions: WidgetOptions<WidgetState> = {
				id: 'new-todo',
				state: {
					id: 'new-todo',
					classes: ['new-todo'],
					focused: true,
					value: todo ? todo : '',
					placeholder: 'What needs to be done?'
				},
				listeners: { keypress: todoInput }
			};
			const classes = todos && todos.length ? [] : [ 'hidden' ];
			const todoFooterState: TodoFooterState = Object.assign({ classes }, state);

			return [
				d('header', {}, [
					d(createTitle, { id: 'title', state: { label: 'todos' } }),
					d(createFocusableTextInput, newTodoOptions)
				]),
				d(createMainSection, { id: 'main-section', state }),
				d(createTodoFooter, { id: 'todo-footer', state: todoFooterState })
			];
		},
		classes: [ 'todoapp' ],
		tagName: 'section'
	}
});

export default createApp;
