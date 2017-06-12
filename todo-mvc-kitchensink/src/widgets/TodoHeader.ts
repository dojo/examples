import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import  { v } from '@dojo/widget-core/d';
import { DNode, TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/todoHeader.m.css';

export interface TodoHeaderProperties {
	allCompleted: boolean;
	todo: string;
	todoCount: number;
	toggleTodos: () => void;
	addTodo: () => void;
	todoInput: (todo: string) => void;
}

export const TodoHeaderBase = I18nMixin(ThemeableMixin(WidgetBase));

@theme(css)
export class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	protected toggleAllTodos() {
		this.properties.toggleTodos();
	}

	protected addTodo(event: KeyboardEvent) {
		if (event.which === 13) {
			this.properties.addTodo();
		}
	}

	protected todoInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.todoInput(value);
	}

	protected onElementCreated(element: HTMLElement, key: string) {
		if (key === 'todo-input') {
			element.focus();
		}
	}

	protected render(): DNode {
		const { allCompleted, todo, todoCount } = this.properties;
		const messages = this.localizeBundle(appBundle);

		return v('header', [
			v('h1', { classes: this.classes(css.title) }, [ messages.appTitle ]),
			v('input', {
				key: 'todo-input',
				classes: this.classes(css.newTodo),
				onkeydown: this.addTodo,
				oninput: this.todoInput,
				value: todo,
				placeholder: messages.editPlaceholder
			}),
			v('input', {
				classes: this.classes(css.toggleAll),
				onchange: this.toggleAllTodos,
				checked: allCompleted,
				type: 'checkbox',
				disabled: todoCount === 0 ? true : false
			})
		]);
	}
}
