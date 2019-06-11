import { create, tsx } from "@dojo/framework/core/vdom";
import store from "../store";

import { favoriteFeedArticleProcess } from "./../processes/feedProcesses";
import { ArticlePreview } from "./ArticlePreview";
import { ArticleItem } from "../interfaces";

interface FeedListProperties {
	articles: ArticleItem[];
}

const factory = create({ store }).properties<FeedListProperties>();

export const FeedList = factory(function Tab({ middleware: { store }, properties }) {
	const { executor } = store;
	if (properties.articles.length) {
		return (
			<div>
				{properties.articles.map((article) => (
					<ArticlePreview
						key={article.slug}
						article={article}
						favoriteArticle={() => {
							executor(favoriteFeedArticleProcess)({ slug: article.slug, favorited: article.favorited });
						}}
					/>
				))}
			</div>
		);
	}

	return <div classes={["article-preview"]}>No articles here, yet!</div>;
});

export default FeedList;
