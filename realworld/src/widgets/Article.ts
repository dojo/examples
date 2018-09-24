import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Link } from '@dojo/framework/routing/Link';
const snarkdown = require('snarkdown');
import { Comment } from './Comment';
import { ArticleItem, Comment as CommentItem, AuthorProfile, WithTarget } from '../interfaces';
import { ArticleMeta } from './ArticleMeta';
import {
	FavoriteArticlePayload,
	FollowUserPayload,
	SlugPayload,
	DeleteCommentPayload,
	NewCommentPayload,
	AddCommentPayload
} from '../processes/interfaces';

export interface ArticleProperties {
	article: ArticleItem;
	authorProfile: AuthorProfile;
	comments: CommentItem[];
	loaded: boolean;
	isAuthenticated: boolean;
	loggedInUser: string;
	newComment: string;
	slug: string;
	username: string;
	favoriteArticle: (opts: FavoriteArticlePayload) => void;
	followUser: (opts: FollowUserPayload) => void;
	deleteArticle: (opts: SlugPayload) => void;
	deleteComment: (opts: DeleteCommentPayload) => void;
	onNewCommentInput: (opts: NewCommentPayload) => void;
	addComment: (options: AddCommentPayload) => void;
}

export class Article extends WidgetBase<ArticleProperties> {
	private _addComment(event: WithTarget<MouseEvent>) {
		event.preventDefault();
		if (this.properties.article) {
			const { article: { slug }, newComment } = this.properties;
			this.properties.addComment({ slug, newComment });
		}
	}

	private _onNewCommentInput(event: WithTarget<MouseEvent>) {
		this.properties.onNewCommentInput({ newComment: event.target.value });
	}

	// prettier-ignore
	protected render() {
		const {
			username,
			deleteArticle,
			followUser,
			favoriteArticle,
			isAuthenticated,
			newComment,
			deleteComment,
			comments,
			loaded,
			loggedInUser,
			article
		} = this.properties;

		if (!loaded) {
			return v('div', { classes: 'article-page' }, [v('div', { key: 'banner', classes: 'banner' })]);
		}

		const { createdAt, slug, favorited, favoritesCount, author: authorProfile } = article;

		return v('div', { classes: 'article-page' }, [
			v('div', { key: 'banner', classes: 'banner' }, [
				v('div', { classes: 'container' }, [
					v('h1', [article.title]),
					w(ArticleMeta, {
						authorProfile,
						isAuthenticated,
						slug,
						createdAt,
						favoriteArticle,
						followUser,
						deleteArticle,
						username,
						favorited,
						favoritesCount
					})
				])
			]),
			v('div', { key: 'page', classes: ['container', 'page'] }, [
				v('div', { classes: ['row', 'article-content'] }, [
					v('div', { classes: 'col-xs-12' }, [
						v('div', { innerHTML: snarkdown.default(article.body) }),
						v('ul', { classes: 'tag-list' }, article.tagList.map((tag: string) => {
							return v('li', { classes: ['tag-default', 'tag-pill', 'tag-outline'] }, [tag]);
						}))
					])
				]),
				v('hr'),
				v('div', { classes: 'article-actions' }, [
					w(ArticleMeta, {
						authorProfile,
						isAuthenticated,
						slug,
						createdAt,
						favoriteArticle,
						followUser,
						deleteArticle,
						username,
						favorited,
						favoritesCount
					})
				]),
				v('div', { classes: 'row' }, [
					v('div', { classes: ['col-xs-12', 'col-md-8', 'offset-md-2'] }, [
						isAuthenticated
							? v('form', { classes: ['card', 'comment-form'] }, [
								v('div', { classes: 'card-block' }, [
									v('textarea', {
										value: newComment,
										oninput: this._onNewCommentInput,
										classes: 'form-control',
										placeholder: 'Write a comment...',
										rows: 3
									})
								]),
								v('div', { classes: 'card-footer' }, [
									v('img', { classes: 'comment-author-img', src: '' }),
									v(
										'button',
										{ onclick: this._addComment, classes: ['btn', 'btn-sm', 'btn-primary'] },
										['Post Comment']
									)
								])
							])
							: v('p', [
								w(Link, { to: 'login' }, ['Sign In']),
								' or ',
								w(Link, { to: 'register' }, ['Sign Up']),
								' to add comments on this article.'
							]),
						v('div', comments.map((comment: CommentItem, index: number) => {
							return w(Comment, {
								key: index,
								comment,
								loggedInUser,
								deleteComment,
								slug: article.slug
							});
						}))
					])
				])
			])
		]);
	}
}
