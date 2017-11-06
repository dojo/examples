import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { Todo } from './TodoApp';
import Button from '../dijits/form/Button';
import CheckBox from '../dijits/form/CheckBox';
import TextBox from '../dijits/form/TextBox';
import { tsx } from '@dojo/widget-core/tsx';

import * as css from './styles/todoItem.css';

export interface TodoItemProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
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
		return true;
	}

	private _updateTodo(arg?: any) {
		const { which, target: { value: label } } = arg;
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
		const todoItemClasses = this.classes(
			css.todoItem,
			Boolean(todo.editing) ? css.editing : null,
			Boolean(todo.completed && !todo.editing) ? css.completed : null
		);

		return (
			<li classes={todoItemClasses}>
				<div classes={this.classes(css.view)}>
					<CheckBox
						checked={todo.completed}
						class={css.toggle}
						onChange={this._toggleTodo}
					/>
					<label
						classes={this.classes(css.todoLabel)}
						innerHTML={todo.label}
						ondblclick={this._editTodo}
					/>
					<Button
						onClick={this._removeTodo}
						label='X'
						class={css.destroy}
					/>
				</div>
				{ todo.editing ?
					<TextBox
						key='edit-input'
						value={todo.label}
						class={css.edit}
						onBlur={this._updateTodo}
						onKeyUp={this._updateTodo}
					/>
				: null }
			</li>
		);
	}
}

export default TodoItem;
