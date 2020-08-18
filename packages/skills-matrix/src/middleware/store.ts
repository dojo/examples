import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { State } from '../interfaces';
import { getMatrixVersion } from '../util/skills';

const matrix = require('../skillmatrix.json');

const commandFactory = createCommandFactory<State>();
const initializeCommand = commandFactory<State>(({ payload, path }) => {
	return Object.entries(payload).map(([key, value]) => replace(path(key as keyof State), value));
});
const initialize = createProcess('initialize', [initializeCommand]);

export const store = createStoreMiddleware<State>(async (store) => {
	const matrixVersion = await getMatrixVersion(matrix);
	const initialState: State = {
		matrix,
		matrixVersion,
		skills: {},
		compare: {
			assessments: []
		}
	};

	initialize(store)(initialState);
});

export type StoreMiddlewareInstance = ReturnType<typeof store>['api'];
