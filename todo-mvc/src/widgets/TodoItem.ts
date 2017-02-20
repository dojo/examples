import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';
import { Todo } from './TodoApp';

import * as css from './styles/todoItem.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	editing: boolean;
	editTodo: Function;
	toggleTodo: Function;
	removeTodo: Function;
	updateTodo: Function;
}

export const TodoItemBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoItem extends TodoItemBase<TodoItemProperties> {

	render() {
		const { properties: { todo } } = this;

		return v('li', { id: 'todo-item', classes: this.classes(css.todoItem, Boolean(todo.editing) ? css.editing : null, Boolean(todo.completed && !todo.editing) ? css.completed : null) }, [
			v('div', { classes: this.classes(css.view) }, [
				v('input', { id: 'toggle', classes: this.classes(css.toggle), type: 'checkbox', checked: todo.completed, onchange: this.toggleTodo }),
				v('label', { classes: this.classes(css.todoLabel), innerHTML: todo.label, ondblclick: this.editTodo }),
				v('button', { id: 'destroy', onclick: this.removeTodo, classes: this.classes(css.destroy) })
			]),
			todo.editing ? v('input', { afterCreate: this.afterCreate, onkeyup: this.updateTodo, onblur: this.updateTodo, value: todo.label, classes: this.classes(css.edit) }) : null
		]);
	}

	private toggleTodo() {
		this.properties.toggleTodo(this.properties.key);
	}

	private editTodo() {
		this.properties.editTodo(this.properties.key);
	}

	private updateTodo({ which, target: { value: label } }: any) {
		const { properties: { todo, key } } = this;
		const editing = false;

		if (which === 13 || (!which && todo.editing)) {
			label ? this.properties.updateTodo({ label, editing }, key) : this.removeTodo();
		}
		else if (which === 27) {
			this.properties.updateTodo({ editing }, key);
		}
	}

	private removeTodo() {
		this.properties.removeTodo(this.properties.key);
	}

	private afterCreate(element: HTMLInputElement) {
		setTimeout(() => element.focus(), 0);
	}
}
