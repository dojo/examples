import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import Link from '@dojo/framework/routing/ActiveLink';

import bundle from '../nls/common';
import * as css from './styles/todoFilter.m.css';

const factory = create({ theme, i18n });

export default factory(function TodoFilter({ middleware: { theme, i18n } }) {
	const { filters, selected } = theme.get(css);
	const { filterAll, filterActive, filterCompleted } = i18n.get(bundle).messages;

	return (
		<ul classes={[filters]}>
			<li>
				<Link key="all" to="view" params={{ filter: 'all' }} activeClasses={[selected]}>
					{filterAll}
				</Link>
				<Link key="active" to="view" params={{ filter: 'active' }} activeClasses={[selected]}>
					{filterActive}
				</Link>
				<Link key="completed" to="view" params={{ filter: 'completed' }} activeClasses={[selected]}>
					{filterCompleted}
				</Link>
			</li>
		</ul>
	);
});
