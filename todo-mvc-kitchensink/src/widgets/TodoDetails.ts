import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { updateTodo } from '../actions/todoStoreActions';
import { Item } from '../App';
import router, { mainRoute } from '../routes';
import CheckboxInput from './CheckboxInput';
import FocusableTextInput from './FocusableTextInput';
import FormattedDate from './FormattedDate';
import * as styles from './styles/TodoDetails.css';
import { Toggler } from './Toggler';

interface TodoDetailsProperties {
	todoDetails: Item;
	activeFilter: string;
	activeView: string;
}

class FocusableTextArea extends FocusableTextInput {
	tagName = 'textarea';
}

@theme(styles)
export default class TodoDetails extends ThemeableMixin(WidgetBase)<TodoDetailsProperties> {
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
		const { todoDetails } = this.properties;
		const { label = '', completed = false, createdOn = new Date() } = todoDetails || {};

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
						'Details'
					])
				]),
				v('section', {}, [
					w(FocusableTextArea, <any> {
						overrideClasses: {
							base: styles.todoDetailsTextArea
						},
						focused: true,
						value: label,
						onInput: this.onInput
					}),
					v('div', {}, [
						v('div', {
							classes: this.classes(styles.lastUpdated).get()
						}, [
							'Created on ',
							w(FormattedDate, {
								date: createdOn
							})
						]),
						w(Toggler, <any> {
							overrideClasses: {
								toggle: styles.toggle
							},
							checked: completed,
							onChange: this.onCompleted
						})
					])
				])
			])
		]);
	}
}
