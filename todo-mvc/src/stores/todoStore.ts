import createObservableStore, { Store } from './createObservableStore';
import { putTodo } from '../actions/widgetStoreActions';

export interface Item {
	id: string;
	label: string;
	completed?: boolean;
}

const todoStore: Store<Item> = createObservableStore({
	data: <Item[]> [],
	fetchAroundUpdates: true
});

export default todoStore;

export function bindActions() {
	return todoStore
		.observe()
		.subscribe((options) => {
			putTodo.do(options);
		});
}
