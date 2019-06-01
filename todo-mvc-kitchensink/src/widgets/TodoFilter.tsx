import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import Link from '@dojo/framework/routing/ActiveLink';

import * as css from './styles/todoFilter.m.css';

const factory = create({ theme });

export default factory(function TodoFilter({ middleware: { theme } }) {
	const { filters, selected } = theme.get(css);

	return (
		<ul classes={[filters]}>
			<li>
				<Link key="all" to="view" params={{ filter: 'all' }} activeClasses={[selected]}>
					all
				</Link>
				<Link key="active" to="view" params={{ filter: 'active' }} activeClasses={[selected]}>
					active
				</Link>
				<Link key="completed" to="view" params={{ filter: 'completed' }} activeClasses={[selected]}>
					completed
				</Link>
			</li>
		</ul>
	);
});
