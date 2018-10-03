import { v } from '@dojo/framework/widget-core/d';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';

import { Todo } from './../todoProcesses';

import * as css from './styles/todoDetails.m.css';

export interface TodoDetailsProperties {
	id?: string;
	todo: Todo;
	onRequestExit: () => void;
	saveTodo: () => void;
	editTodo: (payload: { todo: Todo }) => void;
}

@theme(css)
export default class TodoDetails extends ThemedMixin(WidgetBase)<TodoDetailsProperties> {

	protected onClose(): void {
		this.properties.saveTodo();
		this.properties.onRequestExit();
	}

	protected onInput({ target: { value } }: any): void {
		this.properties.editTodo({ todo:  { ...this.properties.todo, label: value } });
	}

	protected onElementCreated(element: HTMLElement, key: string) {
		if (key === 'edit-todo') {
			element.focus();
		}
	}

	protected render() {
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
							focus: true,
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
