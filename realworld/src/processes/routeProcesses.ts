import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { ChangeRoutePayload } from './interfaces';

function isProfile(currentOutlet: string, outlet: string) {
	const outlets = ['user', 'favorites'];
	return outlets.indexOf(currentOutlet) > -1 && outlets.indexOf(outlet) > -1;
}

const changeRouteCommand = commandFactory<ChangeRoutePayload>(({ get, path, payload: { outlet, context } }) => {
	const currentOutlet = get(path('routing', 'outlet'));
	return [
		replace(path('routing', 'outlet'), outlet),
		replace(path('routing', 'params'), context.params),
		replace(path('settings'), undefined),
		replace(path('editor'), undefined),
		isProfile(currentOutlet, outlet) ? replace(path('profile', 'feed'), {}) : replace(path('profile'), undefined),
		replace(path('feed'), undefined),
		replace(path('errors'), {})
	];
});
export const changeRouteProcess = createProcess('change-route', [changeRouteCommand]);
