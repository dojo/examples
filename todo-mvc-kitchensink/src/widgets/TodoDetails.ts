import { DNode, TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';

import { Todo } from './../TodoAppContext';

import * as css from './styles/todoDetails.m.css';

export interface TodoDetailsProperties {
	todo: Todo;
	onRequestExit: () => void;
	saveTodo: () => void;
	editTodoInput: (todo: Todo) => void;
}

@theme(css)
export class TodoDetails extends ThemedMixin(WidgetBase)<TodoDetailsProperties> {

	protected onClose(): void {
		this.properties.saveTodo();
		this.properties.onRequestExit();
	}

	protected onInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>): void {
		this.properties.editTodoInput({ ...this.properties.todo, label: value });
	}

	protected onElementCreated(element: HTMLElement, key: string) {
		if (key === 'edit-todo') {
			element.focus();
		}
	}

	protected render(): DNode {
		const { todo } = this.properties;

		return todo ?
			v('div', { classes: this.theme(css.todoDetails) }, [
				v('div', { classes: this.theme(css.backdrop) }),
				v('div', { classes: this.theme(css.modal) }, [
					v('div', { onclick: this.onClose, classes: this.theme(css.close) }),
					v('header', {
						classes: this.theme(css.todoDetailsHeader)
					}, [
						v('div', { classes: this.theme(css.title) }, [ 'Details' ])
					]),
					v('section', [
						v('textarea', {
							key: 'edit-todo',
							classes: this.theme(css.todoDetailsTextArea),
							value: todo.label,
							oninput: this.onInput
						})
					])
				])
			]) : null;
	}
}
