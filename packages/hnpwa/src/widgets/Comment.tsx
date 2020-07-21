import { create, tsx } from '@dojo/framework/core/vdom';
import { CommentItem } from './../interfaces';

import * as css from './styles/comment.m.css';

export interface CommentProperties {
	comment: CommentItem;
}

const factory = create().properties<CommentProperties>();

const CommentWidget = factory(function Comment({ properties }) {
	const {
		comment: { user, content, time_ago, comments = [] }
	} = properties();

	return (
		<div classes={[css.root]}>
			<header classes={[css.padding]}>
				{user && <a classes={[css.user]}>{user}</a>}
				<span classes={[css.time]}>{time_ago}</span>
			</header>
			<div key="content" innerHTML={content} classes={[css.comment]}></div>
			<div key="comments" classes={[css.padding]}>
				{comments.map((comment, index) => (
					<CommentWidget comment={comment} key={index} />
				))}
			</div>
		</div>
	);
});

export default CommentWidget;
