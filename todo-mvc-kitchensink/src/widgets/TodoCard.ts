import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { v } from '@dojo/widget-core/d';

import { Todo } from './../todoStore';

import * as css from './styles/todoCard.m.css';

export interface TodoCardProperties extends WidgetProperties {
	todo: Todo;
	editTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
}

export const TodoCardBase = ThemedMixin(WidgetBase);

@theme(css)
export class TodoCard extends TodoCardBase<TodoCardProperties> {

	protected toggleTodo(): void {
		const { toggleTodo, todo: { id } } = this.properties;
		toggleTodo(id);
	}

	protected editTodo(): void {
		const { editTodo, todo: { id } } = this.properties;
		editTodo(id);
	}

	protected removeTodo(): void {
		const { removeTodo, todo: { id } } = this.properties;
		removeTodo(id);
	}

	protected render(): DNode {
		const { todo } = this.properties;

		return v('li', { classes: this.theme([ css.card, todo.completed ? css.completed : null ]) }, [
			v('div', { classes: this.theme(css.cardHeader) }, [
				v('input', {
					classes: this.theme(css.cardToggle),
					type: 'checkbox',
					checked: todo.completed,
					onchange: this.toggleTodo
				}),
				v('button', { classes: this.theme(css.cardDestroy), onclick: this.removeTodo })
			]),
			v('label', { classes: this.theme(css.todoLabel), ondblclick: this.editTodo }, [ todo.label ])
		]);
	}
}
