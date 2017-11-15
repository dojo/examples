import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import  { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/todoHeader.m.css';

export interface TodoHeaderProperties {
	allCompleted: boolean;
	todo: string;
	todoCount: number;
	toggleTodos: () => void;
	addTodo: () => void;
	setCurrentTodo: (todo: string) => void;
}

export const TodoHeaderBase = I18nMixin(ThemedMixin(WidgetBase));

@theme(css)
export class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	protected addTodo(event: KeyboardEvent) {
		if (event.which === 13) {
			this.properties.addTodo();
		}
	}

	protected onElementCreated(element: HTMLElement, key: string): void {
		if (key === 'todo-input') {
			element.focus();
		}
	}

	protected render(): DNode {
		const { allCompleted, todo, todoCount } = this.properties;
		const messages = this.localizeBundle(appBundle);

		return v('header', [
			v('h1', { classes: this.theme(css.title) }, [ messages.appTitle ]),
			v('input', {
				key: 'todo-input',
				classes: this.theme(css.newTodo),
				onkeydown: this.properties.addTodo,
				oninput: this.properties.setCurrentTodo,
				value: todo,
				placeholder: messages.editPlaceholder
			}),
			v('input', {
				classes: this.theme(css.toggleAll),
				onchange: this.properties.toggleTodos,
				checked: allCompleted,
				type: 'checkbox',
				disabled: todoCount === 0 ? true : false
			})
		]);
	}
}
