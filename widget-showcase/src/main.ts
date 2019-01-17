import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import { registerThemeInjector } from '@dojo/framework/widget-core/mixins/Themed';
import { Registry } from '@dojo/framework/widget-core/Registry';
import Injector from '@dojo/framework/widget-core/Injector';
import global from '@dojo/framework/shim/global';
import App from './App';
import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';

const themes: { [index: string]: any } = {
	dojo,
	vanilla: undefined
};

const registry = new Registry();
const themeContext = registerThemeInjector(dojo, registry);

registry.defineInjector('theme-context', () => {
	return () => ({
		get: () => themeContext,
		set: (theme: string) => themeContext.set(theme)
	});
});


let initialAppState = {
	registry,
	themes: Object.keys(themes),
	onThemeChange: _onThemechange
}

function _onThemechange(theme: string) {
	themeContext.set(themes[theme]);
}

const r = renderer(() => w(App, initialAppState));
r.mount({ registry });
