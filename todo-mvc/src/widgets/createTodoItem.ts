import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createButton from 'dojo-widgets/createButton';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';

export type TodoItemState = WidgetState & {
	label: string;
	editing?: boolean;
	completed?: boolean;
};

export type TodoItemOptions = WidgetOptions<TodoItemState>;

export type TodoItem = Widget<TodoItemState>;

const createLabel = createWidgetBase
	.mixin(createVNodeEvented)
	.extend({
		tagName: 'label',
		nodeAttributes: [
			function (this: any): any {
				return { innerHTML: this.state.label };
			}
		]
	});

const createTodoItem = createWidgetBase
	.extend({
		nodeAttributes: [
			function(this: TodoItem): VNodeProperties {
				const { completed, editing } = this.state;
				return {
					classes: { completed, editing }
				};
			}
		],
		childNodeRenderers: [
			function(this: TodoItem): DNode[] {
				const state = this.state;
				const checked = state.completed;
				const label = state.label;
				const focused = state.editing;
				return [
					d('div.view', {}, [
						d(createCheckboxInput, {
							listeners: { change: () => { todoToggleComplete.do(state); } },
							state: { classes: [ 'toggle' ], checked }
						}),
						d(createLabel, {
							listeners: { dblclick: () => { todoEdit.do(state); } },
							state: { label }
						}),
						d(createButton, {
							listeners: { click: () => { todoRemove.do(state); } },
							state: { classes: [ 'destroy' ] }
						})
					]),
					state.editing ?
					d(createFocusableTextInput, {
						listeners: {
							blur: (evt: Event) => { todoSave.do({ state, evt }); },
							keyup: (evt: Event) => { todoEditInput.do({ state, evt }); }
						},
						state: { value: label, focused, classes: [ 'edit' ] }
					}) : null
				];
			}
		],
		tagName: 'li'
	});

export default createTodoItem;
