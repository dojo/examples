import todoStore, { Item } from '../stores/todoStore';
import createFilter from 'dojo-stores/query/createFilter';
import { assign } from 'dojo-core/lang';

let id = 0;

export const addTodo = function({ label, completed }: { label: string, completed: boolean }) {
	return todoStore.add({ id: `${id++}`, label, completed, createdOn: new Date(), editing: false });
};

export const deleteTodo = function({ id }: { id: string }) {
	return todoStore.delete(id);
};

export const deleteCompleted = function() {
	return todoStore.fetch(createFilter<Item>().equalTo('completed', true))
		.then((items: Item[]) => todoStore.identify(items))
		.then((ids: string[]) => todoStore.delete(ids));
};

export const toggleAll = function({ checked: completed }: { checked: boolean }) {
	return todoStore.fetch()
		.then((items: Item[]) => {
			return items.map((item) => {
				return assign({}, item, <any> { completed });
			});
		})
		.then((items) => todoStore.patch(items));
};

export const updateTodo = function(item: Item) {
	return todoStore.patch(item);
};
