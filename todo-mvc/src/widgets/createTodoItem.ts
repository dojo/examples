import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import { TextInputOptions } from 'dojo-widgets/components/textinput/createTextInput';
import createButton from 'dojo-widgets/components/button/createButton';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';

export type TodoItemState = WidgetState & {
	label: string;
	editing?: boolean;
	completed?: boolean;
};

export type TodoItemOptions = WidgetOptions<TodoItemState>;

export type TodoItem = Widget<TodoItemState>;

const createLabel = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'label',
			nodeAttributes: [
				function (this: Widget<WidgetState & { label: string }>): VNodeProperties {
					return {
						innerHTML: this.state.label,
						'aria-describedby': 'edit-instructions',
						tabindex: '0'
					};
				}
			]
		}
	});

const createTodoItem = createWidgetBase.mixin({
		mixin: {
			tagName: 'li',
			nodeAttributes: [
				function(this: TodoItem): VNodeProperties {
					const { completed, editing } = this.state;
					return {
						classes: { completed, editing }
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
						blur: (evt: Event) => { todoSave.do({ state, event }); },
							keypress: (evt: Event) => { todoEditInput.do({ state, event }); }
					},
					state: { focused, classes: [ 'edit' ] }
				};
				return [
					v('div.view', {}, [
						w(createCheckboxInput, {
							listeners: { change: () => { todoToggleComplete.do(state); } },
								state: { classes: [ 'toggle' ], checked }
						}),
						w(createLabel, {
							listeners: {
								dblclick: (event: Event) => { todoEdit.do({ state, event }); },
									keypress: (event: KeyboardEvent) => { todoEdit.do({ state, event }); }
							},
							state: { label }
						}),
						w(createButton, {
							listeners: { click: () => { todoRemove.do(state); } },
								state: { classes: [ 'destroy' ] }
						})
					]),
					state.editing ?
						w(createFocusableTextInput, inputOptions) : null
				];
			}
		}
});

export default createTodoItem;
