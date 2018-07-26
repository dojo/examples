import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Radio from '@dojo/widgets/radio';

export interface ThemePaneProperties {
	themes: string[];
	currentTheme: string;
	onThemeChange: (theme: string) => void;
}

export default class ThemePane extends WidgetBase<ThemePaneProperties> {

	private _radioChange(value: string) {
		const { onThemeChange } = this.properties;
		onThemeChange(value);
	}

	render() {
		const {
			themes,
			currentTheme
		} = this.properties;

		return v('div', [
			v('h2', [ 'Change Theme' ]),
			v('div', themes.map(theme => {
				const checked = currentTheme === theme;
				return w(Radio, {
					key: `${theme}-radio`,
					checked,
					value: theme,
					label: theme,
					name: 'theme-radios',
					onChange: this._radioChange
				})
			}))
		]);
	}
}
