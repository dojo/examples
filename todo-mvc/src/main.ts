import { AnyAction } from 'dojo-actions/createAction';
import createApp from 'dojo-app/createApp';
import global from 'dojo-core/global';
import ShimPromise from 'dojo-shim/Promise';

import * as storeTodoActions from './actions/storeTodoActions';

import startRouter from './routes';
import { bindActions as bindTodoStoreActions } from './stores/todoStore';

const app = createApp();

// Try to use the native promise so the browser can report unhandled rejections.
const { /* tslint:disable */Promise/* tslint:enable */ = ShimPromise } = global;
Promise.resolve(app.realize(document.body))
	.then(() => {
		return Promise.all(Object.keys(storeTodoActions).map((actionName) => {
			const action: AnyAction = (<any> storeTodoActions)[actionName];
			return action.configure(app.registryProvider);
		}));
	})
	.then(() => bindTodoStoreActions(app))
	.then(() => startRouter(app));
