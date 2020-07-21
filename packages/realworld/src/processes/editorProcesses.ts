import { createProcess } from '@dojo/framework/stores/process';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { TitlePayload, DescriptionPayload, BodyPayload, TagPayload, SlugPayload } from './interfaces';

const titleInputCommand = commandFactory<TitlePayload>(({ state, payload: { title } }) => {
	state.editor.title = title;
});

const descriptionInputCommand = commandFactory<DescriptionPayload>(({ state, payload: { description } }) => {
	state.editor.description = description;
});

const bodyInputCommand = commandFactory<BodyPayload>(({ state, payload: { body } }) => {
	state.editor.body = body;
});

const tagInputCommand = commandFactory<TagPayload>(({ state, payload: { tag } }) => {
	state.editor.tag = tag;
});

const addTagCommand = commandFactory<TagPayload>(({ state, payload: { tag } }) => {
	if (!state.editor.tagList) {
		state.editor.tagList = [];
	}
	state.editor.tagList.push(tag);
});

const clearTagInputCommand = commandFactory(({ state }) => {
	state.editor.tag = '';
});

const removeTagCommand = commandFactory<TagPayload>(({ state, payload: { tag } }) => {
	const tags = state.editor.tagList || [];
	const index = tags.indexOf(tag);
	if (index !== -1 && state.editor.tagList) {
		state.editor.tagList.splice(index, 1);
	}
});

const getArticleForEditorCommand = commandFactory<SlugPayload>(async ({ state, payload: { slug } }) => {
	const response = await fetch(`${baseUrl}/articles/${slug}`);
	const json = await response.json();
	state.editor = json.article;
});

const clearEditorCommand = commandFactory(({ state }) => {
	state.editor = {};
});

const startPublishCommand = commandFactory(({ state }) => {
	state.editor.isLoading = true;
});

const publishArticleCommand = commandFactory(async ({ state }) => {
	const token = state.session?.token;
	const slug = state.editor.slug;
	const requestPayload = {
		article: state.editor
	};

	const url = slug ? `${baseUrl}/articles/${slug}` : `${baseUrl}/articles`;
	const response = await fetch(url, {
		method: slug ? 'put' : 'post',
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});
	const json = await response.json();

	if (!response.ok) {
		state.editor.isLoading = false;
		state.errors = json.errors;
		return;
	}

	if (slug) {
		state.article[slug].item = json.article;
		state.article[slug].isLoading = true;
	}
	state.editor = {};
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
