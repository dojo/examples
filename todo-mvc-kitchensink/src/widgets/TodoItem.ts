import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import { Todo } from './../TodoAppContext';

import * as css from './styles/todoItem.m.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
}

export const TodoItemBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoItem extends TodoItemBase<TodoItemProperties> {

	render() {
		const { properties: { todo } } = this;

		return v('li', { classes: this.classes(css.todoItem, Boolean(todo.completed && !todo.editing) ? css.completed : null) }, [
			v('div', [
				v('input', { classes: this.classes(css.toggle), type: 'checkbox', checked: todo.completed, onchange: this.toggleTodo }),
				v('label', { classes: this.classes(css.todoLabel), ondblclick: this.editTodo }, [ todo.label ]),
				v('button', { onclick: this.removeTodo, classes: this.classes(css.destroy) })
			])
		]);
	}

	private toggleTodo() {
		this.properties.toggleTodo(this.properties.todo.id);
	}

	private editTodo() {
		this.properties.editTodo(this.properties.todo.id);
	}

	private removeTodo() {
		this.properties.removeTodo(this.properties.todo.id);
	}
}
