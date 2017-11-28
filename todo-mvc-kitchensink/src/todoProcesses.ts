import { CommandRequest, createProcess } from '@dojo/stores/process';
import { PatchOperation } from '@dojo/stores/state/Patch';
import { add, remove, replace } from '@dojo/stores/state/operations';
import uuid from '@dojo/core/uuid';

export interface Todo {
	id: string;
	label: string;
	completed?: boolean;
	editing?: boolean;
}

export interface Todos {
	[key: string]: Todo;
}

function addTodoCommand({ get }: CommandRequest): PatchOperation[] {
	const id = uuid();
	const count = get('/todoCount');
	const todo = { label: get('/currentTodo').trim(), id };

	return todo.label ? [
		add(`/todos/${id}`, todo),
		replace('/currentTodo', ''),
		replace('/todoCount', count + 1)
	] : [];
}

function updateCompletedFlagCommand({ get }: CommandRequest): PatchOperation[] {
	const todoCount = get('/todoCount');
	const completed = todoCount > 0 && todoCount === get('/completedCount');

	return [
		replace('/completed', completed)
	];
}

function updateTodoCountsCommand({ get }: CommandRequest): PatchOperation[] {
	const todos = get('/todos');
	const todoArray = Object.keys(todos).map(key => todos[key]);

	return [
		replace('/todoCount', todoArray.length),
		replace('/completedCount', todoArray.filter(({ completed }) => completed).length)
	];
}

function setCurrentTodoCommand({ payload: [ currentTodo ] }: CommandRequest): PatchOperation[] {
	return [
		replace('/currentTodo', currentTodo)
	];
}

function removeTodoCommand({ get, payload: [ id ]  }: CommandRequest): PatchOperation[] {
	return [ remove(`/todos/${id}`) ];
}

function toggleTodoCommand({ get, payload: [ id ] }: CommandRequest): PatchOperation[] {
	const completed = !get(`/todos/${id}/completed`);

	return [
		replace(`/todos/${id}/completed`, completed)
	];

}

function toggleTodosCommand({ get }: CommandRequest): PatchOperation[] {
	const completed = !get('/completed');

	return [
		replace('/completed', completed),
		...Object.keys(get('/todos')).map(key => replace(`/todos/${key}/completed`, completed))
	];
}

function editTodoCommand({ payload: [ todo ] }: CommandRequest): PatchOperation[] {
	return [ replace('/editedTodo', todo) ];
}

function clearCompletedCommand({ get }: CommandRequest): PatchOperation[] {
	const todos: Todos = get('/todos');
	const keys = Object.keys(todos);

	return [
		...keys.filter(key => todos[key].completed).map(key => remove(`/todos/${key}`))
	];
}

function saveTodoCommand({ get }: CommandRequest): PatchOperation[] {
	const editedTodo = get<Todo>('/editedTodo');

	return editedTodo ? [
		replace(`/todos/${editedTodo.id}`, editedTodo),
		replace('/editedTodo', undefined)
	] : [];
}

function searchCommand({ payload: [ search ] }: CommandRequest): PatchOperation[] {
	return [ replace('/currentSearch', search) ];
}

function initialStateCommand() {
	return [
		add('/completedCount', 0),
		add('/completed', false),
		add('/currentSearch', ''),
		add('/currentTodo', ''),
		add('/editedTodo', undefined),
		add('/todoCount', 0),
		add('/todos', {})
	];
}

export const initialStateProcess = createProcess([ initialStateCommand ]);

export const addTodoProcess = createProcess([ addTodoCommand, updateTodoCountsCommand, updateCompletedFlagCommand ]);

export const removeTodoProcess = createProcess([ removeTodoCommand, updateTodoCountsCommand, updateCompletedFlagCommand ]);

export const toggleTodoProcess = createProcess([ toggleTodoCommand, updateTodoCountsCommand, updateCompletedFlagCommand ]);

export const toggleTodosProcess = createProcess([ toggleTodosCommand, updateTodoCountsCommand, updateCompletedFlagCommand ]);

export const editTodoProcess = createProcess([ editTodoCommand ]);

export const clearCompletedProcess = createProcess([ clearCompletedCommand, updateTodoCountsCommand, updateCompletedFlagCommand ]);

export const saveTodoProcess = createProcess([ saveTodoCommand ]);

export const searchProcess = createProcess([ searchCommand ]);

export const setCurrentTodoProcess = createProcess([ setCurrentTodoCommand ]);
