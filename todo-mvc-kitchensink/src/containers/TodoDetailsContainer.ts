import { Container } from '@dojo/widget-core/Container';
import Store from '@dojo/stores/Store';

import { TodoDetails } from './../widgets/TodoDetails';
import { editTodoProcess, saveTodoProcess } from './../todoProcesses';

function getProperties(store: Store, properties: any) {
	return {
		todo: store.get('/editedTodo') || store.get(`/todos/${properties.id}`),
		editTodo: editTodoProcess(store),
		saveTodo: saveTodoProcess(store)
	};
}

export const TodoDetailsContainer = Container(TodoDetails, 'state', { getProperties });
