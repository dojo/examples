import { Store } from '@dojo/framework/stores/Store';
import { Editor, EditorProperties } from './../widgets/Editor';
import {
	publishArticleProcess,
	addTagProcess,
	bodyInputProcess,
	descInputProcess,
	removeTagProcess,
	tagInputProcess,
	titleInputProcess
} from './../processes/editorProcesses';
import { State } from '../interfaces';
import { StoreContainer } from '@dojo/framework/stores/StoreInjector';

function getProperties(store: Store<State>, properties: EditorProperties): EditorProperties {
	const { get, path } = store;

	return {
		title: get(path('editor', 'title')),
		description: get(path('editor', 'description')),
		body: get(path('editor', 'body')),
		tag: get(path('editor', 'tag')),
		tags: get(path('editor', 'tagList')),
		errors: get(path('errors')),
		onContentInput: bodyInputProcess(store),
		onDescriptionInput: descInputProcess(store),
		onTagCreate: addTagProcess(store),
		onTagDelete: removeTagProcess(store),
		onTagInput: tagInputProcess(store),
		onTitleInput: titleInputProcess(store),
		onPublishPost: publishArticleProcess(store),
		slug: properties.slug
	};
}

export default StoreContainer(Editor, 'state', { paths: [['editor'], ['errors']], getProperties });
