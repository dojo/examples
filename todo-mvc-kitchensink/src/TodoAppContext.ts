import { Evented } from '@dojo/core/Evented';
import uuid from '@dojo/core/uuid';
import { switchLocale } from '@dojo/i18n/i18n';

import pirateThemeStyles from './themes/pirate';
export interface Todo {
	id: string;
	label: string;
	completed?: boolean;
	editing?: boolean;
}

export interface Todos {
	[key: string]: Todo;
}

export class TodoAppContext extends Evented {

	private _todos: Todos = Object.create(null);

	private _completed = false;

	private _completedCount = 0;

	private _todoCount = 0;

	private _currentTodo = '';

	private _currentSearch = '';

	private _editedTodo: Todo | undefined;

	private _themeContext: any;

	public constructor(themeContext: any) {
		super();
		this._themeContext = themeContext;
	}

	public get todos(): Todo[] {
		return Object.keys(this._todos).map((key) => {
			return { ...this._todos[key] };
		});
	}

	public get currentTodo(): string {
		return this._currentTodo;
	}

	public get currentSearch(): string {
		return this._currentSearch;
	}

	public get todoCount(): number {
		return this._todoCount;
	}

	public get completedCount(): number {
		return this._completedCount;
	}

	public get activeCount(): number {
		return this._todoCount - this._completedCount;
	}

	public get completed(): boolean {
		return this._completed;
	}

	public get editedTodo(): Todo | undefined {
		return this._editedTodo;
	}

	public getTodo(id: string) {
		return this._todos[id];
	}

	public addTodo = () => {
		if (this._currentTodo.trim()) {
			const id = uuid();
			this._todos[id] = { id, label: this._currentTodo };
			this._currentTodo = '';
			this._todoCount++;
			this._invalidate();
		}
	}

	public todoInput = (todo: string) => {
		this._currentTodo = todo;
		this._invalidate();
	}

	public editTodoInput = (todo: Todo) => {
		this._editedTodo = todo;
		this._invalidate();
	}

	public saveTodo = (todo?: Todo) => {
		if (this._editedTodo) {
			this._todos[this._editedTodo.id] = this._editedTodo;
			this._editedTodo = undefined;
			this._invalidate();
		}
	}

	public searchInput = (search: string) => {
		this._currentSearch = search;
		this._invalidate();
	}

	public toggleTodos = () => {
		this._completed = !this._completed;
		if (this._completed) {
			this._completedCount = this._todoCount;
		}
		else {
			this._completedCount = 0;
		}
		this._toggleAllTodos();
		this._invalidate();
	}

	public toggleTodo = (id: string) => {
		const todo = this._todos[id];
		if (todo) {
			todo.completed = !todo.completed;
			todo.completed ? this._completedCount++ : this._completedCount--;
			if (this._completedCount === this._todoCount) {
				this._completed = true;
			}
			else {
				this._completed = false;
			}
		}
		this._invalidate();
	}

	public removeTodo = (id: string) => {
		const todo = this._todos[id];
		if (todo) {
			if (todo.completed) {
				this._completedCount--;
			}
			delete this._todos[id];
			this._todoCount--;
		}
		if (this._completedCount === this._todoCount && this._todoCount > 0) {
			this._completed = true;
		}
		else {
			this._completed = false;
		}
		this._invalidate();
	}

	public clearCompleted = () => {
		Object.keys(this._todos).forEach((todoId) => {
			if (this._todos[todoId].completed) {
				delete this._todos[todoId];
			}
		});
		this._completedCount = 0;
		this._todoCount = Object.keys(this._todos).length;
		this._completed = false;
		this._invalidate();
	}

	public changeTheme(wantsPirate: boolean) {
		if (wantsPirate) {
			switchLocale('en-PR');
			this._themeContext.set(pirateThemeStyles);
		}
		else {
			switchLocale('en');
			this._themeContext.set(undefined);
		}
	}

	private _toggleAllTodos() {
		Object.keys(this._todos).forEach((todo) => {
			this._todos[todo].completed = this._completed;
		});
	}

	private _invalidate() {
		this.emit({ type: 'invalidate' });
	}
}
