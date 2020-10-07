import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { State } from '../interfaces';
import { getMatrixVersion } from '../util/skills';

const matrixData = require('../skillmatrix.json');

const commandFactory = createCommandFactory<State>();
const initializeCommand = commandFactory<State>(({ payload, path }) => {
	return Object.entries(payload).map(([key, value]) => replace(path(key as keyof State), value));
});
const initialize = createProcess('initialize', [initializeCommand]);

export const store = createStoreMiddleware<State>(async (store) => {
	const matrix = matrixData[0];
	const matrixVersion = await getMatrixVersion(matrix);
	const matrixHistory: { [version: string]: any } = {};
	const oldVersions = matrixData.slice(1);

	for (const oldMatrix of oldVersions) {
		const oldVersion = await getMatrixVersion(oldMatrix);
		matrixHistory[oldVersion] = oldMatrix;
	}

	const initialState: State = {
		matrix,
		matrixVersion,
		matrixHistory,
		skills: {},
		compare: {
			assessments: []
		}
	};

	initialize(store)(initialState);
});

export type StoreMiddlewareInstance = ReturnType<typeof store>['api'];
