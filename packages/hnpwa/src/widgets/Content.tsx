import has from '@dojo/framework/core/has';
import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Link from '@dojo/framework/routing/Link';
import Article from './Article';
import * as css from './styles/content.m.css';

export interface ContentProperties {
	category: string;
	page: number;
}

const factory = create({ icache }).properties<ContentProperties>();

export default factory(function Content({ properties, middleware: { icache } }) {
	const { page, category } = properties();
	let articles = [];
	if (!has('build-time-render')) {
		articles =
			icache.getOrSet('articles', async () => {
				const catKey = category === 'top' ? 'news' : category === 'new' ? 'newest' : category;
				const response = await fetch(`https://node-hnapi.herokuapp.com/${catKey}?page=${page}`);
				const articles = await response.json();
				return articles;
			}) || [];
	}
	const articlesNodes = [];
	const length = articles.length || 30;
	for (let index = 0; index < length; index++) {
		articlesNodes.push(<Article key={index} index={index} item={articles[index]} page={page} />);
	}
	return (
		<div>
			<div classes={[css.pagination]}>
				<Link
					key="prev"
					classes={[css.pageLink, page === 1 ? css.disabled : undefined]}
					to={page > 1 ? 'content' : ''}
					params={{ category, page: `${page - 1}` }}
				>{`< Prev`}</Link>

				<span key="page" classes={[css.pageNumber]}>{`${page}`}</span>

				<Link
					key="next"
					classes={[css.pageLink, articles.length !== 30 && css.disabled]}
					to={articles.length === 30 ? 'content' : ''}
					params={{ category, page: `${page + 1}` }}
				>{`Next >`}</Link>
			</div>
			{articlesNodes}
		</div>
	);
});
