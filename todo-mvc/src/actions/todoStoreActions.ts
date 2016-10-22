import createAction from 'dojo-actions/createAction';
import createFilter from 'dojo-stores/query/createFilter';

import todoStore, { Item } from '../stores/todoStore';

export const addTodo = createAction({
	do({ label }: { label: string }) {
		return todoStore.add({ id: `${Date.now()}`, label });
	}
});

export const deleteTodo = createAction({
	do({ id }: { id: string }) {
		return todoStore.delete(id);
	}
});

export const deleteCompleted = createAction({
	do() {
		return todoStore.fetch(createFilter<Item>().exists('completed'))
			.then((items) => todoStore.identify(items))
			.then((ids) => todoStore.delete(ids));
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
				).then();
			});
	}
});

export const updateTodo = createAction({
	do(item: Item) {
		return todoStore.put(item);
	}
});
