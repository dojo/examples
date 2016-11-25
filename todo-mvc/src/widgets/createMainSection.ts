import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';

import { todoToggleAll } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoList from './createTodoList';

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		getChildrenNodes: function (this: Widget<WidgetState>): DNode[] {
			const { stateFrom } = this;
			const checkBoxOptions = {
				id: 'todo-toggle',
				stateFrom,
				listeners: {
					change: todoToggleAll
				}
			};

			return [
				d(createCheckboxInput, <WidgetOptions<WidgetState> > checkBoxOptions),
				d(createTodoList, { id: 'todo-list', stateFrom })
			];
		}
	}
});

export default createMainSection;
