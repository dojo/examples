import { create, tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';
import { DeleteCommentPayload } from '../processes/interfaces';
import { Comment as CommentItem } from './../interfaces';

interface CommentProperties {
	slug: string;
	comment: CommentItem;
	loggedInUser: string;
	deleteComment: (opts: DeleteCommentPayload) => void;
}

const factory = create({}).properties<CommentProperties>();

export const Comment = factory(function Comment({ properties }) {
	const { slug, comment, loggedInUser, deleteComment } = properties();
	return (
		<div classes={['card']}>
			<div classes={['card-block']}>
				<p classes={['card-text']}>{comment.body}</p>
			</div>
			<div classes={['card-footer']}>
				<Link to="user" classes={['comment-author']} params={{ username: comment.author.username }}>
					<img src={comment.author.image} classes={['comment-author-img']} />
				</Link>
				<Link to="user" classes={['comment-author']} params={{ username: comment.author.username }}>
					{` ${comment.author.username}`}
				</Link>
				<div classes={'date-posted'}>{new Date(comment.createdAt).toDateString()}</div>
				{loggedInUser === comment.author.username && (
					<div classes={['mod-options']}>
						<i
							onclick={() => {
								deleteComment({ slug, id: comment.id });
							}}
							classes={['ion-trash-a']}
						></i>
					</div>
				)}
			</div>
		</div>
	);
});

export default Comment;
