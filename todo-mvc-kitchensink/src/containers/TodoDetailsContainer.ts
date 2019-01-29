import StoreContainer from '@dojo/framework/stores/StoreContainer';
import Store from '@dojo/framework/stores/Store';

import TodoDetails, { TodoDetailsProperties } from './../widgets/TodoDetails';
import {
	editTodoProcess,
	saveTodoProcess,
	TodoStore
} from './../todoProcesses';

function getProperties(store: Store<TodoStore>, { onRequestExit, id }: TodoDetailsProperties) {
	const { get, path } = store;
	return {
		todo: get(path('editedTodo')) || get(path('todos', id!)),
		editTodo: editTodoProcess(store),
		saveTodo: () => saveTodoProcess(store)({}),
		onRequestExit,
		id
	};
}

export default StoreContainer(TodoDetails, 'state', { getProperties });
