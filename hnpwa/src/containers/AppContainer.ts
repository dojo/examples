import { Container } from '@dojo/framework/widget-core/Container';
import { Context } from './../Context';
import { App } from './../widgets/App';

function getProperties(context: Context, properties: any): any {
	return {
		route: context.route
	};
}

export const AppContainer = Container(App, 'state', { getProperties });
