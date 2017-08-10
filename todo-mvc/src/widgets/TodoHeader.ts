import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, TypedTargetEvent, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/todoHeader.css';

export interface TodoHeaderProperties extends WidgetProperties {
	allCompleted: boolean;
	todo: string;
	todoCount: number;
	toggleTodos: () => void;
	addTodo: () => void;
	todoInput: (todo: string) => void;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

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

	private _todoInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>): void {
		this.properties.todoInput(value);
	}

	protected onElementCreated(element: HTMLElement, key: string): void {
		if (key === 'todo-input') {
			element.focus();
		}
	}

	protected render(): DNode {
		const { properties: { todo, allCompleted } } = this;

		const newTodoProperties = {
			key: 'todo-input',
			classes: this.classes(css.newTodo),
			onkeyup: this._addTodo,
			oninput: this._todoInput,
			value: todo,
			placeholder: 'What needs to be done?'
		};

		return v('header', [
			v('h1', { classes: this.classes(css.title) }, [ 'todos' ]),
			v('input', newTodoProperties),
			v('input', { onchange: this._toggleAllTodos, checked: allCompleted, type: 'checkbox', classes: this.classes(css.toggleAll) })
		]);
	}
}

export default TodoHeader;
