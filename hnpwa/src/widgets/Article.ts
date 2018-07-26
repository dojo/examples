import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ArticleItem } from './../interfaces';
import * as css from './styles/article.m.css';

export interface ArticleProperties {
	item?: ArticleItem;
	index: number;
	pageNumber: number;
}

export class Article extends WidgetBase<ArticleProperties> {
	private _articleShell() {
		const percent = Math.floor(Math.random() * 20 + 80);
		return [
			v('h2', { styles: { width: `${percent}%` }, classes: [css.titleShell, css.animated, css.animatedTitle] }),
			v('p', { classes: [css.subtitleShell, css.animated, css.animatedSubTitle] })
		];
	}

	private _renderArticle(article: ArticleItem) {
		const { url, title, points, user, id, comments_count, time_ago } = article;
		const commentText = comments_count === 0 ? 'discuss' : `${comments_count} comments`;

		const isComment = url.substr(0, 8) === 'item?id=';
		const articleLink = v(
			'a',
			{
				key: 'article',
				href: isComment ? `#/comments/${url.substr(8)}` : url,
				target: isComment ? undefined : 'none'
			},
			[title]
		);

		return [
			v('h2', { classes: css.title, styles: {} }, [articleLink]),
			v('p', { classes: css.details }, [
				v('span', { key: 'points' }, [`${points || 0} points ${user ? 'by ' : ''}`]),
				user
					? v(
							'a',
							{
								key: 'user',
								href: `#/user/${user}`,
								classes: css.link
							},
							[user]
						)
					: null,
				v('span', { key: 'time-ago' }, [` ${time_ago} `]),
				v(
					'a',
					{
						key: 'comments',
						href: `#/comments/${id}`,
						classes: css.link
					},
					[commentText]
				)
			])
		];
	}

	protected render() {
		const { item, index, pageNumber } = this.properties;
		const articleNumber = `${(pageNumber - 1) * 30 + index + 1}`;

		return v('article', { classes: css.root }, [
			v('span', { classes: css.pageNumber }, [articleNumber]),
			v(
				'div',
				{
					key: index,
					classes: css.post
				},
				item ? this._renderArticle(item) : this._articleShell()
			)
		]);
	}
}
