import { createProcess } from '@dojo/framework/stores/process';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

const getTagsCommand = commandFactory(async ({ state }) => {
	const response = await fetch(`${baseUrl}/tags`);
	const json = await response.json();

	state.tags = json.tags;
});

export const getTagsProcess = createProcess('get-tags', [getTagsCommand]);
