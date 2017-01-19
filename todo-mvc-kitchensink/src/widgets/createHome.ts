import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget, DNode, WidgetProperties } from '@dojo/widgets/interfaces';
import { todoInput } from '../actions/userActions';
import createTodoFooter from './createTodoFooter';
import { v, w } from '@dojo/widgets/d';
import createTitle from './createTitle';
import createFocusableTextInput from './createFocusableTextInput';
import createMainSection from './createMainSection';

const createHome = createWidgetBase.mixin({
	mixin: {
		getChildrenNodes: function (this: Widget<WidgetProperties>): DNode[] {
			const { properties } = this;
			const { todo, todos = [] } = <any> properties;
			const newTodoOptions: WidgetProperties = {
				id: 'new-todo',
				classes: [ 'new-todo' ],
				focused: true,
				value: todo ? todo : '',
				placeholder: 'What needs to be done?',
				onKeyUp: todoInput.bind(this)
			};

			return [
				v('header', {}, [
					w(createTitle, { id: 'title', label: 'todos' }),
					w(createFocusableTextInput, newTodoOptions)
				]),
				w(createMainSection, { ...properties, id: 'main-section' }),
				todos.length ? w(createTodoFooter, { ...properties, id: 'todo-footer' }) : null
			];
		},
		tagName: 'div'
	}
});

export default createHome;
