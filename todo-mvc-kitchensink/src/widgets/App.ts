import { assign } from '@dojo/core/lang';
import uuid from '@dojo/core/uuid';
import Map from '@dojo/shim/Map';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, ThemeableProperties, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/App.m.css';
import Home from './Home';
import ThemeSwitcher from './ThemeSwitcher';
import TodoDetails from './TodoDetails';
import TodoFooter from './TodoFooter';

interface AppProperties extends ThemeableProperties {
	activeFilter?: 'all' | 'active' | 'completed';
	activeView?: 'list' | 'cards';
	showDetails?: string;
	changeTheme: (wantsPirate: boolean) => void;
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

	render() {
		const {

			activeView = 'list',
			activeFilter = 'all',
			showDetails = ''
		} = this.properties;

		const widgets: DNode[] = [
			w<ThemeSwitcher>('theme-switcher', {
				wantsPirate: this._usePirateTheme,
				onChange: this.properties.changeTheme
			}),
			w<Home>('home', {

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
			widgets.push(w<TodoDetails>('details', {
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
			w<TodoFooter>('footer', {})
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
