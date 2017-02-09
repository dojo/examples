import { assign } from '@dojo/core/lang';
import app, { Item } from '../App';

let id = 0;

export const addTodo = function ({ label, completed }: { label: string, completed: boolean }) {
	const { todos = [] } = app.properties;

	todos.push({ id: `${id++}`, label, completed, createdOn: new Date(), editing: false });

	app.setProperties(assign(app.properties, { todos }));
};

export const deleteTodo = function ({ id }: { id: string }) {
	const { todos = [] } = app.properties;

	app.setProperties(assign(app.properties, {
		todos: todos.filter((todo: Item) => {
			return todo.id !== id;
		})
	}));
};

export const deleteCompleted = function () {
	const { todos = [] } = app.properties;

	app.setProperties(assign(app.properties, {
		todos: todos.filter((todo: Item) => {
			return todo.completed !== true;
		})
	}));
};

export const toggleAll = function ({ checked: completed }: { checked: boolean }) {
	const { todos = [] } = app.properties;

	app.setProperties(assign(app.properties, {
		todos: todos.map((item: Item) => {
			return assign({}, item, <any> { completed });
		})
	}));
};

export const updateTodo = function (item: Item) {
	const { todos = [] } = app.properties;

	app.setProperties(assign(app.properties, {
		todos: todos.map((todo: Item) => {
			if (todo.id === item.id) {
				return assign({}, todo, item);
			}

			return todo;
		})
	}));
};
