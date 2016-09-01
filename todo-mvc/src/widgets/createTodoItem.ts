import { ComposeFactory } from 'dojo-compose/compose';
import WeakMap from 'dojo-shim/WeakMap';
import createButton from 'dojo-widgets/createButton';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions, CreateChildrenResults } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { h, VNode } from 'maquette/maquette';

import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';
import { todoRemove, todoToggleComplete, todoEdit, todoSave, todoEditInput }  from './../actions/uiTodoActions';

interface TodoItemState extends WidgetState, StatefulChildrenState {
	editing?: boolean;
	completed?: boolean;
}

export interface TodoItemOptions extends WidgetOptions<TodoItemState>, StatefulChildrenOptions<Child, TodoItemState> { }

export type TodoItem = Widget<TodoItemState>;

export interface TodoItemFactory extends ComposeFactory<TodoItem, TodoItemOptions> { }

interface TodoItemChildrenItem {
	id: string;
	widget: Widget<WidgetState>;
}

interface TodoItemChildren extends CreateChildrenResults<Widget<WidgetState>> {
	label: TodoItemChildrenItem;
	checkbox: TodoItemChildrenItem;
	editInput: TodoItemChildrenItem;
	button: TodoItemChildrenItem;
}

/**
 * Internal map of sub children IDs
 */
const childrenMap = new WeakMap<TodoItem, TodoItemChildren>();

/**
 * Internal function to manage the children widgets
 */
function manageChildren(this: TodoItem) {
	/* Obtain references to children widgets */
	const { checkbox, label, editInput } = childrenMap.get(this);

	/* Adjust the state of the children to reflect parent */

	label.widget.setState({
		label: this.state.label
	});

	editInput.widget.setState({
		value: this.state.label,
		focused: this.state.editing
	});

	checkbox.widget.setState({
		checked: this.state.completed
	});
}

const createTodoItem: TodoItemFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance
				.createChildren({
					checkbox: {
						factory: createCheckboxInput,
						options: {
							state: {
								classes: [ 'toggle' ]
							},
							listeners: {
								change: () => { todoToggleComplete.do(instance.state); }
							}
						}
					},
					button: {
						factory: createButton,
						options: {
							state: {
								classes: [ 'destroy' ]
							},
							listeners: {
								click: () => { todoRemove.do(instance.state); }
							}
						}
					},
					label: {
						factory: createWidget,
						options: {
							listeners: {
								dblclick: () => { todoEdit.do(instance.state); }
							},
							tagName: 'label'
						}
					},
					editInput: {
						factory: createFocusableTextInput,
						options: {
							state: {
								classes: [ 'edit' ]
							},
							listeners: {
								blur: (event: Event) => { todoSave.do({state: instance.state, event}); },
								keyup: (event: Event) => { todoEditInput.do({state: instance.state, event}); }
							}
						}
					}
				})
				.then((children: TodoItemChildren) => {
					/* TODO: We are only using the label.widget but we are storing label: { id, widget }, is
					 * that necessary? */
					childrenMap.set(instance, children);
					instance.on('statechange', manageChildren);
					/* TODO: I had to do this in order for the first render of the widget to work, not sure
					 * why */
					manageChildren.call(instance);
				})
				.catch((err) => {
					/* TODO: We should find a way to better manage exceptions */
					console.error(err);
				});
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
			getChildrenNodes(this: TodoItem): VNode[] {
				const { checkbox, label, button, editInput } = childrenMap.get(this);
				return [
					h('div.view', [
						checkbox.widget.render(),
						label.widget.render(),
						button.widget.render()
					]),
					editInput.widget.render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
