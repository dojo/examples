import { Action } from './../store/store';

export function todoReducer(state: any = {}, { type, payload }: Action): any {
	let { currentTodo, activeCount, completedCount } = state;
	let todos;
	switch (type) {
		case 'TODO_INPUT':
			return { ...state, currentTodo: payload.currentTodo };
		case 'ADD_TODO':
			if (currentTodo.trim()) {
				activeCount++;
				return {
					...state,
					currentTodo: '',
					todos: [
						...state.todos,
						{ id: payload.id, label: currentTodo.trim(), completed: false }],
					activeCount
				};
			}
			return state;
		case 'TOGGLE_TODO':
			todos = state.todos.map((todo: any) => {
				if (todo.id === payload.id) {
					todo.completed ? completedCount-- && activeCount++ : activeCount-- && completedCount++;
					return { ...todo, completed: !todo.completed};
				}
				return todo;
			});
			return { ...state, todos, completedCount: Math.max(completedCount, 0), activeCount: Math.max(activeCount, 0) };
		case 'DELETE_TODO':
			todos = state.todos.filter((todo: any) => {
				if (todo.id === payload.id) {
					if (todo.completed) {
						completedCount--;
					}
					else {
						activeCount--;
					}
					return false;
				}
				return true;
			});
			return { ...state, todos, completedCount, activeCount };
		case 'TOGGLE_TODOS':
			const todosCompleted = activeCount !== 0;
			todos = state.todos.map((todo: any) => {
				return { ...todo, completed: todosCompleted };
			});
			if (todosCompleted) {
				completedCount = todos.length;
				activeCount = 0;
			}
			else {
				completedCount = 0;
				activeCount = todos.length;
			}
			return { ...state, todos, completedCount, activeCount };
		case 'CLEAR_COMPLETED':
			todos = state.todos.filter((todo: any) => {
				return !todo.completed;
			});
			completedCount = 0;
			activeCount = todos.length;
			return { ...state, todos, completedCount, activeCount };
		case 'EDIT_TODO':
			todos = state.todos.map((todo: any) => {
				if (todo.id === payload.id) {
					return { ...todo, editing: true};
				}
				return todo;
			});
			return { ...state, todos };
		case 'SAVE_TODO':
			todos = state.todos.map((todo: any) => {
				if (todo.id === payload.id) {
					return { ...todo, editing: false, label: payload.label };
				}
				return todo;
			});
			return { ...state, todos };
		default:
			return state;
	}
}
