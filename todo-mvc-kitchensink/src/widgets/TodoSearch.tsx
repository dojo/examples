import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import store from '../store';
import { todoSearch } from '../processes';

import bundle from '../nls/common';
import * as css from './styles/todoSearch.m.css';

const factory = create({ theme, store, i18n });

export default factory(function TodoSearch({ middleware: { store, theme, i18n } }) {
	const { get, path, executor } = store;
	const { search, searchIcon } = theme.classes(css);
	const { searchPlaceholder } = i18n.localize(bundle).messages;
	const value = get(path('search'));

	function onInput(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;
		executor(todoSearch)({ search: target.value });
	}

	return (
		<div>
			<span classes={[searchIcon]} />
			<input classes={[search]} placeholder={searchPlaceholder} value={value} oninput={onInput} />
		</div>
	);
});
