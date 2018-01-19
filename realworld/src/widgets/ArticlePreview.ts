import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { ArticleItem } from '../interfaces';
import { FavoriteArticlePayload } from '../processes/interfaces';

export interface ArticlePreviewProperties {
	article: ArticleItem;
	favoriteArticle: (opts: FavoriteArticlePayload) => void;
}

export class ArticlePreview extends WidgetBase<ArticlePreviewProperties> {
	private _onFav() {
		const { favoriteArticle, article: { slug, favorited } } = this.properties;
		favoriteArticle({ slug, favorited });
	}

	protected render() {
		const { article, article: { author, favorited } } = this.properties;

		let buttonClasses = ['btn', 'btn-outline-primary', 'btn-sm', 'pull-xs-right'];
		if (favorited) {
			buttonClasses = ['btn', 'btn-primary', 'btn-sm', 'pull-xs-right'];
		}

		return v('div', { classes: 'article-preview' }, [
			v('div', { classes: 'article-meta' }, [
				w(Link, { to: 'user', params: { username: author.username } }, [v('img', { src: author.image })]),
				v('div', { classes: 'info' }, [
					w(Link, { classes: 'author', to: 'user', params: { username: author.username } }, [
						author.username
					]),
					v('span', { classes: 'date' }, [new Date(article.createdAt).toDateString()])
				]),
				v('button', { onclick: this._onFav, classes: buttonClasses }, [
					v('i', { classes: 'ion-heart' }),
					v('span', [` ${article.favoritesCount}`])
				]),
				w(Link, { classes: 'preview-link', to: 'article', params: { slug: article.slug } }, [
					v('h1', [article.title]),
					v('p', [article.description]),
					v('span', ['Read more...'])
				])
			])
		]);
	}
}
