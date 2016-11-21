import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { todoInput } from './actions/userActions';
import d from 'dojo-widgets/util/d';

import createTitle from './widgets/createTitle';
import createMainSection from './widgets/createMainSection';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter from './widgets/createTodoFooter';

const stateFromMap = new WeakMap<Widget<WidgetState>, any>();

const createApp = createWidgetBase.mixin({
	mixin: {
		childNodeRenderers: [
			function(this: Widget<WidgetState>): DNode[] {
				const stateFrom = stateFromMap.get(this);

				return [
					d('header', {}, [
						d(createTitle, <WidgetOptions<WidgetState>> { id: 'title', stateFrom }),
						d(createFocusableTextInput, <WidgetOptions<WidgetState>> { id: 'new-todo', stateFrom, listeners: { keypress: todoInput } })
					]),
					d(createMainSection, <WidgetOptions<WidgetState>>  { id: 'main-section', stateFrom }),
					d(createTodoFooter, <WidgetOptions<WidgetState>> { id: 'todo-footer', stateFrom })
				];
			}
		],
		classes: [ 'todoapp' ],
		tagName: 'section'
	},
	initialize(instance: Widget<WidgetState>, options: WidgetOptions<WidgetState>) {
		const { stateFrom } = options;
		if (stateFrom) {
			stateFromMap.set(instance, stateFrom);
		}
	}
});

export default createApp;
