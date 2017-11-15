import { CommandRequest, createProcess } from '@dojo/stores/process';
import { PatchOperation } from '@dojo/stores/state/Patch';
import { add, remove, replace } from '@dojo/stores/state/operations';
import Store from '@dojo/stores/Store';
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

function setCurrentTodoCommand({ payload: [ currentTodo ] }: CommandRequest): PatchOperation[] {
	return [
		replace('/currentTodo', currentTodo)
	];
}

function removeTodoCommand({ get, payload: [ id ]  }: CommandRequest): PatchOperation[] {
	const todo = get(`/todos/${id}`);
	const operations = [];

	if (todo) {
		const completedCount = todo.completed ? get('/completedCount') - 1 : get('/completedCount');
		const todoCount = get('/todoCount') - 1;

		operations.push(replace('/completedCount', completedCount));
		operations.push(replace('/todoCount', todoCount));
		operations.push(replace('/completed', completedCount === todoCount && todoCount > 0));
		operations.push(remove(`/todos/${id}`));
	}

	return operations;
}

function toggleTodoCommand({ get, payload: [ id ] }: CommandRequest): PatchOperation[] {
	const completed = !get(`/todos/${id}/completed`);
	const completedCount = (completed ? 1 : -1) + get('/completedCount');
	const todoCount = get('/todoCount');

	return [
		replace('/completedCount', completedCount),
		replace(`/todos/${id}/completed`, completed),
		replace('/completed', completedCount === todoCount)
	];

}

function toggleTodosCommand({ get }: CommandRequest): PatchOperation[] {
	const completed = !get('/completed');
	const completedCount = completed ? get('/todoCount') : 0;
	return [
		replace('/completedCount', completedCount),
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
		replace('/completedCount', 0),
		replace('/completed', false),
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

function updateTodoItemCommand({ payload }: CommandRequest): PatchOperation[] {
	return [ replace('/currentTodo', payload[0]) ];
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

const initialStateProcess = createProcess([ initialStateCommand ]);

export const todoStore = new Store();
// creates the store and initializes the state
initialStateProcess(todoStore)();

export const addTodo = createProcess([ addTodoCommand ])(todoStore);

export const removeTodo = createProcess([ removeTodoCommand ])(todoStore);

export const toggleTodo = createProcess([ toggleTodoCommand ])(todoStore);

export const toggleTodos = createProcess([ toggleTodosCommand ])(todoStore);

export const editTodo = createProcess([ editTodoCommand ])(todoStore);

export const clearCompleted = createProcess([ clearCompletedCommand ])(todoStore);

export const updateTodoItem = createProcess([ updateTodoItemCommand ])(todoStore);

export const saveTodo = createProcess([ saveTodoCommand ])(todoStore);

export const search = createProcess([ searchCommand ])(todoStore);

export const setCurrentTodo = createProcess([ setCurrentTodoCommand ])(todoStore);

export default todoStore;
