import { ComposeFactory } from 'dojo-compose/compose';
import Promise from 'dojo-shim/Promise';
import WeakMap from 'dojo-shim/WeakMap';
import createButton from 'dojo-widgets/createButton';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createParentMapMixin, { ParentMapMixin, ParentMapMixinOptions } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { h, VNode } from 'maquette/maquette';

import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';
import { todoRemove, todoToggleComplete, todoEdit, todoSave, todoEditInput }  from './../actions/uiTodoActions';

interface TodoItemState extends WidgetState, StatefulChildrenState {
	editing?: boolean;
	completed?: boolean;
}

export interface TodoItemOptions extends WidgetOptions<TodoItemState>, ParentMapMixinOptions<Widget<TodoItemState>>, StatefulChildrenOptions<Child, TodoItemState> { }

export type TodoItem = Widget<TodoItemState> & ParentMapMixin<Child>;

export interface TodoItemFactory extends ComposeFactory<TodoItem, TodoItemOptions> { }

interface TodoItemChildren {
	label: string;
	checkbox: string;
	editInput: string;
	button: string;
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
	const [ labelWidget, checkboxWidget, editInputWidget ] = [ checkbox, label, editInput ]
		.map((id) => <Widget<WidgetState>> this.children.get(id));

	/* Adjust the state of the children to reflect parent */

	labelWidget.setState({
		label: this.state.label
	});

	editInputWidget.setState({
		value: this.state.label,
		focused: this.state.editing
	});

	checkboxWidget.setState({
		checked: this.state.completed
	});
}

const createTodoItem: TodoItemFactory = createWidget
	.mixin(createParentMapMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.mixin({
		mixin: createParentMapMixin,
		initialize(instance, options) {
			const checkbox = instance.createChild(createCheckboxInput, {
				state: {
					classes: [ 'toggle' ]
				},
				listeners: {
					change: () => { todoToggleComplete.do(instance.state); }
				}
			});

			const button = instance.createChild(createButton, {
				state: {
					classes: [ 'destroy' ]
				},
				listeners: {
					click: () => { todoRemove.do(instance.state); }
				}
			});

			const label = instance.createChild(createWidget, {
				listeners: {
					dblclick: () => { todoEdit.do(instance.state); }
				},
				tagName: 'label'
			});

			const editInput = instance.createChild(createFocusableTextInput, {
				state: {
					classes: [ 'edit' ]
				},
				listeners: {
					blur: (event: Event) => { todoSave.do({state: instance.state, event}); },
					keyup: (event: Event) => { todoEditInput.do({state: instance.state, event}); }
				}
			});

			Promise.all([ checkbox, button, label, editInput ])
				.then(([ [ checkbox ], [ button ], [ label ], [ editInput ] ]) => {
					console.log('FINISHED');
					childrenMap.set(instance, { checkbox, button, label, editInput });
					instance.on('statechange', manageChildren);
				})
				.catch((err) => {
					console.log(err);
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
						this.children.get(checkbox).render(),
						this.children.get(label).render(),
						this.children.get(button).render()
					]),
					this.children.get(editInput).render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
