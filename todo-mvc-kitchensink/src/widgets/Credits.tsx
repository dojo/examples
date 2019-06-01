import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';

import * as css from './styles/credits.m.css';

const factory = create({ theme });

export default factory(function Credits({ middleware: { theme } }) {
	const { footer } = theme.get(css);
	return (
		<footer classes={[footer]}>
			<p>blah</p>
			<p>blah</p>
			<p>blah</p>
		</footer>
	);
});
