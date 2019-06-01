import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';

import store from '../store';
import TodoViewSwitch from './TodoViewSwitch';
import TodoFilter from './TodoFilter';
import { clearCompleted } from '../processes';
import * as css from './styles/todoFooter.m.css';

export interface TodoFooterInterface {
	filter: string;
}

const factory = create({ theme, store }).properties<TodoFooterInterface>();

export default factory(function TodoFooter({ middleware: { theme, store }, properties }) {
	const { get, path, executor } = store;
	const { filter } = properties;
	const { footer, todoCount, clearCompleted: clear } = theme.get(css);
	const completedCount = get(path('completedCount'));
	return (
		<footer classes={[footer]}>
			<span classes={[todoCount]}>
				<strong />
				<span />
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
					Clear Completed
				</button>
			)}
		</footer>
	);
});
