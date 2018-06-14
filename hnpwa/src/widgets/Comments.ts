import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { ArticleItem } from './../interfaces';
import { Comment } from './Comment';
import { Loading } from './Loading';
import * as css from './styles/comments.m.css';

export interface CommentsProperties {
	id: string;
	item?: ArticleItem;
}

export class Comments extends WidgetBase<CommentsProperties> {
	protected render() {
		const { item } = this.properties;

		return item
			? [
					v('article', { classes: css.article }, [
						v('h1', [v('a', { href: item.url, classes: css.title }, [item.title])]),
						v('p', [
							`${item.points || 0} points`,
							item.user
								? v(
										'a',
										{
											key: 'user',
											href: `#/user/${item.user}`,
											classes: css.user
										},
										[` by ${item.user}`]
									)
								: null
						])
					]),
					v('div', { classes: css.comments }, [
						v('h2', { classes: css.commentCount }, [`${item.comments_count} comments`]),
						v(
							'div',
							item.comments.map((comment, index) => {
								return w(Comment, { key: index, comment });
							})
						)
					])
				]
			: w(Loading, {});
	}
}
