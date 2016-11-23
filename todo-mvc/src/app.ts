import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import WeakMap from 'dojo-shim/WeakMap';
import { todoInput } from './actions/userActions';
import d from 'dojo-widgets/util/d';
import { StoreObservablePatchable } from 'dojo-interfaces/abilities';

import createTitle from './widgets/createTitle';
import createMainSection from './widgets/createMainSection';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter from './widgets/createTodoFooter';

const stateFromMap = new WeakMap<Widget<WidgetState>, StoreObservablePatchable<WidgetState>>();

const createApp = createWidgetBase.mixin({
	mixin: {
		childNodeRenderers: [
			function(this: Widget<WidgetState>): DNode[] {
				const stateFrom = stateFromMap.get(this);

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
