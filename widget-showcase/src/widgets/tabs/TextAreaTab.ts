import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Textarea from '@dojo/widgets/text-area';
import * as css from '../../styles/tabs.m.css';

const factory = create({ icache });

export default factory(function TextAreaTab({ middleware: { icache } }) {
	const state = icache.get<{ [index: string]: string }>('state') || {};
	return v('div', { classes: css.root }, [
		v('h2', ['Text Areas']),
		v('div', [
			w(Textarea, {
				columns: 40,
				rows: 8,
				placeholder: 'Hello, World',
				label: 'Example text area',
				key: 'text-area',
				value: state['text-area'] || '',
				onInput: (value: string) => {
					icache.set('state', { ...state, 'text-area': value });
				}
			}),
			w(Textarea, {
				columns: 40,
				disabled: true,
				rows: 8,
				value: 'Initial value',
				label: 'Disabled text area',
				key: 'disabled-text-area'
			})
		])
	]);
});
