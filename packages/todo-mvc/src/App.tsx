import { create, tsx } from '@dojo/framework/core/vdom';
import { createStoreMiddleware } from '@dojo/framework/core/middleware/store';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import Route from '@dojo/framework/routing/Route';
import ActiveLink from '@dojo/framework/routing/ActiveLink';

import * as css from './App.m.css';

interface Todo {
	id: string;
	label: string;
	completed?: boolean;
}

interface State {
	todos?: Todo[];
	current?: string;
	completedCount?: number;
	editingId?: string;
	editingLabel?: string;
}

let counter = 0;
const store = createStoreMiddleware<State>();
const commandFactory = createCommandFactory<State>();
const createWidget = create({ store });

function findTodo(id?: string) {
	return (todo: Todo) => todo.id === id;
}

const addTodoCommand = commandFactory<{ label: string }>(({ state, payload: { label } }) => {
	const id = `${Date.now()}-${counter++}`;
	label = label.trim();
	if (state.todos) {
		state.todos.push({ id, label });
	} else {
		state.todos = [{ id, label }];
	}
});

const deleteTodoCommand = commandFactory<{ id: string }>(({ state, payload: { id } }) => {
	if (state.todos) {
		const index = state.todos.findIndex(findTodo(id));
		if (index !== -1) {
			if (state.todos[index].completed && state.completedCount) {
				state.completedCount = state.completedCount - 1;
			}
			state.todos.splice(index, 1);
		}
	}
});

const clearCompletedCommand = commandFactory(({ state }) => {
	if (state.todos) {
		state.todos = state.todos.filter((todo) => !todo.completed);
	}
	state.completedCount = 0;
});

const toggleTodoCommand = commandFactory<{ id: string }>(({ state, payload: { id } }) => {
	if (state.todos) {
		const index = state.todos.findIndex(findTodo(id));
		if (index !== -1) {
			const completed = state.todos[index].completed;
			let completedCount = state.completedCount || 0;
			if (completed) {
				completedCount--;
			} else {
				completedCount++;
			}
			state.completedCount = completedCount;
			state.todos[index].completed = !completed;
		}
	}
});

const toggleAllTodosCommand = commandFactory(({ state }) => {
	const completedCount = state.completedCount || 0;
	if (state.todos) {
		const complete = completedCount !== state.todos.length;
		state.todos.forEach((todo) => (todo.completed = complete));
		if (complete) {
			state.completedCount = state.todos.length;
		} else {
			state.completedCount = 0;
		}
	}
});

const todoInputCommand = commandFactory<{ current: string }>(({ state, payload }) => {
	state.current = payload.current;
});

const clearTodoInputCommand = commandFactory(({ state }) => {
	state.current = undefined;
});

const todoEditModeCommand = commandFactory<{ id: string; label: string }>(({ state, payload: { id, label } }) => {
	state.editingId = id;
	state.editingLabel = label;
});

const todoReadModeCommand = commandFactory(({ state }) => {
	state.editingId = undefined;
	state.editingLabel = undefined;
});

const saveTodoCommand = commandFactory(({ state }) => {
	if (state.todos) {
		const todo = state.todos.find(findTodo(state.editingId));
		if (state.editingLabel && todo) {
			todo.label = state.editingLabel;
		}
	}
});

const updateTodoCommand = commandFactory<{ label: string }>(({ state, payload: { label } }) => {
	state.editingLabel = label;
});

const addTodo = createProcess('add-todo', [clearTodoInputCommand, addTodoCommand]);
const todoInput = createProcess('input-todo', [todoInputCommand]);
const deleteTodo = createProcess('delete-todo', [deleteTodoCommand]);
const toggleTodo = createProcess('toggle-todo', [toggleTodoCommand]);
const toggleAllTodos = createProcess('toggle-all-todos', [toggleAllTodosCommand]);
const todoEditMode = createProcess('edit-mode-todo', [todoEditModeCommand]);
const todoReadMode = createProcess('read-mode-todo', [todoReadModeCommand]);
const saveTodo = createProcess('save-todo', [saveTodoCommand, todoReadModeCommand]);
const updateTodoInput = createProcess('update-todo-input', [updateTodoCommand]);
const clearCompleted = createProcess('clear-completed', [clearCompletedCommand]);

