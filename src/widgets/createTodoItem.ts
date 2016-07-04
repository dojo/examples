import createButton, { Button } from 'dojo-widgets/createButton';
import createTextInput, { TextInput } from 'dojo-widgets/createTextInput';
import createWidget, { Widget, WidgetState } from 'dojo-widgets/createWidget';
import { h, VNode } from 'maquette/maquette';

import createCheckboxInput, { CheckboxInput } from './createCheckboxInput';

import { todoRemove, todoToggleComplete }  from './../actions/uiTodoActions';

export interface TodoItemMixin {
	childWidgets: TodoItemChildWidgets;
}

interface TodoItemChildWidgets {
	checkbox: CheckboxInput;
	button: Button;
	label: Widget<WidgetState>;
	editInput: TextInput;
}

interface TodoItemCheckedEvent extends Event {
	target: any;
}

export type TodoItem = Widget<any> & TodoItemMixin;

const createTodoItem = createWidget
	.mixin({
		initialize(instance) {
			instance.childWidgets = {
				checkbox: createCheckboxInput({
					listeners: { 'change': () => { todoToggleComplete.do(instance.state); } }
				}),
				button: createButton({
					listeners: { 'click': () => { todoRemove.do(instance.state); } }
				}),
				label: createWidget({
					'tagName': 'label'
				}),
				editInput: createTextInput({})
			};
		},
		mixin: {
			childWidgets: <TodoItemChildWidgets> null,
			get classes(): string[] {
				const todoItem: TodoItem = this;
				return todoItem.state.completed ? ['completed'] : [];
			},
			getChildrenNodes(): VNode[] {
				const todoItem: TodoItem = this;
				const checkbox = todoItem.childWidgets.checkbox;
				const button = todoItem.childWidgets.button;
				const label = todoItem.childWidgets.label;
				const editInput = todoItem.childWidgets.editInput;

				checkbox.setState({
					'classes': ['toggle']
				});

				button.setState({
					'classes': ['destroy']
				});

				editInput.setState({
					'classes': ['edit'],
					'value': todoItem.state.label
				});

				label.setState({
					'label': todoItem.state.label
				});

				const checkboxVNode = checkbox.render();
				checkboxVNode.properties.checked = todoItem.state.completed;

				return [
					h('div.view', [
						checkboxVNode,
						label.render(),
						button.render()
					]),
					editInput.render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
