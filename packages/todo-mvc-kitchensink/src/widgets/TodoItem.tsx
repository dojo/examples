import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import store, { Todo } from '../store';

import * as css from './styles/todoItem.m.css';
import { toggleTodo, todoEditMode, deleteTodo } from '../processes';

export interface TodoItemProperties {
	todo: Todo;
}

const factory = create({ theme, store }).properties<TodoItemProperties>();

export default factory(function TodoItem({ middleware: { store, theme }, properties }) {
	const { todo } = properties();
	const { executor } = store;
	const { todoItem, toggle, completed, todoLabel, destroy } = theme.classes(css);
	return (
		<li key={todo.id} classes={[todoItem, Boolean(todo.completed) && completed]}>
			<div>
				<input
					onchange={() => {
						executor(toggleTodo)({ id: todo.id });
					}}
					type="checkbox"
					classes={[toggle]}
					checked={todo.completed}
				/>
				<label
					ondblclick={() => {
						executor(todoEditMode)({ id: todo.id, label: todo.label });
					}}
					classes={[todoLabel]}
				>
					{todo.label}
				</label>
				<button
					onclick={() => {
						executor(deleteTodo)({ id: todo.id });
					}}
					classes={[destroy]}
				/>
			</div>
		</li>
	);
});
