import WeakMap from 'dojo-shim/WeakMap';
import createButton from 'dojo-widgets/createButton';
import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions, CreateChildrenResults, CreateChildrenResultsItem } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { h, VNode } from 'maquette';

import {
	todoEdit,
	todoEditInput,
	todoRemove,
	todoSave,
	todoToggleComplete
} from '../actions/uiTodoActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';

type TodoItemState = RenderMixinState & StatefulChildrenState & {
	editing?: boolean;
	completed?: boolean;
};

export type TodoItemOptions = RenderMixinOptions<TodoItemState> & StatefulChildrenOptions<Child, TodoItemState>;

export type TodoItem = RenderMixin<TodoItemState>;

interface TodoItemChildren<C extends Child> extends CreateChildrenResults<C> {
	label: CreateChildrenResultsItem<C>;
	checkbox: CreateChildrenResultsItem<C>;
	editInput: CreateChildrenResultsItem<C>;
	button: CreateChildrenResultsItem<C>;
}

/**
 * Internal map of sub children IDs
 */
const childrenMap = new WeakMap<TodoItem, TodoItemChildren<RenderMixin<any>>>();

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

const createTodoItem = createRenderMixin
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			let destroyed = false;
			instance.own({
				destroy() {
					destroyed = true;
				}
			});

			return instance.createChildren({
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
					factory: createRenderMixin,
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
			.then((children: TodoItemChildren<RenderMixin<any>>) => {
				if (destroyed) {
					return;
				}

				/* TODO: We are only using the label.widget but we are storing label: { id, widget }, is
					* that necessary? */
				childrenMap.set(instance, children);
				instance.on('statechange', manageChildren);

				/* We have missed the widgets initial state change because we created the widgets async
					* so we should set state on the instance, so it will re-calculate its children */
				instance.setState({});
			})
			.catch((err) => {
				instance.emit({
					type: 'error',
					target: instance,
					error: err
				});
			});
		}
	})
	.extend({
		get classes(this: TodoItem): string[] {
			/* TODO: Deal with this in nodeAttributes when class classes are implementend */
			const classes: string[] = [];
			if (this.state.editing) {
				classes.push('editing');
			}
			return this.state.completed ? [ 'completed', ...classes ] : classes;
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
		},

		tagName: 'li'
	});

export default createTodoItem;
