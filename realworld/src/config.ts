import { Store } from '@dojo/framework/stores/Store';
import { State } from './interfaces';
import { Params, MatchType } from '@dojo/framework/routing/interfaces';
import { getEditorArticleProcess, clearEditorProcess } from './processes/editorProcesses';
import { getUserSettingsProcess } from './processes/settingsProcesses';
import { getArticleProcess } from './processes/articleProcesses';
import { getProfileProcess } from './processes/profileProcesses';
import { fetchFeedProcess } from './processes/feedProcesses';

export const baseUrl = 'https://conduit.productionready.io/api';

/**
 * Returns the route configuration for the application
 *
 * @param store The application store used for onEnter and onExit actions
 */
export function getRouteConfig(store: Store<State>) {
	const config = [
		{
			path: 'login',
			outlet: 'login'
		},
		{
			path: 'register',
			outlet: 'register'
		},
		{
			path: 'user/{username}',
			outlet: 'user',
			onEnter: ({ username }: Params, type: MatchType) => {
				if (type === 'index') {
					getProfileProcess(store)({ username });
					fetchFeedProcess(store)({ type: 'user', page: 0, filter: username });
				}
			},
			children: [
				{
					path: 'favorites',
					outlet: 'favorites',
					onEnter: ({ username }: Params) => {
						getProfileProcess(store)({ username });
						fetchFeedProcess(store)({ type: 'favorites', page: 0, filter: username });
					}
				}
			]
		},
		{
			path: 'article/{slug}',
			outlet: 'article',
			onEnter: ({ slug }: Params) => {
				getArticleProcess(store)({ slug });
			}
		},
		{
			path: 'settings',
			outlet: 'settings',
			onEnter: () => {
				getUserSettingsProcess(store)({});
			}
		},
		{
			path: 'editor',
			outlet: 'new-post',
			children: [
				{
					path: 'editor/{slug}',
					outlet: 'edit-post',
					onEnter: ({ slug }: Params) => {
						getEditorArticleProcess(store)({ slug });
					},
					onExit: () => {
						clearEditorProcess(store)({});
					}
				}
			]
		},
		{
			path: '/',
			outlet: 'home',
			onEnter: () => {
				const isAuthenticated = !!store.get(store.path('user', 'token'));
				fetchFeedProcess(store)({ type: isAuthenticated ? 'feed' : 'global', page: 0, filter: '' });
			}
		}
	];
	return config;
}
