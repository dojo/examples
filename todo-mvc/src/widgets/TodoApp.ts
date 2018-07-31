import Map from '@dojo/framework/shim/Map';
import uuid from '@dojo/framework/core/uuid';
import { assign } from '@dojo/framework/core/lang';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { w, v } from '@dojo/framework/widget-core/d';

import TodoHeader from './TodoHeader';
import { TodoListOutlet } from './TodoList';
import TodoFooter from './TodoFooter';

import * as css from './styles/todoApp.m.css';

export interface Todo {
	id: string;
	label: string;
	completed: boolean;
	editing?: boolean;
}

@theme(css)
export default class TodoApp extends ThemedMixin(WidgetBase) {

	private todos: Map<string, Todo> = new Map<string, Todo>();
	private todoItem = '';
	private completedCount = 0;
	private updated: string = uuid();

	protected render() {
		const { todoItem, updateTodo, updated, todos, completedCount, clearCompleted, editTodo, removeTodo, toggleTodo, toggleAllTodos } = this;
		const allCompleted = todos.size !== 0 && completedCount === todos.size;
		const activeCount = todos.size - completedCount;
		const completedItems = completedCount > 0;

		return v('section', { classes: this.theme(css.todoapp) }, [
			w(TodoHeader, { value: todoItem, updateTodo, allCompleted, addTodo: this.setTodo, toggleAllTodos }),
			v('section', [
				w(TodoListOutlet, { updated, todos, editTodo, removeTodo, toggleTodo, updateTodo: this.setTodo })
			]),
			todos.size ? w(TodoFooter, { clearCompleted, activeCount, completedItems }) : null
		]);
	}

	private removeTodo(id: string) {
		const todo = this.todos.get(id);
		if (todo) {
			this.todos.delete(id);
			todo.completed && --this.completedCount;
			this.onUpdate();
		}
	}

	private toggleTodo(id: string) {
		const todo = this.todos.get(id);
		if (todo) {
			const completed = !todo.completed;
			completed ? ++this.completedCount : --this.completedCount;
			this.setTodo({ completed }, id);
		}
	}

	private toggleAllTodos() {
		const completed = this.completedCount !== this.todos.size;
		this.todos.forEach((todo, key) => {
			this.setTodo({ completed }, key);
		});
		this.completedCount = completed ? this.todos.size : 0;
		this.onUpdate();
	}

	private editTodo(id: string) {
		const todo = this.todos.get(id);
		if (todo) {
			this.setTodo({ editing: true}, id);
			this.onUpdate();
		}
	}

	private clearCompleted() {
		this.todos.forEach((todo, key) => {
			if (todo.completed) {
				this.todos.delete(key);
			}
		});
		this.completedCount = 0;
		this.onUpdate();
	}

	private updateTodo(todo: string) {
		this.todoItem = todo;
		this.invalidate();
	}

	private setTodo(todo: Partial<Todo>, id?: string) {
		if (!id) {
			id = uuid();
			this.todoItem = '';
		}
		if (todo.label) {
			todo.label = todo.label.trim();
			if (!todo.label) {
				this.removeTodo(id);
				return;
			}
		}
		this.todos.set(id, assign(<any> { id }, this.todos.get(id) || {}, todo));
		this.onUpdate();
	}

	private onUpdate() {
		this.updated = uuid();
		this.invalidate();
	}
}
