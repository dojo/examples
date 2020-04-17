import { renderer, tsx } from '@dojo/framework/core/vdom';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { registerI18nInjector } from '@dojo/framework/core/mixins/I18n';
import App from './App';
import Registry from '@dojo/framework/core/Registry';

const registry = new Registry();
registerI18nInjector({ locale: 'en' }, registry);

const config = [
	{
		id: 'view',
		path: 'view/{view}/{filter}',
		outlet: 'view',
		defaultParams: {
			filter: 'all',
			view: 'list'
		},
		defaultRoute: true,
		children: [
			{
				id: 'edit',
				path: 'todo/{id}',
				outlet: 'edit'
			}
		]
	}
];
registerRouterInjector(config, registry);

const r = renderer(() => <App />);
r.mount({ registry });
