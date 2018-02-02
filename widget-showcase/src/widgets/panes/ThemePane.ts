import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Radio from '@dojo/widgets/radio/Radio';

export interface ThemePaneProperties {
	themes: string[];
	currentTheme: string;
	onThemeChange: (theme: string) => void;
}

export default class ThemePane extends WidgetBase<ThemePaneProperties> {

	private _radioChange(event: Event) {



		const { onThemeChange } = this.properties;
		const value = (event.target as HTMLInputElement).value;
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



