import { deepAssign, assign } from '@dojo/core/lang';
import uuid from '@dojo/core/uuid';
import { switchLocale } from '@dojo/i18n/i18n';
import Map from '@dojo/shim/Map';
import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import pirateThemeStyles from '../themes/pirate';
import * as styles from './styles/App.m.css';

interface AppProperties extends ThemeableProperties {
	activeFilter?: string;
	activeView?: string;
	showDetails?: string;
}

export interface Todo {
	id: string;
	label?: string;
	completed?: boolean;
	createdOn?: Date;
}

@theme(styles)
export class App extends ThemeableMixin(WidgetBase)<AppProperties> {
	private _todos = new Map<string, Todo>();
	private _todoItem= '';
	private _completedCount = 0;
	private _search = '';
	private _updated = uuid();
	private _usePirateTheme = false;

	constructor() {
		super();

		this.applyTheme();
	}

	applyTheme() {
		this.setProperties(deepAssign({}, this.properties, {
			theme: this._usePirateTheme ? pirateThemeStyles : undefined
		}));
	}

	changeTheme(wantsPirate: boolean) {
		this._usePirateTheme = wantsPirate;

		// Normally `observeLocale` from `@dojo/i18n/i18n` would be needed to update
		// the widget messages, but since `this.changeTheme` already invalidates the
		// application, we can get away with not including it.
		switchLocale(wantsPirate ? 'en-PR' : 'en');
		this.applyTheme();
	}

	render() {
		const {
			theme,
			activeView = 'list',
			activeFilter = 'all',
			showDetails = ''
		} = this.properties;

		const widgets = [
			w('theme-switcher', {
				theme: this.properties.theme,
				wantsPirate: this._usePirateTheme,
				onChange: this.changeTheme
			}),
			w('home', {
				theme,
				updated: this._updated,
				todos: this._todos,
				todo: this._todoItem,
				completedCount: this._completedCount,
				search: this._search,
				activeView,
				activeFilter,
				removeTodo: this._removeTodo,
				toggleTodo: this._toggleTodo,
				toggleAllTodos: this._toggleAllTodos,
				clearCompleted: this._clearCompleted,
				updateTodoItem: this._updateTodo,
				addTodo: this._setTodo,
				updateSearch: this._updateSearch,
				showTodoDetails: this._showTodoDetails
			})
		];

		if (showDetails && this._todos.get(showDetails)) {
			widgets.push(w('details', {
				theme,
				todo: this._todos.get(showDetails),
				updateTodo: this._setTodo,
				showTodoDetails: this._showTodoDetails,
				activeView,
				activeFilter
			}));
		}

		return v('div', [
			v('section', {
				classes: this.classes(styles.todoapp)
			}, widgets),
			w('footer', {
				theme: this.properties.theme
			})
		]);
	}

	private _removeTodo(id: string) {
		const todo = this._todos.get(id);

		if (todo) {
			this._todos.delete(id);
			todo.completed && --this._completedCount;
			this._onUpdate();
		}
	}

	private _toggleTodo(id: string) {
		const todo = this._todos.get(id);

		if (todo) {
			const completed = !todo.completed;
			completed ? ++this._completedCount : --this._completedCount;
			this._setTodo({ completed }, id);
		}
	}

	private _toggleAllTodos() {
		const completed = this._completedCount !== this._todos.size;
		this._todos.forEach((todo, key) => {
			this._setTodo({ completed }, key);
		});
		this._completedCount = completed ? this._todos.size : 0;
	}

	private _clearCompleted() {
		this._todos.forEach((todo, key) => {
			if (todo.completed) {
				this._todos.delete(key);
			}
		});
		this._completedCount = 0;
		this._onUpdate();
	}

	private _updateTodo(todo: string) {
		this._todoItem = todo;
		this.invalidate();
	}

	private _setTodo(todo: Partial<Todo>, id?: string) {
		if (!id) {
			id = uuid();
			this._todoItem = '';
		}

		if (todo.label) {
			todo.label = todo.label.trim();
			if (!todo.label) {
				this._removeTodo(id);
				return;
			}
		}

		this._todos.set(id, assign(<any> { id }, this._todos.get(id) || {}, todo));
		this._onUpdate();
	}

	private _updateSearch(search: string) {
		this._search = search;
		this._onUpdate();
	}

	private _onUpdate() {
		this._updated = uuid();
		this.invalidate();
	}

	private _showTodoDetails(id: string) {
		if (id) {
			document.location.href = `#/${this.properties.activeFilter || 'all'}/todos/${id}?view=${this.properties.activeView || 'list'}`;
		}
		else {
			document.location.href = `#/${this.properties.activeFilter || 'all'}?view=${this.properties.activeView || 'list'}`;
		}
	}
}

export default App;
