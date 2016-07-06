import createButton from 'dojo-widgets/createButton';
import createWidget, { Widget, WidgetState } from 'dojo-widgets/createWidget';
import createParentMixin, { ParentMap } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderableChildrenMixin, {} from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { h, VNode } from 'maquette/maquette';

import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';

import { todoRemove, todoToggleComplete, todoEdit, todoSave, todoEditInput }  from './../actions/uiTodoActions';

type TodoItem = ParentMap<Widget<WidgetState>> & { state: any } & { afterUpdate(): void };

function manageChildren(parent: any) {
	const todoItem = <TodoItem> this;
	const label = todoItem.children.get('label');
	const checkbox = todoItem.children.get('checkbox');
	const editInput = todoItem.children.get('editInput');

	label.setState({
		label: todoItem.state.label
	});

	editInput.setState({
		value: todoItem.state.label,
		focused: todoItem.state.editing
	});

	checkbox.setState({
		checked: todoItem.state.completed
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
				listeners: {
					dblclick: () => { todoEdit.do(instance.state); }
				},
				tagName: 'label'
			});

			const editInput = createFocusableTextInput({
				state: {
					id: 'editInput',
					classes: ['edit']
				},
				listeners: {
					blur: (event) => { todoSave.do({state: instance.state, event}); },
					keyup: (event) => { todoEditInput.do({state: instance.state, event}); }
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
				const classes: string[] = [];
				if (todoItem.state.editing) {
					classes.push('editing');
				}
				return todoItem.state.completed ? ['completed', ...classes] : classes;
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
