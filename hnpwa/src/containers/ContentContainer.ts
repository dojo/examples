import { Container } from '@dojo/framework/widget-core/Container';
import { Context } from './../Context';
import { Content, ContentProperties } from './../widgets/Content';

function getProperties(context: Context, properties: ContentProperties): ContentProperties {
	return {
		articles: context.articles,
		category: context.category,
		pageNumber: context.page
	};
}

export const ContentContainer = Container(Content, 'state', { getProperties });
