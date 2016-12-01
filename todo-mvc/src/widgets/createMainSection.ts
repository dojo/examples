import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import d from 'dojo-widgets/d';

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
