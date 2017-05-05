import Map from '@dojo/shim/Map';
import uuid from '@dojo/core/uuid';
import { assign } from '@dojo/core/lang';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { registry } from '@dojo/widget-core/d';
import { tsx } from '@dojo/widget-core/tsx';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
import TodoFilter from './TodoFilter';

import * as css from './styles/todoApp.css';

registry.define('todo-header', TodoHeader);
registry.define('todo-list', TodoList);
registry.define('todo-item', TodoItem);
registry.define('todo-footer', TodoFooter);
registry.define('todo-filter', TodoFilter);

export interface Todo {
	id: string;
	label: string;
	completed: boolean;
	editing?: boolean;
}

export interface TodoAppProperties extends WidgetProperties {
	filter?: 'all' | 'active' | 'completed';
}

export const TodoAppBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoApp extends TodoAppBase<TodoAppProperties> {

	private todos: Map<string, Todo> = new Map<string, Todo>();
	private todoItem = '';
	private completedCount = 0;
	private updated: string = uuid();

	render() {
		const { todoItem, updateTodo, updated, todos, completedCount, clearCompleted, editTodo, removeTodo, toggleTodo, toggleAllTodos } = this;
		const { filter: activeFilter = 'all' } = this.properties;
		const allCompleted = todos.size !== 0 && completedCount === todos.size;
		const activeCount = todos.size - completedCount;
		const completedItems = completedCount > 0;

		return (
			<section classes={this.classes(css.todoapp)}>
				<TodoHeader
					value={todoItem}
					updateTodo={updateTodo}
					allCompleted={allCompleted}
					addTodo={this.setTodo}
					toggleAllTodos={toggleAllTodos}
				/>
				<section>
					<TodoList
						updated={updated}
						activeFilter={activeFilter}
						todos={todos}
						editTodo={editTodo}
						removeTodo={removeTodo}
						toggleTodo={toggleTodo}
						updateTodo={this.setTodo}
					/>
				</section>
				{ todos.size ? (
					<TodoFooter
						activeFilter={activeFilter}
						clearCompleted={clearCompleted}
						activeCount={activeCount}
						completedItems={completedItems}
					/>
				) : ( null ) }
			</section>
		);
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
		this.todos.set(id, assign({ id } as any, this.todos.get(id) || {}, todo));
		this.onUpdate();
	}

	private onUpdate() {
		this.updated = uuid();
		this.invalidate();
	}
}
