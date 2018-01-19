import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { SlugPayload } from '../processes/interfaces';

interface ArticleAuthorControlsProperties {
	slug: string;
	deleteArticle: (opts: SlugPayload) => void;
}

export class ArticleAuthorControls extends WidgetBase<ArticleAuthorControlsProperties> {
	private _deleteArticle() {
		const { slug } = this.properties;
		this.properties.deleteArticle({ slug });
	}

	// prettier-ignore
	protected render() {
		const { slug } = this.properties;

		return v('span', [
			w(Link, {
				to: 'edit-post',
				params: { slug },
				classes: ['btn', 'btn-sm', 'btn-outline-secondary']
			}, [v('i', { classes: 'ion-edit' }), ' Edit Article']),
			v('button', {
				onclick: this._deleteArticle,
				classes: ['btn', 'btn-sm', 'btn-outline-danger']
			},[v('i', { classes: 'ion-trash-a' }), ' Delete Article'])
		]);
	}
}
