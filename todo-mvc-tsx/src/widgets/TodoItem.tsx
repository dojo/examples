import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { Todo } from './TodoApp';
import { tsx } from '@dojo/widget-core/tsx';

import * as css from './styles/todoItem.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label: string) => void;
}

export const TodoItemBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoItem extends TodoItemBase<TodoItemProperties> {

	private _toggleTodo() {
		this.properties.toggleTodo(this.properties.todo.id);
	}

	private _editTodo() {
		this.properties.editTodo(this.properties.todo.id);
	}

	private _removeTodo() {
		this.properties.removeTodo(this.properties.todo.id);
	}

	private _saveTodo({ which, target: { value: label } }: any) {
		const { todo } = this.properties;

		if (which === 13 || which === 27) {
			this._saveOnLeave({ which, target: { value: label } });
		}
	}

	private _saveOnLeave({ which, target: { value: label } }: any) {
		const { todo } = this.properties;
		if (label.trim()) {
				this.properties.saveTodo(todo.id, label);
		}
		else {
			this._removeTodo();
		}
	}

	protected render(): DNode {
		const { properties: { todo } } = this;
		const todoItemClasses = this.classes(
			css.todoItem,
			Boolean(todo.editing) ? css.editing : null,
			Boolean(todo.completed && !todo.editing) ? css.completed : null
		);

		return (
			<li id='todo-item' classes={todoItemClasses}>
				<div classes={this.classes(css.view)}>
					<input
						id='toggle'
						classes={this.classes(css.toggle)}
						type='checkbox'
						checked={todo.completed}
						onchange={this._toggleTodo}
					/>
					<label
						classes={this.classes(css.todoLabel)}
						innerHTML={todo.label}
						ondblclick={this._editTodo}
					/>
					<button id='destroy' onclick={this._removeTodo} classes={this.classes(css.destroy)}/>
				</div>
				{todo.editing ? (
					<input
						key='edit-input'
						value={todo.label}
						classes={this.classes(css.edit)}
						onblur={this._saveOnLeave}
						onkeyup={this._saveTodo}
					/>
				) : (null)}
			</li>
		);
	}
}

export default TodoItem;
