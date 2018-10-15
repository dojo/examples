export type WithTarget<T extends Event = Event, E extends HTMLElement = HTMLInputElement> = T & { target: E };

export interface ResourceBased {
	loading: boolean;
	loaded: boolean;
}

export interface User {
	username: string;
	bio: string;
	image: string;
}

export interface AuthorProfile extends User {
	following: boolean;
}

export interface UserProfile extends User, ResourceBased {
	email: string;
	token: string;
}

export interface Comment {
	id: number;
	createdAt: string;
	updatedAt: string;
	body: string;
	author: AuthorProfile;
}

export interface Routing {
	outlet: string;
	params: { [index: string]: string };
}

export interface ArticleItem {
	slug: string;
	title: string;
	description: string;
	body: string;
	tagList: string[];
	createdAt: string;
	updatedAt: string;
	favorited: boolean;
	favoritesCount: number;
	author: AuthorProfile;
}

export interface Settings extends UserProfile {
	password: string;
}

export interface Article extends ResourceBased {
	item: ArticleItem;
	comments: Comment[];
	newComment: string;
}

export interface Feed extends ResourceBased {
	category: string;
	tagName: string;
	items: ArticleItem[];
	offset: number;
	pageNumber: number;
	total: number;
}

export interface Errors {
	[index: string]: string[];
}

export interface Login extends ResourceBased {
	email: string;
	password: string;
	failed: boolean;
}

export interface Register extends ResourceBased {
	username: string;
	password: string;
	email: string;
	failed: boolean;
}

export interface Editor extends ResourceBased {
	slug: string;
	title: string;
	description: string;
	body: string;
	tag: string;
	tagList: string[];
}

export interface State {
	settings: Settings;
	feed: Feed;
	article: Article;
	user: UserProfile;
	errors: Errors;
	routing: Routing;
	login: Login;
	register: Register;
	editor: Editor;
	profile: AuthorProfile & ResourceBased;
	tags: string[];
}
