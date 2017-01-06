import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, DNode, WidgetState, WidgetOptions, WidgetProperties } from 'dojo-widgets/interfaces';
import { todoInput } from '../actions/userActions';
import createTodoFooter from './createTodoFooter';
import { v, w } from 'dojo-widgets/d';
import createTitle from './createTitle';
import createFocusableTextInput from './createFocusableTextInput';
import createMainSection from './createMainSection';

const createHome = createWidgetBase.mixin({
	mixin: {
		getChildrenNodes: function (this: Widget<WidgetState, WidgetProperties>): DNode[] {
			const { state } = this;
			const { todo, todos } = <any> state;
			const newTodoOptions: WidgetOptions<WidgetState, WidgetProperties> = {
				id: 'new-todo',
				properties: {
					id: 'new-todo',
					classes: ['new-todo'],
					focused: true,
					value: todo ? todo : '',
					placeholder: 'What needs to be done?'
				},
				listeners: { keyup: todoInput }
			};

			return [
				v('header', {}, [
					w(createTitle, { id: 'title', properties: { label: 'todos' } }),
					w(createFocusableTextInput, newTodoOptions)
				]),
				w(createMainSection, { id: 'main-section', properties: state }),
				todos.length ? w(createTodoFooter, { id: 'todo-footer', properties: state }) : null
			];
		},
		tagName: 'div'
	}
});

export default createHome;
