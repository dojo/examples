import createStore, { CrudOptions, UpdateResults } from 'dojo-stores/store/createStore';
import createObservableStoreMixin, {
	ObservableStore, ObservableStoreOptions
} from 'dojo-stores/store/mixins/createObservableStoreMixin';
import { updateHeaderAndFooter, deleteTodo, putTodo } from '../actions/widgetStoreActions';

type TodoStore = ObservableStore<Item, CrudOptions, UpdateResults<Item>>;
type TodoStoreFactory =
	<T, O extends CrudOptions, U extends UpdateResults<T>>(options?: ObservableStoreOptions<T, O>) => ObservableStore<T, O, U>

export interface Item {
	id: string;
	label: string;
	completed?: boolean;
}

const todoStoreFactory: TodoStoreFactory = createStore.mixin(createObservableStoreMixin());

const todoStore: TodoStore = todoStoreFactory({
	fetchAroundUpdates: true,
	data: <Item[]> []
});

export default todoStore;

// FIXME: Would be great if the app could trigger a callback like this.
export function bindActions() {
	return todoStore
		.observe()
		.subscribe((options) => {
			updateHeaderAndFooter.do(options);

			const { adds, updates, deletes } = options;
			if (deletes.length) {
				deleteTodo.do(options);
			}
			if (adds.length || updates.length) {
				putTodo.do(options);
			}
		});
}
