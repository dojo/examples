import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import { Todo } from './../TodoAppContext';

import * as css from './styles/todoCard.m.css';

export interface TodoCardProperties extends WidgetProperties {
	todo: Todo;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
}

export const TodoCardBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoCard extends TodoCardBase<TodoCardProperties> {

	protected toggleTodo(): void {
		this.properties.toggleTodo(this.properties.todo.id);
	}

	protected editTodo(): void {
		this.properties.editTodo(this.properties.todo.id);
	}

	protected removeTodo(): void {
		this.properties.removeTodo(this.properties.todo.id);
	}

	protected render(): DNode {
		const { todo } = this.properties;

		return v('li', { classes: this.classes(css.card, todo.completed ? css.completed : null)}, [
			v('div', { classes: this.classes(css.cardHeader) }, [
				v('input', {
					classes: this.classes(css.cardToggle),
					type: 'checkbox',
					checked: todo.completed,
					onchange: this.toggleTodo
				}),
				v('button', { classes: this.classes(css.cardDestroy), onclick: this.removeTodo })
			]),
			v('label', { classes: this.classes(css.todoLabel), ondblclick: this.editTodo }, [ todo.label ])
		]);
	}
}
