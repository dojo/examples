import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';

import store from '../store';
import TodoViewSwitch from './TodoViewSwitch';
import TodoFilter from './TodoFilter';
import { clearCompleted } from '../processes';
import bundle from '../nls/common';
import * as css from './styles/todoFooter.m.css';

export interface TodoFooterInterface {
	filter: string;
}

const factory = create({ theme, store, i18n }).properties<TodoFooterInterface>();

export default factory(function TodoFooter({ middleware: { theme, store, i18n }, properties }) {
	const { get, path, executor } = store;
	const { filter } = properties();
	const { footer, todoCount, clearCompleted: clear, todoCountLabel } = theme.classes(css);
	const { format, messages } = i18n.localize(bundle);
	const completedCount = get(path('completedCount')) || 0;
	const todos = get(path('todos')) || [];
	const activeCount = todos.length - completedCount;
	return (
		<footer classes={[footer]}>
			<span classes={[todoCountLabel]}>
				<strong classes={[todoCount]}>{`${activeCount} `}</strong>
				<span>{format('itemsLeft', { count: activeCount })}</span>
			</span>
			<TodoFilter />
			<TodoViewSwitch filter={filter} />
			{completedCount && (
				<button
					classes={[clear]}
					onclick={() => {
						executor(clearCompleted)({});
					}}
				>
					{messages.clearButtonText}
				</button>
			)}
		</footer>
	);
});
