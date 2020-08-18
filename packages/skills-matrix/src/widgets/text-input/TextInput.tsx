import { create, tsx } from '@dojo/framework/core/vdom';
import TextInput, { TextInputProperties as DojoInputProperties, TextInputChildren } from '@dojo/widgets/text-input';

import * as css from './TextInput.m.css';

export interface TextInputProperties extends DojoInputProperties {
	inputStyles?: string;
	label?: string;
}

const factory = create().properties<TextInputProperties>().children<TextInputChildren | undefined>();

export default factory(function ({ properties, children }) {
	const {
		inputStyles,
		label
	} = properties();
	const inputWidgetStyles = [css.input];
	if (inputStyles) {
		inputWidgetStyles.push(inputStyles);
	}

	return (
		<TextInput
			classes={{
				'@dojo/widgets/text-input': {
					input: inputWidgetStyles,
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
