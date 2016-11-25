import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-interfaces/widgetBases';
import createProjector from 'dojo-widgets/createProjector';
import { todoInput } from './actions/userActions';
import d from 'dojo-widgets/util/d';

import createTitle from './widgets/createTitle';
import createMainSection from './widgets/createMainSection';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter from './widgets/createTodoFooter';

const createApp = createProjector.mixin({
	mixin: {
		getChildrenNodes: function(this: Widget<WidgetState>): DNode[] {
			const { stateFrom } = this;

			const inputOptions: WidgetOptions<WidgetState> = {
				id: 'new-todo',
				stateFrom,
				listeners: { keypress: todoInput }
			};

			return [
				d('header', {}, [
					d(createTitle, { id: 'title', stateFrom }),
					d(createFocusableTextInput, inputOptions)
				]),
				d(createMainSection, { id: 'main-section', stateFrom }),
				d(createTodoFooter, { id: 'todo-footer', stateFrom })
			];
		},
		classes: [ 'todoapp' ],
		tagName: 'section'
	}
});

export default createApp;
