import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';
import { Todo } from './TodoApp';

import * as css from './styles/todoItem.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (id: string, completed: boolean) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
}

export const TodoItemBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoItem extends TodoItemBase<TodoItemProperties> {

	private _toggleTodo() {
		this.properties.toggleTodo(this.properties.todo.id, this.properties.todo.completed);
	}

	private _editTodo() {
		this.properties.editTodo(this.properties.todo.id);
	}

	private _removeTodo({ target: { value: label } }: any) {
		if (!label) {
			this.properties.removeTodo(this.properties.todo.id);
		}
	}

	private _updateTodo({ which, target: { value: label } }: any) {
		const { todo } = this.properties;

		if (which === 13) {
			this.properties.saveTodo(todo.id, label);
		}
		else if (which === 27) {
			this.properties.saveTodo(todo.id);
		}
	}

	protected onElementCreated(element: HTMLElement, key: string): void {
		if (key === 'edit-input') {
			setTimeout(() => element.focus(), 0);
		}
	}

	protected render(): DNode {
		const { properties: { todo } } = this;
		const todoItemClasses = this.classes(
			todo.loading ? css.loading : null,
			css.todoItem,
			todo.editing ? css.editing : null,
			(todo.completed && !todo.editing) ? css.completed : null
		);

		return v('li', { id: todo.id, classes: todoItemClasses }, [
			v('div', { classes: this.classes(css.view) }, [
				v('input', { classes: this.classes(css.toggle), type: 'checkbox', checked: todo.completed, onchange: this._toggleTodo }),
				v('label', { classes: this.classes(css.todoLabel), innerHTML: todo.label, ondblclick: this._editTodo }),
				v('button', { onclick: this._removeTodo, classes: this.classes(css.destroy) })
			]),
			todo.editing ? v('input', {
				key: 'edit-input',
				onkeyup: this._updateTodo,
				onblur: this._removeTodo,
				value: todo.label,
				classes: this.classes(css.edit)
			}) : null
		]);
	}
}

export default TodoItem;
