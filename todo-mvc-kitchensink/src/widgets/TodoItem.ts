import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { v } from '@dojo/widget-core/d';

import { Todo } from './../todoProcesses';

import * as css from './styles/todoItem.m.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (payload: { id: string }) => void;
	removeTodo: (payload: { id: string }) => void;
	editTodo: (payload: { id: string }) => void;
}

export const TodoItemBase = ThemedMixin(WidgetBase);

@theme(css)
export class TodoItem extends TodoItemBase<TodoItemProperties> {

	render() {
		const { properties: { todo } } = this;

		return v('li', { classes: this.theme([ css.todoItem, Boolean(todo.completed && !todo.editing) ? css.completed : null ]) }, [
			v('div', [
				v('input', { classes: this.theme(css.toggle), type: 'checkbox', checked: todo.completed, onchange: this.toggleTodo }),
				v('label', { classes: this.theme(css.todoLabel), ondblclick: this.editTodo }, [ todo.label ]),
				v('button', { onclick: this.removeTodo, classes: this.theme(css.destroy) })
			])
		]);
	}

	private toggleTodo() {
		this.properties.toggleTodo({ id: this.properties.todo.id });
	}

	private editTodo() {
		this.properties.editTodo({ id: this.properties.todo.id });
	}

	private removeTodo() {
		this.properties.removeTodo({ id: this.properties.todo.id });
	}
}
