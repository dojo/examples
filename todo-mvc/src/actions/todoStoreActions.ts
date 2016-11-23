import createAction from 'dojo-actions/createAction';
import todoStore, { Item } from '../stores/todoStore';
import createFilter from 'dojo-stores/query/createFilter';

let id = 0;

export const addTodo = createAction({
	do({ label }: { label: string }) {
		return todoStore.add({ id: `${id++}`, label });
	}
});

export const deleteTodo = createAction({
	do({ id }: { id: string }) {
		return todoStore.delete(id);
	}
});

export const deleteCompleted = createAction({
	do() {
		return todoStore.fetch(createFilter().contains('completed', true))
		.then((items: Item[]) => todoStore.identify(items))
		.then((ids: string[]) => todoStore.delete(ids));
	}
});

export const toggleAll = createAction({
	do({ checked: completed }: { checked: boolean }) {

		return todoStore.fetch()
		.then((items) => {
			return todoStore.patch(
				todoStore.identify(items).map((id) => {
					return {
						id: id,
						completed
					};
				})
			);
		});
	}
});

export const updateTodo = createAction({
	do(item: Item) {
		return todoStore.patch(item);
	}
});
