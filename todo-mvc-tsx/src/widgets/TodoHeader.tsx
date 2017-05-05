import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { tsx } from '@dojo/widget-core/tsx';

import * as css from './styles/todoHeader.css';

export interface TodoHeaderProperties extends WidgetProperties {
	allCompleted: boolean;
	addTodo: Function;
	toggleAllTodos: Function;
	updateTodo: Function;
	value: string;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	render() {
		const { properties: { value, allCompleted } } = this;

		return (
			<header>
				<h1 classes={this.classes(css.title)}>
					todos
				</h1>
				<input
					id='new-todo'
					afterCreate={this.afterCreate}
					classes={this.classes(css.newTodo)}
					onkeyup={this.addTodo}
					oninput={this.updateTodo}
					value={value}
					placeholder='What needs to be done?'
				/>
				<input
					onchange={this.toggleAllTodos}
					checked={allCompleted}
					type='checkbox'
					classes={this.classes(css.toggleAll)}
				/>
			</header>
		);
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

	private afterCreate(element: HTMLInputElement) {
		setTimeout(() => element.focus(), 0);
	}
}
