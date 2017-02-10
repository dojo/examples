import { deepAssign } from '@dojo/core/lang';
import app, { Item } from '../App';

export const setHierarchy = function (this: any, widgets: [ string, any ][]) {
	app().setProperties(deepAssign({}, app().properties, {
		widgets
	}));
};

export const filterAndView = function (this: any, filter: 'active' | 'all' | 'completed', view: 'list' | 'cards') {
	const { state: { activeView = view, activeFilter = filter } = {} } = this;

	app().setProperties(deepAssign({}, app().properties, {
		activeView, activeFilter
	}));
};

export const showTodoDetails = function (todoId: string) {
	let details: Item | null = null;

	(app().properties.todos || []).forEach((todo) => {
		if (todo.id === todoId) {
			details = todo;
		}
	});

	if (details !== null) {
		app().setProperties(deepAssign({}, app().properties, {
			todoDetails: details
		}));

		setHierarchy([ [ 'main', {} ], [ 'todo-details', { id: 'todo-details' } ] ]);
	}
};
