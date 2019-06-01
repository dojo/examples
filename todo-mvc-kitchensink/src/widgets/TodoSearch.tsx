import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import store from '../store';
import { todoSearch } from '../processes';

import * as css from './styles/todoSearch.m.css';

const factory = create({ theme, store });

export default factory(function TodoSearch({ middleware: { store, theme } }) {
	const { get, path, executor } = store;
	const { search, searchIcon } = theme.get(css);
	const value = get(path('search'));

	function onInput(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;
		executor(todoSearch)({ search: target.value });
	}

	return (
		<div>
			<span classes={[searchIcon]} />
			<input classes={[search]} placeholder="Quick Filter" value={value} oninput={onInput} />
		</div>
	);
});
