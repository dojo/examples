import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';

import { todoToggleAll } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoList from './createTodoList';

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<WidgetState>): DNode[] {
			const { state } = this;
			const checkBoxOptions = {
				id: 'todo-toggle',
				state: {
					checked: (<any> state).allCompleted,
					classes: [ 'toggle-all' ]
				},
				listeners: {
					change: todoToggleAll
				}
			};

			return [
				w(createCheckboxInput, <WidgetOptions<WidgetState> > checkBoxOptions),
				w(createTodoList, { id: 'todo-list', state })
			];
		}
	}
});

export default createMainSection;
