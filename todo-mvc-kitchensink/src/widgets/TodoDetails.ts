import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { updateTodo } from '../actions/todoStoreActions';
import { Item } from '../App';
import appBundle from '../nls/common';
import router, { mainRoute } from '../routes';
import FocusableTextInput from './FocusableTextInput';
import FormattedDate from './FormattedDate';
import * as styles from './styles/TodoDetails.css';
import { Toggler } from './Toggler';

interface TodoDetailsProperties extends ThemeableProperties, I18nProperties {
	todoDetails: Item;
	activeFilter: string;
	activeView: string;
}

class FocusableTextArea extends FocusableTextInput {
	tagName = 'textarea';
}

@theme(styles)
export default class TodoDetails extends I18nMixin(ThemeableMixin(WidgetBase))<TodoDetailsProperties> {
	onClose() {
		const { activeFilter: filter, activeView: view } = this.properties;

		const closeLink = router.link(mainRoute, {
			filter,
			view
		});

		updateTodo(this.properties.todoDetails);
		document.location.href = closeLink;
	}

	onInput(event: KeyboardEvent) {
		this.properties.todoDetails.label = (<any> event.target).value;
	}

	onCompleted() {
		this.properties.todoDetails.completed = !this.properties.todoDetails.completed;
		this.invalidate();
	}

	render() {
		const { todoDetails, theme } = this.properties;
		const { label = '', completed = false, createdOn = new Date() } = todoDetails || {};
		const messages = this.localizeBundle(appBundle);

		return v('div', {
			classes: this.classes(styles.todoDetails).get()
		}, [
			v('div', {
				classes: this.classes(styles.backdrop).get()
			}),
			v('div', {
				classes: this.classes(styles.modal).get()
			}, [
				v('div', {
					onclick: this.onClose,
					classes: this.classes(styles.close).get()
				}),
				v('header', {
					classes: this.classes(styles.todoDetailsHeader).get()
				}, [
					v('div', {
						classes: this.classes(styles.title).get()
					}, [
						messages.detailsTitle
					])
				]),
				v('section', {}, [
					w(FocusableTextArea, <any> {
						overrideClasses: {
							base: styles.todoDetailsTextArea
						},
						focused: true,
						value: label,
						onInput: this.onInput,
						theme
					}),
					v('div', {}, [
						v('div', {
							classes: this.classes(styles.lastUpdated).get()
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
