import { v, w } from '@dojo/widget-core/d';
import { KeyPressEventHandler, DoubleClickEventHandler } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import Button from './Button';
import createCheckboxInput from './CheckboxInput';
import FocusableTextInput, { FocusableTextProperties } from './FocusableTextInput';

export interface TodoItemProperties {
	id: string;
	label: string;
	editing: boolean;
	completed: boolean;
	focused: boolean;
	checked: boolean;
}

interface LabelProperties {
	label: string;
	onKeyPress?: KeyPressEventHandler;
	onDoubleClick?: DoubleClickEventHandler;
}

class Label extends WidgetBase<LabelProperties> {
	onDoubleClick(event?: MouseEvent) {
		this.properties.onDoubleClick && this.properties.onDoubleClick(event);
	}

	onKeyPress(event?: KeyboardEvent) {
		this.properties.onKeyPress && this.properties.onKeyPress(event);
	}

	render() {
		const { onDoubleClick: ondblclick, onKeyPress: onkeypress } = this;

		return v('label', {
			innerHTML: this.properties.label,
			'aria-describedby': 'edit-instructions',
			tabindex: '0',
			ondblclick,
			onkeypress
		});
	}
}

export default class TodoListItem extends WidgetBase<TodoItemProperties> {
	render() {
		const { completed, editing, label, focused, id } = this.properties;
		const inputOptions: FocusableTextProperties = <any> {
			value: label,
			onKeyPress: todoEditInput.bind(this),
			onBlur: todoSave,
			id,
			focused,
			className: 'edit'
		};

		return v('li', {
			classes: { completed, editing, card: false }
		}, [
			v('div.view', {}, [
				w(createCheckboxInput, <any> {
					className: 'toggle',
					checked: completed,
					onChange: todoToggleComplete.bind(this)
				}),
				w(Label, <any> {
					label,
					onKeyPress: todoEdit.bind(this),
					onDoubleClick: todoEdit.bind(this)
				}),
				w(Button, <any> {
					className: 'destroy',
					onClick: todoRemove.bind(this)
				})
			]),
			editing ? w(FocusableTextInput, inputOptions) : null
		]);
	}
}
