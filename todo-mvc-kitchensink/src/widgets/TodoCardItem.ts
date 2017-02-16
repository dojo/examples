import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import CheckboxInput from './CheckboxInput';
import { DestroyButton } from './DestroyButton';
import FocusableTextInput from './FocusableTextInput';
import * as styles from './styles/TodoCardItem.css';
import * as commonStyles from './styles/TodoItemList.css';

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

@theme(styles)
export default class TodoCardItem extends ThemeableMixin(WidgetBase)<TodoCardItemProperties> {
	render() {
		const { completed = false, editing = false, label, focused = false } = this.properties;

		const classList = [
			styles.card
		];

		if (completed) {
			classList.push(commonStyles.completed)
		}

		if (editing) {
			classList.push(commonStyles.editing);
		}

		return v('li', {
			classes: this.classes().fixed(...classList).get()
		}, [
			v('div', {}, [
				v('div', {
					classes: this.classes(styles.cardHeader).get()
				}, [
					w(CheckboxInput, <any> {
						overrideClasses: {
							checkbox: commonStyles.toggle,
							checkbox2: styles.cardToggle
						},
						checked: completed,
						onChange: todoToggleComplete.bind(this)
					}),
					w(DestroyButton, <any> {
						overrideClasses: {
							destroyButton: styles.cardDestroy
						},
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
					overrideClasses: {
						base: commonStyles.edit
					},
					onBlur: todoSave.bind(this),
					onKeyPress: todoEditInput.bind(this)
				}) : null
		]);
	}
}
