import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { FollowUserPayload, FavoriteArticlePayload } from '../processes/interfaces';

interface ArticleControlsProperties {
	slug: string;
	favoritesCount: number;
	authorUsername: string;
	favorited: boolean;
	following: boolean;
	followUser: (opts: FollowUserPayload) => void;
	favoriteArticle: (opts: FavoriteArticlePayload) => void;
}

export class ArticleControls extends WidgetBase<ArticleControlsProperties> {
	private _favoriteArticle() {
		const { slug, favorited } = this.properties;
		this.properties.favoriteArticle({ slug, favorited });
	}

	private _followUser() {
		const { authorUsername: username, following } = this.properties;
		this.properties.followUser({ username, following });
	}

	// prettier-ignore
	protected render() {
		const { favoritesCount, favorited, following, authorUsername } = this.properties;

		return v('span', [
			v('button', {
				onclick: this._followUser,
				classes: ['btn', 'btn-sm', following ? 'btn-secondary' : 'btn-outline-secondary']
			}, [v('i', { classes: 'ion-plus-round' }), `${following ? ' Unfollow' : ' Follow'} ${authorUsername}`]),
			v('button', {
				onclick: this._favoriteArticle,
				classes: ['btn', 'btn-sm', favorited ? 'btn-primary' : 'btn-outline-primary']
			}, [
				v('i', { classes: 'ion-heart' }),
				`${favorited ? ' Unfavorite' : ' Favorite'}`,
				v('span', { classes: 'counter' }, [`(${favoritesCount})`])
			])
		]);
	}
}
