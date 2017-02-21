import { v, w } from '@dojo/widget-core/d';
import { KeyPressEventHandler, DoubleClickEventHandler } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoEdit, todoRemove, todoToggleComplete } from '../actions/userActions';
import { DestroyButton } from './DestroyButton';
import * as styles from './styles/TodoListItem.css';
import { Toggler } from './Toggler';

export interface TodoItemProperties extends ThemeableProperties {
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
		const { completed, label, theme } = this.properties;

		const classList = [
			styles.listItem
		];

		if (completed) {
			classList.push(styles.completed);
		}

		return v('li', {
			classes: this.classes(...classList).get()
		}, [
			v('div', {
				classes: this.classes(styles.view).get()
			}, [
				w(Toggler, <any> {
					theme,
					checked: completed,
					onChange: todoToggleComplete.bind(this)
				}),
				w(Label, <any> {
					label,
					theme,
					onKeyPress: todoEdit.bind(this),
					onDoubleClick: todoEdit.bind(this)
				}),
				v('span', {
					classes: this.classes(styles.destroyContainer).get()
				}, [
					w(DestroyButton, <any> {
						theme,
						onClick: todoRemove.bind(this)
					})
				])

			])
		]);
	}
}
