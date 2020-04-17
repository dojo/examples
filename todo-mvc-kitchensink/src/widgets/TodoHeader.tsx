import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';

import store from '../store';
import { addTodo, todoInput, toggleAllTodos } from '../processes';
import bundle from '../nls/common';
import * as css from './styles/todoHeader.m.css';

const factory = create({ theme, store, i18n });

export default factory(function TodoHeader({ middleware: { theme, store, i18n } }) {
	const { newTodo, title, toggleAll } = theme.classes(css);
	const { editPlaceholder, appTitle } = i18n.localize(bundle).messages;
	const { get, path, executor } = store;
	const current = get(path('current'));
	const completedCount = get(path('completedCount')) || 0;
	const todos = get(path('todos')) || [];

	const add = ({ which }: any) => {
		if (which === 13 && current) {
			executor(addTodo)({ label: current });
		}
	};

	return (
		<header>
			<h1 classes={[title]}>{appTitle}</h1>
			<input
				value={current}
				onkeyup={add}
				focus={true}
				classes={[newTodo]}
				oninput={(event: any) => {
					executor(todoInput)({ current: event.target.value });
				}}
				placeholder={editPlaceholder}
			/>
			<input
				checked={todos && completedCount > 0 && todos.length === completedCount}
				type="checkbox"
				classes={[toggleAll]}
				onchange={() => {
					executor(toggleAllTodos)({});
				}}
			/>
		</header>
	);
});
