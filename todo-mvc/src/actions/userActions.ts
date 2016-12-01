import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';
import { Item } from '../stores/todoStore';
import widgetStore from '../stores/widgetStore';
import { addTodo, deleteCompleted, deleteTodo, toggleAll, updateTodo } from './todoStoreActions';
import { TodoItemState } from '../widgets/createTodoItem';

interface FormEvent extends Event {
	target: HTMLInputElement;
}

interface FormInputEvent extends KeyboardEvent {
	target: HTMLInputElement;
}

export const todoInput = createAction({
	do({ event: { which, target: { value: label } } }: { event: FormInputEvent }) {
		if (which === 13 && label) {
			addTodo.do({ label, completed: false });
			return widgetStore.patch({ id: 'todo-app', todo: '' });
		}
	}
});

function toggleEditing(todos: TodoItemState[], todoId: string, editing: boolean): TodoItemState[] {
	return todos
		.filter((todo) => todo.id === todoId)
		.map((todo) => {
			todo.editing = true;
			return todo;
		});
}

export const todoEdit = createAction({
	do(options: { event: KeyboardEvent, state: any }) {
		const { event, state: { id } } = options;
		if (event.type === 'keypress' && event.which !== 13 && event.which !== 32) {
			return;
		}
		widgetStore.get('todo-app').then(([ todoListState ]: [ any ]) => {
			const { todos } = todoListState;
			todoListState.todos = toggleEditing(todos, id, true);
			return widgetStore.patch({ id: 'todo-app', todoListState });
		});
	}
});

export const todoEditInput = createAction({
	do(options: { event: FormInputEvent, state: any }) {
		const { event: { which } } = options;
		if (which === 13) {
			return todoSave.do(options);
		}
		else if (which === 27) {
			return widgetStore.get('todo-app').then((todoListState: any) => {
				const { todos } = todoListState;
				todoListState.todos = toggleEditing(todos, options.state.id, false);
				return widgetStore.patch({ id: 'todo-app', todoListState });
			});
		}
	}
});

export const todoSave = createAction({
	do({ event: { target: { value: label } }, state }: { event: FormInputEvent, state: any }) {
		if (!label) {
			return deleteTodo.do(state);
		}
		else {
			return updateTodo.do(assign(state, { label, editing: false }));
		}
	}
});

export const todoRemove = createAction({
	do(item: Item) {
		return deleteTodo.do(item);
	}
});

export const todoToggleComplete = createAction({
	do(item: Item) {
		item = assign({}, <any> item, { completed: !item.completed });
		return updateTodo.do(item);
	}
});

export const filter = createAction({
	do({ filter: activeFilter }: {filter: string}) {
		return widgetStore.patch({ id: 'todo-app', activeFilter });
	}
});

export const todoToggleAll = createAction({
	do({ event: { target: { checked } } }: { event: FormEvent }) {
		toggleAll.do({ checked });
	}
});

export const clearCompleted = createAction({
	do() {
		return deleteCompleted.do();
	}
});