function filter(filterName = 'all', todo: Todo): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

export default createWidget(({ middleware }) => {
	const { get, path, executor } = middleware.store;
	const todos = get(path('todos')) || [];
	const current = get(path('current'));
	const completedCount = get(path('completedCount')) || 0;
	const editingId = get(path('editingId'));
	const editingLabel = get(path('editingLabel'));

	const add = ({ which }: any) => {
		if (which === 13 && current) {
			executor(addTodo)({ label: current });
		}
	};

	const itemCount = todos.length - completedCount;

	return (
		<Route
			id="filter"
			renderer={(matchDetails) => {
				const filtered = todos.filter((todo) => filter(matchDetails.params.filter, todo));
				return (
					<section classes={[css.todoapp]}>
						<header>
							<h1 classes={[css.title]}>todos</h1>
							<input
								value={current}
								onkeyup={add}
								focus={true}
								classes={[css.newTodo]}
								oninput={(event: any) => {
									executor(todoInput)({ current: event.target.value });
								}}
								placeholder="What needs to be done?"
							/>
							<input
								checked={todos && completedCount > 0 && todos.length === completedCount}
								type="checkbox"
								classes={[css.toggleAll]}
								onchange={() => {
									executor(toggleAllTodos)({});
								}}
							/>
						</header>
						<section>
							<ul classes={[css.todoList]}>
								{filtered.map((todo) => (
									<li
										key={todo.id}
										classes={[
											css.todoItem,
											editingId === todo.id && css.editing,
											Boolean(todo.completed) && css.completed
										]}
									>
										<div classes={[css.view]}>
											<input
												onchange={() => {
													executor(toggleTodo)({ id: todo.id });
												}}
												type="checkbox"
												classes={[css.toggle]}
												checked={todo.completed}
											/>
											<label
												ondblclick={() => {
													executor(todoEditMode)({ id: todo.id, label: todo.label });
												}}
												classes={[css.todoLabel]}
											>
												{todo.label}
											</label>
											<button
												onclick={() => {
													executor(deleteTodo)({ id: todo.id });
												}}
												classes={[css.destroy]}
											/>
										</div>
										{editingId === todo.id && (
											<input
												classes={[css.edit]}
												onblur={() => {
													executor(todoReadMode)({ id: todo.id });
												}}
												onkeyup={(event: any) => {
													if (event.which === 13) {
														executor(saveTodo)({});
													} else if (event.which === 27) {
														executor(todoReadMode)({ id: todo.id });
													} else {
														executor(updateTodoInput)({ label: event.target.value });
													}
												}}
												value={editingLabel}
												focus={() => true}
											/>
										)}
									</li>
								))}
							</ul>
						</section>
						{todos.length && (
							<footer classes={[css.footer]}>
								<span classes={[css.todoCountLabel]}>
									<strong classes={[css.todoCount]}>{`${itemCount} `}</strong>
									<span>{`${itemCount === 1 ? 'item' : 'items'} left`}</span>
								</span>
								<ul classes={[css.filters]}>
									<li classes={[css.filter]}>
										<ActiveLink
											to="filter"
											params={{ filter: 'all' }}
											classes={[css.filterLink]}
											activeClasses={[css.selected]}
										>
											all
										</ActiveLink>
										<ActiveLink
											to="filter"
											params={{ filter: 'active' }}
											classes={[css.filterLink]}
											activeClasses={[css.selected]}
										>
											active
										</ActiveLink>
										<ActiveLink
											to="filter"
											params={{ filter: 'completed' }}
											classes={[css.filterLink]}
											activeClasses={[css.selected]}
										>
											completed
										</ActiveLink>
									</li>
								</ul>
								{completedCount && (
									<button
										onclick={() => {
											executor(clearCompleted)({});
										}}
										classes={[css.clearCompleted]}
									>
										Clear Completed
									</button>
								)}
							</footer>
						)}
					</section>
				);
			}}
		/>
	);
});
