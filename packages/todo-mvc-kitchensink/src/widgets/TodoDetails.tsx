import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';

import store from '../store';
import * as css from './styles/todoDetails.m.css';
import { todoReadMode, saveTodo, updateTodoInput } from '../processes';

const factory = create({ theme, store });

export default factory(function TodoDetails({ middleware: { theme, store } }) {
	const { executor, get, path } = store;
	const { todoDetails, backdrop, modal, close, todoDetailsHeader, title, todoDetailsTextArea } = theme.classes(css);
	const value = get(path('editingLabel'));
	const id = get(path('editingId'));
	return (
		<div
			onkeyup={(event: KeyboardEvent) => {
				event.stopPropagation();
				event.preventDefault();
				if (event.which === 27) {
					executor(todoReadMode)({ id });
				}
			}}
			classes={[todoDetails]}
		>
			<div classes={[backdrop]} />
			<div classes={[modal]}>
				<div
					onclick={() => {
						executor(saveTodo)({});
					}}
					classes={[close]}
				/>
				<header classes={[todoDetailsHeader]}>
					<div classes={[title]}>Details</div>
				</header>
				<section>
					<textarea
						focus={() => true}
						value={value}
						oninput={(event: KeyboardEvent) => {
							const target = event.target as HTMLTextAreaElement;
							executor(updateTodoInput)({ label: target.value });
						}}
						classes={[todoDetailsTextArea]}
					/>
				</section>
			</div>
		</div>
	);
});
