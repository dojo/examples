import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { tsx } from '@dojo/widget-core/tsx';

import * as css from './styles/todoHeader.css';

export interface TodoHeaderProperties extends WidgetProperties {
	allCompleted: boolean;
	todo: string;
	todoCount: number;
	toggleTodos: () => void;
	addTodo: () => void;
	todoInput: (todo: string) => void;
}

export const TodoHeaderBase = ThemedMixin(WidgetBase);

@theme(css)
export class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	private _toggleAllTodos(): void {
		this.properties.toggleTodos();
	}

	private _addTodo(event: KeyboardEvent): void {
		if (event.which === 13) {
			this.properties.addTodo();
		}
	}

	private _todoInput(evt: Event): void {
		const { value } = evt.target as HTMLInputElement;
		this.properties.todoInput(value);
	}

	protected onElementCreated(element: HTMLElement, key: string): void {
		if (key === 'todo-input') {
			element.focus();
		}
	}

	protected render(): DNode {
		const { properties: { todo, allCompleted } } = this;

		return (
			<header>
				<h1 classes={this.theme(css.title)}>
					todos
				</h1>
				<input
					key='todo-input'
					classes={this.theme(css.newTodo)}
					onkeyup={this._addTodo}
					oninput={this._todoInput}
					value={todo}
					placeholder='What needs to be done?'
				/>
				<input
					onchange={this._toggleAllTodos}
					checked={allCompleted}
					type='checkbox'
					classes={this.theme(css.toggleAll)}
				/>
			</header>
		);
	}
}

export default TodoHeader;
