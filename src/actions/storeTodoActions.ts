import createAction, { AnyAction } from 'dojo-actions/createAction';

function configure (registry: any) {
	const action = <any> this;

	registry.getStore('todo-store').then((todoStore: any) => {
		action.todoStore = todoStore;
	});
};

export const addTodo: AnyAction = createAction({
	configure,
	do(todo: any) {
		const { todoStore } = <any> this;
		return todoStore.add({ id: `${Date.now()}`, label: todo.label });
	}
});

export const deleteTodo: AnyAction = createAction({
	configure,
	do(id: any) {
		const { todoStore } = <any> this;
		return todoStore.delete(id);
	}
});

export const deleteCompleted: AnyAction = createAction({
	configure,
	do(id: any) {
		const { todoStore } = <any> this;
		todoStore.get().then((items: any) => {
			Array.from(items)
				.filter((item: any) => item.completed)
				.forEach((item: any) => todoStore.delete(item.id));
		});
	}
});

export const updateTodo: AnyAction = createAction({
	configure,
	do(todo: any) {
		const { todoStore } = <any> this;
		return todoStore.patch(todo);
	}
});
