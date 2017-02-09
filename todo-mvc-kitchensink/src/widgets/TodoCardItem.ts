import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import Button from './Button';
import CheckboxInput from './CheckboxInput';
import FocusableTextInput from './FocusableTextInput';

interface TodoCardItemProperties {
	label: string;
	completed?: boolean;
	editing?: boolean;
	checked?: boolean;
	focused?: boolean;
	onDoubleClick?: (event?: MouseEvent) => void;
	onKeyPress?: (event?: KeyboardEvent) => void;
}

interface LabelProperties {
	label: string;
	onDoubleClick?: (event?: MouseEvent) => void;
	onKeyPress?: (event?: KeyboardEvent) => void;
}

class Label extends WidgetBase<LabelProperties> {
	onDoubleClick(event?: MouseEvent) {
		this.properties.onDoubleClick && this.properties.onDoubleClick(event);
	}

	onKeyPress(event?: KeyboardEvent) {
		this.properties.onKeyPress && this.properties.onKeyPress(event);
	}

	render() {
		return v('label', {
			innerHTML: this.properties.label,
			'aria-describedby': 'edit-instructions',
			tabindex: '0',
			ondblclick: this.onDoubleClick,
			onkeypress: this.onKeyPress
		});
	}
}

export default class TodoCardItem extends WidgetBase<TodoCardItemProperties> {
	render() {
		const { completed = false, editing = false, checked = false, label, focused = false } = this.properties;

		return v('li', {
			classes: { completed, editing, card: true }
		}, [
			v('div.view', {}, [
				v('div.header', {}, [
					w(CheckboxInput, <any> {
						className: 'toggle',
						checked,
						onChange: todoToggleComplete.bind(this)
					}),
					w(Button, <any> {
						className: 'destroy',
						onClick: todoRemove.bind(this)
					})
				]),
				w(Label, <any> {
					label,
					onDoubleClick: todoEdit.bind(this),
					onKeyPress: todoEdit.bind(this)
				})
			]),
			editing ?
				w(FocusableTextInput, <any> {
					value: label,
					focused,
					className: 'edit',
					onBlur: todoSave.bind(this),
					onKeyPress: todoEditInput.bind(this)
				}) : null
		]);
	}
}
