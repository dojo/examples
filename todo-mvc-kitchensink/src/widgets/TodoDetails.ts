import { DNode, TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';

import { Todo } from './../TodoAppContext';

import * as css from './styles/todoDetails.m.css';

export interface TodoDetailsProperties {
	todo?: Todo;
	onRequestExit: () => void;
	saveTodo: () => void;
	editTodoInput: (todo: Todo) => void;
}

@theme(css)
export class TodoDetails extends ThemeableMixin(WidgetBase)<TodoDetailsProperties> {

	protected onClose() {
		this.properties.saveTodo();
		this.properties.onRequestExit();
	}

	protected onInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.editTodoInput({ ...this.properties.todo, ...{ label: value } });
	}

	protected onElementCreated(element: HTMLElement, key: string) {
		if (key === 'edit-todo') {
			element.focus();
		}
	}

	protected render(): DNode {
		const { todo } = this.properties;

		return todo ?
			v('div', { classes: this.classes(css.todoDetails) }, [
				v('div', { classes: this.classes(css.backdrop) }),
				v('div', { classes: this.classes(css.modal) }, [
					v('div', { onclick: this.onClose, classes: this.classes(css.close) }),
					v('header', {
						classes: this.classes(css.todoDetailsHeader)
					}, [
						v('div', { classes: this.classes(css.title) }, [ 'Details' ])
					]),
					v('section', [
						v('textarea', {
							key: 'edit-todo',
							classes: this.classes(css.todoDetailsTextArea),
							value: todo.label,
							oninput: this.onInput
						})
					])
				])
			]) : null;
	}
}
