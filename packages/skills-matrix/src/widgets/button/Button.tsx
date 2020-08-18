import { create, tsx } from '@dojo/framework/core/vdom';
import Button, { ButtonProperties } from '@dojo/widgets/button';

import * as css from './Button.m.css';

const factory = create().properties<ButtonProperties>();

export default factory(function ({ properties, children }) {
	return (
		<Button
			classes={{
				'@dojo/widgets/button': {
					root: [css.root],
					disabled: [css.disabled]
				}
			}}
			{...properties()}
		>
			{children()}
		</Button>
	);
});
