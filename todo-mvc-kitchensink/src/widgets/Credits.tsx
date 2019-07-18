import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';

import * as css from './styles/credits.m.css';
import bundle from '../nls/common';

const factory = create({ theme, i18n });

export default factory(function Credits({ middleware: { theme, i18n } }) {
	const { footer } = theme.classes(css);
	const { footerCredits, footerInstructions, footerPartOf } = i18n.localize(bundle).messages;
	return (
		<footer classes={[footer]}>
			<p>{footerInstructions}</p>
			<p>{`${footerCredits} The Dojo Team`}</p>
			<p>
				{footerPartOf}
				{<a href="http://todomvc.com">TodoMVC</a>}
			</p>
		</footer>
	);
});
