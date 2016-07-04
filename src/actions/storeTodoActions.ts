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
		return todoStore.add(todo);
	}
});

export const deleteTodo: AnyAction = createAction({
	configure,
	do(id: any) {
		const { todoStore } = <any> this;
		return todoStore.delete(id);
	}
});

export const updateTodo: AnyAction = createAction({
	configure,
	do(todo: any) {
		const { todoStore } = <any> this;
		return todoStore.patch(todo);
	}
});
