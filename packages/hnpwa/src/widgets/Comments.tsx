import { create, tsx } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';
import icache from '@dojo/framework/core/middleware/icache';
import Comment from './Comment';
import Loading from './Loading';

import * as css from './styles/comments.m.css';
import { ArticleItem } from '../interfaces';

export interface CommentsProperties {
	id: string;
}

const factory = create({ icache }).properties<CommentsProperties>();

export default factory(function Comments({ properties, middleware: { icache } }) {
	const { id } = properties();
	let item: ArticleItem | undefined;
	if (!has('build-time-render')) {
		item = icache.getOrSet<ArticleItem>('comment', async () => {
			const response = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`);
			const item = await response.json();
			return item;
		});
	}

	if (!item) {
		return <Loading />;
	}

	return (
		<virtual>
			<article classes={[css.article]}>
				<h1>
					<a href={item.url} classes={css.title}>
						{item.title}
					</a>
				</h1>
				<p>
					{`${item.points || 0} points`}
					{item.user && ` by `}
					{item.user && <a classes={[css.user]}>{item.user}</a>}
				</p>
			</article>
			<div classes={[css.comments]}>
				<h2 classes={[css.commentCount]}>{`${item.comments_count} comments`}</h2>
				<div>
					{item.comments.map((comment, index) => (
						<Comment comment={comment} key={index} />
					))}
				</div>
			</div>
		</virtual>
	);
});
