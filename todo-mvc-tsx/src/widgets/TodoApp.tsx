import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { tsx } from '@dojo/widget-core/tsx';

import TodoHeader from './TodoHeader';
import TodoList from './../outlets/TodoListOutlet';
import TodoFooter from './../outlets/TodoFooterOutlet';

import * as css from './styles/todoApp.css';

export interface Todo {
	id: string;
	label: string;
	completed: boolean;
	editing?: boolean;
}

export interface TodoAppProperties extends WidgetProperties {
	todos: Todo[];
	currentTodo: string;
	activeCount: number;
	completedCount: number;
	addTodo: () => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
	todoInput: (id: string) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	toggleTodos: () => void;
	clearCompleted: () => void;
}

export const TodoAppBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoApp extends TodoAppBase<TodoAppProperties> {

	protected render(): DNode {
		const {
			activeCount,
			todos,
			currentTodo,
			completedCount,
			addTodo,
			editTodo,
			todoInput,
			removeTodo,
			toggleTodo,
			toggleTodos,
			clearCompleted,
			saveTodo
		} = this.properties;
		const todoCount = todos.length;

		return (
			<section classes={this.classes(css.todoapp)}>
				<TodoHeader
					todo={currentTodo}
					todoInput={todoInput}
					allCompleted={todoCount > 0 && completedCount === todoCount}
					addTodo={addTodo}
					toggleTodos={toggleTodos}
					todoCount={todoCount}
				/>
				<section>
					<TodoList
						todos={todos}
						editTodo={editTodo}
						removeTodo={removeTodo}
						toggleTodo={toggleTodo}
						saveTodo={saveTodo}
					/>
				</section>
				{ todoCount ?
					<TodoFooter
						clearCompleted={clearCompleted}
						activeCount={activeCount}
						todoCount={todoCount}
					/> : null }
			</section>
		);
	}
}

export default TodoApp;
