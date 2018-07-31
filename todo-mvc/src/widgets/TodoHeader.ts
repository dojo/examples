import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';

import * as css from './styles/todoHeader.m.css';

export interface TodoHeaderProperties {
	allCompleted: boolean;
	addTodo: Function;
	toggleAllTodos: Function;
	updateTodo: Function;
	value: string;
}

@theme(css)
export default class TodoHeader extends ThemedMixin(WidgetBase)<TodoHeaderProperties> {

	protected render() {
		const { properties: { value, allCompleted } } = this;
		const newTodoProperties: any = {
			key: 'new-todo',
			focus: true,
			classes: this.theme(css.newTodo),
			onkeyup: this.addTodo,
			oninput: this.updateTodo,
			value,
			placeholder: 'What needs to be done?'
		};

		return v('header', [
			v('h1', { classes: this.theme(css.title) }, [ 'todos' ]),
			v('input', newTodoProperties),
			v('input', { onchange: this.toggleAllTodos, checked: allCompleted, type: 'checkbox', classes: this.theme(css.toggleAll) })
		]);
	}

	private addTodo({ which, target: { value: label } }: any) {
		if (which === 13 && label) {
			this.properties.addTodo({ label, completed: false });
		}
	}

	private updateTodo({ target: { value } }: any) {
		this.properties.updateTodo(value);
	}

	private toggleAllTodos() {
		this.properties.toggleAllTodos();
	}
}
