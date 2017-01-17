import { Widget, DNode, WidgetProperties } from '@dojo/widgets/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { v, w } from '@dojo/widgets/d';
import { TextInputProperties } from '@dojo/widgets/components/textinput/createTextInput';
import createButton from '@dojo/widgets/components/button/createButton';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';
import { TodoItem } from './createTodoListItem';

interface CardItemProperties {
	label: string;
	onDoubleClick?: (event?: MouseEvent) => void;
	onKeyPress?: (event?: KeyboardEvent) => void;
}

export interface LabelWidget {
	onDoubleClick?: (event?: MouseEvent) => void;
	onKeyPress?: (event?: KeyboardEvent) => void;
}

const createLabel = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'label',

			onDoubleClick(this: Widget<CardItemProperties>, event?: MouseEvent) {
				this.properties.onDoubleClick && this.properties.onDoubleClick(event);
			},

			onKeyPress(this: Widget<CardItemProperties>, event?: KeyboardEvent) {
				this.properties.onKeyPress && this.properties.onKeyPress(event);
			},

			nodeAttributes: [
				function (this: Widget<CardItemProperties> & LabelWidget): VNodeProperties {
					const { onDoubleClick: ondblclick, onKeyPress: onkeypress }  = this;

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

const createTodoCardItem = createWidgetBase.mixin({
	mixin: {
		tagName: 'li',
		nodeAttributes: [
			function (this: TodoItem): VNodeProperties {
				const { completed, editing } = this.state;
				return {
					classes: { completed, editing, card: true }
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
				id: state.id,
				focused,
				classes: [ 'edit' ],
				onBlur: todoSave.bind(this),
				onKeyPress: todoEditInput.bind(this)
			};
			return [
				v('div.view', {}, [
					v('div.header', {}, [
						w(createCheckboxInput, {
							id: 'check' + state.id,
							classes: [ 'toggle' ],
							checked,
							onChange: todoToggleComplete.bind(this)
						}),
						w(createButton, <WidgetProperties> {
							id: 'button' + state.id,
							classes: [ 'destroy' ],
							onClick: todoRemove.bind(this)
						})
					]),
					w(createLabel, {
						id: 'label' + state.id,
						label,
						onDoubleClick: todoEdit.bind(this),
						onKeyPress: todoEdit.bind(this)
					})
				]),
				state.editing ?
					w(createFocusableTextInput, inputOptions) : null
			];
		}
	}
});

export default createTodoCardItem;
