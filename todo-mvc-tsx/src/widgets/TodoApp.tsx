import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import TodoHeader from './TodoHeader';
// import TodoList from './../outlets/TodoListOutlet';
// import TodoFooter from './../outlets/TodoFooterOutlet';
import TodoFooter from './TodoFooter';
import TodoList from './TodoList';
import Outlet from '@dojo/framework/routing/Outlet';

import * as css from './styles/todoApp.m.css';

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

export const TodoAppBase = ThemedMixin(WidgetBase);

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
			<section classes={this.theme(css.todoapp)}>
				<TodoHeader
					todo={currentTodo}
					todoInput={todoInput}
					allCompleted={todoCount > 0 && completedCount === todoCount}
					addTodo={addTodo}
					toggleTodos={toggleTodos}
					todoCount={todoCount}
				/>
				<section>
					<Outlet id='filter' renderer={(details) => {
						return <TodoList
							filter={details.params.filter}
							todos={todos}
							editTodo={editTodo}
							removeTodo={removeTodo}
							toggleTodo={toggleTodo}
							saveTodo={saveTodo}
						/>;
					}} />
				</section>
				{todoCount ?
					<Outlet id='filter' renderer={(details) => {
						return <TodoFooter
							filter={details.params.filter}
							clearCompleted={clearCompleted}
							activeCount={activeCount}
							todoCount={todoCount}
						/>;
					}} /> : null}
			</section>
		);
	}
}

export default TodoApp;
