import { Widget, WidgetProperties, DNode } from '@dojo/widget-core/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';
import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import { bind } from './../utils';

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
						w('checkbox', { classes: [ 'toggle' ], checked, onChange: bind(todoToggleComplete, this) }),
						w('label', { label, onDblclick: bind(todoEdit, this), onKeypress: bind(todoEdit, this) }),
						w('button', { classes: [ 'destroy' ], onClick: bind(todoRemove, this) })
					]),
					focused ? w('text-input', {
						value: label,
						id: todoId,
						focused, classes: [ 'edit' ],
						onBlur: bind(todoSave, this),
						onKeyUp: bind(todoEditInput, this)
					}) : null
				];
			}
		}
});

export default createTodoItem;
