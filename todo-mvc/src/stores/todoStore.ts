import { createObservableStore } from 'dojo-stores/store/mixins/createObservableStoreMixin';
import { putTodo } from '../actions/widgetStoreActions';

export interface Item {
	id: string;
	label?: string;
	completed?: boolean;
}

const todoStore = createObservableStore({
	data: <Item[]> [],
	fetchAroundUpdates: true
});

export default todoStore;

export function bindActions() {
	return todoStore
		.observe()
		.subscribe((options) => {
			putTodo(options);
		});
}
