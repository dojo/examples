import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget, WidgetState, DNode } from '@dojo/widgets/interfaces';
import { v, w } from '@dojo/widgets/d';
import router, { mainRoute } from '../routes';
import { Item } from '../stores/todoStore';
import createFocusableTextInput from './createFocusableTextInput';
import createCheckboxInput from './createCheckboxInput';
import { updateTodo } from '../actions/todoStoreActions';
import { FocusableTextInput } from './createFocusableTextInput';
import createFormattedDate from './createFormattedDate';
import externalStateMixin from '@dojo/widgets/mixins/externalState';

interface TodoDetailsProperties {
	todoDetails: Item;
	activeFilter: string;
	activeView: string;
}

export type TodoDetailsState = WidgetState & TodoDetailsProperties;
export type TodoDetails = Widget<TodoDetailsProperties>;

const createFocusableTextArea = createFocusableTextInput.mixin({
	mixin: {
		tagName: 'textarea'
	}
});

interface EventHandler {
	(event: any): void;
}

const completedHandlers = new WeakMap<TodoDetails, EventHandler>();
const textUpdateHandlers = new WeakMap<TodoDetails, EventHandler>();
const closeHandlers = new WeakMap<TodoDetails, EventHandler>();

const createTodoDetails = createWidgetBase
	.mixin(externalStateMixin)
	.mixin({
		mixin: {
			tagName: 'div',
			classes: [ 'todo-details' ],

			getChildrenNodes(this: TodoDetails): DNode[] {
				const { todoDetails } = this.state as TodoDetailsState;

				const { label = '', completed = false, createdOn = new Date() } = todoDetails || {};

				return [
					v('div.backdrop', {}),
					v('div.modal', {}, [
						v('div.close', {
							onclick: closeHandlers.get(this)
						}),
						v('header', {}, [
							v('div.title', {}, [
								'Details'
							])
						]),
						v('section', {}, [
							w(createFocusableTextArea, {
								focused: true,
								value: label,
								onInput: textUpdateHandlers.get(this)
							}),
							v('div', {}, [
								v('div.last-updated', [
									'Created on ',
									w(createFormattedDate, {
										date: createdOn
									})
								]),
								w(createCheckboxInput, {
									classes: [ 'toggle' ],
									checked: completed,
									onChange: completedHandlers.get(this)
								})
							])
						])
					])
				];
			}
		}
	}).mixin({
		initialize(instance: TodoDetails) {
			const { activeFilter: filter, activeView: view } = instance.state as TodoDetailsState;

			const closeLink = router.link(mainRoute, {
				filter,
				view
			});

			completedHandlers.set(instance, () => {
				(<any> instance.state).todoDetails.completed = !(<any> instance.state).todoDetails.completed;
				instance.invalidate();
			});

			textUpdateHandlers.set(instance, function (this: FocusableTextInput, event: any) {
				// this.value = event.target.value;
				(<any> instance.state).todoDetails.label = event.target.value;
			});

			closeHandlers.set(instance, () => {
				updateTodo((<any> instance.state).todoDetails).then(() => {
					document.location.href = closeLink;
				});
			});
		}
	});

export default createTodoDetails;
