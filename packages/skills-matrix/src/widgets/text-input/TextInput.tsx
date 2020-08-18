import { create, tsx } from '@dojo/framework/core/vdom';
import TextInput, { TextInputProperties as DojoInputProperties, TextInputChildren } from '@dojo/widgets/text-input';

import * as css from './TextInput.m.css';

export interface TextInputProperties extends DojoInputProperties {
	label?: string;
}

const factory = create().properties<TextInputProperties>().children<TextInputChildren | undefined>();

export default factory(function ({ properties, children }) {
	const { label } = properties();
	return (
		<TextInput
			classes={{
				'@dojo/widgets/text-input': {
					input: [css.input],
					inputWrapper: [css.wrapper]
				}
			}}
			{...properties()}
		>
			{{
				label: label && <div classes={css.label}>{label}</div>,
				...children()[0]
			}}
		</TextInput>
	);
});
