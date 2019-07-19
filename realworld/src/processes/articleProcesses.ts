import { createProcess } from "@dojo/framework/stores/process";
import { remove, replace } from "@dojo/framework/stores/state/operations";
import { getHeaders, commandFactory } from "./utils";
import { baseUrl } from "../config";
import {
	SlugPayload,
	FavoriteArticlePayload,
	FollowUserPayload,
	AddCommentPayload,
	DeleteCommentPayload,
	NewCommentPayload
} from "./interfaces";

const startLoadingArticleCommand = commandFactory(({ path, payload: { slug } }) => {
	return [
		replace(path("article", slug, "item"), undefined),
		replace(path("article", slug, "comments"), []),
		replace(path("article", slug, "isLoading"), true),
		replace(path("article", slug, "isLoaded"), false)
	];
});

const loadArticleCommand = commandFactory<SlugPayload>(async ({ get, path, payload: { slug } }) => {
	const token = get(path("session", "token"));
	const response = await fetch(`${baseUrl}/articles/${slug}`, {
		headers: getHeaders(token)
	});
	const json = await response.json();

	return [
		replace(path("article", slug, "item"), json.article),
		replace(path("article", slug, "isLoading"), false),
		replace(path("article", slug, "isLoaded"), true)
	];
});

const favoriteArticleCommand = commandFactory<FavoriteArticlePayload>(
	async ({ get, path, payload: { slug, favorited } }) => {
		const token = get(path("session", "token"));
		const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
			method: favorited ? "delete" : "post",
			headers: getHeaders(token)
		});
		const json = await response.json();
		return [replace(path("article", slug, "item"), json.article)];
	}
);

const followUserCommand = commandFactory<Required<FollowUserPayload>>(
	async ({ get, path, payload: { slug, username, following } }) => {
		const token = get(path("session", "token"));
		const response = await fetch(`${baseUrl}/profiles/${username}/follow`, {
			method: following ? "delete" : "post",
			headers: getHeaders(token)
		});
		const json = await response.json();
		const article = get(path("article", slug, "item"));
		return [replace(path("article", slug, "item"), { ...article, author: json.profile })];
	}
);

const loadCommentsCommand = commandFactory<SlugPayload>(async ({ get, path, payload: { slug } }) => {
	const token = get(path("session", "token"));
	const response = await fetch(`${baseUrl}/articles/${slug}/comments`, {
		headers: getHeaders(token)
	});
	const json = await response.json();

	return [replace(path("article", slug, "comments"), json.comments)];
});

const addCommentCommand = commandFactory<AddCommentPayload>(async ({ get, path, payload: { slug, newComment } }) => {
	const token = get(path("session", "token"));
	const requestPayload = {
		comment: {
			body: newComment
		}
	};
	const response = await fetch(`${baseUrl}/articles/${slug}/comments`, {
		method: "post",
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});
	const json = await response.json();
	const comments = get(path("article", slug, "comments"));

	return [
		replace(path("article", slug, "comments"), [...comments, json.comment]),
		replace(path("article", slug, "newComment"), "")
	];
});

const deleteCommentCommand = commandFactory<DeleteCommentPayload>(async ({ at, get, path, payload: { slug, id } }) => {
	const token = get(path("session", "token"));
	await fetch(`${baseUrl}/articles/${slug}/comments/${id}`, {
		method: "delete",
		headers: getHeaders(token)
	});
	const comments = get(path("article", slug, "comments"));
	let index = -1;
	for (let i = 0; i < comments.length; i++) {
		if (comments[i].id === id) {
			index = i;
			break;
		}
	}

	if (index !== -1) {
		return [remove(at(path("article", slug, "comments"), index))];
	}
	return [];
});

const newCommentInputCommand = commandFactory<NewCommentPayload>(({ path, payload: { newComment, slug } }) => {
	return [replace(path("article", slug, "newComment"), newComment)];
});

const deleteArticleCommand = commandFactory<SlugPayload>(async ({ get, path, payload: { slug } }) => {
	const token = get(path("session", "token"));
	await fetch(`${baseUrl}/articles/${slug}`, {
		method: "delete",
		headers: getHeaders(token)
	});
	return [replace(path("routing", "outlet"), "home")];
});

export const getArticleProcess = createProcess("get-article", [
	startLoadingArticleCommand,
	[loadArticleCommand, loadCommentsCommand]
]);
export const deleteCommentProcess = createProcess("delete-comment", [deleteCommentCommand]);
export const addCommentProcess = createProcess("add-comment", [addCommentCommand]);
export const newCommentInputProcess = createProcess("new-comment-input", [newCommentInputCommand]);
export const favoriteArticleProcess = createProcess("fav-article", [favoriteArticleCommand]);
export const followUserProcess = createProcess("follow-user", [followUserCommand]);
export const deleteArticleProcess = createProcess("delete-article", [deleteArticleCommand]);
