import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themed';
import { Registry } from '@dojo/widget-core/Registry';
import Injector from '@dojo/widget-core/Injector';
import App from './App';
import dojo from '@dojo/themes/dojo';

const themes: { [index: string]: any } = {
	dojo,
	vanilla: undefined
};

const registry = new Registry();
const themeContext = registerThemeInjector(dojo, registry);

registry.defineInjector('theme-context', new Injector(themeContext));

let initialAppState = {
	registry,
	themes: Object.keys(themes),
	currentTheme: 'dojo',
	onThemeChange: _onThemechange
}

function _onThemechange(theme: string) {
	themeContext.set(themes[theme]);
	projector.setProperties({
		...initialAppState,
		currentTheme: theme
	});
}

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties(initialAppState);
projector.append();
