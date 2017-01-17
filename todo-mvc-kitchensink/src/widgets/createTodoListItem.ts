import { Widget, DNode, WidgetProperties } from '@dojo/widgets/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { v, w } from '@dojo/widgets/d';
import { TextInputProperties } from '@dojo/widgets/components/textinput/createTextInput';
import createButton from '@dojo/widgets/components/button/createButton';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';

export interface TodoItemProperties {
	id: string;
	label: string;
	editing: boolean;
	completed: boolean;
}

export type TodoItem = Widget<TodoItemProperties>;

export interface LabelType extends WidgetProperties {
	label: string,
	onDoubleClick?: (event?: MouseEvent) => void;
	onKeyPress?: (event?: KeyboardEvent) => void;
}

export type LabelWidget = Widget<LabelType> & {
	onDoubleClick?: (event?: MouseEvent) => void;
	onKeyPress?: (event?: KeyboardEvent) => void;
}

const createLabel = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'label',
			onDoubleClick(this: LabelWidget, event?: MouseEvent) {
				this.properties.onDoubleClick && this.properties.onDoubleClick(event);
			},

			onKeyPress(this: LabelWidget, event?: KeyboardEvent) {
				this.properties.onKeyPress && this.properties.onKeyPress(event);
			},

			nodeAttributes: [
				function (this: LabelWidget): VNodeProperties {
					const { onDoubleClick: ondblclick, onKeyPress: onkeypress } = this;

					return {
						innerHTML: this.properties.label,
						'aria-describedby': 'edit-instructions',
						tabindex: '0',
						ondblclick,
						onkeypress
					};
				}
			]
		}
	});

const createTodoListItem = createWidgetBase.mixin({
	mixin: {
		tagName: 'li',
		nodeAttributes: [
			function (this: TodoItem): VNodeProperties {
				const { completed, editing } = this.properties;
				return {
					classes: { completed, editing, card: false }
				};
			}
		],
		getChildrenNodes: function (this: TodoItem): (DNode | null)[] {
			const state = this.properties;
			const checked = state.completed;
			const label = state.label;
			const focused = state.editing;
			const inputOptions: TextInputProperties = {
				value: label,
				onKeyPress: todoEditInput.bind(this),
				onBlur: todoSave,
				id: this.state.id,
				focused,
				classes: [ 'edit' ]
			};
			return [
				v('div.view', {}, [
					w(createCheckboxInput, {
						id: 'checkbox' + this.state.id,
						classes: [ 'toggle' ],
						checked,
						onChange: todoToggleComplete.bind(this)
					}),
					w(createLabel, {
						id: 'label' + this.state.id,
						label,
						onKeyPress: todoEdit.bind(this),
						onDoubleClick: todoEdit.bind(this)
					}),
					w(createButton, <WidgetProperties> {
						id: 'button' + this.state.id,
						classes: [ 'destroy' ],
						onClick: todoRemove.bind(this)
					})
				]),
				state.editing ?
					w(createFocusableTextInput, inputOptions) : null
			];
		}
	}
});

export default createTodoListItem;
