import { create, tsx } from '@dojo/framework/core/vdom';
import { Link } from '@dojo/framework/routing/Link';

import { ArticleItem } from '../interfaces';

export interface ArticlePreviewProperties {
	article: ArticleItem;
	favoriteArticle: () => void;
}

const factory = create({}).properties<ArticlePreviewProperties>();

export const ArticlePreview = factory(function ArticlePreview({ properties }) {
	const {
		favoriteArticle,
		article,
		article: { author, favorited, slug }
	} = properties();

	let buttonClasses = ['btn', 'btn-outline-primary', 'btn-sm', 'pull-xs-right'];
	if (favorited) {
		buttonClasses = ['btn', 'btn-primary', 'btn-sm', 'pull-xs-right'];
	}

	return (
		<div classes={['article-preview']}>
			<div classes={['article-meta']}>
				<Link to="user" params={{ username: author.username }}>
					<img src={author.image} />
				</Link>
				<div classes={['info']}>
					<Link classes={['author']} to="user" params={{ username: author.username }}>
						{author.username}
					</Link>
					<span classes={['date']}>{new Date(article.createdAt).toDateString()}</span>
				</div>
				<button
					onclick={() => {
						favoriteArticle();
					}}
					classes={buttonClasses}
				>
					<i classes={['ion-heart']} />
					<span>{` ${article.favoritesCount}`}</span>
				</button>
			</div>
			<Link classes={['preview-link']} to="article" params={{ slug }}>
				<h1>{article.title}</h1>
				<p>{article.description}</p>
				<span>Read more...</span>
			</Link>
		</div>
	);
});

export default ArticlePreview;
