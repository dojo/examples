import { Container } from '@dojo/widget-core/Container';

import { TodoAppContext } from './../TodoAppContext';
import { TodoDetails } from './../widgets/TodoDetails';

function getProperties(todoAppContext: TodoAppContext, properties: any) {
	return {
		todo: todoAppContext.editedTodo || todoAppContext.getTodo(properties.id),
		editTodo: todoAppContext.editTodo,
		saveTodo: todoAppContext.saveTodo
	};
}

export const TodoDetailsContainer = Container(TodoDetails, 'state', { getProperties });
