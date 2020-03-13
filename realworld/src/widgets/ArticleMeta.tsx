import { create, tsx } from '@dojo/framework/core/vdom';
import { Link } from '@dojo/framework/routing/Link';
import { ArticleItem } from '../interfaces';
import { ArticleControls } from './ArticleControls';
import { ArticleAuthorControls } from './ArticleAuthorControls';
import { FavoriteArticlePayload, FollowUserPayload, SlugPayload } from '../processes/interfaces';

interface ArticleMetaProperties {
	currentUser: string;
	article: ArticleItem;
	isAuthenticated: boolean;
	favoriteArticle: (opts: FavoriteArticlePayload) => void;
	followUser: (opts: FollowUserPayload) => void;
	deleteArticle: (opts: SlugPayload) => void;
}

const factory = create({}).properties<ArticleMetaProperties>();

export const ArticleMeta = factory(function ArticleMeta({ properties }) {
	const { article, isAuthenticated, currentUser, favoriteArticle, followUser, deleteArticle } = properties();
	const { author, slug, createdAt, favorited, favoritesCount } = article;

	return (
		<div classes={['article-meta']}>
			<Link to="user" params={{ username: author.username }}>
				<img src={author.image} />
			</Link>
			<div classes={['info']}>
				<Link to="user" params={{ username: author.username }} classes={['author']}>
					{author.username}
				</Link>
				<span classes={['date']}>{new Date(createdAt).toDateString()}</span>
			</div>
			{isAuthenticated &&
				(currentUser === author.username ? (
					<ArticleAuthorControls slug={slug} deleteArticle={deleteArticle} />
				) : (
					<ArticleControls
						favorited={favorited}
						followUser={followUser}
						favoriteArticle={favoriteArticle}
						favoritesCount={favoritesCount}
						slug={slug}
						following={author.following}
						authorUsername={author.username}
					/>
				))}
		</div>
	);
});

export default ArticleMeta;
