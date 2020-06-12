import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import Link from '@dojo/framework/routing/ActiveLink';

import bundle from '../nls/common';
import * as css from './styles/todoFilter.m.css';

const factory = create({ theme, i18n });

export default factory(function TodoFilter({ middleware: { theme, i18n } }) {
	const { filters, selected, wrapper, link } = theme.classes(css);
	const { filterAll, filterActive, filterCompleted } = i18n.localize(bundle).messages;

	return (
		<ul classes={[filters]}>
			<li classes={[wrapper]}>
				<Link key="all" to="view" params={{ filter: 'all' }} classes={[link]} activeClasses={[selected]}>
					{filterAll}
				</Link>
				<Link key="active" to="view" params={{ filter: 'active' }} classes={[link]} activeClasses={[selected]}>
					{filterActive}
				</Link>
				<Link
					key="completed"
					to="view"
					params={{ filter: 'completed' }}
					classes={[link]}
					activeClasses={[selected]}
				>
					{filterCompleted}
				</Link>
			</li>
		</ul>
	);
});
