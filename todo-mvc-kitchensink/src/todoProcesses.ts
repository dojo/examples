import { createCommandFactory, createProcess } from '@dojo/stores/process';
import { PatchOperation } from '@dojo/stores/state/Patch';
import { add, remove, replace } from '@dojo/stores/state/operations';
import uuid from '@dojo/core/uuid';

export type TodoStore = {
	completedCount: number;
	completed: boolean;
	currentSearch: string;
	currentTodo: string;
	editedTodo: Todo | undefined;
	todoCount: number;
	todos: Todos;
};

const commandFactory = createCommandFactory<TodoStore>();

export interface Todo {
	id: string;
	label: string;
	completed?: boolean;
	editing?: boolean;
}

export interface Todos {
	[key: string]: Todo;
}

const addTodoCommand = commandFactory(({ get, path }): PatchOperation[] => {
	const id = uuid();
	const todo = { label: get(path('currentTodo')).trim(), id };

	return todo.label ? [
		add(path('todos', id), todo),
		replace(path('currentTodo'), '')
	] : [];
});

const updateCompletedFlagCommand = commandFactory(({ get, path }): PatchOperation[] => {
	const todoCount = get(path('todoCount'));
	const completed = todoCount > 0 && todoCount === get(path('completedCount'));

	return [
		replace(path('completed'), completed)
	];
});

const updateTodoCountsCommand = commandFactory(({ get, path }): PatchOperation[] => {
	const todos = get(path('todos'));
	const todoArray = Object.keys(todos).map(key => todos[key]);

	return [
		replace(path('todoCount'), todoArray.length),
		replace(path('completedCount'), todoArray.filter(({ completed }) => completed).length)
	];
});

const setCurrentTodoCommand = commandFactory(({ payload: [ currentTodo ], path }): PatchOperation[] => {
	return [
		replace(path('currentTodo'), currentTodo)
	];
});

const removeTodoCommand = commandFactory(({ payload: [ id ], path }): PatchOperation[] => {
	return [ remove(path('todos', id)) ];
});

const toggleTodoCommand = commandFactory(({ get, path, payload: [ id ] }): PatchOperation[] => {
	const completed = !get(path('todos', id, 'completed'));

	return [
		replace(path('todos', id, 'completed'), completed)
	];

});

const toggleTodosCommand = commandFactory(({ get, path }): PatchOperation[] => {
	const completed = !get(path('completed'));

	return [
		replace(path('completed'), completed),
		...Object.keys(get(path('todos'))).map(key => replace(path('todos', key, 'completed'), completed))
	];
});

const editTodoCommand = commandFactory(({ payload: [ todo ], path }): PatchOperation[] => {
	return [ replace(path('editedTodo'), todo) ];
});

const clearCompletedCommand = commandFactory(({ get, path }): PatchOperation[] => {
	const todos: Todos = get(path('todos'));
	const keys = Object.keys(todos);

	return [
		...keys.filter(key => todos[key].completed).map(key => remove(path('todos', key)))
	];
});

const saveTodoCommand = commandFactory(({ get, path }): PatchOperation[] => {
	const editedTodo = get(path('editedTodo'));

	return editedTodo ? [
		replace(path('todos', editedTodo.id), editedTodo),
		replace(path('editedTodo'), undefined)
	] : [];
});

const searchCommand = commandFactory(({ payload: [ search ], path }): PatchOperation[] => {
	return [ replace(path('currentSearch'), search) ];
});

const initialStateCommand = commandFactory(({ path }) => {
	return [
		add(path('completedCount'), 0),
		add(path('completed'), false),
		add(path('currentSearch'), ''),
		add(path('currentTodo'), ''),
		add(path('editedTodo'), undefined),
		add(path('todoCount'), 0),
		add(path('todos'), {})
	];
});

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
