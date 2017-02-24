import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Todo } from './App';
import * as styles from './styles/TodoItem.css';

interface TodoCardItemProperties extends ThemeableProperties {
	type: 'list' | 'card';
	todo: Todo;
	editTodo: Function;
	removeTodo: Function;
	toggleTodo: Function;
}

@theme(styles)
export default class TodoCardItem extends ThemeableMixin(WidgetBase)<TodoCardItemProperties> {
	render() {
		const { type } = this.properties;

		if (type === 'list') {
			return this._renderListItem();
		}
		else {
			return this._renderCardItem();
		}
	}

	private _renderListItem() {
		const { todo, theme } = this.properties;

		return v('li', {
			classes: this.classes(
				styles.listItem,
				todo.completed ? styles.completed : null
			)
		}, [
			v('div', [
				w('toggler', {
					theme,
					checked: todo.completed,
					onChange: this._todoToggleComplete
				}),
				w('label', {
					label: todo.label || '',
					onKeyPress: this._editTodo,
					onDoubleClick: this._editTodo
				}),
				v('span', {
					classes: this.classes(styles.destroyContainer)
				}, [
					w('destroy-button', {
						theme,
						onClick: this._removeTodo
					})
				])

			])
		]);
	}

	private _renderCardItem() {
		const { todo, theme } = this.properties;

		return v('li', {
			classes: this.classes(
				styles.card,
				todo.completed ? styles.completed : null
			)
		}, [
			v('div', [
				v('div', {
					classes: this.classes(styles.cardHeader)
				}, [
					w('toggler', <any> {
						theme,
						overrideClasses: {
							toggle: styles.cardToggle
						},
						checked: todo.completed,
						onChange: this._todoToggleComplete
					}),
					w('destroy-button', <any> {
						theme,
						overrideClasses: {
							destroyButton: styles.cardDestroy
						},
						onClick: this._removeTodo
					})
				]),
				w('label', <any> {
					theme,
					label: todo.label,
					onDoubleClick: this._editTodo,
					onKeyPress: this._editTodo
				})
			])
		]);
	}

	private _todoToggleComplete() {
		this.properties.toggleTodo(this.properties.todo.id);
	}

	private _removeTodo() {
		this.properties.removeTodo(this.properties.todo.id);
	}

	private _editTodo() {
		this.properties.editTodo(this.properties.todo.id);
	}
}
