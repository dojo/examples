import { create, w, v, invalidator } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Radio from '@dojo/widgets/radio';
import dojo from '@dojo/themes/dojo';

const themes: { [index: string]: any } = {
	dojo,
	vanilla: {}
};

const factory = create({ theme, invalidator });

export default factory(function ThemePane({ middleware: { theme, invalidator } }) {
	return v('div', [
		v('h2', ['Change Theme']),
		v(
			'div',
			Object.keys(themes).map((themeName) => {
				const checked = theme.get() === themes[themeName];
				return w(Radio, {
					key: `${theme}-radio`,
					checked,
					value: themeName,
					label: themeName,
					name: 'theme-radios',
					onChange: (value: string) => {
						theme.set(themes[value]);
						invalidator();
					}
				});
			})
		)
	]);
});
