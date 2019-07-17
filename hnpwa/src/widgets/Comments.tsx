import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";
import Comment from "./Comment";
import Loading from "./Loading";

import * as css from "./styles/comments.m.css";
import { ArticleItem } from "../interfaces";

export interface CommentsProperties {
	id: string;
}

const factory = create({ icache }).properties<CommentsProperties>();

export default factory(function Comments({ properties: { id }, middleware: { icache } }) {
	const item = icache.getOrSet<ArticleItem>("comment", async () => {
		const response = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`);
		const item = await response.json();
		return item;
	});

	if (!item) {
		return <Loading />;
	}

	return (
		<virtual>
			<article></article>
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

// export class Comments extends WidgetBase<CommentsProperties> {
// 	protected render() {
// 		const { item } = this.properties;

// 		return item
// 			? [
// 					v('article', { classes: css.article }, [
// 						v('h1', [v('a', { href: item.url, classes: css.title }, [item.title])]),
// 						v('p', [
// 							`${item.points || 0} points`,
// 							item.user
// 								? v(
// 										'a',
// 										{
// 											key: 'user',
// 											href: `#/user/${item.user}`,
// 											classes: css.user
// 										},
// 										[` by ${item.user}`]
// 									)
// 								: null
// 						])
// 					]),
// 					v('div', { classes: css.comments }, [
// 						v('h2', { classes: css.commentCount }, [`${item.comments_count} comments`]),
// 						v(
// 							'div',
// 							item.comments.map((comment, index) => {
// 								return w(Comment, { key: index, comment });
// 							})
// 						)
// 					])
// 				]
// 			: w(Loading, {});
// 	}
// }
