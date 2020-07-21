import { create, tsx } from '@dojo/framework/core/vdom';
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

const factory = create({}).properties<ArticleControlsProperties>();

export const ArticleControls = factory(function ArticleControls({ properties }) {
	const { favoritesCount, slug, favoriteArticle, favorited, following, authorUsername, followUser } = properties();
	return (
		<span>
			<button
				onclick={() => {
					followUser({ username: authorUsername, following });
				}}
				classes={['btn', 'btn-sm', following ? 'btn-secondary' : 'btn-outline-secondary']}
			>
				<i classes={['ioc-plus-round']} />
				{`${following ? ' Unfollow' : ' Follow'} ${authorUsername}`}
			</button>
			<button
				onclick={() => {
					favoriteArticle({ slug, favorited });
				}}
				classes={['btn', 'btn-sm', favorited ? 'btn-primary' : 'btn-outline-primary']}
			>
				<i classes={['ion-heart']}></i>
				{`${favorited ? ' Unfavorite' : ' Favorite'}`}
				<span classes={['counter']}>{`(${favoritesCount})`}</span>
			</button>
		</span>
	);
});

export default ArticleControls;
