import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themed';
import { Registry } from '@dojo/widget-core/Registry';
import Injector from '@dojo/widget-core/Injector';
import App from './App';
import theme from '@dojo/themes/dojo';

const registry = new Registry();
const themeContext = registerThemeInjector(theme, registry);
registry.defineInjector('theme-context', new Injector(themeContext));

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });
projector.append();
