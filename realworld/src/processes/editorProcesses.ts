import { createProcess } from '@dojo/framework/stores/process';
import { replace, add, remove } from '@dojo/framework/stores/state/operations';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { TitlePayload, DescriptionPayload, BodyPayload, TagPayload, SlugPayload } from './interfaces';

const titleInputCommand = commandFactory<TitlePayload>(({ path, payload: { title } }) => {
	return [replace(path('editor', 'title'), title)];
});

const descriptionInputCommand = commandFactory<DescriptionPayload>(({ path, payload: { description } }) => {
	return [replace(path('editor', 'description'), description)];
});

const bodyInputCommand = commandFactory<BodyPayload>(({ path, payload: { body } }) => {
	return [replace(path('editor', 'body'), body)];
});

const tagInputCommand = commandFactory<TagPayload>(({ path, payload: { tag } }) => {
	return [replace(path('editor', 'tag'), tag)];
});

const addTagCommand = commandFactory<TagPayload>(({ get, at, path, payload: { tag } }) => {
	const length = (get(path('editor', 'tagList')) || []).length;
	return [add(at(path('editor', 'tagList'), length), tag)];
});

const clearTagInputCommand = commandFactory(({ path }) => {
	return [replace(path('editor', 'tag'), '')];
});

const removeTagCommand = commandFactory<TagPayload>(({ get, at, path, payload: { tag } }) => {
	const tags = get(path('editor', 'tagList'));
	const index = tags.indexOf(tag);
	if (index !== -1) {
		return [remove(at(path('editor', 'tagList'), index))];
	}
	return [];
});

const getArticleForEditorCommand = commandFactory<SlugPayload>(async ({ path, payload: { slug } }) => {
	const response = await fetch(`${baseUrl}/articles/${slug}`);
	const json = await response.json();
	return [replace(path('editor'), json.article)];
});

const clearEditorCommand = commandFactory(({ path }) => {
	return [replace(path('editor'), {})];
});

const startPublishCommand = commandFactory(({ path }) => {
	return [replace(path('editor', 'isLoading'), true)];
});

const publishArticleCommand = commandFactory(async ({ get, path }) => {
	const token = get(path('session', 'token'));
	const slug = get(path('editor', 'slug'));
	const requestPayload = {
		article: get(path('editor'))
	};

	const url = slug ? `${baseUrl}/articles/${slug}` : `${baseUrl}/articles`;
	const response = await fetch(url, {
		method: slug ? 'put' : 'post',
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});
	const json = await response.json();

	if (!response.ok) {
		return [replace(path('editor', 'isLoading'), false), replace(path('errors'), json.errors)];
	}

	return [
		replace(path('article', slug, 'item'), json.article),
		replace(path('article', slug, 'isLoading'), true),
		replace(path('editor'), undefined)
	];
});

export const titleInputProcess = createProcess('title-input', [titleInputCommand]);
export const descInputProcess = createProcess('desc-input', [descriptionInputCommand]);
export const bodyInputProcess = createProcess('body-input', [bodyInputCommand]);
export const tagInputProcess = createProcess('tag-input', [tagInputCommand]);
export const addTagProcess = createProcess('add-tag', [addTagCommand, clearTagInputCommand]);
export const removeTagProcess = createProcess('remove-tag', [removeTagCommand]);
export const getEditorArticleProcess = createProcess('get-editor-article', [getArticleForEditorCommand]);
export const publishArticleProcess = createProcess('publish-article', [startPublishCommand, publishArticleCommand]);
export const clearEditorProcess = createProcess('clear-editor', [clearEditorCommand]);
