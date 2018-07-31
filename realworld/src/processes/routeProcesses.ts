import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { ChangeRoutePayload } from './interfaces';

const changeRouteCommand = commandFactory<ChangeRoutePayload>(({ path, payload: { outlet, context } }) => {
	return [
		replace(path('routing', 'outlet'), outlet),
		replace(path('routing', 'params'), context.params),
		replace(path('settings', 'loaded'), false),
		replace(path('profile', 'loaded'), false),
		replace(path('feed', 'loaded'), false),
		replace(path('feed', 'category'), undefined),
		replace(path('editor', 'loaded'), false),
		replace(path('errors'), {})
	];
});

export const changeRouteProcess = createProcess('change-route', [changeRouteCommand]);
