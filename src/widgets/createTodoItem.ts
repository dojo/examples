import createButton, { Button } from 'dojo-widgets/createButton';
import createTextInput, { TextInput } from 'dojo-widgets/createTextInput';
import createWidget, { Widget, WidgetState } from 'dojo-widgets/createWidget';
import createParentMixin, { ParentMap } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderableChildrenMixin, {} from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';
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

type TodoItem = ParentMap<Widget<WidgetState>>;

function manageChildren(parent: any) {
	const todoItem = <TodoItem> this;
	const label = todoItem.children.get('label');
	const checkbox = todoItem.children.get('checkbox');

	label.setState({
		label: (<any> todoItem).state.label
	});

	checkbox.setState({
		checked: (<any> todoItem).state.completed
	});
}

const createTodoItem = createWidget
	.mixin(createParentMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.mixin({
		mixin: createParentMixin,
		initialize(instance) {
			const checkbox = createCheckboxInput({
				state: {
					id: 'checkbox',
					classes: ['toggle']
				},
				listeners: {
					change: () => { todoToggleComplete.do(instance.state); }
				}
			});

			const button = createButton({
				state: {
					id: 'button',
					classes: ['destroy']
				},
				listeners: {
					click: () => { todoRemove.do(instance.state); }
				}
			});

			const label = createWidget({
				state: {
					id: 'label'
				},
				'tagName': 'label'
			});

			const editInput = createTextInput({
				state: {
					id: 'editInput',
					classes: ['edit']
				}
			});

			instance.append([checkbox, button, label, editInput]);
			instance.on('statechange', manageChildren);
		}
	})
	.mixin({
		mixin: {
			get classes(): string[] {
				const todoItem: TodoItem = this;
				return (<any> todoItem).state.completed ? ['completed'] : [];
			},
			getChildrenNodes(): VNode[] {
				const todoItem = <TodoItem> this;
				return [
					h('div.view', [
						todoItem.children.get('checkbox').render(),
						todoItem.children.get('label').render(),
						todoItem.children.get('button').render()
					]),
					todoItem.children.get('editInput').render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
