import { v, w } from '@dojo/widget-core/d';
import { KeyPressEventHandler, DoubleClickEventHandler } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './CheckboxInput';
import { DestroyButton } from './DestroyButton';
import FocusableTextInput, { FocusableTextProperties } from './FocusableTextInput';
import * as commonStyles from './styles/TodoItemList.css';
import * as styles from './styles/TodoListItem.css';

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

@theme(styles)
export default class TodoListItem extends ThemeableMixin(WidgetBase)<TodoItemProperties> {
	render() {
		const { completed, editing, label, focused, id } = this.properties;
		const inputOptions: FocusableTextProperties = <any> {
			value: label,
			onKeyPress: todoEditInput.bind(this),
			onBlur: todoSave,
			id,
			focused,
			overrideClasses: {
				base: commonStyles.edit
			}
		};

		const classList = [];

		if (completed) {
			classList.push(commonStyles.completed);
		}

		if (editing) {
			classList.push(commonStyles.editing);
		}

		return v('li', {
			classes: this.classes().fixed(...classList).get()
		}, [
			v('div', {
				classes: this.classes(styles.view).get()
			}, [
				w(createCheckboxInput, <any> {
					overrideClasses: { checkbox: commonStyles.toggle },
					checked: completed,
					onChange: todoToggleComplete.bind(this)
				}),
				w(Label, <any> {
					label,
					onKeyPress: todoEdit.bind(this),
					onDoubleClick: todoEdit.bind(this)
				}),
				w(DestroyButton, <any> {
					onClick: todoRemove.bind(this)
				})
			]),
			editing ? w(FocusableTextInput, inputOptions) : null
		]);
	}
}
