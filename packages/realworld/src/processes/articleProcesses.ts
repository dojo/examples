import { createProcess } from '@dojo/framework/stores/process';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import {
	SlugPayload,
	FavoriteArticlePayload,
	FollowUserPayload,
	AddCommentPayload,
	DeleteCommentPayload,
	NewCommentPayload
} from './interfaces';

const startLoadingArticleCommand = commandFactory(({ state, payload: { slug } }) => {
	state.article[slug] = {
		item: undefined,
		comments: [],
		newComment: '',
		isLoading: true,
		isLoaded: false
	};
});

const loadArticleCommand = commandFactory<SlugPayload>(async ({ state, payload: { slug } }) => {
	const token = state.session?.token;
	const response = await fetch(`${baseUrl}/articles/${slug}`, {
		headers: getHeaders(token)
	});
	const json = await response.json();

	state.article[slug].item = json.article;
	state.article[slug].isLoading = false;
	state.article[slug].isLoaded = true;
});

const favoriteArticleCommand = commandFactory<FavoriteArticlePayload>(
	async ({ state, payload: { slug, favorited } }) => {
		const token = state.session?.token;
		const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
			method: favorited ? 'delete' : 'post',
			headers: getHeaders(token)
		});
		const json = await response.json();
		state.article[slug].item = json.article;
	}
);

const followUserCommand = commandFactory<Required<FollowUserPayload>>(
	async ({ state, payload: { slug, username, following } }) => {
		const token = state.session?.token;
		const response = await fetch(`${baseUrl}/profiles/${username}/follow`, {
			method: following ? 'delete' : 'post',
			headers: getHeaders(token)
		});
		const json = await response.json();
		const article = state.article[slug]?.item;
		state.article[slug].item = article && { ...article, author: json.profile };
	}
);

const loadCommentsCommand = commandFactory<SlugPayload>(async ({ state, payload: { slug } }) => {
	const token = state.session?.token;
	const response = await fetch(`${baseUrl}/articles/${slug}/comments`, {
		headers: getHeaders(token)
	});
	const json = await response.json();
	state.article[slug].comments = json.comments;
});

const addCommentCommand = commandFactory<AddCommentPayload>(async ({ state, payload: { slug, newComment } }) => {
	const token = state.session?.token;
	const requestPayload = {
		comment: {
			body: newComment
		}
	};
	const response = await fetch(`${baseUrl}/articles/${slug}/comments`, {
		method: 'post',
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});
	const json = await response.json();
	const comments = state.article[slug].comments;

	state.article[slug].comments = [...comments, json.comment];
	state.article[slug].newComment = '';
});

const deleteCommentCommand = commandFactory<DeleteCommentPayload>(async ({ state, payload: { slug, id } }) => {
	const token = state.session?.token;
	await fetch(`${baseUrl}/articles/${slug}/comments/${id}`, {
		method: 'delete',
		headers: getHeaders(token)
	});
	const comments = state.article[slug].comments;
	let index = -1;
	for (let i = 0; i < comments.length; i++) {
		if (comments[i].id === id) {
			index = i;
			break;
		}
	}

	if (index !== -1) {
		state.article[slug].comments.splice(index, 1);
	}
});

const newCommentInputCommand = commandFactory<NewCommentPayload>(({ state, payload: { newComment, slug } }) => {
	state.article[slug].newComment = newComment;
});

const deleteArticleCommand = commandFactory<SlugPayload>(async ({ state, payload: { slug } }) => {
	const token = state.session?.token;
	await fetch(`${baseUrl}/articles/${slug}`, {
		method: 'delete',
		headers: getHeaders(token)
	});
	state.routing.outlet = 'home';
});

export const getArticleProcess = createProcess('get-article', [
	startLoadingArticleCommand,
	[loadArticleCommand, loadCommentsCommand]
]);
export const deleteCommentProcess = createProcess('delete-comment', [deleteCommentCommand]);
export const addCommentProcess = createProcess('add-comment', [addCommentCommand]);
export const newCommentInputProcess = createProcess('new-comment-input', [newCommentInputCommand]);
export const favoriteArticleProcess = createProcess('fav-article', [favoriteArticleCommand]);
export const followUserProcess = createProcess('follow-user', [followUserCommand]);
export const deleteArticleProcess = createProcess('delete-article', [deleteArticleCommand]);
