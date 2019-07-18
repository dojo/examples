import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import store, { Todo } from '../store';

import { toggleTodo, todoEditMode, deleteTodo } from '../processes';
import * as css from './styles/todoCard.m.css';

export interface TodoCardProperties {
	todo: Todo;
}

const factory = create({ theme, store }).properties<TodoCardProperties>();

export default factory(function TodoItem({ middleware: { store, theme }, properties }) {
	const { todo } = properties();
	const { executor } = store;
	const { card, cardToggle, cardHeader, completed, todoLabel, cardDestroy } = theme.classes(css);
	return (
		<li key={todo.id} classes={[card, Boolean(todo.completed) && completed]}>
			<div classes={[cardHeader]}>
				<input
					onchange={() => {
						executor(toggleTodo)({ id: todo.id });
					}}
					type="checkbox"
					classes={[cardToggle]}
					checked={todo.completed}
				/>
				<button
					onclick={() => {
						executor(deleteTodo)({ id: todo.id });
					}}
					classes={[cardDestroy]}
				/>
			</div>
			<label
				ondblclick={() => {
					executor(todoEditMode)({ id: todo.id, label: todo.label });
				}}
				classes={[todoLabel]}
			>
				{todo.label}
			</label>
		</li>
	);
});
