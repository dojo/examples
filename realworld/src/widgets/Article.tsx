import { create, tsx } from '@dojo/framework/core/vdom';
const snarkdown = require('snarkdown');
import store from '../store';
import { Comment } from './Comment';
import { ArticleMeta } from './ArticleMeta';
import {
	getArticleProcess,
	favoriteArticleProcess,
	followUserProcess,
	deleteArticleProcess,
	addCommentProcess,
	newCommentInputProcess,
	deleteCommentProcess
} from '../processes/articleProcesses';

export interface ArticleProperties {
	slug: string;
}

const factory = create({ store }).properties<ArticleProperties>();

export const Article = factory(function Article({ middleware: { store }, properties }) {
	const { get, path, executor } = store;
	const { slug } = properties();
	const article = get(path('article', slug, 'item'));
	const comments = get(path('article', slug, 'comments')) || [];
	const newComment = get(path('article', slug, 'newComment'));
	const isLoaded = get(path('article', slug, 'isLoaded'));
	const isLoading = get(path('article', slug, 'isLoading'));
	const isAuthenticated = !!get(path('session', 'token'));
	const loggedInUser = get(path('session', 'username'));
	const username = get(path('session', 'username'));

	if (!article && !isLoading) {
		executor(getArticleProcess)({ slug });
	}

	if (!isLoaded) {
		return (
			<div classes={['article-page']}>
				<div classes={['banner']}></div>
			</div>
		);
	}

	const { favorited } = article;

	const articleMeta = (
		<ArticleMeta
			article={article}
			isAuthenticated={isAuthenticated}
			currentUser={username}
			favoriteArticle={() => {
				executor(favoriteArticleProcess)({ favorited, slug });
			}}
			followUser={() => {
				executor(followUserProcess)({
					slug,
					username: article.author.username,
					following: article.author.following
				});
			}}
			deleteArticle={() => {
				executor(deleteArticleProcess)({ slug });
			}}
		/>
	);

	return (
		<div classes={['article-page']}>
			<div key="banner" classes={['banner']}>
				<div classes={['container']}>
					<h1>{article.title}</h1>
					{articleMeta}
				</div>
			</div>
			<div key="page" classes={['container', 'page']}>
				<div classes={['row', 'article-content']}>
					<div classes={['col-xs-12']}>
						<div innerHTML={snarkdown.default(article.body)} />
						<ul classes={['tag-list']}>
							{article.tagList.map((tag) => (
								<li classes={['tag-default', 'tag-pill', 'tag-outline']}>{tag}</li>
							))}
						</ul>
					</div>
				</div>
				<hr />
				<div key="actions" classes={['article-actions']}>
					{articleMeta}
				</div>
				<div key="row" classes={['row']}>
					<div classes={['col-xs-12', 'col-md-8', 'offset-md-2']}>
						{isAuthenticated ? (
							<form classes={['card', 'comment-form']}>
								<div classes={['card-block']}>
									<textarea
										value={newComment}
										classes={['form-control']}
										placeholder="Write a comment..."
										rows={3}
										oninput={(event: KeyboardEvent) => {
											const target = event.target as HTMLInputElement;
											executor(newCommentInputProcess)({ slug, newComment: target.value });
										}}
									/>
								</div>
								<div classes={['card-footer']}>
									<img classes={['comment-author-img']} src="" />
									<button
										onclick={() => {
											executor(addCommentProcess)({ slug, newComment });
										}}
										classes={['btn', 'btn-sm', 'btn-primary']}
									>
										Post Comment
									</button>
								</div>
							</form>
						) : (
							<p></p>
						)}
						<div>
							{comments.map((comment, i) => (
								<Comment
									key={i}
									comment={comment}
									loggedInUser={loggedInUser}
									deleteComment={() => {
										executor(deleteCommentProcess)({ slug, id: comment.id });
									}}
									slug={slug}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Article;
