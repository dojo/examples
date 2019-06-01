import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';

import * as css from './styles/credits.m.css';
import bundle from '../nls/common';

const factory = create({ theme, i18n });

export default factory(function Credits({ middleware: { theme, i18n } }) {
	const { footer } = theme.get(css);
	const { footerCredits, footerInstructions, footerPartOf } = i18n.get(bundle).messages;
	return (
		<footer classes={[footer]}>
			<p>{footerInstructions}</p>
			<p>{footerCredits}</p>
			<p>{footerPartOf}</p>
		</footer>
	);
});
