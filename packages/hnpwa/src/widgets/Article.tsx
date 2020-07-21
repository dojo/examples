import { create, tsx } from '@dojo/framework/core/vdom';
import { ArticleItem } from './../interfaces';
import * as css from './styles/article.m.css';
import Link from '@dojo/framework/routing/Link';

export interface ArticleProperties {
	item?: ArticleItem;
	index: number;
	page: number;
}

const factory = create().properties<ArticleProperties>();

export default factory(function Article({ properties }) {
	const { item, index, page } = properties();
	const articleNumber = `${(page - 1) * 30 + index + 1}`;
	function renderArticle(article: ArticleItem) {
		const { url, title, points, user, id, comments_count, time_ago } = article;
		const commentText = comments_count === 0 ? 'discuss' : `${comments_count} comments`;
		const isComment = url.substr(0, 8) === 'item?id=';
		return (
			<virtual>
				<h2 styles={{ width: undefined }}>
					{isComment ? (
						<Link to="comments" params={{ id: url.substr(8) }} classes={css.titleLink}>
							{title}
						</Link>
					) : (
						<a href={url} target="none" classes={css.titleLink}>
							{title}
						</a>
					)}
				</h2>
				<p classes={[css.details]}>
					<span key="points">{`${points || 0} points ${user ? 'by ' : ''}`}</span>
					<a classes={[css.link]}>{user}</a>
					<span key="time">{` ${time_ago} `}</span>
				</p>
				<p classes={[css.comments]}>
					<Link to="comments" params={{ id: `${id}` }} classes={[css.link]}>
						{commentText}
					</Link>
				</p>
			</virtual>
		);
	}

	function renderArticleShell() {
		const percent = Math.floor(Math.random() * 20 + 80);
		return (
			<virtual>
				<h2 styles={{ width: `${percent}%` }} classes={[css.titleShell, css.animated, css.animatedTitle]} />
				<p classes={[css.subtitleShell, css.animated, css.animatedSubTitle]} />
				<p classes={[css.link, css.comments, css.commentShell, css.animated, css.animatedComment]} />
			</virtual>
		);
	}

	return (
		<article classes={[css.root]}>
			<span classes={[css.pageNumber]}>{`${articleNumber}`}</span>
			<div classes={[css.post]}>{item ? renderArticle(item) : renderArticleShell()}</div>
		</article>
	);
});
