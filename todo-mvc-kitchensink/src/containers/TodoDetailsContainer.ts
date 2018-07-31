import Container from '@dojo/framework/widget-core/Container';
import Store from '@dojo/framework/stores/Store';

import TodoDetails from './../widgets/TodoDetails';
import {
	editTodoProcess,
	saveTodoProcess,
	TodoStore
} from './../todoProcesses';

function getProperties(store: Store<TodoStore>, properties: any) {
	const { get, path } = store;
	return {
		todo: get(path('editedTodo')) || get(path('todos', properties.id)),
		editTodo: editTodoProcess(store),
		saveTodo: saveTodoProcess(store)
	};
}

export default Container(TodoDetails, 'state', { getProperties });
