import { create, tsx } from '@dojo/framework/core/vdom';
import { Link } from '@dojo/framework/routing/Link';
import { SlugPayload } from '../processes/interfaces';

interface ArticleAuthorControlsProperties {
	slug: string;
	deleteArticle: (opts: SlugPayload) => void;
}

const factory = create({}).properties<ArticleAuthorControlsProperties>();

export const ArticleAuthorControls = factory(function ArticleAuthorControls({ properties }) {
	const { slug, deleteArticle } = properties();
	return (
		<span>
			<Link to="edit-post" params={{ slug }} classes={['btn', 'btn-sm', 'btn-outline-secondary']}>
				<i classes={['ion-edit']} /> Edit Article
			</Link>
			<button
				classes={['btn', 'btn-sm', 'btn-outline-danger']}
				onclick={() => {
					deleteArticle({ slug });
				}}
			>
				<i classes={['ion-trash-a']}></i> Delete Article
			</button>
		</span>
	);
});

export default ArticleAuthorControls;
