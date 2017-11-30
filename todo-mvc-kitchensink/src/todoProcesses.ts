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

function addTodoCommand({ get, path }: CommandRequest): PatchOperation[] {
	const id = uuid();
	const count = get(path('todoCount'));
	const todo = { label: get(path('currentTodo')).trim(), id };

	return todo.label ? [
		add(path(`todos/${id}`), todo),
		replace(path('currentTodo'), ''),
		replace(path('todoCount'), count + 1)
	] : [];
}

function updateCompletedFlagCommand({ get, path }: CommandRequest): PatchOperation[] {
	const todoCount = get(path('todoCount'));
	const completed = todoCount > 0 && todoCount === get(path('completedCount'));

	return [
		replace(path('completed'), completed)
	];
}

function updateTodoCountsCommand({ get, path }: CommandRequest): PatchOperation[] {
	const todos = get(path('todos'));
	const todoArray = Object.keys(todos).map(key => todos[key]);

	return [
		replace(path('todoCount'), todoArray.length),
		replace(path('completedCount'), todoArray.filter(({ completed }) => completed).length)
	];
}

function setCurrentTodoCommand({ payload: [ currentTodo ], path }: CommandRequest): PatchOperation[] {
	return [
		replace(path('currentTodo'), currentTodo)
	];
}

function removeTodoCommand({ payload: [ id ], path }: CommandRequest): PatchOperation[] {
	return [ remove(path(`todos/${id}`)) ];
}

function toggleTodoCommand({ get, path, payload: [ id ] }: CommandRequest): PatchOperation[] {
	const completed = !get(path(`todos/${id}/completed`));

	return [
		replace(path(`todos/${id}/completed`), completed)
	];

}

function toggleTodosCommand({ get, path }: CommandRequest): PatchOperation[] {
	const completed = !get(path('completed'));

	return [
		replace(path('completed'), completed),
		...Object.keys(get(path('todos'))).map(key => replace(path(`todos/${key}/completed`), completed))
	];
}

function editTodoCommand({ payload: [ todo ], path }: CommandRequest): PatchOperation[] {
	return [ replace(path('editedTodo'), todo) ];
}

function clearCompletedCommand({ get, path }: CommandRequest): PatchOperation[] {
	const todos: Todos = get(path('todos'));
	const keys = Object.keys(todos);

	return [
		...keys.filter(key => todos[key].completed).map(key => remove(path(`todos/${key}`)))
	];
}

function saveTodoCommand({ get, path }: CommandRequest): PatchOperation[] {
	const editedTodo = get<Todo>(path('editedTodo'));

	return editedTodo ? [
		replace(path(`todos/${editedTodo.id}`), editedTodo),
		replace(path('editedTodo'), undefined)
	] : [];
}

function searchCommand({ payload: [ search ], path }: CommandRequest): PatchOperation[] {
	return [ replace(path('currentSearch'), search) ];
}

function initialStateCommand({ path }: CommandRequest) {
	return [
		add(path('completedCount'), 0),
		add(path('completed'), false),
		add(path('currentSearch'), ''),
		add(path('currentTodo'), ''),
		add(path('editedTodo'), undefined),
		add(path('todoCount'), 0),
		add(path('todos'), {})
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
