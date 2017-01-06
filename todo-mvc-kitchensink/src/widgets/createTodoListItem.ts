import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import { TextInputOptions } from 'dojo-widgets/components/textinput/createTextInput';
import createButton from 'dojo-widgets/components/button/createButton';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';

export interface TodoItemProperties {
	id: string;
	label: string;
	editing: boolean;
	completed: boolean;
}

export type TodoItemState = WidgetState & TodoItemProperties;
export type TodoItemOptions = WidgetOptions<TodoItemState, TodoItemProperties>;

export type TodoItem = Widget<TodoItemState, TodoItemProperties>;

const createLabel = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'label',
			nodeAttributes: [
				function (this: TodoItem): VNodeProperties {
					return {
						innerHTML: this.properties.label,
						'aria-describedby': 'edit-instructions',
						tabindex: '0'
					};
				}
			]
		}
	});

const createTodoListItem = createWidgetBase.mixin({
		mixin: {
			tagName: 'li',
			nodeAttributes: [
				function(this: TodoItem): VNodeProperties {
					const { completed, editing } = this.properties;
					return {
						classes: { completed, editing, card: false }
					};
				}
			],
			getChildrenNodes: function(this: TodoItem): (DNode | null)[] {
				const state = this.state;
				const checked = state.completed;
				const label = state.label;
				const focused = state.editing;
				const inputOptions: TextInputOptions = {
					value: label,
					listeners: {
						blur: todoSave,
						keypress: todoEditInput
					},
					properties: { id: this.state.id, focused, classes: [ 'edit' ] }
				};
				return [
					v('div.view', {}, [
						w(createCheckboxInput, {
							listeners: { change: todoToggleComplete },
							properties: { id: this.state.id, classes: [ 'toggle' ], checked }
						}),
						w(createLabel, {
							listeners: {
								dblclick: todoEdit,
								keypress: todoEdit
							},
							properties: { id: this.state.id, label }
						}),
						w(createButton, {
							listeners: { click: todoRemove },
							properties: { id: this.state.id, classes: [ 'destroy' ] }
						})
					]),
					state.editing ?
						w(createFocusableTextInput, inputOptions) : null
				];
			}
		}
});

export default createTodoListItem;
