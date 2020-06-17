import { createProcess } from '@dojo/framework/stores/process';
import { commandFactory } from './utils';
import { ChangeRoutePayload } from './interfaces';

function isProfile(currentOutlet: string, outlet: string) {
	const outlets = ['user', 'favorites'];
	return outlets.indexOf(currentOutlet) > -1 && outlets.indexOf(outlet) > -1;
}

const changeRouteCommand = commandFactory<ChangeRoutePayload>(({ state, payload: { outlet, context } }) => {
	const currentOutlet = state.routing.outlet;

	state.routing.outlet = outlet;
	state.routing.params = context.params;
	state.settings = {};
	state.editor = {};
	if (isProfile(currentOutlet, outlet) && state.profile) {
		state.profile.feed = {};
	} else {
		state.profile = {};
	}
	state.feed = {};
	state.errors = {};
});
export const changeRouteProcess = createProcess('change-route', [changeRouteCommand]);
