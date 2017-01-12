import { Widget, WidgetProperties, DNode } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import createButton, { ButtonProperties } from 'dojo-widgets/components/button/createButton';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';
import createLabel from './createLabel';

export interface TodoItemProperties extends WidgetProperties {
	label: string;
	editing: boolean;
	completed: boolean;
}

export type TodoItem = Widget<TodoItemProperties>

export type Identifiable<I> = I & {
	todoId?: string;
}

const createTodoItem = createWidgetBase.mixin({
		mixin: {
			tagName: 'li',
			nodeAttributes: [
				function(this: TodoItem): VNodeProperties {
					const { completed, editing } = this.properties;
					return {
						classes: { completed, editing }
					};
				}
			],
			getChildrenNodes: function(this: TodoItem): (DNode | null)[] {
				const { properties: { id: todoId, completed: checked, label, editing: focused = false } } = this;

				return [
					v('div.view', [
						w(createCheckboxInput, { classes: [ 'toggle' ], checked, onChange: bindMe(todoToggleComplete, this) }),
						w(createLabel, { label, onDblclick: bindMe(todoEdit, this), onKeypress: bindMe(todoEdit, this) }),
						w<Identifiable<ButtonProperties>>(createButton, { todoId, classes: [ 'destroy' ], onClick: bindMe(todoRemove, this) })
					]),
					focused ? w(createFocusableTextInput, {
						value: label,
						id: todoId,
						focused, classes: [ 'edit' ],
						onBlur: bindMe(todoSave, this),
						onKeyUp: bindMe(todoEditInput, this)
					}) : null
				];
			}
		}
});

function bindMe<T extends Function>(fn: T, instance: any): T {
	return fn.bind(instance);
}

export default createTodoItem;
