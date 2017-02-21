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

	private initialized: boolean = false;

	render() {
		const { initialized, properties: { allCompleted } } = this;
		const newTodoProperties: any = {
			id: 'new-todo',
			afterCreate: this.afterCreate,
			classes: this.classes(css.newTodo),
			onkeyup: this.addTodo,
			placeholder: 'What needs to be done?'
		};

		if (!this.initialized) {
			newTodoProperties.value = '';
			this.initialized = true;
		}

		return v('header', [
			v('h1', { classes: this.classes(css.title) }, [ 'todos' ]),
			v('input', newTodoProperties),
			v('input', { onchange: this.toggleAllTodos, checked: allCompleted, type: 'checkbox', classes: this.classes(css.toggleAll) })
		]);
	}

	private addTodo({ which, target: { value: label } }: any) {
		if (which === 13 && label) {
			this.properties.addTodo({ label, completed: false });
			this.initialized = false;
			this.invalidate();
		}
	}

	private toggleAllTodos() {
		this.properties.toggleAllTodos();
	}

	private afterCreate(element: HTMLInputElement) {
		setTimeout(() => element.focus(), 0);
	}
}
