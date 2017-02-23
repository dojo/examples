import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import { Todo } from './App';
import FocusableTextInput from './FocusableTextInput';
import FormattedDate from './FormattedDate';
import * as styles from './styles/TodoDetails.css';
import { Toggler } from './Toggler';

export interface TodoDetailsProperties extends ThemeableProperties, I18nProperties {
	todo: Todo;
	activeFilter: string;
	activeView: string;
	updateTodo: Function;
	showTodoDetails: Function;
}

class FocusableTextArea extends FocusableTextInput {
	tagName = 'textarea';
}

@theme(styles)
export default class TodoDetails extends I18nMixin(ThemeableMixin(WidgetBase))<TodoDetailsProperties> {
	onClose() {
		this.properties.showTodoDetails();
	}

	onInput(event: KeyboardEvent) {
		this.properties.todo.label = (<any> event.target).value;
	}

	onCompleted() {
		this.properties.todo.completed = !this.properties.todo.completed;
		this.invalidate();
	}

	render() {
		const { todo, theme } = this.properties;
		const { label = '', completed = false, createdOn = new Date() } = todo || {};
		const messages = this.localizeBundle(appBundle);

		return v('div', {
			classes: this.classes(styles.todoDetails)
		}, [
			v('div', {
				classes: this.classes(styles.backdrop)
			}),
			v('div', {
				classes: this.classes(styles.modal)
			}, [
				v('div', {
					onclick: this.onClose,
					classes: this.classes(styles.close)
				}),
				v('header', {
					classes: this.classes(styles.todoDetailsHeader)
				}, [
					v('div', {
						classes: this.classes(styles.title)
					}, [
						messages.detailsTitle
					])
				]),
				v('section', [
					w(FocusableTextArea, <any> {
						overrideClasses: {
							base: styles.todoDetailsTextArea
						},
						focused: true,
						value: label,
						onInput: this.onInput,
						theme
					}),
					v('div', [
						v('div', {
							classes: this.classes(styles.lastUpdated)
						}, [
							messages.createdTitle,
							w(FormattedDate, {
								date: createdOn
							})
						]),
						w(Toggler, <any> {
							overrideClasses: {
								toggle: styles.toggle
							},
							checked: completed,
							onChange: this.onCompleted,
							theme
						})
					])
				])
			])
		]);
	}
}
