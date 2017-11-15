import { switchLocale } from '@dojo/i18n/i18n';
import { Injector } from '@dojo/widget-core/Injector';

import {
	addTodo,
	clearCompleted,
	editTodo,
	removeTodo,
	toggleTodos,
	toggleTodo,
	saveTodo,
	search,
	updateTodoItem,
	todoStore,
	Todo,
	Todos,
	setCurrentTodo
} from '../../todo-mvc-kitchensink/src/todoStore';
import pirateThemeStyles from './themes/pirate';

export class TodoAppContext extends Injector {
	addTodo = addTodo;
	clearCompleted = clearCompleted;
	editTodo = editTodo;
	removeTodo = removeTodo;
	toggleTodos = toggleTodos;
	toggleTodo = toggleTodo;
	saveTodo = saveTodo;
	search = search;
	updateTodoItem = updateTodoItem;
	setCurrentTodo = setCurrentTodo;

	private _themeContext: any;

	public constructor(themeContext: any) {
		super({});
		this._themeContext = themeContext;
		todoStore.on('invalidate', () => {
			this.emit({ type: 'invalidate' });
		});
	}

	public get todos(): Todo[] {
		return Object.keys(todoStore.get<Todos>('/todos')).map((key) => {
			return { ...todoStore.get<Todo>(`/todos/${key}`) };
		});
	}

	public get currentTodo(): string {
		return todoStore.get('/currentTodo');
	}

	public get currentSearch(): string {
		return todoStore.get('/currentSearch');
	}

	public get todoCount(): number {
		return todoStore.get('/todoCount');
	}

	public get completedCount(): number {
		return todoStore.get('/completedCount');
	}

	public get activeCount(): number {
		return todoStore.get<number>('/todoCount') - todoStore.get<number>('/completedCount');
	}

	public get completed(): boolean {
		return todoStore.get('/completed');
	}

	public get editedTodo(): Todo | undefined {
		return todoStore.get('/editedTodo');
	}

	public getTodo(id: string) {
		return todoStore.get(`/todos/${id}`);
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

	get() {
		return this;
	}
}
