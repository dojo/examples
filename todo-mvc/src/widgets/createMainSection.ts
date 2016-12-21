import { DNode, Widget, WidgetState, WidgetProperties, WidgetOptions } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';

import { todoToggleAll } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoList from './createTodoList';

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<WidgetState, WidgetProperties>): DNode[] {
			const { state } = this;
			const checkBoxOptions = {
				id: 'todo-toggle',
				properties: {
					checked: (<any> state).allCompleted,
					classes: [ 'toggle-all' ]
				},
				listeners: {
					change: todoToggleAll
				}
			};

			return [
				w(createCheckboxInput, <WidgetOptions<WidgetState, WidgetProperties>> checkBoxOptions),
				w(createTodoList, { id: 'todo-list', properties: state })
			];
		}
	}
});

export default createMainSection;
