import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Link } from '@dojo/framework/routing/Link';
import { AuthorProfile } from '../interfaces';
import { ArticleControls } from './ArticleControls';
import { ArticleAuthorControls } from './ArticleAuthorControls';
import { FavoriteArticlePayload, FollowUserPayload, SlugPayload } from '../processes/interfaces';

interface ArticleMetaProperties {
	authorProfile: AuthorProfile;
	username: string;
	favorited: boolean;
	favoritesCount: number;
	createdAt: string;
	slug: string;
	favoriteArticle: (opts: FavoriteArticlePayload) => void;
	followUser: (opts: FollowUserPayload) => void;
	deleteArticle: (opts: SlugPayload) => void;
}

export class ArticleMeta extends WidgetBase<ArticleMetaProperties> {
	protected render() {
		const {
			favoriteArticle,
			followUser,
			deleteArticle,
			username,
			favorited,
			favoritesCount,
			createdAt,
			slug,
			authorProfile
		} = this.properties;

		return v('div', { classes: 'article-meta' }, [
			w(Link, { to: 'user', params: { username: authorProfile.username } }, [
				v('img', { src: authorProfile.image })
			]),
			v('div', { classes: 'info' }, [
				w(Link, { to: 'user', classes: 'author', params: { username: authorProfile.username } }, [
					authorProfile.username
				]),
				v('span', { classes: 'date' }, [new Date(createdAt).toDateString()])
			]),
			username === authorProfile.username
				? w(ArticleAuthorControls, {
						slug,
						deleteArticle
					})
				: w(ArticleControls, {
						favorited,
						followUser,
						favoriteArticle,
						favoritesCount,
						slug,
						following: authorProfile.following,
						authorUsername: authorProfile.username
					})
		]);
	}
}
