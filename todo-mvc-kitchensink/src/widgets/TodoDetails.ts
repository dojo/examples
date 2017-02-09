import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { updateTodo } from '../actions/todoStoreActions';
import { Item } from '../App';
import router, { mainRoute } from '../routes';
import CheckboxInput from './CheckboxInput';
import FocusableTextInput from './FocusableTextInput';
import FormattedDate from './FormattedDate';

interface TodoDetailsProperties {
	todoDetails: Item;
	activeFilter: string;
	activeView: string;
}

class FocusableTextArea extends FocusableTextInput {
	tagName = 'textarea';
}

export default class TodoDetails extends WidgetBase<TodoDetailsProperties> {
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
			classes: {
				'todo-details': true
			}
		}, [
			v('div.backdrop', {}),
			v('div.modal', {}, [
				v('div.close', {
					onclick: this.onClose
				}),
				v('header', {}, [
					v('div.title', {}, [
						'Details'
					])
				]),
				v('section', {}, [
					w(FocusableTextArea, {
						focused: true,
						value: label,
						onInput: this.onInput
					}),
					v('div', {}, [
						v('div.last-updated', [
							'Created on ',
							w(FormattedDate, {
								date: createdOn
							})
						]),
						w(CheckboxInput, {
							className: 'toggle',
							checked: completed,
							onChange: this.onCompleted
						})
					])
				])
			])
		]);
	}
}
