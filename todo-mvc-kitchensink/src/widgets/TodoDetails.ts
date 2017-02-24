import { assign } from '@dojo/core/lang';
import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import { Todo } from './App';
import FocusableTextInput from './FocusableTextInput';
import * as styles from './styles/TodoDetails.css';

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
	private _label: string = '';
	private _completed: boolean = false;
	private _lastTodoId: string = '';

	onClose() {
		this.properties.updateTodo(assign({}, this.properties.todo, <any> {
			label: this._label,
			completed: this._completed
		}), this.properties.todo.id);
		this.properties.showTodoDetails();
	}

	onInput(event: KeyboardEvent) {
		this._label = (<any> event.target).value;
	}

	onCompleted() {
		this._completed = !this._completed;
		this.invalidate();
	}

	private _updateState() {
		if (this.properties.todo.id !== this._lastTodoId) {
			this._label = this.properties.todo.label || '';
			this._completed = this.properties.todo.completed || false;
			this._lastTodoId = this.properties.todo.id;
		}
	}

	render() {
		const { todo, theme } = this.properties;
		const { createdOn = new Date() } = todo || {};
		const messages = this.localizeBundle(appBundle);

		this._updateState();

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
						value: this._label,
						onInput: this.onInput,
						theme
					}),
					v('div', [
						v('div', {
							classes: this.classes(styles.lastUpdated)
						}, [
							messages.createdTitle,
							w('formatteddate', {
								date: createdOn
							})
						]),
						w('toggler', <any> {
							overrideClasses: {
								toggle: styles.toggle
							},
							checked: this._completed,
							onChange: this.onCompleted,
							theme
						})
					])
				])
			])
		]);
	}
}
