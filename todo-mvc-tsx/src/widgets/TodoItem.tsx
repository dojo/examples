import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { Todo } from './TodoApp';
import { tsx } from '@dojo/widget-core/tsx';

import * as css from './styles/todoItem.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
}

export const TodoItemBase = ThemedMixin(WidgetBase);

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

	private _updateTodo({ which, target: { value: label } }: any) {
		const { todo } = this.properties;

		if (which === 13 || (!which && todo.editing)) {
			label ? this.properties.saveTodo(todo.id, label) : this._removeTodo();
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
		const todoItemClasses = this.theme([
			css.todoItem,
			Boolean(todo.editing) ? css.editing : null,
			Boolean(todo.completed && !todo.editing) ? css.completed : null
		]);

		return (
			<li classes={todoItemClasses}>
				<div classes={this.theme(css.view)}>
					<input
						classes={this.theme(css.toggle)}
						type='checkbox'
						checked={todo.completed}
						onchange={this._toggleTodo}
					/>
					<label
						classes={this.theme(css.todoLabel)}
						innerHTML={todo.label}
						ondblclick={this._editTodo}
					/>
					<button onclick={this._removeTodo} classes={this.theme(css.destroy)}/>
				</div>
				{ todo.editing ?
					<input
						key='edit-input'
						value={todo.label}
						classes={this.theme(css.edit)}
						onblur={this._updateTodo}
						onkeyup={this._updateTodo}
					/>
				: null }
			</li>
		);
	}
}

export default TodoItem;
