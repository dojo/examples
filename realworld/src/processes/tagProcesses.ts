import { createProcess } from '@dojo/stores/process';
import { replace } from '@dojo/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

const getTagsCommand = commandFactory(async ({ path }) => {
	const response = await fetch(`${baseUrl}/tags`);
	const json = await response.json();

	return [replace(path('tags'), json.tags)];
});

export const getTagsProcess = createProcess([getTagsCommand]);
