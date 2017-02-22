import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoEdit, todoRemove, todoToggleComplete } from '../actions/userActions';
import { DestroyButton } from './DestroyButton';
import * as styles from './styles/TodoCardItem.css';
import { Toggler } from './Toggler';

interface TodoCardItemProperties extends ThemeableProperties {
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
		const { completed = false, label, theme } = this.properties;

		const classList = [
			styles.card
		];

		if (completed) {
			classList.push(styles.completed);
		}

		return v('li', {
			classes: this.classes(...classList).get()
		}, [
			v('div', {}, [
				v('div', {
					classes: this.classes(styles.cardHeader).get()
				}, [
					w(Toggler, <any> {
						theme,
						overrideClasses: {
							toggle: styles.cardToggle
						},
						checked: completed,
						onChange: todoToggleComplete.bind(this)
					}),
					w(DestroyButton, <any> {
						theme,
						overrideClasses: {
							destroyButton: styles.cardDestroy
						},
						onClick: todoRemove.bind(this)
					})
				]),
				w(Label, <any> {
					theme,
					label,
					onDoubleClick: todoEdit.bind(this),
					onKeyPress: todoEdit.bind(this)
				})
			])
		]);
	}
}
