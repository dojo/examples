import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { Comment as CommentItem } from './../interfaces';
import { DeleteCommentPayload } from '../processes/interfaces';

interface CommentProperties {
	slug: string;
	comment: CommentItem;
	loggedInUser: string;
	deleteComment: (opts: DeleteCommentPayload) => void;
}

export class Comment extends WidgetBase<CommentProperties> {
	private _deleteComment() {
		const { slug, comment: { id } } = this.properties;
		this.properties.deleteComment({ slug, id });
	}

	protected render() {
		const { comment, loggedInUser } = this.properties;
		return v('div', { classes: 'card' }, [
			v('div', { classes: 'card-block' }, [v('p', { classes: 'card-text' }, [comment.body])]),
			v('div', { classes: 'card-footer' }, [
				w(Link, { to: 'user', classes: 'comment-author', params: { username: comment.author.username } }, [
					v('img', { src: comment.author.image, classes: 'comment-author-img' })
				]),
				w(Link, { to: 'user', classes: 'comment-author', params: { username: comment.author.username } }, [
					` ${comment.author.username}`
				]),
				v('div', { classes: 'date-posted' }, [new Date(comment.createdAt).toDateString()]),
				loggedInUser
					? v('div', { classes: 'mod-options' }, [
							v('i', { classes: 'ion-trash-a', onclick: this._deleteComment })
						])
					: null
			])
		]);
	}
}
