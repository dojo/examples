import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/todoHeader.css';

export interface TodoHeaderProperties extends WidgetProperties {
	allCompleted: boolean;
	addTodo: Function;
	toggleAllTodos: Function;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	addTodo({ which, target: { value: label } }: any) {
		if (which === 13 && label) {
			this.properties.addTodo({ label, completed: false });
			this.invalidate();
		}
	}

	toggleAllTodos() {
		this.properties.toggleAllTodos();
	}

	afterCreate(element: HTMLInputElement) {
		setTimeout(() => element.focus(), 0);
	}

	render() {
		const { allCompleted } = this.properties;

		return v('header', [
			v('h1', { classes: this.classes(css.title) }, [ 'todos' ]),
			v('input', { id: 'new-todo', afterCreate: this.afterCreate, classes: this.classes(css.newTodo), value: '', onkeyup: this.addTodo, placeholder: 'What needs to be done?' }),
			v('input', { onchange: this.toggleAllTodos, checked: allCompleted, type: 'checkbox', classes: this.classes(css.toggleAll) })
		]);
	}
}
