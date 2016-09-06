import createAction, { AnyAction } from 'dojo-actions/createAction';
import { CombinedRegistry } from 'dojo-app/createApp';
import Promise from 'dojo-shim/Promise';

import { MemoryStore } from 'dojo-stores/createMemoryStore';

interface StoreTodoAction {
	todoStore: MemoryStore<Object>;
}

function configure (registry: CombinedRegistry) {
	const action = <StoreTodoAction> this;

	registry.getStore('todo-store').then((todoStore: MemoryStore<Object>) => {
		action.todoStore = todoStore;
	});
};

export const addTodo: AnyAction = createAction({
	configure,
	do(todo: {label: string}) {
		const { todoStore } = <StoreTodoAction> this;
		return todoStore.add({ id: `${Date.now()}`, label: todo.label });
	}
});

export const deleteTodo: AnyAction = createAction({
	configure,
	do(options: {id: string}) {
		const { todoStore } = <StoreTodoAction> this;
		return todoStore.delete(options.id);
	}
});

export const deleteCompleted: AnyAction = createAction({
	configure,
	do() {
		const { todoStore } = <StoreTodoAction> this;
		todoStore.get().then((items: any) => {
			Array.from(items)
				.filter((item: any) => item.completed)
				.forEach((item: any) => todoStore.delete(item.id));
		});
	}
});

export const toggleAll: AnyAction = createAction({
	configure,
	do(options: {checked: boolean}) {
		const { todoStore } = <StoreTodoAction> this;

		return todoStore.get().then((items: any) => {
			return Promise.all(Array.from(items).map((item: any) =>
				todoStore.patch(Object.assign({}, item, {completed: options.checked}))));
		});
	}
});

export const updateTodo: AnyAction = createAction({
	configure,
	do(todo: any) {
		const { todoStore } = <StoreTodoAction> this;
		return todoStore.patch(todo);
	}
});
