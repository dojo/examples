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
	addTodo: (label: string) => void;
	todoInput: (todo: string) => void;
	undo: () => void;
	hasUndoOperations: boolean;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	private _toggleAllTodos(): void {
		this.properties.toggleTodos();
	}

	private _addTodo({ which, target: { value: label } }: any): void {
		if (which === 13 && label) {
			this.properties.todoInput('');
			this.properties.addTodo(label);
		}
	}

	private _todoInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>): void {
		this.properties.todoInput(value);
	}

	private _undo() {
		this.properties.undo();
	}

	protected render(): DNode {
		const { properties: { todo, allCompleted, hasUndoOperations } } = this;

		const newTodoProperties = {
			key: 'todo-input',
			classes: this.classes(css.newTodo),
			onkeyup: this._addTodo,
			oninput: this._todoInput,
			value: todo,
			autofocus: true,
			placeholder: 'What needs to be done?'
		};

		return v('header', [
			v('h1', { classes: this.classes(css.title) }, [ 'todos' ]),
			v('input', newTodoProperties),
			v('input', { key: 'toggle-all', onchange: this._toggleAllTodos, checked: allCompleted, type: 'checkbox', classes: this.classes(css.toggleAll) }),
			v('button', { key: 'undo', onclick: this._undo, disabled: !hasUndoOperations, classes: this.classes(css.undo) })
		]);
	}
}

export default TodoHeader;
